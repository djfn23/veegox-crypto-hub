
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserPortfolio } from '@/hooks/useUserPortfolio';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';

export const PortfolioCard = () => {
  const { portfolio, isLoading, totalPortfolioValue } = useUserPortfolio();

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Portfolio</CardTitle>
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
          <Wallet className="h-5 w-5" />
          Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-gray-400">Valeur totale</span>
          </div>
          <span className="text-white font-semibold">
            ${totalPortfolioValue.toFixed(2)}
          </span>
        </div>

        {portfolio.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            Votre portfolio est vide
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-slate-800/30 rounded"
              >
                <div>
                  <div className="text-white text-sm font-medium">
                    {item.token_symbol}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {item.token_name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm">
                    {item.balance.toFixed(4)}
                  </div>
                  {item.average_buy_price && (
                    <div className="text-gray-400 text-xs">
                      ${item.average_buy_price.toFixed(2)}
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
