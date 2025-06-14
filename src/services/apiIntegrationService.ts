
import { supabase } from '@/integrations/supabase/client';
import { oneInchService } from './oneInchService';
import { coinGeckoService } from './coinGeckoService';
import { stripeIntegrationService } from './stripeIntegrationService';

export interface APIConfiguration {
  name: string;
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  rateLimit?: number;
  lastUsed?: Date;
}

export class APIIntegrationService {
  private static instance: APIIntegrationService;
  private configurations: Map<string, APIConfiguration> = new Map();

  static getInstance(): APIIntegrationService {
    if (!this.instance) {
      this.instance = new APIIntegrationService();
    }
    return this.instance;
  }

  async initializeAPIs(): Promise<void> {
    console.log('Initializing API integrations...');

    // Configure OneInch
    this.configurations.set('1inch', {
      name: '1inch DEX Aggregator',
      enabled: true,
      baseUrl: 'https://api.1inch.io/v5.0',
      rateLimit: 10, // requests per second
    });

    // Configure CoinGecko
    this.configurations.set('coingecko', {
      name: 'CoinGecko Price API',
      enabled: true,
      baseUrl: 'https://api.coingecko.com/api/v3',
      rateLimit: 5,
    });

    // Configure Stripe
    this.configurations.set('stripe', {
      name: 'Stripe Payments',
      enabled: true,
      rateLimit: 100,
    });

    // Configure Alchemy (pour Wallet)
    this.configurations.set('alchemy', {
      name: 'Alchemy Wallet API',
      enabled: true,
      baseUrl: 'https://api.alchemy.com',
      rateLimit: 30,
    });

    console.log('API integrations initialized');
  }

  async executeSwap(
    fromToken: string,
    toToken: string,
    amount: string,
    walletAddress: string,
    slippage: number = 1
  ): Promise<any> {
    try {
      console.log('Executing swap via 1inch:', { fromToken, toToken, amount });

      // Get quote first
      const quote = await oneInchService.getQuote(fromToken, toToken, amount, { slippage });
      if (!quote) {
        throw new Error('Unable to get swap quote');
      }

      // Get swap data
      const swapData = await oneInchService.getSwap(
        fromToken,
        toToken,
        amount,
        walletAddress,
        slippage
      );

      if (!swapData) {
        throw new Error('Unable to get swap data');
      }

      // Log the transaction attempt
      console.log('Swap data prepared:', swapData.tx);

      return {
        quote,
        swapData,
        success: true,
      };
    } catch (error) {
      console.error('Swap execution error:', error);
      throw error;
    }
  }

  async processCryptoPurchase(
    amount: number,
    currency: string = 'usd',
    cryptoSymbol: string = 'ETH'
  ): Promise<any> {
    try {
      console.log('Processing crypto purchase:', { amount, currency, cryptoSymbol });

      // Create Stripe payment intent
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount,
          currency,
          type: 'crypto-purchase',
          cryptoSymbol,
        },
      });

      if (error) {
        throw new Error(`Payment error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Crypto purchase error:', error);
      throw error;
    }
  }

  async sendNotification(
    email: string,
    type: 'swap_success' | 'price_alert' | 'transaction_complete' | 'security_alert',
    data: any
  ): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('send-notification', {
        body: {
          to: email,
          type,
          data,
        },
      });

      if (error) {
        throw new Error(`Notification error: ${error.message}`);
      }

      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Notification sending error:', error);
      // Don't throw - notifications are not critical
    }
  }

  async getTokenPrices(tokenIds: string[]): Promise<any> {
    try {
      return await coinGeckoService.getTokenPrices(tokenIds);
    } catch (error) {
      console.error('Price fetch error:', error);
      return [];
    }
  }

  async verifyPayment(sessionId: string): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId },
      });

      if (error) {
        throw new Error(`Payment verification error: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  getAPIStatus(apiName: string): APIConfiguration | undefined {
    return this.configurations.get(apiName);
  }

  getAllAPIStatus(): Map<string, APIConfiguration> {
    return this.configurations;
  }

  isAPIEnabled(apiName: string): boolean {
    const config = this.configurations.get(apiName);
    return config?.enabled || false;
  }
}

export const apiIntegrationService = APIIntegrationService.getInstance();
