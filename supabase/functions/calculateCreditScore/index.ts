
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { walletAddress, userId } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get transaction history for the wallet
    const { data: transactions } = await supabaseClient
      .from('transactions_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(100)

    // Calculate credit score based on various factors
    let score = 600 // Base score

    if (transactions && transactions.length > 0) {
      // Transaction volume factor (max +100 points)
      const totalVolume = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0)
      const volumeScore = Math.min(100, Math.floor(totalVolume / 1000))
      score += volumeScore

      // Transaction frequency factor (max +50 points)
      const frequencyScore = Math.min(50, transactions.length * 2)
      score += frequencyScore

      // Account age factor (max +100 points)
      const oldestTx = transactions[transactions.length - 1]
      if (oldestTx?.timestamp) {
        const accountAge = (Date.now() - new Date(oldestTx.timestamp).getTime()) / (1000 * 60 * 60 * 24)
        const ageScore = Math.min(100, Math.floor(accountAge / 10))
        score += ageScore
      }

      // Success rate factor (max +50 points)
      const successfulTxs = transactions.filter(tx => tx.status === 'success').length
      const successRate = successfulTxs / transactions.length
      const successScore = Math.floor(successRate * 50)
      score += successScore
    }

    // Cap the score at 850
    score = Math.min(850, score)

    const factors = {
      transactionVolume: totalVolume || 0,
      transactionCount: transactions?.length || 0,
      accountAge: transactions ? Math.floor((Date.now() - new Date(transactions[transactions.length - 1]?.timestamp || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) : 0,
      successRate: transactions ? (transactions.filter(tx => tx.status === 'success').length / transactions.length * 100).toFixed(1) : '0'
    }

    // Save the credit score to database
    const { error } = await supabaseClient
      .from('credit_scores')
      .upsert({
        user_id: userId,
        wallet_address: walletAddress,
        score,
        factors,
        last_calculated: new Date().toISOString(),
        calculation_version: 'v1.0'
      })

    if (error) throw error

    return new Response(
      JSON.stringify({ score, factors }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
