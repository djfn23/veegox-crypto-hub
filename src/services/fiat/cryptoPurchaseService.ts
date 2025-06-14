
import { supabase } from "@/integrations/supabase/client";
import { CryptoPurchase } from "@/types/fiatTypes";
import { revenueService } from "@/services/revenueService";
import { coinGeckoService } from "@/services/coinGeckoService";
import { balanceService } from "./balanceService";

export class CryptoPurchaseService {
  private static instance: CryptoPurchaseService;

  static getInstance(): CryptoPurchaseService {
    if (!this.instance) {
      this.instance = new CryptoPurchaseService();
    }
    return this.instance;
  }

  // Get crypto rates using CoinGecko API
  async getCryptoRates(): Promise<Record<string, number>> {
    try {
      return await coinGeckoService.getCryptoRates();
    } catch (error) {
      console.error('Error fetching crypto rates:', error);
      // Fallback to mock data if CoinGecko fails
      return {
        'BTC': 45000,
        'ETH': 3000,
        'USDC': 1.00,
        'USDT': 1.00,
        'MATIC': 0.85,
        'BNB': 350
      };
    }
  }

  // Purchase crypto with fiat - Enhanced with automatic fee calculation
  async purchaseCrypto(
    userId: string,
    fiatAmount: number,
    cryptoSymbol: string,
    fiatCurrency: string = 'EUR'
  ): Promise<CryptoPurchase> {
    // Get current rates
    const rates = await this.getCryptoRates();
    const cryptoRate = rates[cryptoSymbol];
    
    if (!cryptoRate) {
      throw new Error(`Taux non disponible pour ${cryptoSymbol}`);
    }

    // Check user balance
    const balance = await balanceService.getUserFiatBalance(userId, fiatCurrency);
    if (!balance || balance.available_balance < fiatAmount) {
      throw new Error('Solde insuffisant');
    }

    // Calculate platform fees automatically
    const platformFee = await revenueService.recordTransactionFee(
      'crypto_purchase',
      fiatAmount,
      fiatCurrency,
      userId
    );

    const totalFees = platformFee;
    const cryptoAmount = (fiatAmount - totalFees) / cryptoRate;

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from('crypto_purchases')
      .insert({
        user_id: userId,
        fiat_amount: fiatAmount,
        fiat_currency: fiatCurrency,
        crypto_amount: cryptoAmount,
        crypto_symbol: cryptoSymbol,
        crypto_token_address: this.getTokenAddress(cryptoSymbol),
        exchange_rate: cryptoRate,
        status: 'pending' as const,
        fees: totalFees
      })
      .select()
      .single();

    if (purchaseError) throw purchaseError;

    // Process the purchase
    await this.processCryptoPurchase(purchase.id);

    return purchase as CryptoPurchase;
  }

  // Process crypto purchase
  private async processCryptoPurchase(purchaseId: string): Promise<void> {
    const { data: purchase, error: fetchError } = await supabase
      .from('crypto_purchases')
      .select('*')
      .eq('id', purchaseId)
      .single();

    if (fetchError) throw fetchError;

    try {
      // Deduct from fiat balance
      const { error: txError } = await supabase
        .from('fiat_transactions')
        .insert({
          user_id: purchase.user_id,
          transaction_type: 'crypto_purchase' as const,
          amount: -purchase.fiat_amount,
          currency: purchase.fiat_currency,
          status: 'completed' as const,
          reference_id: purchase.id,
          description: `Achat de ${purchase.crypto_amount} ${purchase.crypto_symbol}`,
          completed_at: new Date().toISOString()
        });

      if (txError) throw txError;

      // Update fiat balance using edge function
      await supabase.functions.invoke('update-fiat-balance', {
        body: {
          user_id: purchase.user_id,
          currency: purchase.fiat_currency,
          amount: -purchase.fiat_amount
        }
      });

      // Update user portfolio
      await supabase
        .from('user_portfolios')
        .upsert({
          user_id: purchase.user_id,
          token_address: purchase.crypto_token_address,
          token_symbol: purchase.crypto_symbol,
          token_name: this.getTokenName(purchase.crypto_symbol),
          balance: purchase.crypto_amount,
          average_buy_price: purchase.exchange_rate
        }, {
          onConflict: 'user_id,token_address'
        });

      // Mark purchase as completed
      await supabase
        .from('crypto_purchases')
        .update({
          status: 'completed' as const,
          completed_at: new Date().toISOString()
        })
        .eq('id', purchaseId);

    } catch (error) {
      // Mark purchase as failed
      await supabase
        .from('crypto_purchases')
        .update({ status: 'failed' as const })
        .eq('id', purchaseId);
      
      throw error;
    }
  }

  // Get user's crypto purchases
  async getUserCryptoPurchases(userId: string, limit: number = 50): Promise<CryptoPurchase[]> {
    const { data, error } = await supabase
      .from('crypto_purchases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as CryptoPurchase[];
  }

  // Helper methods
  private getTokenAddress(symbol: string): string {
    const addresses: Record<string, string> = {
      'BTC': '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
      'ETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
      'USDC': '0xA0b86a33E6441c8C673C9aD16A6B50b34e6b9E77',
      'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      'MATIC': '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      'BNB': '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    };
    return addresses[symbol] || '0x0000000000000000000000000000000000000000';
  }

  private getTokenName(symbol: string): string {
    const names: Record<string, string> = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'USDC': 'USD Coin',
      'USDT': 'Tether',
      'MATIC': 'Polygon',
      'BNB': 'Binance Coin'
    };
    return names[symbol] || symbol;
  }
}

export const cryptoPurchaseService = CryptoPurchaseService.getInstance();
