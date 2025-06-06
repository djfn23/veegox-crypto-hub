
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Fetch user's wallets
      const { data: wallets } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id);

      // Fetch user's tokens
      const { data: tokens } = await supabase
        .from('tokens')
        .select('*')
        .eq('creator_id', user.id);

      // Fetch user's campaigns
      const { data: campaigns } = await supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .eq('creator_id', user.id);

      // Fetch recent transactions from transactions_history table
      const { data: transactions } = await supabase
        .from('transactions_history')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(5);

      return {
        walletsCount: wallets?.length || 0,
        tokensCount: tokens?.length || 0,
        campaignsCount: campaigns?.length || 0,
        totalRaised: campaigns?.reduce((sum, c) => sum + (c.current_amount || 0), 0) || 0,
        recentTransactions: transactions || []
      };
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 p-4 lg:p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white/5 border-white/10">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 bg-white/10" />
                <Skeleton className="h-8 w-16 bg-white/10" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const quickActions = [
    { name: "Créer Token", icon: Plus, href: "/tokens", color: "from-blue-500 to-purple-500" },
    { name: "Nouvelle Campagne", icon: Plus, href: "/create-campaign", color: "from-green-500 to-teal-500" },
    { name: "Portefeuille", icon: Eye, href: "/wallet", color: "from-orange-500 to-red-500" },
    { name: "Swap Tokens", icon: Activity, href: "/exchange", color: "from-purple-500 to-pink-500" },
  ];

  const statCards = [
    {
      title: "Portefeuilles",
      value: stats?.walletsCount || 0,
      icon: Wallet,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Tokens Créés",
      value: stats?.tokensCount || 0,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Campagnes",
      value: stats?.campaignsCount || 0,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Fonds Levés",
      value: `$${(stats?.totalRaised || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="space-y-4 md:space-y-8 p-4 lg:p-0">
      {/* Welcome Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
          Tableau de Bord
        </h1>
        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
          Bienvenue sur votre plateforme Web3 tout-en-un
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">Actions Rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              asChild
              size={isMobile ? "lg" : "default"}
              className={`bg-gradient-to-r ${action.color} hover:opacity-90 transition-all duration-300 min-h-[60px] md:min-h-[80px] group`}
            >
              <a href={action.href} className="flex flex-col items-center space-y-2">
                <action.icon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
                <span className="text-xs md:text-sm font-medium">{action.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-base md:text-lg">Transactions Récentes</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Vos dernières activités blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {stats.recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        {tx.tx_type === 'send' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-400" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tx.tx_type === 'send' ? 'Envoi' : 'Réception'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(tx.timestamp || '').toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Aucune transaction récente</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-base md:text-lg">Performances</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Aperçu de votre activité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Tokens créés ce mois</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {stats?.tokensCount || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Campagnes actives</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {stats?.campaignsCount || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Portefeuilles connectés</span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {stats?.walletsCount || 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
