
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  PieChart,
  LineChart
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Analytics = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");

  const analyticsData = [
    {
      title: "Volume Total",
      value: "$2.4M",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-blue-400"
    },
    {
      title: "Utilisateurs Actifs",
      value: "15.2K",
      change: "+8.3%",
      icon: Users,
      color: "text-green-400"
    },
    {
      title: "Transactions",
      value: "45.7K",
      change: "+15.7%",
      icon: Activity,
      color: "text-purple-400"
    },
    {
      title: "TVL Total",
      value: "$8.9M",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-orange-400"
    }
  ];

  const protocolMetrics = [
    { metric: "Staking APY", value: "12.5%", trend: "up" },
    { metric: "Liquidity Pools", value: "24", trend: "up" },
    { metric: "Governance Proposals", value: "8", trend: "stable" },
    { metric: "Active Campaigns", value: "12", trend: "up" }
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Analytics & Métriques</h1>
        <p className="text-gray-400 text-sm md:text-base px-2 md:px-0">
          Analysez les performances et tendances de l'écosystème
        </p>
      </div>

      {/* Key Metrics - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {analyticsData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className={`h-5 w-5 md:h-6 md:w-6 ${item.color}`} />
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.change.startsWith('+') ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                  }`}>
                    {item.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm text-gray-400">{item.title}</p>
                  <p className="text-lg md:text-2xl font-bold text-white">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="overview"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            {isMobile ? "Vue d'ensemble" : "Vue d'ensemble"}
          </TabsTrigger>
          <TabsTrigger 
            value="defi"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            DeFi
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            {isMobile ? "Utilisateurs" : "Utilisateurs"}
          </TabsTrigger>
          <TabsTrigger 
            value="revenue"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            {isMobile ? "Revenus" : "Revenus"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Chart Container - Responsive */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Volume de Trading (7j)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-48' : 'h-64'} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
                  <div className="text-center text-gray-400">
                    <BarChart3 className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-2 opacity-50`} />
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Graphique de volume</p>
                    <p className="text-xs opacity-75">Données en temps réel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Protocol Metrics */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5" />
                  Métriques du Protocole
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {protocolMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{metric.metric}</p>
                      <p className="text-gray-400 text-xs">Dernière mise à jour</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm">{metric.value}</span>
                      {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                      {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                      {metric.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <LineChart className="h-5 w-5" />
                  TVL Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-48' : 'h-64'} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
                  <div className="text-center text-gray-400">
                    <LineChart className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-2 opacity-50`} />
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Évolution du TVL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <PieChart className="h-5 w-5" />
                  Distribution des Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-48' : 'h-64'} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
                  <div className="text-center text-gray-400">
                    <PieChart className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-2 opacity-50`} />
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Répartition des assets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defi" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Pools de Liquidité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['ETH/USDC', 'BTC/ETH', 'MATIC/USDC'].map((pair, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white text-sm">{pair}</span>
                      <div className="text-right">
                        <div className="text-green-400 text-sm font-mono">15.2% APY</div>
                        <div className="text-gray-400 text-xs">$2.1M TVL</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Staking Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">67%</div>
                    <div className="text-sm text-gray-400">Tokens en Staking</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold text-white">12.5%</div>
                      <div className="text-xs text-gray-400">APY Moyen</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-lg font-bold text-white">5.2K</div>
                      <div className="text-xs text-gray-400">Stakers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Analyse des Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${isMobile ? 'h-48' : 'h-64'} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
                <div className="text-center text-gray-400">
                  <Users className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-2 opacity-50`} />
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Analytics utilisateurs</p>
                  <p className="text-xs opacity-75">Données détaillées bientôt</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Analyse des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${isMobile ? 'h-48' : 'h-64'} bg-slate-800/50 rounded-lg flex items-center justify-center`}>
                <div className="text-center text-gray-400">
                  <DollarSign className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-2 opacity-50`} />
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>Suivi des revenus</p>
                  <p className="text-xs opacity-75">Métriques de performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
