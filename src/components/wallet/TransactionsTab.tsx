
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Send, TrendingDown, ArrowUpDown, Clock, Copy } from "lucide-react";
import { useTransactionHistory } from "@/hooks/useWalletData";
import { toast } from "sonner";

interface WalletData {
  id: string;
  name: string;
  address: string;
  connected: boolean;
  icon: string;
  chainId: number;
}

interface TransactionsTabProps {
  wallets: WalletData[];
}

const TransactionsTab = ({ wallets }: TransactionsTabProps) => {
  const primaryWallet = wallets.find(w => w.connected);
  
  const { data: transactionsData, isLoading, error } = useTransactionHistory(
    primaryWallet?.address || null,
    primaryWallet?.chainId || 1
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className="h-5 w-5 text-red-400" />;
      case 'receive':
        return <TrendingDown className="h-5 w-5 text-green-400" />;
      case 'swap':
        return <ArrowUpDown className="h-5 w-5 text-blue-400" />;
      case 'stake':
        return <Clock className="h-5 w-5 text-purple-400" />;
      default:
        return <ArrowUpDown className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatTransaction = (tx: any) => {
    const isReceived = tx.to?.toLowerCase() === primaryWallet?.address.toLowerCase();
    return {
      type: isReceived ? 'receive' : 'send',
      amount: `${isReceived ? '+' : '-'}${parseFloat(tx.value || 0).toFixed(4)} ${tx.asset || 'ETH'}`,
      to: isReceived ? undefined : tx.to,
      from: isReceived ? tx.from : undefined,
      time: new Date(tx.metadata?.blockTimestamp).toLocaleString('fr-FR'),
      status: 'confirmé',
      hash: tx.hash
    };
  };

  const handleExportCSV = () => {
    toast.success("Export CSV en développement");
  };

  if (!primaryWallet) {
    return (
      <GlassCard className="p-6">
        <div className="text-center py-10">
          <p className="text-gray-400">Connectez un wallet pour voir vos transactions</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Historique des Transactions</h3>
        <GradientButton variant="ghost" size="sm" onClick={handleExportCSV}>
          <Copy className="h-4 w-4" />
          Exporter CSV
        </GradientButton>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-400">Erreur lors du chargement des transactions</p>
          <p className="text-gray-400 text-sm mt-2">
            Vérifiez que votre clé API Alchemy est configurée
          </p>
        </div>
      ) : transactionsData?.result?.length > 0 ? (
        <div className="space-y-4">
          {transactionsData.result.slice(0, 10).map((tx: any, index: number) => {
            const formattedTx = formatTransaction(tx);
            return (
              <GlassCard key={index} className="p-4 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      {getTransactionIcon(formattedTx.type)}
                    </div>
                    <div>
                      <div className="text-white font-semibold capitalize">{formattedTx.type}</div>
                      <div className="text-gray-400 text-sm">{formattedTx.time}</div>
                      {formattedTx.to && (
                        <div className="text-gray-500 text-xs">
                          Vers: {formattedTx.to.substring(0, 6)}...{formattedTx.to.substring(formattedTx.to.length - 4)}
                        </div>
                      )}
                      {formattedTx.from && (
                        <div className="text-gray-500 text-xs">
                          De: {formattedTx.from.substring(0, 6)}...{formattedTx.from.substring(formattedTx.from.length - 4)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{formattedTx.amount}</div>
                    <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                      {formattedTx.status}
                    </Badge>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400">Aucune transaction trouvée</p>
        </div>
      )}
    </GlassCard>
  );
};

export { TransactionsTab };
