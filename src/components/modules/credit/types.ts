
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
  factors?: Record<string, any> | null;
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

export interface CrowdfundingCampaign {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  token_address?: string;
  reward_token_address?: string;
  start_date: string;
  end_date: string;
  status: string;
  banner_image_url?: string;
  website_url?: string;
  category?: string;
}

export interface CrowdfundingContribution {
  id: string;
  campaign_id: string;
  contributor_id: string;
  amount: number;
  token_address: string;
  transaction_hash?: string;
  contribution_date: string;
  reward_claimed?: boolean;
  reward_claimed_at?: string;
}

export interface MarketAnalysis {
  id: string;
  category: string;
  metric_name: string;
  metric_value: number;
  trend_percentage?: number;
  source?: string;
  last_updated: string;
}

export interface AIRecommendation {
  id: string;
  user_id: string;
  asset_address: string;
  recommendation_type: string;
  confidence_score: number;
  rationale: string;
  created_at: string;
  expiry_at?: string;
  acted_upon?: boolean;
}

export interface LiquidityPool {
  id: string;
  token_a_address: string;
  token_b_address: string;
  token_a_amount: number;
  token_b_amount: number;
  fee_percentage: number;
  creator_id?: string;
  is_active?: boolean;
}

export interface ExchangeTransaction {
  id: string;
  user_id: string;
  pool_id: string;
  token_in_address: string;
  token_out_address: string;
  amount_in: number;
  amount_out: number;
  transaction_hash?: string;
  status: string;
}

export interface ForumPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
}

export interface ForumComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  likes_count?: number;
}
