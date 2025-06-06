
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Send, TrendingDown, ArrowUpDown, Clock, Copy } from "lucide-react";

interface Transaction {
  type: string;
  amount: string;
  to?: string;
  from?: string;
  via?: string;
  time: string;
  status: string;
  hash: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
}

const TransactionsTab = ({ transactions }: TransactionsTabProps) => {
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

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Historique des Transactions</h3>
        <GradientButton variant="ghost" size="sm">
          <Copy className="h-4 w-4" />
          Exporter CSV
        </GradientButton>
      </div>
      
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <GlassCard key={index} className="p-4 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <div className="text-white font-semibold capitalize">{tx.type}</div>
                  <div className="text-gray-400 text-sm">{tx.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{tx.amount}</div>
                <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                  {tx.status}
                </Badge>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassCard>
  );
};

export { TransactionsTab };
