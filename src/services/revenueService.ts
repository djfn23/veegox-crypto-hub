
import { supabase } from "@/integrations/supabase/client";
import { coinGeckoService } from "./coinGeckoService";

export interface RevenueRecord {
  id: string;
  user_id: string;
  revenue_type: string;
  amount: number;
  currency: string;
  transaction_hash?: string;
  description?: string;
  timestamp: string;
}

export interface MarketplaceFee {
  id: string;
  transaction_type: string;
  fee_percentage: number;
  minimum_fee?: number;
  maximum_fee?: number;
  is_active: boolean;
  created_at: string;
}

export interface RevenueMetrics {
  totalRevenue: number;
  revenueByType: Record<string, number>;
  revenueByPeriod: { date: string; amount: number }[];
  topRevenueTypes: { type: string; amount: number; percentage: number }[];
}

export class RevenueService {
  private static instance: RevenueService;

  static getInstance(): RevenueService {
    if (!this.instance) {
      this.instance = new RevenueService();
    }
    return this.instance;
  }

  // Calculate fees for a transaction
  async calculateFees(
    transactionType: string,
    amount: number,
    currency: string = 'EUR',
    userId?: string,
    transactionHash?: string,
    description?: string
  ): Promise<number> {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-fees', {
        body: {
          transaction_type: transactionType,
          amount,
          currency,
          user_id: userId,
          transaction_hash: transactionHash,
          description
        }
      });

      if (error) throw error;
      return data?.fee_amount || 0;
    } catch (error) {
      console.error('Error calculating fees:', error);
      return 0;
    }
  }

  // Get marketplace fees configuration
  async getMarketplaceFees(): Promise<MarketplaceFee[]> {
    const { data, error } = await supabase
      .from('marketplace_fees')
      .select('*')
      .eq('is_active', true)
      .order('transaction_type');

    if (error) throw error;
    return data || [];
  }

  // Get revenue records
  async getRevenueRecords(limit: number = 100): Promise<RevenueRecord[]> {
    const { data, error } = await supabase
      .from('revenue_tracking')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Get revenue metrics
  async getRevenueMetrics(days: number = 30): Promise<RevenueMetrics> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('revenue_tracking')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;

    const records = data || [];
    
    // Convert all amounts to EUR using CoinGecko rates
    const cryptoRates = await coinGeckoService.getCryptoRates();
    const eurRate = 1; // Base rate for EUR

    let totalRevenue = 0;
    const revenueByType: Record<string, number> = {};
    const revenueByDate: Record<string, number> = {};

    for (const record of records) {
      let amountInEur = record.amount;
      
      // Convert to EUR if needed
      if (record.currency !== 'EUR') {
        const rate = cryptoRates[record.currency] || 1;
        amountInEur = record.amount * rate;
      }

      totalRevenue += amountInEur;
      
      // Group by type
      revenueByType[record.revenue_type] = (revenueByType[record.revenue_type] || 0) + amountInEur;
      
      // Group by date
      const date = record.timestamp.split('T')[0];
      revenueByDate[date] = (revenueByDate[date] || 0) + amountInEur;
    }

    // Prepare revenue by period
    const revenueByPeriod = Object.entries(revenueByDate).map(([date, amount]) => ({
      date,
      amount
    })).sort((a, b) => a.date.localeCompare(b.date));

    // Prepare top revenue types
    const topRevenueTypes = Object.entries(revenueByType)
      .map(([type, amount]) => ({
        type,
        amount,
        percentage: (amount / totalRevenue) * 100
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalRevenue,
      revenueByType,
      revenueByPeriod,
      topRevenueTypes
    };
  }

  // Auto-calculate and record fees for common transactions
  async recordTransactionFee(
    transactionType: 'crypto_purchase' | 'nft_sale' | 'swap' | 'staking' | 'bank_transfer',
    amount: number,
    currency: string,
    userId: string,
    transactionHash?: string
  ): Promise<number> {
    return await this.calculateFees(
      transactionType,
      amount,
      currency,
      userId,
      transactionHash,
      `Frais automatiques pour ${transactionType}`
    );
  }
}

export const revenueService = RevenueService.getInstance();
