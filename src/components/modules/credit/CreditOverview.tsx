
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
      <Card className="mx-4 lg:mx-0">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-white">Authentification requise</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed px-4">
              Connectez-vous pour accéder au module de crédit et gérer vos prêts DeFi.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 px-4 lg:px-0">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <CreditScoreCard 
            creditScore={creditScore}
            userWallet={userWallet}
            isLoadingScore={isLoadingScore}
          />
        </div>
        
        <div className="xl:col-span-2">
          <LoanCalculator 
            loanData={loanData}
            setLoanData={setLoanData}
            creditScore={creditScore}
            onSubmitLoan={handleSubmitLoan}
            isSubmitting={loanMutation.isPending}
          />
        </div>
      </div>
      
      <WalletManager />
    </div>
  );
};

export default CreditOverview;
