
export interface FiatBalance {
  id: string;
  user_id: string;
  currency: string;
  balance: number;
  available_balance: number;
  pending_balance: number;
  created_at: string;
  updated_at: string;
}

export interface CryptoPurchase {
  id: string;
  user_id: string;
  fiat_amount: number;
  fiat_currency: string;
  crypto_amount: number;
  crypto_symbol: string;
  crypto_token_address: string;
  exchange_rate: number;
  stripe_payment_intent_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  fees: number;
  created_at: string;
  completed_at?: string;
  metadata?: any;
}

export interface FiatTransaction {
  id: string;
  user_id: string;
  transaction_type: 'deposit' | 'withdrawal' | 'crypto_purchase' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference_id?: string;
  stripe_payment_intent_id?: string;
  description?: string;
  created_at: string;
  completed_at?: string;
  metadata?: any;
}
