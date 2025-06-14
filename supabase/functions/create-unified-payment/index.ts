
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client using the anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader?.replace("Bearer ", "");
    
    let user = null;
    if (token) {
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    // Parse request body
    const { amount, currency = 'EUR', metadata, description } = await req.json();

    console.log(`Creating unified payment for user ${user.id}: ${amount/100} ${currency} - ${metadata.transaction_type}`);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if a Stripe customer exists
    const customers = await stripe.customers.list({ 
      email: user.email, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id }
      });
      customerId = customer.id;
    }

    // Create checkout session for unified payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { 
              name: `${metadata.transaction_type.toUpperCase()} - Veegox Platform`,
              description: description || `Transaction ${metadata.transaction_type}`
            },
            unit_amount: amount, // Already in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=${metadata.transaction_type}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?type=${metadata.transaction_type}`,
      metadata: {
        user_id: user.id,
        transaction_type: metadata.transaction_type,
        reference_id: metadata.reference_id || '',
        additional_data: metadata.additional_data || '',
        original_amount: (amount / 100).toString(),
        currency: currency
      }
    });

    // Record the unified transaction in our database
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    await supabaseService.from('unified_transactions').insert({
      user_id: user.id,
      stripe_session_id: session.id,
      transaction_type: metadata.transaction_type,
      amount: amount / 100,
      currency: currency,
      status: 'pending',
      metadata: metadata,
      description: description
    });

    console.log(`Unified payment session created: ${session.id} for ${metadata.transaction_type}`);

    return new Response(JSON.stringify({ 
      url: session.url,
      session_id: session.id,
      payment_intent_id: session.payment_intent
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Unified payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
