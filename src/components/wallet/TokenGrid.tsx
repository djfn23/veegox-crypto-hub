
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  value?: number;
  price?: number;
  change24h?: number;
  logo?: string;
}

interface TokenGridProps {
  tokens: Token[];
  isLoading: boolean;
}

const TokenGrid = ({ tokens, isLoading }: TokenGridProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <GlassCard key={i} className="p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3 bg-white/10" />
                <Skeleton className="h-3 w-1/4 bg-white/10" />
              </div>
              <div className="text-right space-y-2">
                <Skeleton className="h-4 w-20 bg-white/10" />
                <Skeleton className="h-3 w-16 bg-white/10" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-gray-400">Aucun token trouvé</p>
      </GlassCard>
    );
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="space-y-4">
      {tokens.map((token) => (
        <GlassCard key={token.address} className="p-4 hover:bg-white/10 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                {token.logo ? (
                  <img src={token.logo} alt={token.symbol} className="w-8 h-8 rounded-full" />
                ) : (
                  <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <div className="text-white font-semibold">{token.name}</div>
                <div className="text-gray-400 text-sm">
                  {parseFloat(token.balance).toFixed(4)} {token.symbol}
                </div>
              </div>
            </div>
            <div className="text-right">
              {token.value && (
                <div className="text-white font-semibold">
                  <AnimatedNumber value={token.value} prefix="$" />
                </div>
              )}
              {token.change24h !== undefined && (
                <div className={`text-sm font-medium flex items-center ${getTrendColor(token.change24h)}`}>
                  {getTrendIcon(token.change24h)}
                  <span className="ml-1">{token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                </div>
              )}
              {token.price && (
                <div className="text-gray-400 text-xs">
                  ${token.price.toFixed(6)}
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export { TokenGrid };
