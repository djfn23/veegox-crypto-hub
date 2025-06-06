
import { StatsCard } from "@/components/ui/stats-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TrendingUp, Wallet as WalletIcon, Eye, ArrowUpDown } from "lucide-react";
import { useWalletAssets, useTokenPrices } from "@/hooks/useTokenData";
import { useTransactionHistory } from "@/hooks/useWalletData";

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
}

const WalletOverview = ({ wallets }: WalletOverviewProps) => {
  const connectedWallets = wallets.filter(w => w.connected);
  const primaryWallet = connectedWallets[0];
  
  const { assets, isLoading } = useWalletAssets(
    primaryWallet?.address || null,
    primaryWallet?.chainId || 1
  );

  const { data: transactionsData } = useTransactionHistory(
    primaryWallet?.address || null,
    primaryWallet?.chainId || 1
  );

  const tokenAddresses = assets.tokens?.map((token: any) => token.address) || [];
  const { data: pricesData } = useTokenPrices(tokenAddresses, primaryWallet?.chainId || 1);

  // Calculer la valeur totale du portfolio
  const calculateTotalValue = () => {
    if (isLoading || !assets) return 0;
    
    let total = 0;
    
    // ETH balance
    const ethPrice = pricesData?.result?.find((p: any) => p.symbol === 'ETH')?.price || 2500;
    total += assets.ethBalance * ethPrice;
    
    // Token balances
    assets.tokens?.forEach((token: any) => {
      const priceInfo = pricesData?.result?.find((p: any) => p.address === token.address);
      if (priceInfo?.price) {
        total += parseFloat(token.balance) * priceInfo.price;
      }
    });
    
    return total;
  };

  const totalValue = calculateTotalValue();
  const assetsCount = (assets.tokens?.length || 0) + (assets.nfts?.length || 0) + (assets.ethBalance > 0 ? 1 : 0);
  
  // Calculer les transactions des dernières 24h
  const last24hTx = transactionsData?.result?.filter((tx: any) => {
    const txDate = new Date(tx.metadata?.blockTimestamp);
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return txDate > yesterday;
  }).length || 0;

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Valeur Totale"
        value={isLoading ? 
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
        change={`+${last24hTx}`}
        changeType="positive"
        icon={<ArrowUpDown className="h-6 w-6 text-pink-400" />}
      />
    </div>
  );
};

export { WalletOverview };
