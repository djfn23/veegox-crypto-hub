
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Plus, 
  TrendingUp, 
  History,
  Coins,
  Euro
} from 'lucide-react';
import { useFiatBalance } from '@/hooks/useFiatBalance';
import { CryptoPurchaseModal } from './CryptoPurchaseModal';
import { AddFundsModal } from './AddFundsModal';
import { FiatTransactionHistory } from './FiatTransactionHistory';

export const FiatBalanceModule: React.FC = () => {
  const { balance, cryptoRates, purchases, isLoading } = useFiatBalance();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableBalance = balance?.available_balance || 0;
  const pendingBalance = balance?.pending_balance || 0;
  const currency = balance?.currency || 'EUR';

  return (
    <>
      <div className="space-y-6">
        {/* Balance Overview */}
        <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Euro className="h-5 w-5 text-green-400" />
              Solde Fiat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Solde disponible</p>
                <p className="text-3xl font-bold text-white">
                  {availableBalance.toFixed(2)} {currency}
                </p>
                {pendingBalance > 0 && (
                  <p className="text-yellow-400 text-sm">
                    {pendingBalance.toFixed(2)} {currency} en attente
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setShowAddFundsModal(true)}
                  className="bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter des fonds
                </Button>
                <Button
                  onClick={() => setShowPurchaseModal(true)}
                  disabled={availableBalance <= 0}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Acheter Crypto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => setShowPurchaseModal(true)}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <p className="text-white font-medium">Acheter Bitcoin</p>
              <p className="text-gray-400 text-sm">
                {cryptoRates?.BTC ? `${cryptoRates.BTC.toLocaleString()} €` : 'Chargement...'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => setShowPurchaseModal(true)}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <p className="text-white font-medium">Acheter Ethereum</p>
              <p className="text-gray-400 text-sm">
                {cryptoRates?.ETH ? `${cryptoRates.ETH.toLocaleString()} €` : 'Chargement...'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => setShowHistory(true)}>
            <CardContent className="p-4 text-center">
              <History className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-white font-medium">Historique</p>
              <p className="text-gray-400 text-sm">
                {purchases?.length || 0} transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Purchases */}
        {purchases && purchases.length > 0 && (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Achats récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchases.slice(0, 3).map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {purchase.crypto_symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {purchase.crypto_amount.toFixed(6)} {purchase.crypto_symbol}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        -{purchase.fiat_amount.toFixed(2)} {purchase.fiat_currency}
                      </p>
                      <Badge 
                        className={`text-xs ${
                          purchase.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : purchase.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {purchase.status === 'completed' ? 'Terminé' : 
                         purchase.status === 'pending' ? 'En cours' : 'Échoué'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {purchases.length > 3 && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-blue-400 hover:text-blue-300"
                  onClick={() => setShowHistory(true)}
                >
                  Voir tout l'historique ({purchases.length} transactions)
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      <CryptoPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        availableBalance={availableBalance}
        currency={currency}
        cryptoRates={cryptoRates || {}}
      />

      <AddFundsModal
        isOpen={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
        currency={currency}
      />

      <FiatTransactionHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </>
  );
};
