
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";

interface MarketMetric {
  name: string;
  value: number;
  change24h: number;
  category: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

export const RealTimeMarketData = () => {
  const [metrics, setMetrics] = useState<MarketMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler des données de marché en temps réel
    const generateMetrics = (): MarketMetric[] => {
      const baseMetrics = [
        {
          name: "Total Value Locked",
          value: 2340000000,
          change24h: 5.2,
          category: "TVL",
          icon: <DollarSign className="h-5 w-5" />,
          prefix: "$"
        },
        {
          name: "24h Volume",
          value: 89500000,
          change24h: -2.1,
          category: "Volume",
          icon: <Activity className="h-5 w-5" />,
          prefix: "$"
        },
        {
          name: "Active Users",
          value: 45230,
          change24h: 12.8,
          category: "Users",
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          name: "Gas Price (Gwei)",
          value: 25.6,
          change24h: -8.3,
          category: "Gas",
          icon: <Activity className="h-5 w-5" />
        }
      ];

      // Ajouter une variation aléatoire pour simuler le temps réel
      return baseMetrics.map(metric => ({
        ...metric,
        value: metric.value * (1 + (Math.random() - 0.5) * 0.02), // ±1% variation
        change24h: metric.change24h + (Math.random() - 0.5) * 2 // ±1% change variation
      }));
    };

    const updateMetrics = () => {
      setMetrics(generateMetrics());
      setIsLoading(false);
    };

    // Mise à jour initiale
    updateMetrics();

    // Mises à jour toutes les 5 secondes pour simuler le temps réel
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Données de Marché</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-slate-800 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Données de Marché en Temps Réel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-blue-400">
                    {metric.icon}
                  </div>
                  <span className="text-gray-400 text-sm">{metric.name}</span>
                </div>
                <Badge 
                  className={
                    metric.change24h >= 0 
                      ? "bg-green-500/20 text-green-400 border-green-500/30" 
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  <div className="flex items-center gap-1">
                    {metric.change24h >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {Math.abs(metric.change24h).toFixed(1)}%
                  </div>
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">
                <AnimatedNumber 
                  value={metric.value} 
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.category === "Gas" ? 1 : 0}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
