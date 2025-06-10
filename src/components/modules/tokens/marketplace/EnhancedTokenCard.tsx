
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Star, ExternalLink, TrendingUp, Users, Zap, ShoppingCart } from "lucide-react";
import VeegoxLogo from "@/components/ui/veegox-logo";
import { CustomToken } from "@/services/tokenEcosystemService";

interface EnhancedTokenCardProps {
  token: CustomToken & {
    price?: number;
    change24h?: number;
    volume24h?: number;
    canStake?: boolean;
    canTrade?: boolean;
    isInWallet?: boolean;
  };
}

export default function EnhancedTokenCard({ token }: EnhancedTokenCardProps) {
  const isVeegoxToken = token.symbol === 'VGX';
  const changeColor = token.change24h && token.change24h >= 0 ? 'text-green-400' : 'text-red-400';
  const changeBg = token.change24h && token.change24h >= 0 ? 'bg-green-600' : 'bg-red-600';

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume.toFixed(0)}`;
  };

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden ${
      isVeegoxToken ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isVeegoxToken ? (
              <VeegoxLogo size="lg" variant="gradient" />
            ) : token.logo ? (
              <img src={token.logo} alt={token.symbol} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                {token.symbol.slice(0, 2)}
              </div>
            )}
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                {token.name}
                {isVeegoxToken && (
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                )}
                {token.isActive && (
                  <Badge className="bg-blue-600 text-white text-xs">
                    Actif
                  </Badge>
                )}
              </CardTitle>
              <p className="text-white/60 text-sm">{token.symbol}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {token.isInWallet && (
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                Dans Wallet
              </Badge>
            )}
            <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-white/60 text-xs">Prix</Label>
            <p className="text-white font-bold text-lg">
              {token.price ? formatPrice(token.price) : 'N/A'}
            </p>
          </div>
          <div>
            <Label className="text-white/60 text-xs">24h</Label>
            {token.change24h !== undefined ? (
              <Badge className={`${changeBg} text-white`}>
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </Badge>
            ) : (
              <span className="text-white/60">N/A</span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Volume 24h:</span>
            <span className="text-white">
              {token.volume24h ? formatVolume(token.volume24h) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Détenteurs:</span>
            <span className="text-white flex items-center gap-1">
              <Users className="h-3 w-3" />
              {token.holders || 0}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Market Cap:</span>
            <span className="text-white">
              {token.marketCap ? formatVolume(token.marketCap) : 'N/A'}
            </span>
          </div>
        </div>

        {/* Actions disponibles */}
        <div className="flex flex-wrap gap-1 pt-2">
          {token.canTrade && (
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Tradable
            </Badge>
          )}
          {token.canStake && (
            <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Stakable
            </Badge>
          )}
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 text-xs">
            <ShoppingCart className="h-3 w-3 mr-1" />
            NFT Pay
          </Badge>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trade
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Description si disponible */}
        {token.description && (
          <p className="text-white/70 text-xs pt-2 border-t border-white/10">
            {token.description.length > 80 
              ? `${token.description.substring(0, 80)}...` 
              : token.description
            }
          </p>
        )}
      </CardContent>
    </Card>
  );
}
