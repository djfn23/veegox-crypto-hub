
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { QuickNavigation } from "@/components/layout/QuickNavigation";
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from "lucide-react";

const Dashboard = () => {
  return (
    <PageLayout
      title="Tableau de Bord"
      subtitle="Vue d'ensemble de vos activités DeFi"
    >
      <div className="space-y-6">
        {/* Navigation rapide */}
        <QuickNavigation />

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Valeur Totale
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45,231.89</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+20.1%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Rendement Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+12.5%</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+2.1%</span> depuis la semaine dernière
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Positions Actives
              </CardTitle>
              <Activity className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+573</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+201</span> depuis hier
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Communauté Active
              </CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+2350</div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+180.1%</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente et portefeuille */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Activité Récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: "Staking", amount: "+1,234 USDC", time: "Il y a 2h", trend: "up" },
                { type: "Trading", amount: "-0.5 ETH", time: "Il y a 4h", trend: "down" },
                { type: "Yield Farming", amount: "+2,567 DAI", time: "Il y a 6h", trend: "up" },
                { type: "NFT Sale", amount: "+0.8 ETH", time: "Il y a 1j", trend: "up" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {activity.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{activity.type}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    activity.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}>
                    {activity.amount}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Aperçu du Portefeuille
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Ethereum", symbol: "ETH", amount: "2.5", change: "+2.3%" },
                { name: "Bitcoin", symbol: "BTC", amount: "0.15", change: "+1.8%" },
                { name: "USDC", symbol: "USDC", amount: "875.67", change: "0.0%" },
                { name: "Chainlink", symbol: "LINK", amount: "45.2", change: "+5.2%" }
              ].map((token) => (
                <div key={token.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{token.name}</p>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{token.amount}</p>
                    <p className="text-green-400 text-sm">{token.change}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-4">
                Voir le Portefeuille Complet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
