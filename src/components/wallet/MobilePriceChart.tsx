
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { MobileWalletCard, MobileWalletCardHeader, MobileWalletCardContent } from '@/components/ui/mobile-wallet-card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceDataPoint {
  timestamp: string;
  price: number;
  volume?: number;
}

interface MobilePriceChartProps {
  data: PriceDataPoint[];
  symbol: string;
  currentPrice: number;
  change24h: number;
  className?: string;
  compact?: boolean;
}

export const MobilePriceChart: React.FC<MobilePriceChartProps> = ({ 
  data, 
  symbol, 
  currentPrice, 
  change24h,
  className = "",
  compact = false
}) => {
  const { isMobile, isTablet, getFontSize } = useResponsiveLayout();
  const isPositive = change24h >= 0;
  const chartColor = isPositive ? '#10b981' : '#ef4444';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className={cn("text-white font-medium", getFontSize('sm'))}>
            ${payload[0].value.toFixed(4)}
          </p>
          <p className={cn("text-gray-400", getFontSize('xs'))}>
            {new Date(label).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  const chartHeight = compact 
    ? (isMobile ? 120 : 140)
    : (isMobile ? 180 : isTablet ? 200 : 220);

  return (
    <MobileWalletCard 
      variant={compact ? "compact" : "default"} 
      className={className}
      padding={compact ? "sm" : "default"}
    >
      <MobileWalletCardHeader>
        <div className="space-y-1">
          <h3 className={cn("text-white font-semibold", getFontSize('base'))}>
            {symbol}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className={cn("font-bold text-white", getFontSize(compact ? 'lg' : 'xl'))}>
              ${currentPrice.toFixed(4)}
            </span>
            <Badge
              variant={isPositive ? 'default' : 'destructive'}
              className={cn(
                "flex items-center gap-1 font-medium",
                isPositive 
                  ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                  : 'bg-red-600/20 text-red-400 border-red-500/30',
                getFontSize('xs')
              )}
            >
              {isPositive ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </MobileWalletCardHeader>
      
      <MobileWalletCardContent spacing={compact ? "tight" : "default"}>
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4}/>
                  <stop offset="50%" stopColor={chartColor} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={isMobile ? 2.5 : 2}
                fill={`url(#gradient-${symbol})`}
                dot={false}
                activeDot={{ 
                  r: isMobile ? 5 : 4, 
                  fill: chartColor,
                  strokeWidth: 2,
                  stroke: '#fff'
                }}
              />
              <XAxis 
                dataKey="timestamp" 
                hide 
              />
              <YAxis hide />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: '3,3' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </MobileWalletCardContent>
    </MobileWalletCard>
  );
};
