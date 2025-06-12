
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { coinGeckoService } from '@/services/coinGeckoService';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface RealTimePriceChartProps {
  tokenId: string;
  symbol: string;
  days?: number;
}

export const RealTimePriceChart = ({ tokenId, symbol, days = 7 }: RealTimePriceChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await coinGeckoService.getMarketData(tokenId, days);
        
        const formattedData = data.prices.map(([timestamp, price]) => ({
          time: new Date(timestamp).toLocaleDateString(),
          price: price,
          timestamp
        }));

        setChartData(formattedData);
        setCurrentPrice(formattedData[formattedData.length - 1]?.price || 0);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
    const interval = setInterval(fetchChartData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [tokenId, days]);

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex justify-between items-center">
          <span>{symbol.toUpperCase()} Prix</span>
          <span className="text-green-400">${currentPrice.toLocaleString()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Prix']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
