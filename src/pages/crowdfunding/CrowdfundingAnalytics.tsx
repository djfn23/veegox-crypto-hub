
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Calendar } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingAnalytics() {
  const isMobile = useIsMobile();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['crowdfunding-analytics'],
    queryFn: async () => {
      const { data: campaigns, error } = await supabase
        .from('crowdfunding_campaigns')
        .select('*');
      
      if (error) throw error;
      
      const { data: contributions, error: contribError } = await supabase
        .from('crowdfunding_contributions')
        .select('*');
        
      if (contribError) throw contribError;
      
      return {
        campaigns: campaigns || [],
        contributions: contributions || []
      };
    },
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <PageLayout
        title="Analytics Crowdfunding"
        subtitle="Analyse des performances et tendances"
        icon={<BarChart3 className="h-6 w-6 text-blue-400" />}
      >
        <div className="text-center py-8 text-gray-400">Chargement des analytics...</div>
      </PageLayout>
    );
  }

  const campaigns = stats?.campaigns || [];
  const contributions = stats?.contributions || [];
  
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
  const totalFundsRaised = campaigns.reduce((sum, c) => sum + Number(c.current_amount), 0);
  const totalFundsTarget = campaigns.reduce((sum, c) => sum + Number(c.target_amount), 0);
  const totalContributions = contributions.length;
  const successRate = totalCampaigns > 0 ? (completedCampaigns / totalCampaigns) * 100 : 0;
  const averageContribution = totalContributions > 0 ? totalFundsRaised / totalContributions : 0;

  // Category analysis
  const categoryStats = campaigns.reduce((acc, campaign) => {
    const category = campaign.category || 'Autre';
    if (!acc[category]) {
      acc[category] = { count: 0, totalRaised: 0, totalTarget: 0 };
    }
    acc[category].count++;
    acc[category].totalRaised += Number(campaign.current_amount);
    acc[category].totalTarget += Number(campaign.target_amount);
    return acc;
  }, {} as Record<string, { count: number; totalRaised: number; totalTarget: number }>);

  return (
    <PageLayout
      title="Analytics Crowdfunding"
      subtitle="Analyse des performances et tendances"
      icon={<BarChart3 className="h-6 w-6 text-blue-400" />}
    >
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {!isMobile && (
          <div className="lg:col-span-1">
            <CrowdfundingNavigation />
          </div>
        )}
        
        <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
          {isMobile && (
            <div className="mb-4">
              <CrowdfundingNavigation />
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Campagnes Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalCampaigns}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {activeCampaigns} actives, {completedCampaigns} terminées
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Fonds Collectés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  ${formatAmount(totalFundsRaised)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  sur ${formatAmount(totalFundsTarget)} ciblés
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">{totalContributions}</div>
                <div className="text-xs text-gray-400 mt-1">
                  ${formatAmount(averageContribution)} en moyenne
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Taux de Réussite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">
                  {successRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {completedCampaigns} campagnes réussies
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Analysis */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-white">Analyse par Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryStats).map(([category, stats]) => {
                  const successRate = stats.totalTarget > 0 ? (stats.totalRaised / stats.totalTarget) * 100 : 0;
                  
                  return (
                    <div key={category} className="border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{category}</h3>
                        <div className="text-right">
                          <div className="text-blue-400 font-bold">{stats.count} campagnes</div>
                          <div className="text-xs text-gray-400">{successRate.toFixed(1)}% de réussite</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Fonds collectés</div>
                          <div className="text-green-400 font-semibold">
                            ${formatAmount(stats.totalRaised)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Objectif total</div>
                          <div className="text-white font-semibold">
                            ${formatAmount(stats.totalTarget)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaigns
                  .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
                  .slice(0, 5)
                  .map((campaign) => (
                    <div key={campaign.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{campaign.title}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(campaign.created_at || '').toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-semibold">
                          ${formatAmount(campaign.current_amount)}
                        </div>
                        <div className="text-xs text-gray-400">
                          collectés
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
