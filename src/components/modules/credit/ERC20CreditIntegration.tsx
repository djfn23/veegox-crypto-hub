
import { useMainContractInfo, useUserContractBalance } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet, CreditCard } from "lucide-react";

export const ERC20CreditIntegration = () => {
  console.log('ERC20CreditIntegration: Component mounting');

  const { connectedWallet } = useWeb3Wallet();
  const { data: contractInfo, error: contractError } = useMainContractInfo();
  const { data: userBalance, error: balanceError } = useUserContractBalance(connectedWallet?.address || null);

  console.log('ERC20CreditIntegration: Contract data:', contractInfo);
  console.log('ERC20CreditIntegration: User balance data:', userBalance);

  if (contractError) {
    console.error('ERC20CreditIntegration: Contract error:', contractError);
  }

  if (balanceError) {
    console.error('ERC20CreditIntegration: Balance error:', balanceError);
  }

  // Accès sécurisé aux données via result
  const tokenInfo = contractInfo?.result?.tokenInfo;
  const balance = userBalance?.result || "0";
  
  const formatBalance = (balance: string) => {
    if (!balance) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Intégration Crédit ERC20
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">Balance du Contrat</p>
          <p className="text-green-500 font-semibold">
            {formatBalance(balance)} {tokenInfo?.symbol}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-400">APY Estimé</p>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <TrendingUp className="mr-1 h-3 w-3" />
            12.5%
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-gray-400">Eligibilité au Crédit</p>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Eligible
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
