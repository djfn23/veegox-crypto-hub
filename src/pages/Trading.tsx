
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, LineChart, Coins } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Trading = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("spot");

  const mockPairs = [
    { pair: "ETH/USDC", price: "2,456.78", change: "+2.34%", volume: "1.2M", isUp: true },
    { pair: "BTC/USDT", price: "43,210.50", change: "-1.23%", volume: "2.8M", isUp: false },
    { pair: "MATIC/ETH", price: "0.000345", change: "+5.67%", volume: "850K", isUp: true },
    { pair: "LINK/USDC", price: "14.23", change: "+3.21%", volume: "640K", isUp: true },
  ];

  const mockOrders = [
    { type: "Achat", amount: "0.5 ETH", price: "2,450.00", status: "En cours" },
    { type: "Vente", amount: "1.2 ETH", price: "2,460.00", status: "Complété" },
    { type: "Achat", amount: "0.8 ETH", price: "2,440.00", status: "Annulé" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Trading Avancé</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Interface de trading professionnelle avec outils d'analyse
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="spot"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "💱 Spot" : "Trading Spot"}
          </TabsTrigger>
          <TabsTrigger 
            value="futures"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "⚡ Futures" : "Futures"}
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📋 Ordres" : "Mes Ordres"}
          </TabsTrigger>
          <TabsTrigger 
            value="portfolio"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "💼 Portfolio" : "Portfolio"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="spot" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Market Data */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Marchés Actifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPairs.map((pair, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Coins className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm md:text-base">{pair.pair}</div>
                            <div className="text-gray-400 text-xs">Vol: {pair.volume}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-mono text-sm md:text-base">${pair.price}</div>
                          <div className={`text-xs flex items-center gap-1 ${pair.isUp ? 'text-green-400' : 'text-red-400'}`}>
                            {pair.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {pair.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chart Placeholder */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Graphique de Prix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Graphique de trading en temps réel</p>
                      <p className="text-xs">Intégration TradingView à venir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Panel */}
            <div className="space-y-4">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Passer un Ordre</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10">
                      <TabsTrigger value="buy" className="text-white data-[state=active]:bg-green-600">
                        Acheter
                      </TabsTrigger>
                      <TabsTrigger value="sell" className="text-white data-[state=active]:bg-red-600">
                        Vendre
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="space-y-3 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Prix (USDC)</label>
                        <input 
                          type="number" 
                          placeholder="2456.78"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Quantité (ETH)</label>
                        <input 
                          type="number" 
                          placeholder="0.5"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Total (USDC)</label>
                        <input 
                          type="number" 
                          placeholder="1228.39"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                          readOnly
                        />
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Acheter ETH
                      </Button>
                    </TabsContent>
                    <TabsContent value="sell" className="space-y-3 mt-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Prix (USDC)</label>
                        <input 
                          type="number" 
                          placeholder="2456.78"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Quantité (ETH)</label>
                        <input 
                          type="number" 
                          placeholder="0.5"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-300">Total (USDC)</label>
                        <input 
                          type="number" 
                          placeholder="1228.39"
                          className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                          readOnly
                        />
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Vendre ETH
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Soldes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">ETH</span>
                    <span className="text-white font-mono">2.456789</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">USDC</span>
                    <span className="text-white font-mono">5,431.22</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">MATIC</span>
                    <span className="text-white font-mono">12,500.00</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="futures" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Trading Futures</h3>
                <p className="text-gray-400 mb-4">
                  Le trading de futures sera disponible prochainement
                </p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Être notifié du lancement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Historique des Ordres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrders.map((order, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/5 rounded-lg gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`px-2 py-1 rounded text-xs ${
                        order.type === 'Achat' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}>
                        {order.type}
                      </div>
                      <div>
                        <div className="text-white text-sm">{order.amount}</div>
                        <div className="text-gray-400 text-xs">${order.price}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'Complété' ? 'bg-green-600/20 text-green-400' :
                      order.status === 'En cours' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Valeur Totale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">$12,486.32</div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  +5.23% (24h)
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">P&L Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">+$1,234.56</div>
                <div className="text-gray-400 text-sm">Depuis le début</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Trades Actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">3</div>
                <div className="text-gray-400 text-sm">Positions ouvertes</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Trading;
