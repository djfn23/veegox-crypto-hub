
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  PieChart,
  LineChart,
  Globe,
  Target
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Analytics = () => {
  const isMobile = useIsMobile();
  const [timeframe, setTimeframe] = useState("7d");

  const marketData = [
    { 
      name: "Ethereum", 
      symbol: "ETH", 
      price: "$2,456.78", 
      change: "+2.34%", 
      volume: "$1.2B",
      isUp: true,
      marketCap: "$295.2B"
    },
    { 
      name: "Bitcoin", 
      symbol: "BTC", 
      price: "$43,210.50", 
      change: "-1.23%", 
      volume: "$2.8B",
      isUp: false,
      marketCap: "$845.1B"
    },
    { 
      name: "Polygon", 
      symbol: "MATIC", 
      price: "$0.87", 
      change: "+5.67%", 
      volume: "$850M",
      isUp: true,
      marketCap: "$8.1B"
    },
  ];

  const defiMetrics = [
    { name: "TVL Total", value: "$48.2B", change: "+12.3%", isUp: true },
    { name: "Volume 24h", value: "$12.4B", change: "+5.8%", isUp: true },
    { name: "Protocoles Actifs", value: "2,156", change: "+23", isUp: true },
    { name: "Utilisateurs Actifs", value: "1.2M", change: "+8.9%", isUp: true },
  ];

  const portfolioInsights = [
    { metric: "Performance", value: "+15.2%", period: "30 jours" },
    { metric: "Meilleur Asset", value: "MATIC", gain: "+45.3%" },
    { metric: "Diversification", value: "8.5/10", status: "Excellent" },
    { metric: "Risque", value: "Modéré", score: "6.2/10" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Analyse avancée des marchés et de votre portfolio
          </p>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className={`w-full sm:w-32 bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="24h">24h</SelectItem>
            <SelectItem value="7d">7 jours</SelectItem>
            <SelectItem value="30d">30 jours</SelectItem>
            <SelectItem value="90d">90 jours</SelectItem>
            <SelectItem value="1y">1 an</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="overview"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📊 Vue d'ensemble" : "Vue d'ensemble"}
          </TabsTrigger>
          <TabsTrigger 
            value="market"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📈 Marchés" : "Marchés"}
          </TabsTrigger>
          <TabsTrigger 
            value="defi"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🏦 DeFi" : "DeFi"}
          </TabsTrigger>
          <TabsTrigger 
            value="portfolio"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "💼 Portfolio" : "Portfolio"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Market Cap Total</p>
                    <p className="text-xl md:text-2xl font-bold text-white">$1.2T</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <div className="flex items-center mt-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +2.4%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Volume 24h</p>
                    <p className="text-xl md:text-2xl font-bold text-white">$45.2B</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                </div>
                <div className="flex items-center mt-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8.1%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">DeFi TVL</p>
                    <p className="text-xl md:text-2xl font-bold text-white">$48.2B</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
                <div className="flex items-center mt-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.3%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Utilisateurs Actifs</p>
                    <p className="text-xl md:text-2xl font-bold text-white">2.1M</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
                <div className="flex items-center mt-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15.7%
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Tendances du Marché
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Graphique des tendances</p>
                    <p className="text-xs">Intégration en cours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Répartition Sectorielle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-white text-sm">DeFi</span>
                    </div>
                    <span className="text-gray-400 text-sm">35.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-white text-sm">Layer 1</span>
                    </div>
                    <span className="text-gray-400 text-sm">28.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white text-sm">NFT</span>
                    </div>
                    <span className="text-gray-400 text-sm">18.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-white text-sm">Gaming</span>
                    </div>
                    <span className="text-gray-400 text-sm">17.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-4 md:mt-6">
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Top Cryptomonnaies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((crypto, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{crypto.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{crypto.name}</div>
                          <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono">{crypto.price}</div>
                        <div className={`text-sm flex items-center gap-1 ${crypto.isUp ? 'text-green-400' : 'text-red-400'}`}>
                          {crypto.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {crypto.change}
                        </div>
                      </div>
                      <div className="text-right hidden md:block">
                        <div className="text-gray-400 text-sm">Volume</div>
                        <div className="text-white text-sm">{crypto.volume}</div>
                      </div>
                      <div className="text-right hidden lg:block">
                        <div className="text-gray-400 text-sm">Market Cap</div>
                        <div className="text-white text-sm">{crypto.marketCap}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defi" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {defiMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">{metric.name}</p>
                    <p className="text-xl md:text-2xl font-bold text-white mb-2">{metric.value}</p>
                    <div className={`text-sm flex items-center justify-center gap-1 ${metric.isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Protocoles DeFi Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Uniswap", "Aave", "Compound", "MakerDAO", "Curve"].map((protocol, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{protocol.charAt(0)}</span>
                      </div>
                      <span className="text-white">{protocol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-mono">${(Math.random() * 10).toFixed(2)}B</div>
                      <div className="text-gray-400 text-sm">TVL</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {portfolioInsights.map((insight, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">{insight.metric}</p>
                    <p className="text-xl md:text-2xl font-bold text-white mb-1">{insight.value}</p>
                    {insight.period && <p className="text-xs text-gray-500">{insight.period}</p>}
                    {insight.gain && <p className="text-xs text-green-400">{insight.gain}</p>}
                    {insight.status && <p className="text-xs text-blue-400">{insight.status}</p>}
                    {insight.score && <p className="text-xs text-gray-500">{insight.score}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Allocation Recommandée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Bitcoin (BTC)</span>
                    <span className="text-blue-400">40%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Ethereum (ETH)</span>
                    <span className="text-purple-400">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">DeFi Tokens</span>
                    <span className="text-green-400">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Stablecoins</span>
                    <span className="text-gray-400">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Historique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Graphique de performance</p>
                    <p className="text-xs">Données en temps réel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
