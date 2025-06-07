
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useVeegoxTokenInfo, useVeegoxBalance, useVeegoxStats } from "@/hooks/useVeegoxToken";
import { VeegoxTokenService } from "@/services/veegoxTokenService";
import { TrendingUp, TrendingDown, Coins, Users } from "lucide-react";

export const VeegoxTokenCard = () => {
  const { data: tokenInfo, isLoading: isLoadingInfo } = useVeegoxTokenInfo();
  const { data: balance, isLoading: isLoadingBalance } = useVeegoxBalance();
  const { data: stats, isLoading: isLoadingStats } = useVeegoxStats();

  if (isLoadingInfo || isLoadingBalance || isLoadingStats) {
    return (
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-white/10" />
            <Skeleton className="h-5 w-16 bg-white/10" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-24 bg-white/10" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 bg-white/10" />
            <Skeleton className="h-12 bg-white/10" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!tokenInfo || !stats) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Impossible de charger les informations Veegox</p>
        </CardContent>
      </Card>
    );
  }

  const formattedBalance = VeegoxTokenService.formatVeegoxBalance(balance || '0', tokenInfo.decimals);
  const balanceValue = parseFloat(formattedBalance) * stats.price;

  return (
    <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            {tokenInfo.symbol}
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
            Token Principal
          </Badge>
        </div>
        <p className="text-gray-300 text-sm">{tokenInfo.name}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{formattedBalance}</span>
            <span className="text-purple-300 font-medium">{tokenInfo.symbol}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-sm">≈ ${balanceValue.toFixed(2)}</span>
            {stats.change24h > 0 ? (
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.change24h.toFixed(2)}%
              </div>
            ) : (
              <div className="flex items-center text-red-400 text-sm">
                <TrendingDown className="h-3 w-3 mr-1" />
                {stats.change24h.toFixed(2)}%
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Prix</div>
            <div className="text-white font-semibold">${stats.price.toFixed(4)}</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1 flex items-center gap-1">
              <Users className="h-3 w-3" />
              Holders
            </div>
            <div className="text-white font-semibold">{stats.holders.toLocaleString()}</div>
          </div>
        </div>

        {tokenInfo.taxFee > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <div className="text-orange-300 text-xs font-medium">
              Frais de transaction: {tokenInfo.taxFee}%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
