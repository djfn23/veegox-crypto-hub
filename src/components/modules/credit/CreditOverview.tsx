
import CreditScoreCard from "./CreditScoreCard";
import LoanCalculator from "./LoanCalculator";
import { useCreditScore, useUserWallet, useLoanSubmission, useCreditModuleState } from "@/hooks/useCreditModule";

const CreditOverview = () => {
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

  return (
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
  );
};

export default CreditOverview;
