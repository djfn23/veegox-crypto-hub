
import { supabase } from "@/integrations/supabase/client";
import { FiatTransaction } from "@/types/fiatTypes";

export class TransactionService {
  private static instance: TransactionService;

  static getInstance(): TransactionService {
    if (!this.instance) {
      this.instance = new TransactionService();
    }
    return this.instance;
  }

  // Get user's fiat transactions
  async getUserFiatTransactions(userId: string, limit: number = 50): Promise<FiatTransaction[]> {
    const { data, error } = await supabase
      .from('fiat_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as FiatTransaction[];
  }
}

export const transactionService = TransactionService.getInstance();
