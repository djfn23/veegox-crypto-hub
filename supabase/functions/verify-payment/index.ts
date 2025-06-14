
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
    const { session_id } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      // Create Supabase service client
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      const userId = session.metadata?.user_id;
      const amount = parseFloat(session.metadata?.amount || '0');
      const currency = session.metadata?.currency || 'EUR';

      if (userId && amount > 0) {
        // Add funds to user's fiat balance
        await supabase.functions.invoke('update-fiat-balance', {
          body: {
            user_id: userId,
            currency: currency,
            amount: amount
          }
        });

        // Create fiat transaction record
        await supabase.from('fiat_transactions').insert({
          user_id: userId,
          transaction_type: 'deposit',
          amount: amount,
          currency: currency,
          status: 'completed',
          stripe_payment_intent_id: session.payment_intent,
          description: `Dépôt de ${amount} ${currency} via Stripe`,
          completed_at: new Date().toISOString()
        });

        console.log(`Payment verified and funds added for user ${userId}: ${amount} ${currency}`);
      }
    }

    return new Response(JSON.stringify({ 
      status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
