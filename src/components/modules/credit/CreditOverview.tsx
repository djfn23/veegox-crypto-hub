
import CreditScoreCard from "./CreditScoreCard";
import LoanCalculator from "./LoanCalculator";
import { WalletManager } from "@/components/wallet/WalletManager";
import { useCreditScore, useUserWallet, useLoanSubmission, useCreditModuleState } from "@/hooks/useCreditModule";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

const CreditOverview = () => {
  const { isAuthenticated } = useAuth();
  const { data: creditScore, isLoading: isLoadingScore } = useCreditScore();
  const { data: userWallet } = useUserWallet();
  const { loanData, setLoanData, resetLoanData } = useCreditModuleState();
  const loanMutation = useLoanSubmission();

  const handleSubmitLoan = () => {
    loanMutation.mutate(loanData, {
      onSuccess: () => {
        resetLoanData();
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">Authentification requise</h3>
            <p className="text-gray-400">
              Connectez-vous pour accéder au module de crédit et gérer vos prêts DeFi.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
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
      
      <WalletManager />
    </div>
  );
};

export default CreditOverview;
