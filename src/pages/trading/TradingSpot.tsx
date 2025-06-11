
import { PageLayout } from "@/components/layout/PageLayout";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TradingSpot = () => {
  return (
    <PageLayout
      title="Trading Spot"
      subtitle="Trading au comptant avec des crypto-monnaies"
      icon={<TrendingUp className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Paires Populaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">BTC/USDT</span>
                <div className="text-right">
                  <div className="text-green-400">$43,250</div>
                  <div className="text-xs text-green-400">+2.5%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">ETH/USDT</span>
                <div className="text-right">
                  <div className="text-green-400">$2,650</div>
                  <div className="text-xs text-green-400">+1.8%</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">MATIC/USDT</span>
                <div className="text-right">
                  <div className="text-red-400">$0.85</div>
                  <div className="text-xs text-red-400">-0.5%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Interface de Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Acheter
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Vendre
                </Button>
                <Badge className="w-full bg-blue-500">
                  Spot Trading Actif
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume 24h</span>
                <span className="text-white">$2.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ordres actifs</span>
                <span className="text-white">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Spread</span>
                <span className="text-white">0.05%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default TradingSpot;
