
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { useRealTimePrices, useTrendingTokens } from '@/hooks/useRealTimePrices';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const MAJOR_TOKENS = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'cardano'];

export const RealTimeMarketOverview = () => {
  const { prices, isLoading } = useRealTimePrices(MAJOR_TOKENS);
  const { trending, isLoading: trendingLoading } = useTrendingTokens();

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalMarketCap = Array.from(prices.values()).reduce(
    (total, token) => total + (token.marketCap || 0), 0
  );

  const avgChange = Array.from(prices.values()).reduce(
    (total, token) => total + (token.change24h || 0), 0
  ) / prices.size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Market Cap Total */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Market Cap Total</CardTitle>
          <DollarSign className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${(totalMarketCap / 1e12).toFixed(2)}T
          </div>
          <p className="text-xs text-gray-400">
            Capitalisation des top tokens
          </p>
        </CardContent>
      </Card>

      {/* Changement Moyen 24h */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Tendance 24h</CardTitle>
          {avgChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-400" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-400" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
          </div>
          <p className="text-xs text-gray-400">
            Changement moyen
          </p>
        </CardContent>
      </Card>

      {/* Top Tokens */}
      <Card className="bg-slate-900/50 border-slate-700 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Top Tokens</CardTitle>
          <Activity className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from(prices.entries()).slice(0, 3).map(([tokenId, token]) => (
              <div key={tokenId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {token.symbol?.toUpperCase()}
                  </span>
                  <Badge 
                    variant={token.change24h >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {token.change24h >= 0 ? '+' : ''}{token.change24h?.toFixed(2)}%
                  </Badge>
                </div>
                <span className="text-white font-medium">
                  ${token.price?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Tokens */}
      {!trendingLoading && trending.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700 md:col-span-4">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              Tokens Tendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {trending.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="bg-slate-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={item.item.small} 
                      alt={item.item.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-white font-medium text-sm">
                      {item.item.symbol.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs truncate">
                    {item.item.name}
                  </p>
                  <p className="text-yellow-400 text-xs mt-1">
                    Rang #{item.item.market_cap_rank}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
