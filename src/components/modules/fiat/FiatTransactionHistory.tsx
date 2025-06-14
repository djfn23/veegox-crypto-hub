
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CreditCard, 
  TrendingDown, 
  TrendingUp, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { useFiatBalance } from '@/hooks/useFiatBalance';

interface FiatTransactionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FiatTransactionHistory: React.FC<FiatTransactionHistoryProps> = ({
  isOpen,
  onClose
}) => {
  const { transactions, purchases, isLoadingTransactions, isLoadingPurchases } = useFiatBalance();

  const allTransactions = [
    ...(transactions || []).map(tx => ({ ...tx, type: 'fiat' })),
    ...(purchases || []).map(purchase => ({
      ...purchase,
      type: 'crypto',
      transaction_type: 'crypto_purchase',
      amount: -purchase.fiat_amount,
      currency: purchase.fiat_currency,
      description: `Achat de ${purchase.crypto_amount.toFixed(6)} ${purchase.crypto_symbol}`
    }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-red-400" />;
      case 'crypto_purchase':
        return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-yellow-400" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Dépôt';
      case 'withdrawal':
        return 'Retrait';
      case 'crypto_purchase':
        return 'Achat Crypto';
      case 'refund':
        return 'Remboursement';
      default:
        return 'Transaction';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 text-xs">Terminé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">En cours</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 text-xs">Échoué</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500/20 text-gray-400 text-xs">Annulé</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 text-xs">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-white">Historique des transactions</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          {isLoadingTransactions || isLoadingPurchases ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-700 rounded w-32"></div>
                        <div className="h-3 bg-slate-700 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-slate-700 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : allTransactions.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Aucune transaction trouvée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        {getTransactionIcon(transaction.transaction_type)}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {getTransactionLabel(transaction.transaction_type)}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                        {transaction.description && (
                          <p className="text-gray-400 text-xs mt-1">
                            {transaction.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toFixed(2)} {transaction.currency}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
