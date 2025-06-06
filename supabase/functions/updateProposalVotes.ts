
// Edge function pour mettre à jour les votes d'une proposition DAO
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

    const { proposal_id, vote_power, is_for } = await req.json();
    
    if (!proposal_id || vote_power === undefined || is_for === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Récupération de la proposition
    const { data: proposal, error: proposalError } = await supabaseClient
      .from('dao_proposals')
      .select('votes_for, votes_against, total_votes')
      .eq('id', proposal_id)
      .single();
      
    if (proposalError) {
      return new Response(
        JSON.stringify({ error: proposalError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mise à jour des compteurs de vote
    const votes_for = (proposal.votes_for || 0) + (is_for ? vote_power : 0);
    const votes_against = (proposal.votes_against || 0) + (!is_for ? vote_power : 0);
    const total_votes = votes_for + votes_against;

    const { error: updateError } = await supabaseClient
      .from('dao_proposals')
      .update({
        votes_for,
        votes_against,
        total_votes
      })
      .eq('id', proposal_id);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
