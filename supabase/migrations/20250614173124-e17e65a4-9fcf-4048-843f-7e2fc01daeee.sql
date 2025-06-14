
-- Create fiat_balances table to track user fiat balances
CREATE TABLE public.fiat_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency TEXT NOT NULL DEFAULT 'EUR',
  balance NUMERIC NOT NULL DEFAULT 0,
  available_balance NUMERIC NOT NULL DEFAULT 0,
  pending_balance NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crypto_purchases table to track fiat to crypto purchases
CREATE TABLE public.crypto_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fiat_amount NUMERIC NOT NULL,
  fiat_currency TEXT NOT NULL DEFAULT 'EUR',
  crypto_amount NUMERIC NOT NULL,
  crypto_symbol TEXT NOT NULL,
  crypto_token_address TEXT NOT NULL,
  exchange_rate NUMERIC NOT NULL,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  fees NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- Create fiat_transactions table for fiat balance operations
CREATE TABLE public.fiat_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'crypto_purchase', 'refund')),
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  reference_id TEXT,
  stripe_payment_intent_id TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE public.fiat_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crypto_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fiat_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for fiat_balances
CREATE POLICY "Users can view their own fiat balances"
  ON public.fiat_balances
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own fiat balances"
  ON public.fiat_balances
  FOR ALL
  USING (auth.uid() = user_id);

-- Create policies for crypto_purchases
CREATE POLICY "Users can view their own crypto purchases"
  ON public.crypto_purchases
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own crypto purchases"
  ON public.crypto_purchases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crypto purchases"
  ON public.crypto_purchases
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for fiat_transactions
CREATE POLICY "Users can view their own fiat transactions"
  ON public.fiat_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own fiat transactions"
  ON public.fiat_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_fiat_balances_user_id ON public.fiat_balances(user_id);
CREATE INDEX idx_crypto_purchases_user_id ON public.crypto_purchases(user_id);
CREATE INDEX idx_crypto_purchases_status ON public.crypto_purchases(status);
CREATE INDEX idx_fiat_transactions_user_id ON public.fiat_transactions(user_id);
CREATE INDEX idx_fiat_transactions_type ON public.fiat_transactions(transaction_type);

-- Create trigger for updating updated_at timestamps
CREATE TRIGGER update_fiat_balances_updated_at
  BEFORE UPDATE ON public.fiat_balances
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert default EUR balance for existing users (optional)
INSERT INTO public.fiat_balances (user_id, currency, balance, available_balance)
SELECT id, 'EUR', 0, 0 
FROM auth.users 
ON CONFLICT DO NOTHING;
