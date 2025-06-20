import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoanData, CreditScore, Loan, Wallet } from "@/components/modules/credit/types";
import { calculateLTV } from "@/components/modules/credit/utils";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";

export const useCreditScore = () => {
  const { user } = useUnifiedAuth();
  
  return useQuery({
    queryKey: ['credit-score', user?.id],
    queryFn: async (): Promise<CreditScore | null> => {
      if (!user) return null;

      const { data } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!data) return null;

      return {
        score: data.score || 0,
        last_calculated: data.last_calculated || '',
        factors: data.factors as Record<string, any> || null
      };
    },
    enabled: !!user,
  });
};

export const useUserLoans = () => {
  const { user } = useUnifiedAuth();
  
  return useQuery({
    queryKey: ['user-loans', user?.id],
    queryFn: async (): Promise<Loan[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('borrower_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};

export const useUserWallet = () => {
  const { user } = useUnifiedAuth();
  
  return useQuery({
    queryKey: ['user-primary-wallet', user?.id],
    queryFn: async (): Promise<Wallet | null> => {
      if (!user) return null;

      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_primary', true)
        .maybeSingle();

      return data;
    },
    enabled: !!user,
  });
};

export const useLoanSubmission = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanData: LoanData) => {
      if (!user) throw new Error("Non authentifié");

      // Get the current credit score for interest rate calculation
      const { data: creditScoreData } = await supabase
        .from('credit_scores')
        .select('score')
        .eq('user_id', user.id)
        .maybeSingle();

      const creditScore = creditScoreData?.score || 0;
      const ltv = calculateLTV(loanData.collateral_amount, loanData.loan_amount);
      const interestRate = creditScore ? Math.max(5, 15 - (creditScore / 100)) : 12;

      const { data, error } = await supabase
        .from('loans')
        .insert({
          borrower_id: user.id,
          collateral_token_address: loanData.collateral_token_address,
          collateral_amount: parseFloat(loanData.collateral_amount),
          loan_token_address: loanData.loan_token_address,
          loan_amount: parseFloat(loanData.loan_amount),
          interest_rate: interestRate,
          ltv_ratio: ltv,
          liquidation_threshold: 75,
          chain_id: 137,
          due_date: new Date(Date.now() + parseInt(loanData.duration) * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-loans'] });
      toast.success("Demande de prêt soumise avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la demande de prêt");
    },
  });
};

export const useCreditModuleState = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    collateral_token_address: "",
    collateral_amount: "",
    loan_token_address: "",
    loan_amount: "",
    duration: "30"
  });

  const resetLoanData = () => {
    setLoanData({
      collateral_token_address: "",
      collateral_amount: "",
      loan_token_address: "",
      loan_amount: "",
      duration: "30"
    });
  };

  return {
    loanData,
    setLoanData,
    resetLoanData
  };
};

// New hook for calculating credit score
export const useCreditScoreCalculation = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (walletAddress: string) => {
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase.functions.invoke('calculateCreditScore', {
        body: { walletAddress, userId: user.id }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-score'] });
      toast.success("Score de crédit calculé avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du calcul du score");
    },
  });
};
