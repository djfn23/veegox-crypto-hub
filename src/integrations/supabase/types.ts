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
      app_role: "admin" | "developer" | "user"
      chain_type: "ethereum" | "polygon" | "base" | "arbitrum"
      loan_status: "pending" | "active" | "repaid" | "defaulted"
      proposal_status: "active" | "passed" | "rejected" | "executed"
      token_type: "ERC20" | "ERC721" | "ERC1155"
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
      app_role: ["admin", "developer", "user"],
      chain_type: ["ethereum", "polygon", "base", "arbitrum"],
      loan_status: ["pending", "active", "repaid", "defaulted"],
      proposal_status: ["active", "passed", "rejected", "executed"],
      token_type: ["ERC20", "ERC721", "ERC1155"],
    },
  },
} as const
