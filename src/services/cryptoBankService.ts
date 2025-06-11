
import { supabase } from "@/integrations/supabase/client";

export interface BankAccount {
  id: string;
  user_id: string;
  account_type: 'checking' | 'savings' | 'term_deposit' | 'business';
  account_name: string;
  token_address: string;
  balance: number;
  interest_rate: number;
  is_active: boolean;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface BankTransaction {
  id: string;
  from_account_id?: string;
  to_account_id?: string;
  from_address?: string;
  to_address?: string;
  amount: number;
  token_address: string;
  transaction_type: string;
  payment_method: 'transfer' | 'qr_code' | 'card' | 'recurring';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  transaction_hash?: string;
  fee_amount: number;
  exchange_rate: number;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface SavingsPlan {
  id: string;
  user_id: string;
  account_id: string;
  plan_name: string;
  target_amount: number;
  current_amount: number;
  monthly_deposit: number;
  auto_deposit_enabled: boolean;
  target_date?: string;
  apy_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VirtualCard {
  id: string;
  user_id: string;
  account_id: string;
  card_number: string;
  card_name: string;
  spending_limit: number;
  daily_limit: number;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export class CryptoBankService {
  private static instance: CryptoBankService;

  static getInstance(): CryptoBankService {
    if (!this.instance) {
      this.instance = new CryptoBankService();
    }
    return this.instance;
  }

  // Account Management
  async createBankAccount(accountData: Partial<BankAccount>): Promise<BankAccount> {
    const { data, error } = await supabase
      .from('crypto_bank_accounts')
      .insert([accountData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserBankAccounts(userId: string): Promise<BankAccount[]> {
    const { data, error } = await supabase
      .from('crypto_bank_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateAccountBalance(accountId: string, newBalance: number): Promise<void> {
    const { error } = await supabase
      .from('crypto_bank_accounts')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', accountId);

    if (error) throw error;
  }

  // Transaction Management
  async createTransaction(transactionData: Partial<BankTransaction>): Promise<BankTransaction> {
    const { data, error } = await supabase
      .from('bank_transactions')
      .insert([transactionData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserTransactions(userId: string, limit: number = 50): Promise<BankTransaction[]> {
    const { data, error } = await supabase
      .from('bank_transactions')
      .select(`
        *,
        from_account:crypto_bank_accounts!bank_transactions_from_account_id_fkey(account_name, token_address),
        to_account:crypto_bank_accounts!bank_transactions_to_account_id_fkey(account_name, token_address)
      `)
      .or(`from_account_id.in.(select id from crypto_bank_accounts where user_id = '${userId}'),to_account_id.in.(select id from crypto_bank_accounts where user_id = '${userId}')`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async processTransfer(fromAccountId: string, toAccountId: string, amount: number, description?: string): Promise<BankTransaction> {
    // Get account details
    const { data: fromAccount, error: fromError } = await supabase
      .from('crypto_bank_accounts')
      .select('*')
      .eq('id', fromAccountId)
      .single();

    if (fromError || !fromAccount) throw new Error('Compte source introuvable');

    const { data: toAccount, error: toError } = await supabase
      .from('crypto_bank_accounts')
      .select('*')
      .eq('id', toAccountId)
      .single();

    if (toError || !toAccount) throw new Error('Compte destinataire introuvable');

    // Check balance
    if (fromAccount.balance < amount) {
      throw new Error('Solde insuffisant');
    }

    // Create transaction
    const transaction = await this.createTransaction({
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      amount,
      token_address: fromAccount.token_address,
      transaction_type: 'transfer',
      payment_method: 'transfer',
      status: 'pending',
      description,
      fee_amount: 0,
      exchange_rate: 1
    });

    // Update balances
    await this.updateAccountBalance(fromAccountId, fromAccount.balance - amount);
    await this.updateAccountBalance(toAccountId, toAccount.balance + amount);

    // Update transaction status
    await supabase
      .from('bank_transactions')
      .update({ status: 'completed' })
      .eq('id', transaction.id);

    return transaction;
  }

  // Savings Plans
  async createSavingsPlan(planData: Partial<SavingsPlan>): Promise<SavingsPlan> {
    const { data, error } = await supabase
      .from('savings_plans')
      .insert([planData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserSavingsPlans(userId: string): Promise<SavingsPlan[]> {
    const { data, error } = await supabase
      .from('savings_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Virtual Cards
  async createVirtualCard(cardData: Partial<VirtualCard>): Promise<VirtualCard> {
    // Generate card number
    const cardNumber = this.generateCardNumber();
    
    const { data, error } = await supabase
      .from('virtual_cards')
      .insert([{ ...cardData, card_number: cardNumber }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserVirtualCards(userId: string): Promise<VirtualCard[]> {
    const { data, error } = await supabase
      .from('virtual_cards')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Payment Requests (QR Codes)
  async createPaymentRequest(amount: number, tokenAddress: string, description?: string): Promise<string> {
    const qrData = JSON.stringify({
      amount,
      token: tokenAddress,
      description,
      timestamp: Date.now()
    });

    const { data, error } = await supabase
      .from('payment_requests')
      .insert([{
        amount,
        token_address: tokenAddress,
        description,
        qr_code_data: qrData,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h expiry
      }])
      .select()
      .single();

    if (error) throw error;
    return data.qr_code_data;
  }

  // Helper Methods
  private generateCardNumber(): string {
    const prefix = '4000'; // Visa test prefix
    const middle = Math.random().toString().slice(2, 14);
    return `${prefix}${middle.padEnd(12, '0')}`;
  }

  // Analytics
  async getAccountAnalytics(userId: string): Promise<any> {
    const accounts = await this.getUserBankAccounts(userId);
    const transactions = await this.getUserTransactions(userId, 100);
    
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const monthlyIncome = transactions
      .filter(t => t.created_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .filter(t => t.to_account_id && accounts.some(a => a.id === t.to_account_id))
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = transactions
      .filter(t => t.created_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .filter(t => t.from_account_id && accounts.some(a => a.id === t.from_account_id))
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      accountsCount: accounts.length,
      savingsRate: monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0
    };
  }
}

export const cryptoBankService = CryptoBankService.getInstance();
