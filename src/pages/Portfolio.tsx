import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VeegoxTokenCard } from "@/components/veegox/VeegoxTokenCard";
import { FiatBalanceModule } from "@/components/modules/fiat/FiatBalanceModule";
import { RevenueDashboard } from "@/components/modules/revenue/RevenueDashboard";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { 
  PiggyBank, 
  TrendingUp, 
  DollarSign, 
  Target,
  Download,
  Eye,
  RefreshCw,
  Euro
} from "lucide-react";

const portfolioData = [
  { name: 'Veegox', value: 45, color: '#8B5CF6' },
  { name: 'ETH', value: 25, color: '#3B82F6' },
  { name: 'USDC', value: 15, color: '#10B981' },
  { name: 'BTC', value: 10, color: '#F59E0B' },
  { name: 'Autres', value: 5, color: '#6B7280' }
];

const performanceData = [
  { date: '01/01', value: 1000 },
  { date: '01/02', value: 1200 },
  { date: '01/03', value: 1100 },
  { date: '01/04', value: 1400 },
  { date: '01/05', value: 1350 },
  { date: '01/06', value: 1600 },
  { date: '01/07', value: 1750 }
];

const Portfolio = () => {
  const { user } = useUnifiedAuth();
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <PageLayout
      title="Portfolio"
      subtitle="Vue d'ensemble de vos investissements et performances"
      icon={<PiggyBank className="h-6 w-6 text-purple-400" />}
      actions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-700">
            Portfolio
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-700">
              Revenus Platform
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          {/* Fiat Balance Module */}
          <FiatBalanceModule />

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm">Valeur Totale</p>
                    <p className="text-2xl font-bold text-white">$12,450.32</p>
                    <p className="text-green-400 text-sm">+5.2% (24h)</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Profit/Perte</p>
                    <p className="text-2xl font-bold text-white">+$2,450.32</p>
                    <p className="text-blue-400 text-sm">+24.5% Total</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm">Veegox Holdings</p>
                    <p className="text-2xl font-bold text-white">125,000</p>
                    <p className="text-purple-400 text-sm">45% du portfolio</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-300 text-sm">Tokens Détenus</p>
                    <p className="text-2xl font-bold text-white">8</p>
                    <p className="text-orange-400 text-sm">Diversifié</p>
                  </div>
                  <Eye className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Allocation */}
            <Card className="lg:col-span-1 bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Répartition du Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-300 text-sm">{item.name}</span>
                      </div>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Performance (7 jours)</CardTitle>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                    +24.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Veegox Token Highlight */}
          <VeegoxTokenCard />

          {/* Top Holdings */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Principales Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Veegox Token', symbol: 'VEEGOX', amount: '125,000', value: '$5,625.00', change: '+12.3%', color: 'text-purple-400' },
                  { name: 'Ethereum', symbol: 'ETH', amount: '1.5', value: '$3,112.50', change: '+3.1%', color: 'text-blue-400' },
                  { name: 'USD Coin', symbol: 'USDC', amount: '1,867', value: '$1,867.50', change: '0.0%', color: 'text-green-400' },
                  { name: 'Bitcoin', symbol: 'BTC', amount: '0.025', value: '$1,245.00', change: '-1.2%', color: 'text-orange-400' }
                ].map((token, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${token.color.split('-')[1]}-500 to-${token.color.split('-')[1]}-600 flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{token.name}</p>
                        <p className="text-gray-400 text-sm">{token.amount} {token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{token.value}</p>
                      <p className={`text-sm ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                        {token.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="revenue" className="space-y-6">
            <RevenueDashboard />
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default Portfolio;
