
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CreditScoreCard from "./credit/CreditScoreCard";
import LoanCalculator from "./credit/LoanCalculator";
import LoansList from "./credit/LoansList";
import { LoanData, CreditScore, Loan, Wallet } from "./credit/types";
import { calculateLTV } from "./credit/utils";

const CreditModule = () => {
  const [loanData, setLoanData] = useState<LoanData>({
    collateral_token_address: "",
    collateral_amount: "",
    loan_token_address: "",
    loan_amount: "",
    duration: "30"
  });

  const queryClient = useQueryClient();

  // Obtenir le score de crédit actuel
  const { data: creditScore, isLoading: isLoadingScore } = useQuery({
    queryKey: ['credit-score'],
    queryFn: async (): Promise<CreditScore | null> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      return data;
    },
  });

  // Obtenir les prêts de l'utilisateur
  const { data: loans } = useQuery({
    queryKey: ['user-loans'],
    queryFn: async (): Promise<Loan[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('borrower_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Obtenir le portefeuille principal de l'utilisateur
  const { data: userWallet } = useQuery({
    queryKey: ['user-primary-wallet'],
    queryFn: async (): Promise<Wallet | null> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_primary', true)
        .maybeSingle();

      return data;
    },
  });

  const loanMutation = useMutation({
    mutationFn: async (loanData: LoanData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const ltv = calculateLTV(loanData.collateral_amount, loanData.loan_amount);
      const interestRate = creditScore?.score ? Math.max(5, 15 - (creditScore.score / 100)) : 12;

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
          chain_id: 1,
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
      setLoanData({
        collateral_token_address: "",
        collateral_amount: "",
        loan_token_address: "",
        loan_amount: "",
        duration: "30"
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la demande de prêt");
    },
  });

  const handleSubmitLoan = () => {
    loanMutation.mutate(loanData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Crédit</h2>
        <p className="text-gray-400">Prêts décentralisés avec scoring de crédit intelligent</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <CreditScoreCard 
          creditScore={creditScore}
          userWallet={userWallet}
          isLoadingScore={isLoadingScore}
        />
        
        <LoanCalculator 
          loanData={loanData}
          setLoanData={setLoanData}
          creditScore={creditScore}
          onSubmitLoan={handleSubmitLoan}
          isSubmitting={loanMutation.isPending}
        />
      </div>

      <LoansList loans={loans} />
    </div>
  );
};

export default CreditModule;
