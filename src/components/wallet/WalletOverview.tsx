
import { StatsCard } from "@/components/ui/stats-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TrendingUp, Wallet as WalletIcon, Eye, ArrowUpDown } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletData";

interface WalletData {
  id: string;
  name: string;
  address: string;
  connected: boolean;
  icon: string;
  chainId: number;
}

interface WalletOverviewProps {
  wallets: WalletData[];
  assetsCount: number;
}

const WalletOverview = ({ wallets, assetsCount }: WalletOverviewProps) => {
  const connectedWallets = wallets.filter(w => w.connected);
  const primaryWallet = connectedWallets[0]; // Premier wallet connecté comme principal
  
  const { data: balanceData, isLoading: isLoadingBalance } = useWalletBalance(
    primaryWallet?.address || null,
    primaryWallet?.chainId || 1
  );

  // Calculer la valeur totale basée sur les données réelles
  const calculateTotalValue = () => {
    if (isLoadingBalance || !balanceData?.result) {
      return 0;
    }
    
    const ethBalance = balanceData.result.balance || 0;
    const ethPrice = 2500; // Prix ETH approximatif - dans une vraie app, on récupérerait le prix via une API
    return ethBalance * ethPrice;
  };

  const totalValue = calculateTotalValue();

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Valeur Totale"
        value={isLoadingBalance ? 
          "Chargement..." : 
          <AnimatedNumber value={totalValue} prefix="$" suffix="" className="text-3xl font-bold text-white" />
        }
        change={totalValue > 0 ? `+$${(totalValue * 0.033).toFixed(2)} (+3.3%)` : undefined}
        changeType="positive"
        icon={<TrendingUp className="h-6 w-6 text-green-400" />}
        variant="primary"
      />

      <StatsCard
        title="Portefeuilles"
        value={connectedWallets.length}
        icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
        variant="secondary"
      />

      <StatsCard
        title="Actifs"
        value={assetsCount}
        icon={<Eye className="h-6 w-6 text-purple-400" />}
        variant="accent"
      />

      <StatsCard
        title="Transactions"
        value="24h"
        change="+12"
        changeType="positive"
        icon={<ArrowUpDown className="h-6 w-6 text-pink-400" />}
      />
    </div>
  );
};

export { WalletOverview };
