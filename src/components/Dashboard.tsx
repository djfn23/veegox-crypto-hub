
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
import { MobileContainer, MobileSection, MobileGrid, MobileCard, MobileHeading, MobileText } from "@/components/ui/mobile-components";
import { TouchButton } from "@/components/ui/mobile-touch-target";

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
      <MobileContainer centered>
        <MobileSection>
          <MobileGrid cols={isMobile ? 2 : 4} gap="default">
            {[...Array(4)].map((_, i) => (
              <MobileCard key={i} variant="glass">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20 bg-white/10" />
                  <Skeleton className="h-8 w-16 bg-white/10" />
                </div>
              </MobileCard>
            ))}
          </MobileGrid>
        </MobileSection>
      </MobileContainer>
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
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Tokens Créés",
      value: stats?.tokensCount || 0,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Campagnes",
      value: stats?.campaignsCount || 0,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Fonds Levés",
      value: `$${(stats?.totalRaised || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    }
  ];

  return (
    <MobileContainer centered>
      <div className="space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <MobileSection size="sm">
          <div className="text-center md:text-left space-y-2">
            <MobileHeading level={1} className="animate-mobile-fade-in">
              Tableau de Bord
            </MobileHeading>
            <MobileText className="animate-mobile-fade-in" style={{ animationDelay: '0.1s' }}>
              Bienvenue sur votre plateforme Web3 tout-en-un
            </MobileText>
          </div>
        </MobileSection>

        {/* Stats Grid */}
        <MobileSection size="sm">
          <MobileGrid cols={isMobile ? 2 : 4} gap="default">
            {statCards.map((stat, index) => (
              <MobileCard 
                key={index} 
                variant="glass" 
                interactive
                className="animate-mobile-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1 min-w-0">
                    <MobileText variant="caption" className="text-gray-400 uppercase tracking-wide font-medium">
                      {stat.title}
                    </MobileText>
                    <div className="text-xl md:text-2xl font-bold text-white truncate">
                      {stat.value}
                    </div>
                  </div>
                  <div className={`p-2 md:p-3 rounded-xl ${stat.bgColor} flex-shrink-0`}>
                    <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
                  </div>
                </div>
              </MobileCard>
            ))}
          </MobileGrid>
        </MobileSection>

        {/* Quick Actions */}
        <MobileSection size="sm">
          <div className="space-y-4">
            <MobileHeading level={2}>Actions Rapides</MobileHeading>
            <MobileGrid cols={isMobile ? 2 : 4} gap="default">
              {quickActions.map((action, index) => (
                <TouchButton
                  key={index}
                  size="lg"
                  variant="none"
                  className={`bg-gradient-to-r ${action.color} hover:opacity-90 transition-all duration-300 h-16 md:h-20 group rounded-xl animate-mobile-bounce`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.location.href = action.href}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <action.icon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform text-white" />
                    <span className="text-xs md:text-sm font-medium text-white">{action.name}</span>
                  </div>
                </TouchButton>
              ))}
            </MobileGrid>
          </div>
        </MobileSection>

        {/* Recent Activity */}
        <MobileSection size="sm">
          <MobileGrid cols={isMobile ? 1 : 2} gap="lg">
            <MobileCard variant="glass" className="animate-mobile-slide-up">
              <div className="space-y-4">
                <div>
                  <MobileHeading level={3} className="mb-2">Transactions Récentes</MobileHeading>
                  <MobileText variant="caption">
                    Vos dernières activités blockchain
                  </MobileText>
                </div>
                
                {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentTransactions.map((tx, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg mobile-interactive">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                            {tx.tx_type === 'send' ? (
                              <ArrowUpRight className="h-4 w-4 text-red-400" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-green-400" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white truncate">
                              {tx.tx_type === 'send' ? 'Envoi' : 'Réception'}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(tx.timestamp || '').toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {tx.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <MobileText variant="caption">Aucune transaction récente</MobileText>
                  </div>
                )}
              </div>
            </MobileCard>

            <MobileCard variant="glass" className="animate-mobile-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4">
                <div>
                  <MobileHeading level={3} className="mb-2">Performances</MobileHeading>
                  <MobileText variant="caption">
                    Aperçu de votre activité
                  </MobileText>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg mobile-interactive">
                    <MobileText variant="caption">Tokens créés ce mois</MobileText>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex-shrink-0">
                      {stats?.tokensCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg mobile-interactive">
                    <MobileText variant="caption">Campagnes actives</MobileText>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex-shrink-0">
                      {stats?.campaignsCount || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg mobile-interactive">
                    <MobileText variant="caption">Portefeuilles connectés</MobileText>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex-shrink-0">
                      {stats?.walletsCount || 0}
                    </Badge>
                  </div>
                </div>
              </div>
            </MobileCard>
          </MobileGrid>
        </MobileSection>
      </div>
    </MobileContainer>
  );
};

export default Dashboard;
