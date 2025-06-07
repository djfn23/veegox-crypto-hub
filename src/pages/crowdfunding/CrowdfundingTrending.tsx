
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Users, DollarSign, ArrowRight, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingTrending() {
  const isMobile = useIsMobile();

  const { data: trendingCampaigns, isLoading } = useQuery({
    queryKey: ['crowdfunding-trending'],
    queryFn: async () => {
      // Get campaigns with their contribution counts and recent activity
      const { data: campaigns, error } = await supabase
        .from('crowdfunding_campaigns')
        .select(`
          *,
          crowdfunding_contributions (
            id,
            amount,
            contribution_date
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Calculate trending score based on recent contributions and funding velocity
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const campaignsWithTrending = campaigns?.map(campaign => {
        const contributions = campaign.crowdfunding_contributions || [];
        const recentContributions = contributions.filter(c => 
          new Date(c.contribution_date) > weekAgo
        );
        
        const recentAmount = recentContributions.reduce((sum, c) => sum + Number(c.amount), 0);
        const progressPercentage = (campaign.current_amount / campaign.target_amount) * 100;
        const daysOld = Math.max(1, (now.getTime() - new Date(campaign.created_at).getTime()) / (1000 * 60 * 60 * 24));
        
        // Trending score: recent activity + progress + velocity
        const trendingScore = (recentAmount * 10) + (progressPercentage * 2) + (contributions.length * 5) - (daysOld * 0.5);
        
        return {
          ...campaign,
          contributionsCount: contributions.length,
          recentContributions: recentContributions.length,
          recentAmount,
          trendingScore,
          progressPercentage
        };
      }).sort((a, b) => b.trendingScore - a.trendingScore) || [];
      
      return campaignsWithTrending;
    },
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Actif</Badge>;
      case 'completed':
        return <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Terminé</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Annulé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <PageLayout
      title="Tendances"
      subtitle="Les campagnes les plus populaires en ce moment"
      icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
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

          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Chargement des tendances...</div>
          ) : trendingCampaigns && trendingCampaigns.length > 0 ? (
            <div className="space-y-6">
              {/* Top 3 Trending */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-400" />
                  Top 3 Tendances
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trendingCampaigns.slice(0, 3).map((campaign, index) => (
                    <Card key={campaign.id} className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-orange-500 text-white">
                          #{index + 1}
                        </Badge>
                      </div>
                      
                      {campaign.banner_image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={campaign.banner_image_url} 
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg line-clamp-2">
                          {campaign.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Progress 
                            value={calculateProgress(campaign.current_amount, campaign.target_amount)} 
                            className="h-2 bg-gray-700"
                          />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>${formatAmount(campaign.current_amount)} collectés</span>
                            <span>{Math.round(calculateProgress(campaign.current_amount, campaign.target_amount))}%</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-orange-400 font-bold">{campaign.contributionsCount}</div>
                            <div className="text-gray-400">Contributeurs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-bold">{campaign.recentContributions}</div>
                            <div className="text-gray-400">Cette semaine</div>
                          </div>
                        </div>

                        <Link to={`/crowdfunding/${campaign.id}`}>
                          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Contribuer
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Trending Campaigns */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Toutes les Tendances</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingCampaigns.slice(3).map((campaign, index) => (
                    <Card key={campaign.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                              #{index + 4}
                            </Badge>
                            {campaign.category && (
                              <Badge variant="outline" className="text-gray-300 border-gray-600">
                                {campaign.category}
                              </Badge>
                            )}
                          </div>
                          {getStatusBadge(campaign.status)}
                        </div>

                        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                          {campaign.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                          {campaign.description}
                        </p>

                        <div className="space-y-3">
                          <Progress 
                            value={calculateProgress(campaign.current_amount, campaign.target_amount)} 
                            className="h-2 bg-gray-700"
                          />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Objectif</span>
                            <span className="text-white font-mono">
                              ${formatAmount(campaign.target_amount)}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs text-center">
                            <div>
                              <div className="text-blue-400 font-bold">${formatAmount(campaign.current_amount)}</div>
                              <div className="text-gray-400">Collectés</div>
                            </div>
                            <div>
                              <div className="text-green-400 font-bold">{campaign.contributionsCount}</div>
                              <div className="text-gray-400">Contributeurs</div>
                            </div>
                            <div>
                              <div className="text-orange-400 font-bold">{campaign.recentContributions}</div>
                              <div className="text-gray-400">Récents</div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Link to={`/crowdfunding/${campaign.id}`}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors">
                              <DollarSign className="h-4 w-4 mr-2" />
                              Contribuer
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <TrendingUp className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Aucune tendance</h3>
                  <p className="text-gray-400 mb-4">
                    Aucune campagne tendance trouvée pour le moment
                  </p>
                  <Link to="/crowdfunding/campaigns">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Voir toutes les campagnes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
