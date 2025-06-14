
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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { user_id, currency, amount } = await req.json();

    // Get current balance
    const { data: currentBalance, error: fetchError } = await supabase
      .from('fiat_balances')
      .select('*')
      .eq('user_id', user_id)
      .eq('currency', currency)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const newBalance = (currentBalance?.balance || 0) + amount;
    const newAvailableBalance = (currentBalance?.available_balance || 0) + amount;

    // Update or insert balance
    const { error: upsertError } = await supabase
      .from('fiat_balances')
      .upsert({
        user_id,
        currency,
        balance: newBalance,
        available_balance: newAvailableBalance,
        pending_balance: currentBalance?.pending_balance || 0,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,currency'
      });

    if (upsertError) {
      throw upsertError;
    }

    return new Response(
      JSON.stringify({ success: true, new_balance: newBalance }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      }
    );
  }
});
