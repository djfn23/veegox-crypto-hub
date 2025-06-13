
import { supabase } from "@/integrations/supabase/client";

export interface SwapTransaction {
  id?: string;
  user_id: string;
  from_token_address: string;
  to_token_address: string;
  from_amount: number;
  to_amount: number;
  exchange_rate: number;
  slippage_tolerance: number;
  transaction_hash?: string;
  status: string; // Changed from union type to string to match Supabase
  gas_fee?: number;
  protocol_used: string;
  created_at?: string;
  completed_at?: string;
}

export interface UserPortfolio {
  id?: string;
  user_id: string;
  token_address: string;
  token_symbol: string;
  token_name: string;
  balance: number;
  average_buy_price?: number;
  last_updated?: string;
}

export interface TokenPrice {
  id?: string;
  token_address: string;
  token_symbol: string;
  price_usd: number;
  price_change_24h?: number;
  market_cap?: number;
  volume_24h?: number;
  last_updated?: string;
}

export class SwapService {
  static async createSwapTransaction(transaction: Omit<SwapTransaction, 'id' | 'created_at'>): Promise<SwapTransaction | null> {
    try {
      const { data, error } = await supabase
        .from('swap_transactions')
        .insert(transaction)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating swap transaction:', error);
      return null;
    }
  }

  static async updateSwapTransaction(id: string, updates: Partial<SwapTransaction>): Promise<SwapTransaction | null> {
    try {
      const { data, error } = await supabase
        .from('swap_transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating swap transaction:', error);
      return null;
    }
  }

  static async getUserSwapTransactions(userId: string): Promise<SwapTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('swap_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user swap transactions:', error);
      return [];
    }
  }

  static async updateUserPortfolio(portfolio: Omit<UserPortfolio, 'id' | 'last_updated'>): Promise<UserPortfolio | null> {
    try {
      const { data, error } = await supabase
        .from('user_portfolios')
        .upsert(portfolio, { 
          onConflict: 'user_id,token_address',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user portfolio:', error);
      return null;
    }
  }

  static async getUserPortfolio(userId: string): Promise<UserPortfolio[]> {
    try {
      const { data, error } = await supabase
        .from('user_portfolios')
        .select('*')
        .eq('user_id', userId)
        .order('balance', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
      return [];
    }
  }

  static async cacheTokenPrice(price: Omit<TokenPrice, 'id' | 'last_updated'>): Promise<TokenPrice | null> {
    try {
      const { data, error } = await supabase
        .from('token_prices_cache')
        .upsert(price, { 
          onConflict: 'token_address',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error caching token price:', error);
      return null;
    }
  }

  static async getCachedTokenPrices(): Promise<TokenPrice[]> {
    try {
      const { data, error } = await supabase
        .from('token_prices_cache')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cached token prices:', error);
      return [];
    }
  }
}
