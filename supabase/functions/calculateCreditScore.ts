
// Edge function pour calculer les scores de crédit on-chain
import { serve } from "https://deno.land/std@0.176.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );

    const { user_id, wallet_address } = await req.json();
    
    if (!user_id || !wallet_address) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or wallet_address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Récupération des transactions (simple simulation ici)
    const { data: transactions, error: txError } = await supabaseClient
      .from('transactions_history')
      .select('*')
      .eq('user_id', user_id)
      .eq('from_address', wallet_address);

    if (txError) {
      return new Response(
        JSON.stringify({ error: txError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Simulation d'un calcul de score de crédit
    let baseScore = 500; // Score de base
    const txCount = transactions?.length || 0;
    
    // Facteurs utilisés dans le calcul
    const factors = {
      transaction_count: txCount,
      wallet_age_days: 120, // Simulé
      balance_stability: 80, // Simulé
      defi_activity: 65, // Simulé
      loan_history: txCount > 5 ? 90 : 50 // Simulé
    };
    
    // Calcul simple du score
    let score = baseScore;
    score += factors.transaction_count * 5;
    score += factors.wallet_age_days * 0.5;
    score += factors.balance_stability * 1.5;
    score += factors.defi_activity * 1.2;
    score += factors.loan_history * 1.8;
    
    // Score plafonné à 1000
    score = Math.min(Math.floor(score), 1000);

    // Mise à jour ou création du score de crédit
    const { data: existingScore } = await supabaseClient
      .from('credit_scores')
      .select('*')
      .eq('user_id', user_id)
      .eq('wallet_address', wallet_address)
      .maybeSingle();

    let result;
    
    if (existingScore) {
      // Mise à jour
      const { data, error } = await supabaseClient
        .from('credit_scores')
        .update({
          score,
          factors,
          last_calculated: new Date().toISOString(),
          calculation_version: 'v1.2'
        })
        .eq('id', existingScore.id)
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    } else {
      // Création
      const { data, error } = await supabaseClient
        .from('credit_scores')
        .insert({
          user_id,
          wallet_address,
          score,
          factors,
          calculation_version: 'v1.2'
        })
        .select()
        .single();
        
      if (error) throw error;
      result = data;
    }

    return new Response(
      JSON.stringify({ result }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
