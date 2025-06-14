
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const { 
      transaction_type, 
      amount, 
      currency = 'EUR',
      user_id,
      transaction_hash,
      description 
    } = await req.json();

    console.log(`Calculating fees for ${transaction_type}: ${amount} ${currency}`);

    // Create Supabase service client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get fee configuration
    const { data: feeConfig, error: feeError } = await supabase
      .from('marketplace_fees')
      .select('*')
      .eq('transaction_type', transaction_type)
      .eq('is_active', true)
      .single();

    if (feeError || !feeConfig) {
      console.error('Fee configuration not found for:', transaction_type);
      return new Response(JSON.stringify({ 
        fee_amount: 0,
        error: 'Fee configuration not found' 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Calculate fee
    let feeAmount = (amount * feeConfig.fee_percentage) / 100;
    
    // Apply minimum and maximum fee limits
    if (feeConfig.minimum_fee && feeAmount < feeConfig.minimum_fee) {
      feeAmount = feeConfig.minimum_fee;
    }
    if (feeConfig.maximum_fee && feeAmount > feeConfig.maximum_fee) {
      feeAmount = feeConfig.maximum_fee;
    }

    // Record the revenue
    if (feeAmount > 0) {
      await supabase.from('revenue_tracking').insert({
        user_id: user_id,
        revenue_type: transaction_type,
        amount: feeAmount,
        currency: currency,
        transaction_hash: transaction_hash,
        description: description || `Frais ${transaction_type}: ${feeAmount} ${currency}`
      });

      console.log(`Fee recorded: ${feeAmount} ${currency} for ${transaction_type}`);
    }

    return new Response(JSON.stringify({ 
      fee_amount: feeAmount,
      fee_percentage: feeConfig.fee_percentage,
      transaction_type: transaction_type
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Fee calculation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
