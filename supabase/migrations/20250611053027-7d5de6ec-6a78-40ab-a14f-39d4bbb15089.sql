
-- Create enum types for banking functionality
CREATE TYPE public.account_type AS ENUM ('checking', 'savings', 'term_deposit', 'business');
CREATE TYPE public.transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
CREATE TYPE public.payment_method AS ENUM ('transfer', 'qr_code', 'card', 'recurring');

-- Create crypto bank accounts table
CREATE TABLE public.crypto_bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type account_type NOT NULL DEFAULT 'checking',
  account_name TEXT NOT NULL,
  token_address TEXT NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  interest_rate NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create savings plans table
CREATE TABLE public.savings_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.crypto_bank_accounts(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC DEFAULT 0,
  monthly_deposit NUMERIC DEFAULT 0,
  auto_deposit_enabled BOOLEAN DEFAULT false,
  target_date TIMESTAMP WITH TIME ZONE,
  apy_rate NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bank transactions table
CREATE TABLE public.bank_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_account_id UUID REFERENCES public.crypto_bank_accounts(id),
  to_account_id UUID REFERENCES public.crypto_bank_accounts(id),
  from_address TEXT,
  to_address TEXT,
  amount NUMERIC NOT NULL,
  token_address TEXT NOT NULL,
  transaction_type TEXT NOT NULL,
  payment_method payment_method DEFAULT 'transfer',
  status transaction_status DEFAULT 'pending',
  description TEXT,
  transaction_hash TEXT,
  fee_amount NUMERIC DEFAULT 0,
  exchange_rate NUMERIC DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create virtual cards table
CREATE TABLE public.virtual_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.crypto_bank_accounts(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL UNIQUE,
  card_name TEXT NOT NULL,
  spending_limit NUMERIC DEFAULT 1000,
  daily_limit NUMERIC DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recurring payments table
CREATE TABLE public.recurring_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_account_id UUID NOT NULL REFERENCES public.crypto_bank_accounts(id) ON DELETE CASCADE,
  to_address TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  token_address TEXT NOT NULL,
  frequency_days INTEGER NOT NULL DEFAULT 30,
  next_payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  total_payments INTEGER DEFAULT 0,
  max_payments INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment requests table (for QR codes)
CREATE TABLE public.payment_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  token_address TEXT NOT NULL,
  description TEXT,
  qr_code_data TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_used BOOLEAN DEFAULT false,
  paid_by UUID REFERENCES auth.users(id),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for crypto_bank_accounts
ALTER TABLE public.crypto_bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bank accounts"
  ON public.crypto_bank_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bank accounts"
  ON public.crypto_bank_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank accounts"
  ON public.crypto_bank_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add RLS policies for savings_plans
ALTER TABLE public.savings_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own savings plans"
  ON public.savings_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own savings plans"
  ON public.savings_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings plans"
  ON public.savings_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add RLS policies for bank_transactions
ALTER TABLE public.bank_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bank transactions"
  ON public.bank_transactions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.crypto_bank_accounts 
      WHERE id = bank_transactions.from_account_id AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.crypto_bank_accounts 
      WHERE id = bank_transactions.to_account_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bank transactions from their accounts"
  ON public.bank_transactions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.crypto_bank_accounts 
      WHERE id = bank_transactions.from_account_id AND user_id = auth.uid()
    )
  );

-- Add RLS policies for virtual_cards
ALTER TABLE public.virtual_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own virtual cards"
  ON public.virtual_cards
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own virtual cards"
  ON public.virtual_cards
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own virtual cards"
  ON public.virtual_cards
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add RLS policies for recurring_payments
ALTER TABLE public.recurring_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recurring payments"
  ON public.recurring_payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recurring payments"
  ON public.recurring_payments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recurring payments"
  ON public.recurring_payments
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add RLS policies for payment_requests
ALTER TABLE public.payment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view payment requests they created or paid"
  ON public.payment_requests
  FOR SELECT
  USING (auth.uid() = creator_id OR auth.uid() = paid_by);

CREATE POLICY "Users can create payment requests"
  ON public.payment_requests
  FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update payment requests they created"
  ON public.payment_requests
  FOR UPDATE
  USING (auth.uid() = creator_id);

-- Create indexes for better performance
CREATE INDEX idx_crypto_bank_accounts_user_id ON public.crypto_bank_accounts(user_id);
CREATE INDEX idx_savings_plans_user_id ON public.savings_plans(user_id);
CREATE INDEX idx_bank_transactions_from_account ON public.bank_transactions(from_account_id);
CREATE INDEX idx_bank_transactions_to_account ON public.bank_transactions(to_account_id);
CREATE INDEX idx_virtual_cards_user_id ON public.virtual_cards(user_id);
CREATE INDEX idx_recurring_payments_user_id ON public.recurring_payments(user_id);
CREATE INDEX idx_payment_requests_creator_id ON public.payment_requests(creator_id);

-- Create trigger for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_crypto_bank_accounts_updated_at
  BEFORE UPDATE ON public.crypto_bank_accounts
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_savings_plans_updated_at
  BEFORE UPDATE ON public.savings_plans
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bank_transactions_updated_at
  BEFORE UPDATE ON public.bank_transactions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
