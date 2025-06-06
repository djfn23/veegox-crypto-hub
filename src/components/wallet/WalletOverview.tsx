
import { StatsCard } from "@/components/ui/stats-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TrendingUp, Wallet as WalletIcon, Eye, ArrowUpDown } from "lucide-react";

interface WalletData {
  id: string;
  name: string;
  balance: string;
  usdValue: number;
  connected: boolean;
  icon: string;
}

interface WalletOverviewProps {
  wallets: WalletData[];
  assetsCount: number;
}

const WalletOverview = ({ wallets, assetsCount }: WalletOverviewProps) => {
  const totalValue = wallets.reduce((sum, wallet) => sum + wallet.usdValue, 0);

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Valeur Totale"
        value={<AnimatedNumber value={totalValue} prefix="$" suffix="" className="text-3xl font-bold text-white" />}
        change="+$425.50 (+3.3%)"
        changeType="positive"
        icon={<TrendingUp className="h-6 w-6 text-green-400" />}
        variant="primary"
      />

      <StatsCard
        title="Portefeuilles"
        value={wallets.filter(w => w.connected).length}
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
