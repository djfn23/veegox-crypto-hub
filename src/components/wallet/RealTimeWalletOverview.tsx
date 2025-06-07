
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { useRealTimeWalletData } from "@/hooks/useRealTimeWeb3";
import { Wallet, TrendingUp, TrendingDown, RefreshCw, Fuel } from "lucide-react";

export const RealTimeWalletOverview = () => {
  const { 
    wallet, 
    assets, 
    totalPortfolioValue, 
    gasPrice, 
    isLoading, 
    refreshAll 
  } = useRealTimeWalletData();

  if (!wallet) {
    return (
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardContent className="p-6 text-center">
          <Wallet className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Aucun Wallet Connecté</h3>
          <p className="text-gray-400">Connectez votre wallet pour voir vos actifs en temps réel</p>
        </CardContent>
      </Card>
    );
  }

  const topAssets = assets
    .sort((a, b) => b.balanceUSD - a.balanceUSD)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Portfolio Total
          </CardTitle>
          <Button
            onClick={refreshAll}
            variant="outline"
            size="sm"
            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Valeur Totale</p>
              <div className="text-2xl font-bold text-white">
                <AnimatedNumber value={totalPortfolioValue} prefix="$" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Nombre d'Actifs</p>
              <div className="text-2xl font-bold text-white">{assets.length}</div>
            </div>
            <div>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Fuel className="h-4 w-4" />
                Gas Price (Gwei)
              </p>
              <div className="text-2xl font-bold text-white">
                <AnimatedNumber value={gasPrice} decimals={1} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Assets */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Actifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAssets.map((asset, index) => (
              <div key={asset.tokenAddress} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{asset.symbol}</div>
                    <div className="text-gray-400 text-sm">{asset.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    <AnimatedNumber value={asset.balanceUSD} prefix="$" />
                  </div>
                  <div className="text-gray-400 text-sm">
                    {parseFloat(asset.balance).toFixed(4)} {asset.symbol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wallet Info */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Informations Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Adresse:</span>
              <span className="text-white font-mono text-sm">
                {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Réseau:</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {wallet.chainId === 137 ? 'Polygon' : `Chain ${wallet.chainId}`}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Type:</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 capitalize">
                {wallet.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
