
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUpDown, DollarSign } from "lucide-react";

const TradingSpot = () => {
  const pairs = [
    { pair: "BTC/USDT", price: "43,250.00", change: "+2.5%", volume: "1.2B", high: "44,000", low: "42,800" },
    { pair: "ETH/USDT", price: "2,580.00", change: "-1.2%", volume: "890M", high: "2,650", low: "2,520" },
    { pair: "VEEGOX/USDT", price: "12.45", change: "+8.3%", volume: "45M", high: "13.20", low: "11.80" },
    { pair: "ADA/USDT", price: "0.485", change: "+1.8%", volume: "120M", high: "0.495", low: "0.470" },
  ];

  return (
    <PageLayout
      title="Trading au Comptant"
      subtitle="Échangez des cryptomonnaies en temps réel"
      icon={<ArrowUpDown className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Volume 24h</p>
                  <p className="text-white text-xl font-bold">$2.8B</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Paires Actives</p>
                  <p className="text-white text-xl font-bold">142</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Frais Trading</p>
                  <p className="text-white text-xl font-bold">0.1%</p>
                </div>
                <Badge className="bg-green-600">Maker</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Pairs */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Paires de Trading Populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pairs.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="text-white font-medium">{pair.pair}</h4>
                      <p className="text-gray-400 text-sm">Volume: {pair.volume}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold">${pair.price}</p>
                    <Badge variant={pair.change.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                      {pair.change}
                    </Badge>
                  </div>
                  
                  <div className="text-right text-sm text-gray-400">
                    <p>H: {pair.high}</p>
                    <p>L: {pair.low}</p>
                  </div>
                  
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Trader
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Trade */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Trading Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Interface de Trading</h3>
              <p className="text-gray-400 mb-4">L'interface de trading complète sera disponible prochainement</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Accéder au Trading Avancé
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TradingSpot;
