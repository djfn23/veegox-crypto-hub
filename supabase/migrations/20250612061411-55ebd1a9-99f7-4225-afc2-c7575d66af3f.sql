
-- Créer une table pour les transactions de swap
CREATE TABLE public.swap_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  from_token_address TEXT NOT NULL,
  to_token_address TEXT NOT NULL,
  from_amount NUMERIC NOT NULL,
  to_amount NUMERIC NOT NULL,
  exchange_rate NUMERIC NOT NULL,
  slippage_tolerance NUMERIC DEFAULT 1,
  transaction_hash TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  gas_fee NUMERIC,
  protocol_used TEXT DEFAULT '1inch'
);

-- Créer une table pour le portfolio utilisateur
CREATE TABLE public.user_portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  token_name TEXT NOT NULL,
  balance NUMERIC NOT NULL DEFAULT 0,
  average_buy_price NUMERIC,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, token_address)
);

-- Créer une table pour les prix de tokens en cache
CREATE TABLE public.token_prices_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_address TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  price_usd NUMERIC NOT NULL,
  price_change_24h NUMERIC,
  market_cap NUMERIC,
  volume_24h NUMERIC,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(token_address)
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.swap_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_prices_cache ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour swap_transactions
CREATE POLICY "Users can view their own swap transactions" 
  ON public.swap_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own swap transactions" 
  ON public.swap_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own swap transactions" 
  ON public.swap_transactions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Politiques RLS pour user_portfolios
CREATE POLICY "Users can view their own portfolio" 
  ON public.user_portfolios 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own portfolio" 
  ON public.user_portfolios 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Politiques RLS pour token_prices_cache (lecture publique)
CREATE POLICY "Anyone can view token prices" 
  ON public.token_prices_cache 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Only authenticated users can update token prices" 
  ON public.token_prices_cache 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Créer des index pour optimiser les requêtes
CREATE INDEX idx_swap_transactions_user_id ON public.swap_transactions(user_id);
CREATE INDEX idx_swap_transactions_status ON public.swap_transactions(status);
CREATE INDEX idx_user_portfolios_user_id ON public.user_portfolios(user_id);
CREATE INDEX idx_token_prices_symbol ON public.token_prices_cache(token_symbol);
