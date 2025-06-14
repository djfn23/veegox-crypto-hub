
import { supabase } from "@/integrations/supabase/client";
import { FiatBalance } from "@/types/fiatTypes";

export class BalanceService {
  private static instance: BalanceService;

  static getInstance(): BalanceService {
    if (!this.instance) {
      this.instance = new BalanceService();
    }
    return this.instance;
  }

  // Get user's fiat balance
  async getUserFiatBalance(userId: string, currency: string = 'EUR'): Promise<FiatBalance | null> {
    const { data, error } = await supabase
      .from('fiat_balances')
      .select('*')
      .eq('user_id', userId)
      .eq('currency', currency)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // Create or update fiat balance
  async upsertFiatBalance(userId: string, currency: string = 'EUR'): Promise<FiatBalance> {
    const { data, error } = await supabase
      .from('fiat_balances')
      .upsert({
        user_id: userId,
        currency,
        balance: 0,
        available_balance: 0,
        pending_balance: 0
      }, {
        onConflict: 'user_id,currency'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Add funds to fiat balance
  async addFunds(userId: string, amount: number, currency: string = 'EUR', stripePaymentIntentId?: string): Promise<void> {
    // Create transaction record
    const { error: txError } = await supabase
      .from('fiat_transactions')
      .insert({
        user_id: userId,
        transaction_type: 'deposit',
        amount,
        currency,
        status: 'completed',
        stripe_payment_intent_id: stripePaymentIntentId,
        description: `Dépôt de ${amount} ${currency}`,
        completed_at: new Date().toISOString()
      });

    if (txError) throw txError;

    // Update balance using edge function
    const { error: balanceError } = await supabase.functions.invoke('update-fiat-balance', {
      body: {
        user_id: userId,
        currency: currency,
        amount: amount
      }
    });

    if (balanceError) throw balanceError;
  }
}

export const balanceService = BalanceService.getInstance();
