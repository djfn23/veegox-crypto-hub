
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSwapTransactions } from '@/hooks/useSwapTransactions';
import { Clock, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const SwapHistoryCard = () => {
  const { transactions, isLoading } = useSwapTransactions();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Historique des Swaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-400">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Historique des Swaps
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            Aucune transaction trouvée
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.slice(0, 10).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <div className="text-white text-sm font-medium">
                      {transaction.from_amount} → {transaction.to_amount}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {transaction.created_at && format(
                        new Date(transaction.created_at), 
                        'dd/MM/yyyy HH:mm', 
                        { locale: fr }
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(transaction.status)}
                  >
                    {transaction.status}
                  </Badge>
                  {transaction.gas_fee && (
                    <div className="text-xs text-gray-400 mt-1">
                      Gas: {transaction.gas_fee}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
