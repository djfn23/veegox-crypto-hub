
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { useDeFiStore } from '@/store/modules/defiStore';
import { AnimatedCard, FadeIn } from '@/components/ui/animated-components';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export const PortfolioAnalyticsWidget = () => {
  const { portfolioMetrics, updatePortfolioMetrics } = useDeFiStore();
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    // Simulate portfolio data
    updatePortfolioMetrics({
      totalValue: 15420.50,
      dailyChange: 2.34,
      weeklyChange: -1.23,
      monthlyChange: 12.45,
      allocation: {
        'ETH': 35,
        'BTC': 25,
        'USDC': 20,
        'DeFi Tokens': 15,
        'Others': 5,
      },
      riskScore: 6.5,
    });
  }, []);

  const allocationData = Object.entries(portfolioMetrics.allocation).map(([name, value]) => ({
    name,
    value,
  }));

  const performanceData = [
    { time: '1H', value: 15380 },
    { time: '6H', value: 15420 },
    { time: '12H', value: 15390 },
    { time: '24H', value: 15420 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <AnimatedCard variant="glass" className="h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-blue-400" />
          Analytics Portefeuille
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Value */}
        <FadeIn>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {formatCurrency(portfolioMetrics.totalValue)}
            </div>
            <div className="flex items-center justify-center gap-2">
              {portfolioMetrics.dailyChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                portfolioMetrics.dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatPercentage(portfolioMetrics.dailyChange)} (24h)
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Performance Chart */}
        <FadeIn delay={0.1}>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorGradient)"
                />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Valeur']}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        {/* Allocation Chart */}
        <FadeIn delay={0.2}>
          <div>
            <h4 className="text-white font-medium mb-3">Allocation d'Actifs</h4>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={40}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-1">
                {allocationData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Risk Score */}
        <FadeIn delay={0.3}>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Score de Risque</span>
            <Badge 
              className={`${
                portfolioMetrics.riskScore <= 3 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : portfolioMetrics.riskScore <= 7
                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}
            >
              {portfolioMetrics.riskScore}/10
            </Badge>
          </div>
        </FadeIn>
      </CardContent>
    </AnimatedCard>
  );
};
