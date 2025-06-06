
export interface LoanData {
  collateral_token_address: string;
  collateral_amount: string;
  loan_token_address: string;
  loan_amount: string;
  duration: string;
}

export interface CreditScore {
  score: number;
  last_calculated: string;
  factors?: Record<string, any>;
}

export interface Loan {
  id: string;
  status: string;
  loan_amount: number;
  interest_rate: number;
  ltv_ratio: number;
  collateral_amount: number;
  due_date: string;
  repaid_amount?: number;
}

export interface Wallet {
  address: string;
  is_primary: boolean;
}
