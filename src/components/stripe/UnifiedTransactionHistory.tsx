
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coins, 
  Image, 
  Lock,
  Euro
} from 'lucide-react';
import { useStripeUnified } from '@/hooks/useStripeUnified';

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'crypto_swap':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'nft_purchase':
      return <Image className="h-4 w-4" />;
    case 'staking':
      return <Lock className="h-4 w-4" />;
    case 'transfer':
      return <ArrowDownRight className="h-4 w-4" />;
    case 'crypto_purchase':
      return <Coins className="h-4 w-4" />;
    case 'fiat_deposit':
      return <Euro className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const getTransactionLabel = (type: string) => {
  switch (type) {
    case 'crypto_swap':
      return 'Crypto Swap';
    case 'nft_purchase':
      return 'Achat NFT';
    case 'staking':
      return 'Staking';
    case 'transfer':
      return 'Transfert';
    case 'crypto_purchase':
      return 'Achat Crypto';
    case 'fiat_deposit':
      return 'Dépôt Fiat';
    default:
      return 'Transaction';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'succeeded':
      return 'bg-green-500/20 text-green-400';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'failed':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const UnifiedTransactionHistory: React.FC = () => {
  const { stripeHistory, isLoadingHistory } = useStripeUnified();

  if (isLoadingHistory) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-slate-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-purple-400" />
          Historique Unifié Stripe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stripeHistory.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucune transaction trouvée</p>
              <p className="text-sm">Toutes vos transactions Stripe apparaîtront ici</p>
            </div>
          ) : (
            stripeHistory.map((transaction: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    {getTransactionIcon(transaction.transaction_type)}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {getTransactionLabel(transaction.transaction_type)}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(transaction.created_at || transaction.created).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {transaction.description && (
                      <p className="text-gray-500 text-xs mt-1">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {transaction.amount ? `${transaction.amount.toFixed(2)} ${transaction.currency?.toUpperCase() || 'EUR'}` : 'N/A'}
                  </p>
                  <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'completed' ? 'Terminé' : 
                     transaction.status === 'pending' ? 'En cours' : 
                     transaction.status === 'succeeded' ? 'Réussi' : 'Échoué'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
