
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVeegoxTokenInfo, useVeegoxBalance, useVeegoxStats } from "@/hooks/useVeegoxToken";
import { VeegoxTokenService } from "@/services/veegoxTokenService";
import { 
  Coins, 
  Send, 
  Download, 
  Flame, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign
} from "lucide-react";

export const VeegoxWalletSection = () => {
  const { data: tokenInfo } = useVeegoxTokenInfo();
  const { data: balance } = useVeegoxBalance();
  const { data: stats } = useVeegoxStats();

  if (!tokenInfo) {
    return null;
  }

  const formattedBalance = VeegoxTokenService.formatVeegoxBalance(balance || '0', tokenInfo.decimals);
  const balanceValue = stats ? parseFloat(formattedBalance) * stats.price : 0;

  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-500/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-6 w-6 text-purple-400" />
            Token Veegox
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
            Token Principal
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Balance principale */}
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-white mb-2">
            {formattedBalance} <span className="text-xl text-purple-300">{tokenInfo.symbol}</span>
          </div>
          <div className="text-lg text-gray-300">
            ≈ ${balanceValue.toFixed(2)} USD
          </div>
          {stats && (
            <div className="flex items-center justify-center gap-2 mt-2">
              {stats.change24h > 0 ? (
                <div className="flex items-center text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{stats.change24h.toFixed(2)}%
                </div>
              ) : (
                <div className="flex items-center text-red-400">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  {stats.change24h.toFixed(2)}%
                </div>
              )}
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col gap-2 h-auto py-4 border-purple-500/30 hover:bg-purple-500/10">
            <Send className="h-5 w-5 text-purple-400" />
            <span className="text-sm">Envoyer</span>
          </Button>
          
          <Button variant="outline" className="flex flex-col gap-2 h-auto py-4 border-purple-500/30 hover:bg-purple-500/10">
            <Download className="h-5 w-5 text-purple-400" />
            <span className="text-sm">Recevoir</span>
          </Button>
          
          <Button variant="outline" className="flex flex-col gap-2 h-auto py-4 border-purple-500/30 hover:bg-purple-500/10">
            <Flame className="h-5 w-5 text-orange-400" />
            <span className="text-sm">Burn</span>
          </Button>
        </div>

        {/* Statistiques du token */}
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-gray-400 text-sm">Prix</span>
              </div>
              <div className="text-white font-semibold">${stats.price.toFixed(4)}</div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Holders</span>
              </div>
              <div className="text-white font-semibold">{stats.holders.toLocaleString()}</div>
            </div>
          </div>
        )}

        {/* Informations du contrat */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Informations du contrat</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Adresse:</span>
              <span className="text-white font-mono text-xs">
                {VeegoxTokenService.getTokenConfig().address.slice(0, 6)}...
                {VeegoxTokenService.getTokenConfig().address.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <span className="text-white">Polygon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Decimals:</span>
              <span className="text-white">{tokenInfo.decimals}</span>
            </div>
            {tokenInfo.taxFee > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Frais de transaction:</span>
                <span className="text-orange-300">{tokenInfo.taxFee}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
