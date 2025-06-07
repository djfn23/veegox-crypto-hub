
import { PageLayout } from "@/components/layout/PageLayout";
import { RealTimeMarketData } from "@/components/analytics/RealTimeMarketData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Données simulées pour les graphiques
const priceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  price: 2500 + Math.sin(i * 0.2) * 200 + Math.random() * 100,
  volume: 50000000 + Math.random() * 20000000
}));

const tvlData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
  tvl: 2000000000 + Math.random() * 400000000,
  users: 40000 + Math.random() * 10000
}));

const Analytics = () => {
  return (
    <PageLayout
      title="Analytics & Métriques"
      subtitle="Suivez les performances de la plateforme et du marché en temps réel"
    >
      <div className="space-y-6">
        {/* Market Data Overview */}
        <RealTimeMarketData />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">TVL Total</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={2340000000} prefix="$" />
                  </div>
                </div>
                <div className="p-3 bg-green-500/20 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+5.2%</span>
                <span className="text-gray-400 text-sm ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Volume 24h</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={89500000} prefix="$" />
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                <span className="text-red-400 text-sm">-2.1%</span>
                <span className="text-gray-400 text-sm ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Utilisateurs Actifs</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={45230} />
                  </div>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+12.8%</span>
                <span className="text-gray-400 text-sm ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Gas Price</p>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedNumber value={25.6} suffix=" Gwei" decimals={1} />
                  </div>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-full">
                  <Zap className="h-6 w-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                <span className="text-red-400 text-sm">-8.3%</span>
                <span className="text-gray-400 text-sm ml-1">vs hier</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Prix ETH (30 jours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">TVL Evolution (7 jours)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={tvlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tvl" 
                    stroke="#10B981" 
                    fill="url(#colorTvl)"
                  />
                  <defs>
                    <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Protocol Stats */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Statistiques des Protocoles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="text-gray-300 font-medium">Top Pools de Liquidité</h4>
                {['ETH/USDC', 'MATIC/USDT', 'WBTC/ETH'].map((pair, i) => (
                  <div key={pair} className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                    <span className="text-white">{pair}</span>
                    <div className="text-right">
                      <div className="text-green-400 text-sm">APY: {(15 + i * 3).toFixed(1)}%</div>
                      <div className="text-gray-400 text-xs">TVL: ${(50 - i * 10)}M</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-gray-300 font-medium">Pools de Staking</h4>
                {['ETH 2.0', 'MATIC', 'DOT'].map((token, i) => (
                  <div key={token} className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                    <span className="text-white">{token}</span>
                    <div className="text-right">
                      <div className="text-blue-400 text-sm">APR: {(8 + i * 2).toFixed(1)}%</div>
                      <div className="text-gray-400 text-xs">Staked: ${(200 + i * 50)}M</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-gray-300 font-medium">Marchés de Prêt</h4>
                {['USDC', 'USDT', 'DAI'].map((token, i) => (
                  <div key={token} className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                    <span className="text-white">{token}</span>
                    <div className="text-right">
                      <div className="text-purple-400 text-sm">
                        Borrow: {(5 + i).toFixed(1)}% | Supply: {(3 + i * 0.5).toFixed(1)}%
                      </div>
                      <div className="text-gray-400 text-xs">Util: {(75 + i * 5)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Analytics;
