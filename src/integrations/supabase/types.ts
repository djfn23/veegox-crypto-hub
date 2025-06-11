export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_recommendations: {
        Row: {
          acted_upon: boolean | null
          asset_address: string
          confidence_score: number
          created_at: string
          expiry_at: string | null
          id: string
          rationale: string
          recommendation_type: string
          user_id: string
        }
        Insert: {
          acted_upon?: boolean | null
          asset_address: string
          confidence_score: number
          created_at?: string
          expiry_at?: string | null
          id?: string
          rationale: string
          recommendation_type: string
          user_id: string
        }
        Update: {
          acted_upon?: boolean | null
          asset_address?: string
          confidence_score?: number
          created_at?: string
          expiry_at?: string | null
          id?: string
          rationale?: string
          recommendation_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          exchange_rate: number | null
          fee_amount: number | null
          from_account_id: string | null
          from_address: string | null
          id: string
          metadata: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          to_account_id: string | null
          to_address: string | null
          token_address: string
          transaction_hash: string | null
          transaction_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          exchange_rate?: number | null
          fee_amount?: number | null
          from_account_id?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          to_account_id?: string | null
          to_address?: string | null
          token_address: string
          transaction_hash?: string | null
          transaction_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          exchange_rate?: number | null
          fee_amount?: number | null
          from_account_id?: string | null
          from_address?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          to_account_id?: string | null
          to_address?: string | null
          token_address?: string
          transaction_hash?: string | null
          transaction_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_transactions_from_account_id_fkey"
            columns: ["from_account_id"]
            isOneToOne: false
            referencedRelation: "crypto_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_transactions_to_account_id_fkey"
            columns: ["to_account_id"]
            isOneToOne: false
            referencedRelation: "crypto_bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      bridge_transactions: {
        Row: {
          actual_time: number | null
          amount: number
          bridge_fee: number
          completed_at: string | null
          created_at: string
          destination_chain_id: number
          destination_token_address: string
          destination_tx_hash: string | null
          estimated_time: number | null
          id: string
          source_chain_id: number
          source_token_address: string
          source_tx_hash: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          actual_time?: number | null
          amount: number
          bridge_fee: number
          completed_at?: string | null
          created_at?: string
          destination_chain_id: number
          destination_token_address: string
          destination_tx_hash?: string | null
          estimated_time?: number | null
          id?: string
          source_chain_id: number
          source_token_address: string
          source_tx_hash?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          actual_time?: number | null
          amount?: number
          bridge_fee?: number
          completed_at?: string | null
          created_at?: string
          destination_chain_id?: number
          destination_token_address?: string
          destination_tx_hash?: string | null
          estimated_time?: number | null
          id?: string
          source_chain_id?: number
          source_token_address?: string
          source_tx_hash?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      collection_stats: {
        Row: {
          avg_price: number | null
          contract_address: string
          floor_price: number | null
          id: string
          last_updated: string
          market_cap: number | null
          total_sales: number | null
          total_volume: number | null
          unique_owners: number | null
          volume_24h: number | null
          volume_30d: number | null
          volume_7d: number | null
        }
        Insert: {
          avg_price?: number | null
          contract_address: string
          floor_price?: number | null
          id?: string
          last_updated?: string
          market_cap?: number | null
          total_sales?: number | null
          total_volume?: number | null
          unique_owners?: number | null
          volume_24h?: number | null
          volume_30d?: number | null
          volume_7d?: number | null
        }
        Update: {
          avg_price?: number | null
          contract_address?: string
          floor_price?: number | null
          id?: string
          last_updated?: string
          market_cap?: number | null
          total_sales?: number | null
          total_volume?: number | null
          unique_owners?: number | null
          volume_24h?: number | null
          volume_30d?: number | null
          volume_7d?: number | null
        }
        Relationships: []
      }
      credit_scores: {
        Row: {
          calculation_version: string | null
          factors: Json | null
          id: string
          last_calculated: string | null
          score: number | null
          user_id: string
          wallet_address: string
        }
        Insert: {
          calculation_version?: string | null
          factors?: Json | null
          id?: string
          last_calculated?: string | null
          score?: number | null
          user_id: string
          wallet_address: string
        }
        Update: {
          calculation_version?: string | null
          factors?: Json | null
          id?: string
          last_calculated?: string | null
          score?: number | null
          user_id?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crowdfunding_campaigns: {
        Row: {
          banner_image_url: string | null
          category: string | null
          created_at: string | null
          creator_id: string
          current_amount: number
          description: string
          end_date: string
          id: string
          reward_token_address: string | null
          start_date: string
          status: string
          target_amount: number
          title: string
          token_address: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          banner_image_url?: string | null
          category?: string | null
          created_at?: string | null
          creator_id: string
          current_amount?: number
          description: string
          end_date: string
          id?: string
          reward_token_address?: string | null
          start_date?: string
          status?: string
          target_amount: number
          title: string
          token_address?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          banner_image_url?: string | null
          category?: string | null
          created_at?: string | null
          creator_id?: string
          current_amount?: number
          description?: string
          end_date?: string
          id?: string
          reward_token_address?: string | null
          start_date?: string
          status?: string
          target_amount?: number
          title?: string
          token_address?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crowdfunding_campaigns_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crowdfunding_contributions: {
        Row: {
          amount: number
          campaign_id: string
          contribution_date: string
          contributor_id: string
          id: string
          reward_claimed: boolean | null
          reward_claimed_at: string | null
          token_address: string
          transaction_hash: string | null
        }
        Insert: {
          amount: number
          campaign_id: string
          contribution_date?: string
          contributor_id: string
          id?: string
          reward_claimed?: boolean | null
          reward_claimed_at?: string | null
          token_address: string
          transaction_hash?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string
          contribution_date?: string
          contributor_id?: string
          id?: string
          reward_claimed?: boolean | null
          reward_claimed_at?: string | null
          token_address?: string
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crowdfunding_contributions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "crowdfunding_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crowdfunding_contributions_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crypto_bank_accounts: {
        Row: {
          account_name: string
          account_type: Database["public"]["Enums"]["account_type"]
          balance: number
          created_at: string
          id: string
          interest_rate: number | null
          is_active: boolean | null
          is_primary: boolean | null
          token_address: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_type?: Database["public"]["Enums"]["account_type"]
          balance?: number
          created_at?: string
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          is_primary?: boolean | null
          token_address: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          balance?: number
          created_at?: string
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          is_primary?: boolean | null
          token_address?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dao_proposals: {
        Row: {
          created_at: string | null
          description: string
          executed_at: string | null
          execution_data: Json | null
          id: string
          proposal_type: string
          proposer_id: string
          quorum_required: number | null
          status: Database["public"]["Enums"]["proposal_status"] | null
          title: string
          total_votes: number | null
          votes_against: number | null
          votes_for: number | null
          voting_ends_at: string
          voting_starts_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          executed_at?: string | null
          execution_data?: Json | null
          id?: string
          proposal_type: string
          proposer_id: string
          quorum_required?: number | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          title: string
          total_votes?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_ends_at: string
          voting_starts_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          executed_at?: string | null
          execution_data?: Json | null
          id?: string
          proposal_type?: string
          proposer_id?: string
          quorum_required?: number | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          title?: string
          total_votes?: number | null
          votes_against?: number | null
          votes_for?: number | null
          voting_ends_at?: string
          voting_starts_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dao_proposals_proposer_id_fkey"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dao_votes: {
        Row: {
          id: string
          proposal_id: string
          vote_choice: boolean
          vote_power: number
          voted_at: string | null
          voter_id: string
        }
        Insert: {
          id?: string
          proposal_id: string
          vote_choice: boolean
          vote_power: number
          voted_at?: string | null
          voter_id: string
        }
        Update: {
          id?: string
          proposal_id?: string
          vote_choice?: boolean
          vote_power?: number
          voted_at?: string | null
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dao_votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "dao_proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dao_votes_voter_id_fkey"
            columns: ["voter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exchange_transactions: {
        Row: {
          amount_in: number
          amount_out: number
          created_at: string | null
          id: string
          pool_id: string
          status: string
          token_in_address: string
          token_out_address: string
          transaction_hash: string | null
          user_id: string
        }
        Insert: {
          amount_in: number
          amount_out: number
          created_at?: string | null
          id?: string
          pool_id: string
          status?: string
          token_in_address: string
          token_out_address: string
          transaction_hash?: string | null
          user_id: string
        }
        Update: {
          amount_in?: number
          amount_out?: number
          created_at?: string | null
          id?: string
          pool_id?: string
          status?: string
          token_in_address?: string
          token_out_address?: string
          transaction_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exchange_transactions_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "liquidity_pools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exchange_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          posts_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          posts_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          posts_count?: number | null
        }
        Relationships: []
      }
      forum_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          post_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          post_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          category: string
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          likes_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          category: string
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_policies: {
        Row: {
          claim_amount: number | null
          coverage_amount: number
          created_at: string
          end_date: string
          id: string
          policy_holder_id: string
          policy_type: string
          premium_amount: number
          protocol_address: string | null
          start_date: string
          status: string | null
        }
        Insert: {
          claim_amount?: number | null
          coverage_amount: number
          created_at?: string
          end_date: string
          id?: string
          policy_holder_id: string
          policy_type: string
          premium_amount: number
          protocol_address?: string | null
          start_date: string
          status?: string | null
        }
        Update: {
          claim_amount?: number | null
          coverage_amount?: number
          created_at?: string
          end_date?: string
          id?: string
          policy_holder_id?: string
          policy_type?: string
          premium_amount?: number
          protocol_address?: string | null
          start_date?: string
          status?: string | null
        }
        Relationships: []
      }
      lending_pools: {
        Row: {
          borrow_apy: number
          collateral_factor: number | null
          created_at: string
          id: string
          is_active: boolean | null
          liquidation_threshold: number | null
          name: string
          reserve_factor: number | null
          supply_apy: number
          token_address: string
          total_borrowed: number | null
          total_supplied: number | null
          utilization_rate: number | null
        }
        Insert: {
          borrow_apy: number
          collateral_factor?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          liquidation_threshold?: number | null
          name: string
          reserve_factor?: number | null
          supply_apy: number
          token_address: string
          total_borrowed?: number | null
          total_supplied?: number | null
          utilization_rate?: number | null
        }
        Update: {
          borrow_apy?: number
          collateral_factor?: number | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          liquidation_threshold?: number | null
          name?: string
          reserve_factor?: number | null
          supply_apy?: number
          token_address?: string
          total_borrowed?: number | null
          total_supplied?: number | null
          utilization_rate?: number | null
        }
        Relationships: []
      }
      liquidity_pools: {
        Row: {
          created_at: string | null
          creator_id: string | null
          fee_percentage: number
          id: string
          is_active: boolean | null
          token_a_address: string
          token_a_amount: number
          token_b_address: string
          token_b_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          token_a_address: string
          token_a_amount?: number
          token_b_address: string
          token_b_amount?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          token_a_address?: string
          token_a_amount?: number
          token_b_address?: string
          token_b_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "liquidity_pools_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_requests: {
        Row: {
          approved_at: string | null
          borrower_id: string
          collateral_amount: number
          collateral_token_address: string
          created_at: string
          duration_days: number
          funded_at: string | null
          id: string
          interest_rate: number
          pool_id: string
          requested_amount: number
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          borrower_id: string
          collateral_amount: number
          collateral_token_address: string
          created_at?: string
          duration_days: number
          funded_at?: string | null
          id?: string
          interest_rate: number
          pool_id: string
          requested_amount: number
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          borrower_id?: string
          collateral_amount?: number
          collateral_token_address?: string
          created_at?: string
          duration_days?: number
          funded_at?: string | null
          id?: string
          interest_rate?: number
          pool_id?: string
          requested_amount?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_requests_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "lending_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          borrower_id: string
          chain_id: number
          collateral_amount: number
          collateral_token_address: string
          created_at: string | null
          due_date: string | null
          id: string
          interest_rate: number
          liquidated_at: string | null
          liquidation_threshold: number
          loan_amount: number
          loan_token_address: string
          ltv_ratio: number
          repaid_amount: number | null
          status: Database["public"]["Enums"]["loan_status"] | null
        }
        Insert: {
          borrower_id: string
          chain_id: number
          collateral_amount: number
          collateral_token_address: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          interest_rate: number
          liquidated_at?: string | null
          liquidation_threshold: number
          loan_amount: number
          loan_token_address: string
          ltv_ratio: number
          repaid_amount?: number | null
          status?: Database["public"]["Enums"]["loan_status"] | null
        }
        Update: {
          borrower_id?: string
          chain_id?: number
          collateral_amount?: number
          collateral_token_address?: string
          created_at?: string | null
          due_date?: string | null
          id?: string
          interest_rate?: number
          liquidated_at?: string | null
          liquidation_threshold?: number
          loan_amount?: number
          loan_token_address?: string
          ltv_ratio?: number
          repaid_amount?: number | null
          status?: Database["public"]["Enums"]["loan_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_analysis: {
        Row: {
          category: string
          id: string
          last_updated: string
          metric_name: string
          metric_value: number
          source: string | null
          trend_percentage: number | null
        }
        Insert: {
          category: string
          id?: string
          last_updated?: string
          metric_name: string
          metric_value: number
          source?: string | null
          trend_percentage?: number | null
        }
        Update: {
          category?: string
          id?: string
          last_updated?: string
          metric_name?: string
          metric_value?: number
          source?: string | null
          trend_percentage?: number | null
        }
        Relationships: []
      }
      marketplace_fees: {
        Row: {
          created_at: string
          fee_percentage: number
          id: string
          is_active: boolean | null
          maximum_fee: number | null
          minimum_fee: number | null
          transaction_type: string
        }
        Insert: {
          created_at?: string
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          maximum_fee?: number | null
          minimum_fee?: number | null
          transaction_type: string
        }
        Update: {
          created_at?: string
          fee_percentage?: number
          id?: string
          is_active?: boolean | null
          maximum_fee?: number | null
          minimum_fee?: number | null
          transaction_type?: string
        }
        Relationships: []
      }
      nft_collections_metadata: {
        Row: {
          banner_url: string | null
          chain_id: number
          contract_address: string
          created_at: string
          description: string | null
          discord_url: string | null
          floor_price: number | null
          id: string
          image_url: string | null
          is_verified: boolean | null
          metadata: Json | null
          name: string
          owners_count: number | null
          total_supply: number | null
          total_volume: number | null
          twitter_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          banner_url?: string | null
          chain_id?: number
          contract_address: string
          created_at?: string
          description?: string | null
          discord_url?: string | null
          floor_price?: number | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          metadata?: Json | null
          name: string
          owners_count?: number | null
          total_supply?: number | null
          total_volume?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          banner_url?: string | null
          chain_id?: number
          contract_address?: string
          created_at?: string
          description?: string | null
          discord_url?: string | null
          floor_price?: number | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          metadata?: Json | null
          name?: string
          owners_count?: number | null
          total_supply?: number | null
          total_volume?: number | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      nft_favorites: {
        Row: {
          contract_address: string
          created_at: string
          id: string
          token_id: string
          user_id: string
        }
        Insert: {
          contract_address: string
          created_at?: string
          id?: string
          token_id: string
          user_id: string
        }
        Update: {
          contract_address?: string
          created_at?: string
          id?: string
          token_id?: string
          user_id?: string
        }
        Relationships: []
      }
      nft_listings: {
        Row: {
          chain_id: number
          contract_address: string
          created_at: string
          currency_address: string
          expires_at: string | null
          id: string
          metadata: Json | null
          price: number
          seller_id: string
          status: string
          token_id: string
          updated_at: string
        }
        Insert: {
          chain_id?: number
          contract_address: string
          created_at?: string
          currency_address?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          price: number
          seller_id: string
          status?: string
          token_id: string
          updated_at?: string
        }
        Update: {
          chain_id?: number
          contract_address?: string
          created_at?: string
          currency_address?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          price?: number
          seller_id?: string
          status?: string
          token_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      nft_offers: {
        Row: {
          buyer_id: string
          created_at: string
          currency_address: string
          expires_at: string
          id: string
          listing_id: string | null
          offer_price: number
          status: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          currency_address?: string
          expires_at: string
          id?: string
          listing_id?: string | null
          offer_price: number
          status?: string
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          currency_address?: string
          expires_at?: string
          id?: string
          listing_id?: string | null
          offer_price?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nft_offers_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "nft_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_price_history: {
        Row: {
          block_number: number | null
          contract_address: string
          currency_address: string
          id: string
          price: number
          timestamp: string
          token_id: string
          transaction_hash: string | null
        }
        Insert: {
          block_number?: number | null
          contract_address: string
          currency_address?: string
          id?: string
          price: number
          timestamp?: string
          token_id: string
          transaction_hash?: string | null
        }
        Update: {
          block_number?: number | null
          contract_address?: string
          currency_address?: string
          id?: string
          price?: number
          timestamp?: string
          token_id?: string
          transaction_hash?: string | null
        }
        Relationships: []
      }
      nft_transactions: {
        Row: {
          buyer_id: string
          chain_id: number
          contract_address: string
          created_at: string
          currency_address: string
          id: string
          metadata: Json | null
          price: number
          seller_id: string
          token_id: string
          transaction_hash: string | null
          transaction_type: string
        }
        Insert: {
          buyer_id: string
          chain_id?: number
          contract_address: string
          created_at?: string
          currency_address: string
          id?: string
          metadata?: Json | null
          price: number
          seller_id: string
          token_id: string
          transaction_hash?: string | null
          transaction_type?: string
        }
        Update: {
          buyer_id?: string
          chain_id?: number
          contract_address?: string
          created_at?: string
          currency_address?: string
          id?: string
          metadata?: Json | null
          price?: number
          seller_id?: string
          token_id?: string
          transaction_hash?: string | null
          transaction_type?: string
        }
        Relationships: []
      }
      payment_requests: {
        Row: {
          amount: number
          created_at: string
          creator_id: string
          description: string | null
          expires_at: string | null
          id: string
          is_used: boolean | null
          paid_at: string | null
          paid_by: string | null
          qr_code_data: string
          token_address: string
        }
        Insert: {
          amount: number
          created_at?: string
          creator_id: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_used?: boolean | null
          paid_at?: string | null
          paid_by?: string | null
          qr_code_data: string
          token_address: string
        }
        Update: {
          amount?: number
          created_at?: string
          creator_id?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_used?: boolean | null
          paid_at?: string | null
          paid_by?: string | null
          qr_code_data?: string
          token_address?: string
        }
        Relationships: []
      }
      platform_metrics: {
        Row: {
          category: string
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp: string
        }
        Insert: {
          category: string
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp?: string
        }
        Update: {
          category?: string
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          timestamp?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          twitter_handle: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          twitter_handle?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          twitter_handle?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      recurring_payments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          frequency_days: number
          from_account_id: string
          id: string
          is_active: boolean | null
          max_payments: number | null
          next_payment_date: string
          to_address: string
          token_address: string
          total_payments: number | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          frequency_days?: number
          from_account_id: string
          id?: string
          is_active?: boolean | null
          max_payments?: number | null
          next_payment_date: string
          to_address: string
          token_address: string
          total_payments?: number | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          frequency_days?: number
          from_account_id?: string
          id?: string
          is_active?: boolean | null
          max_payments?: number | null
          next_payment_date?: string
          to_address?: string
          token_address?: string
          total_payments?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recurring_payments_from_account_id_fkey"
            columns: ["from_account_id"]
            isOneToOne: false
            referencedRelation: "crypto_bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_system: {
        Row: {
          created_at: string
          id: string
          referee_id: string
          referral_code: string
          referrer_id: string
          reward_amount: number | null
          reward_token_address: string | null
          rewarded_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referee_id: string
          referral_code: string
          referrer_id: string
          reward_amount?: number | null
          reward_token_address?: string | null
          rewarded_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referee_id?: string
          referral_code?: string
          referrer_id?: string
          reward_amount?: number | null
          reward_token_address?: string | null
          rewarded_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      revenue_tracking: {
        Row: {
          amount: number
          currency: string
          description: string | null
          id: string
          revenue_type: string
          timestamp: string
          transaction_hash: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          currency: string
          description?: string | null
          id?: string
          revenue_type: string
          timestamp?: string
          transaction_hash?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          currency?: string
          description?: string | null
          id?: string
          revenue_type?: string
          timestamp?: string
          transaction_hash?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      savings_plans: {
        Row: {
          account_id: string
          apy_rate: number | null
          auto_deposit_enabled: boolean | null
          created_at: string
          current_amount: number | null
          id: string
          is_active: boolean | null
          monthly_deposit: number | null
          plan_name: string
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id: string
          apy_rate?: number | null
          auto_deposit_enabled?: boolean | null
          created_at?: string
          current_amount?: number | null
          id?: string
          is_active?: boolean | null
          monthly_deposit?: number | null
          plan_name: string
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string
          apy_rate?: number | null
          auto_deposit_enabled?: boolean | null
          created_at?: string
          current_amount?: number | null
          id?: string
          is_active?: boolean | null
          monthly_deposit?: number | null
          plan_name?: string
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_plans_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crypto_bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      staking_pools: {
        Row: {
          apy_rate: number
          chain_id: number
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          lock_period_days: number | null
          max_capacity: number | null
          min_stake_amount: number | null
          name: string
          token_address: string
          total_staked: number | null
        }
        Insert: {
          apy_rate: number
          chain_id: number
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          lock_period_days?: number | null
          max_capacity?: number | null
          min_stake_amount?: number | null
          name: string
          token_address: string
          total_staked?: number | null
        }
        Update: {
          apy_rate?: number
          chain_id?: number
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          lock_period_days?: number | null
          max_capacity?: number | null
          min_stake_amount?: number | null
          name?: string
          token_address?: string
          total_staked?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "staking_pools_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          chain_id: number
          chain_type: Database["public"]["Enums"]["chain_type"]
          contract_address: string | null
          created_at: string | null
          creator_id: string
          decimals: number | null
          description: string | null
          id: string
          is_deployed: boolean | null
          logo_url: string | null
          metadata_ipfs_hash: string | null
          name: string
          symbol: string
          token_type: Database["public"]["Enums"]["token_type"]
          total_supply: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          chain_id: number
          chain_type: Database["public"]["Enums"]["chain_type"]
          contract_address?: string | null
          created_at?: string | null
          creator_id: string
          decimals?: number | null
          description?: string | null
          id?: string
          is_deployed?: boolean | null
          logo_url?: string | null
          metadata_ipfs_hash?: string | null
          name: string
          symbol: string
          token_type: Database["public"]["Enums"]["token_type"]
          total_supply?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          chain_id?: number
          chain_type?: Database["public"]["Enums"]["chain_type"]
          contract_address?: string | null
          created_at?: string | null
          creator_id?: string
          decimals?: number | null
          description?: string | null
          id?: string
          is_deployed?: boolean | null
          logo_url?: string | null
          metadata_ipfs_hash?: string | null
          name?: string
          symbol?: string
          token_type?: Database["public"]["Enums"]["token_type"]
          total_supply?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tokens_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_history: {
        Row: {
          amount: number | null
          block_number: number | null
          chain_id: number
          from_address: string
          gas_fee: number | null
          id: string
          metadata: Json | null
          status: string | null
          timestamp: string | null
          to_address: string | null
          token_address: string | null
          tx_hash: string
          tx_type: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          block_number?: number | null
          chain_id: number
          from_address: string
          gas_fee?: number | null
          id?: string
          metadata?: Json | null
          status?: string | null
          timestamp?: string | null
          to_address?: string | null
          token_address?: string | null
          tx_hash: string
          tx_type: string
          user_id: string
        }
        Update: {
          amount?: number | null
          block_number?: number | null
          chain_id?: number
          from_address?: string
          gas_fee?: number | null
          id?: string
          metadata?: Json | null
          status?: string | null
          timestamp?: string | null
          to_address?: string | null
          token_address?: string | null
          tx_hash?: string
          tx_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          badge_image_url: string | null
          description: string | null
          id: string
          points_awarded: number | null
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          badge_image_url?: string | null
          description?: string | null
          id?: string
          points_awarded?: number | null
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          badge_image_url?: string | null
          description?: string | null
          id?: string
          points_awarded?: number | null
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          id: string
          ip_address: unknown | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_farm_positions: {
        Row: {
          amount_staked: number
          entry_timestamp: string
          farm_id: string
          id: string
          is_active: boolean | null
          last_harvest: string | null
          rewards_earned: number | null
          user_id: string
        }
        Insert: {
          amount_staked: number
          entry_timestamp?: string
          farm_id: string
          id?: string
          is_active?: boolean | null
          last_harvest?: string | null
          rewards_earned?: number | null
          user_id: string
        }
        Update: {
          amount_staked?: number
          entry_timestamp?: string
          farm_id?: string
          id?: string
          is_active?: boolean | null
          last_harvest?: string | null
          rewards_earned?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_farm_positions_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "yield_farms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          language: string | null
          notifications_enabled: boolean | null
          privacy_mode: boolean | null
          push_notifications: boolean | null
          theme: string | null
          two_factor_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          privacy_mode?: boolean | null
          push_notifications?: boolean | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          notifications_enabled?: boolean | null
          privacy_mode?: boolean | null
          push_notifications?: boolean | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_ratings: {
        Row: {
          created_at: string
          id: string
          rated_id: string
          rater_id: string
          rating: number | null
          review_text: string | null
          transaction_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          rated_id: string
          rater_id: string
          rating?: number | null
          review_text?: string | null
          transaction_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          rated_id?: string
          rater_id?: string
          rating?: number | null
          review_text?: string | null
          transaction_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_stakes: {
        Row: {
          amount: number
          id: string
          is_active: boolean | null
          last_reward_claim: string | null
          pool_id: string
          rewards_earned: number | null
          staked_at: string | null
          unlock_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          id?: string
          is_active?: boolean | null
          last_reward_claim?: string | null
          pool_id: string
          rewards_earned?: number | null
          staked_at?: string | null
          unlock_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          id?: string
          is_active?: boolean | null
          last_reward_claim?: string | null
          pool_id?: string
          rewards_earned?: number | null
          staked_at?: string | null
          unlock_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stakes_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "staking_pools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_stakes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_cards: {
        Row: {
          account_id: string
          card_name: string
          card_number: string
          created_at: string
          daily_limit: number | null
          expires_at: string
          id: string
          is_active: boolean | null
          spending_limit: number | null
          user_id: string
        }
        Insert: {
          account_id: string
          card_name: string
          card_number: string
          created_at?: string
          daily_limit?: number | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          spending_limit?: number | null
          user_id: string
        }
        Update: {
          account_id?: string
          card_name?: string
          card_number?: string
          created_at?: string
          daily_limit?: number | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          spending_limit?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "virtual_cards_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "crypto_bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          address: string
          chain_id: number
          chain_type: Database["public"]["Enums"]["chain_type"]
          created_at: string | null
          id: string
          is_primary: boolean | null
          nickname: string | null
          user_id: string
        }
        Insert: {
          address: string
          chain_id: number
          chain_type: Database["public"]["Enums"]["chain_type"]
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          nickname?: string | null
          user_id: string
        }
        Update: {
          address?: string
          chain_id?: number
          chain_type?: Database["public"]["Enums"]["chain_type"]
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          nickname?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      yield_farms: {
        Row: {
          apy_rate: number
          created_at: string
          end_block: number | null
          id: string
          is_active: boolean | null
          name: string
          pool_address: string | null
          reward_per_block: number
          reward_token_address: string
          start_block: number | null
          token_a_address: string
          token_b_address: string
          total_staked: number | null
        }
        Insert: {
          apy_rate: number
          created_at?: string
          end_block?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          pool_address?: string | null
          reward_per_block: number
          reward_token_address: string
          start_block?: number | null
          token_a_address: string
          token_b_address: string
          total_staked?: number | null
        }
        Update: {
          apy_rate?: number
          created_at?: string
          end_block?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          pool_address?: string | null
          reward_per_block?: number
          reward_token_address?: string
          start_block?: number | null
          token_a_address?: string
          token_b_address?: string
          total_staked?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      account_type: "checking" | "savings" | "term_deposit" | "business"
      app_role: "admin" | "developer" | "user"
      chain_type: "ethereum" | "polygon" | "base" | "arbitrum"
      loan_status: "pending" | "active" | "repaid" | "defaulted"
      payment_method: "transfer" | "qr_code" | "card" | "recurring"
      proposal_status: "active" | "passed" | "rejected" | "executed"
      token_type: "ERC20" | "ERC721" | "ERC1155"
      transaction_status: "pending" | "completed" | "failed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["checking", "savings", "term_deposit", "business"],
      app_role: ["admin", "developer", "user"],
      chain_type: ["ethereum", "polygon", "base", "arbitrum"],
      loan_status: ["pending", "active", "repaid", "defaulted"],
      payment_method: ["transfer", "qr_code", "card", "recurring"],
      proposal_status: ["active", "passed", "rejected", "executed"],
      token_type: ["ERC20", "ERC721", "ERC1155"],
      transaction_status: ["pending", "completed", "failed", "cancelled"],
    },
  },
} as const
