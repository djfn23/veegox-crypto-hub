
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Play, Pause, Settings } from "lucide-react";

const TradingStrategies = () => {
  const strategies = [
    { 
      name: "DCA Bitcoin", 
      description: "Dollar Cost Averaging sur BTC", 
      status: "Active", 
      profit: "+12.5%", 
      frequency: "Quotidien" 
    },
    { 
      name: "Grid Trading ETH", 
      description: "Trading de grille automatisé", 
      status: "Paused", 
      profit: "+8.2%", 
      frequency: "Continu" 
    },
    { 
      name: "RSI Scalping", 
      description: "Scalping basé sur RSI", 
      status: "Active", 
      profit: "+15.7%", 
      frequency: "5min" 
    },
  ];

  return (
    <PageLayout
      title="Stratégies de Trading"
      subtitle="Automatisez vos stratégies de trading"
      icon={<Bot className="h-6 w-6 text-purple-400" />}
    >
      <div className="space-y-6">
        {/* Strategy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Stratégies Actives</p>
                <p className="text-white text-2xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Profit Total</p>
                <p className="text-green-400 text-2xl font-bold">+36.4%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Trades Exécutés</p>
                <p className="text-white text-2xl font-bold">1,247</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Strategies */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Mes Stratégies</CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Bot className="h-4 w-4 mr-2" />
              Nouvelle Stratégie
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategies.map((strategy, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Bot className="h-8 w-8 text-purple-400" />
                    <div>
                      <h4 className="text-white font-medium">{strategy.name}</h4>
                      <p className="text-gray-400 text-sm">{strategy.description}</p>
                      <p className="text-gray-500 text-xs">Fréquence: {strategy.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-green-400 font-bold">{strategy.profit}</p>
                    <p className="text-gray-400 text-sm">Profit</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={strategy.status === 'Active' ? 'default' : 'secondary'}>
                      {strategy.status}
                    </Badge>
                    <div className="flex gap-1">
                      {strategy.status === 'Active' ? (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategy Templates */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Modèles de Stratégies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["DCA", "Grid Trading", "RSI Strategy", "MA Crossover", "Arbitrage", "Momentum"].map((template) => (
                <div key={template} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <h4 className="text-white font-medium mb-2">{template}</h4>
                  <p className="text-gray-400 text-sm mb-3">Stratégie automatisée prête à l'emploi</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Utiliser ce Modèle
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TradingStrategies;
