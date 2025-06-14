
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

interface PriceDataPoint {
  timestamp: string;
  price: number;
  volume?: number;
}

interface PriceChartProps {
  data: PriceDataPoint[];
  symbol: string;
  currentPrice: number;
  change24h: number;
  className?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ 
  data, 
  symbol, 
  currentPrice, 
  change24h,
  className = "" 
}) => {
  const isPositive = change24h >= 0;
  const chartColor = isPositive ? '#10b981' : '#ef4444';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-2 shadow-lg">
          <p className="text-white text-sm">
            Prix: ${payload[0].value.toFixed(4)}
          </p>
          <p className="text-gray-400 text-xs">
            {new Date(label).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-slate-900/30 rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-white font-medium">{symbol}</h3>
          <p className="text-2xl font-bold text-white">${currentPrice.toFixed(4)}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          <span>{isPositive ? '+' : ''}{change24h.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${symbol})`}
            />
            <XAxis 
              dataKey="timestamp" 
              hide 
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
