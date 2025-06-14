
import { supabase } from "@/integrations/supabase/client";

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
  metadata?: Record<string, string>;
}

export interface StripeTransactionMetadata {
  transaction_type: 'crypto_swap' | 'nft_purchase' | 'staking' | 'transfer' | 'crypto_purchase' | 'fiat_deposit';
  user_id: string;
  reference_id?: string;
  additional_data?: Record<string, any>;
}

export class StripeUnifiedService {
  private static instance: StripeUnifiedService;

  static getInstance(): StripeUnifiedService {
    if (!this.instance) {
      this.instance = new StripeUnifiedService();
    }
    return this.instance;
  }

  // Create unified payment intent for any transaction type
  async createUnifiedPaymentIntent(
    amount: number,
    currency: string = 'EUR',
    metadata: StripeTransactionMetadata,
    description?: string
  ): Promise<StripePaymentIntent | null> {
    try {
      const { data, error } = await supabase.functions.invoke('create-unified-payment', {
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          metadata: {
            ...metadata,
            transaction_type: metadata.transaction_type,
            user_id: metadata.user_id,
            reference_id: metadata.reference_id || '',
            additional_data: JSON.stringify(metadata.additional_data || {})
          },
          description: description || `${metadata.transaction_type} transaction`
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Stripe unified payment creation error:', error);
      return null;
    }
  }

  // Process crypto swap through Stripe
  async processStripeSwap(
    fromTokenAddress: string,
    toTokenAddress: string,
    fromAmount: number,
    toAmount: number,
    userId: string,
    fees: number = 0
  ): Promise<StripePaymentIntent | null> {
    const totalAmount = fromAmount + fees;
    
    return await this.createUnifiedPaymentIntent(
      totalAmount,
      'EUR',
      {
        transaction_type: 'crypto_swap',
        user_id: userId,
        additional_data: {
          from_token: fromTokenAddress,
          to_token: toTokenAddress,
          from_amount: fromAmount,
          to_amount: toAmount,
          fees: fees
        }
      },
      `Crypto Swap: ${fromAmount} tokens + ${fees} fees`
    );
  }

  // Process NFT purchase through Stripe
  async processStripeNFTPurchase(
    contractAddress: string,
    tokenId: string,
    price: number,
    currency: string,
    userId: string,
    sellerId: string
  ): Promise<StripePaymentIntent | null> {
    return await this.createUnifiedPaymentIntent(
      price,
      currency,
      {
        transaction_type: 'nft_purchase',
        user_id: userId,
        additional_data: {
          contract_address: contractAddress,
          token_id: tokenId,
          seller_id: sellerId,
          price: price
        }
      },
      `NFT Purchase: Token #${tokenId}`
    );
  }

  // Process staking through Stripe
  async processStripeStaking(
    poolId: string,
    amount: number,
    userId: string,
    stakingFees: number = 0
  ): Promise<StripePaymentIntent | null> {
    const totalAmount = amount + stakingFees;
    
    return await this.createUnifiedPaymentIntent(
      totalAmount,
      'EUR',
      {
        transaction_type: 'staking',
        user_id: userId,
        reference_id: poolId,
        additional_data: {
          pool_id: poolId,
          stake_amount: amount,
          fees: stakingFees
        }
      },
      `Staking: ${amount} tokens in pool ${poolId}`
    );
  }

  // Process internal transfer through Stripe
  async processStripeTransfer(
    fromUserId: string,
    toUserId: string,
    amount: number,
    currency: string,
    transferFees: number = 0
  ): Promise<StripePaymentIntent | null> {
    const totalAmount = amount + transferFees;
    
    return await this.createUnifiedPaymentIntent(
      totalAmount,
      currency,
      {
        transaction_type: 'transfer',
        user_id: fromUserId,
        additional_data: {
          to_user_id: toUserId,
          transfer_amount: amount,
          fees: transferFees
        }
      },
      `Transfer: ${amount} ${currency} to user ${toUserId}`
    );
  }

  // Verify payment completion
  async verifyPaymentCompletion(paymentIntentId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('verify-unified-payment', {
        body: { payment_intent_id: paymentIntentId }
      });

      if (error) throw error;
      return data?.status === 'succeeded';
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  }

  // Get transaction history from Stripe
  async getStripeTransactionHistory(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('get-stripe-transactions', {
        body: { user_id: userId, limit }
      });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Stripe transaction history error:', error);
      return [];
    }
  }
}

export const stripeUnifiedService = StripeUnifiedService.getInstance();
