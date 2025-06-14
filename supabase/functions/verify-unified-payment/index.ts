
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
    const { session_id, payment_intent_id } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    let paymentStatus = 'pending';
    let sessionData = null;

    if (session_id) {
      // Retrieve the session
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paymentStatus = session.payment_status || 'pending';
      sessionData = session;
    } else if (payment_intent_id) {
      // Retrieve payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
      paymentStatus = paymentIntent.status;
    }

    if (paymentStatus === 'paid' || paymentStatus === 'succeeded') {
      // Create Supabase service client
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      if (sessionData?.metadata) {
        const userId = sessionData.metadata.user_id;
        const transactionType = sessionData.metadata.transaction_type;
        const amount = parseFloat(sessionData.metadata.original_amount || '0');
        const currency = sessionData.metadata.currency || 'EUR';

        // Update unified transaction status
        await supabase.from('unified_transactions')
          .update({ 
            status: 'completed',
            completed_at: new Date().toISOString(),
            stripe_payment_intent_id: sessionData.payment_intent
          })
          .eq('stripe_session_id', session_id);

        // Process transaction based on type
        await processTransactionByType(supabase, transactionType, sessionData.metadata, amount, currency, userId);

        console.log(`Unified payment verified and processed: ${transactionType} for user ${userId}: ${amount} ${currency}`);
      }
    }

    return new Response(JSON.stringify({ 
      status: paymentStatus,
      verified: paymentStatus === 'paid' || paymentStatus === 'succeeded'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Unified payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function processTransactionByType(supabase: any, transactionType: string, metadata: any, amount: number, currency: string, userId: string) {
  const additionalData = metadata.additional_data ? JSON.parse(metadata.additional_data) : {};

  switch (transactionType) {
    case 'crypto_swap':
      await supabase.from('swap_transactions').insert({
        user_id: userId,
        from_token_address: additionalData.from_token,
        to_token_address: additionalData.to_token,
        from_amount: additionalData.from_amount,
        to_amount: additionalData.to_amount,
        exchange_rate: additionalData.to_amount / additionalData.from_amount,
        status: 'completed',
        completed_at: new Date().toISOString(),
        stripe_payment_intent_id: metadata.payment_intent
      });
      break;

    case 'nft_purchase':
      await supabase.from('nft_transactions').insert({
        buyer_id: userId,
        seller_id: additionalData.seller_id,
        contract_address: additionalData.contract_address,
        token_id: additionalData.token_id,
        price: amount,
        currency_address: currency,
        transaction_type: 'sale',
        transaction_hash: metadata.payment_intent
      });
      break;

    case 'staking':
      await supabase.from('user_stakes').insert({
        user_id: userId,
        pool_id: additionalData.pool_id,
        amount: additionalData.stake_amount,
        staked_at: new Date().toISOString()
      });
      break;

    case 'transfer':
      await supabase.from('bank_transactions').insert({
        from_account_id: userId,
        to_account_id: additionalData.to_user_id,
        amount: additionalData.transfer_amount,
        transaction_type: 'transfer',
        status: 'completed',
        description: `Stripe-facilitated transfer`,
        transaction_hash: metadata.payment_intent
      });
      break;

    case 'crypto_purchase':
      // Handle crypto purchase completion
      await supabase.from('crypto_purchases')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', metadata.payment_intent);
      break;

    case 'fiat_deposit':
      // Update fiat balance
      await supabase.functions.invoke('update-fiat-balance', {
        body: {
          user_id: userId,
          currency: currency,
          amount: amount
        }
      });
      break;
  }

  // Record revenue tracking for all transactions
  await supabase.from('revenue_tracking').insert({
    user_id: userId,
    revenue_type: transactionType,
    amount: amount * 0.025, // 2.5% platform fee
    currency: currency,
    transaction_hash: metadata.payment_intent,
    description: `Platform fee for ${transactionType}`
  });
}
