
import { Button } from "@/components/ui/button";
import { Wallet } from "../credit/types";

interface SwapButtonProps {
  userWallet: Wallet | null;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  isPending: boolean;
  onClick: () => void;
}

export default function SwapButton({ 
  userWallet, 
  tokenIn, 
  tokenOut, 
  amountIn, 
  isPending, 
  onClick 
}: SwapButtonProps) {
  const isDisabled = !tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0 || isPending || !userWallet;

  const getButtonText = () => {
    if (!userWallet) return "Connectez votre portefeuille";
    if (isPending) return "Traitement...";
    return "Échanger";
  };

  return (
    <Button 
      className="w-full" 
      onClick={onClick}
      disabled={isDisabled}
    >
      {getButtonText()}
    </Button>
  );
}
