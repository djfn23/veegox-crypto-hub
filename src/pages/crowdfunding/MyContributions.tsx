
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MyContributions() {
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  const { data: contributions, isLoading } = useQuery({
    queryKey: ['my-crowdfunding-contributions', activeTab],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];
      
      let query = supabase
        .from('crowdfunding_contributions')
        .select(`
          *,
          crowdfunding_campaigns (
            id,
            title,
            description,
            status,
            target_amount,
            current_amount,
            end_date,
            banner_image_url,
            category
          )
        `)
        .eq('contributor_id', userData.user.id)
        .order('contribution_date', { ascending: false });
      
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const totalContributed = contributions?.reduce((sum, contrib) => sum + Number(contrib.amount), 0) || 0;
  const activeCampaigns = contributions?.filter(contrib => contrib.crowdfunding_campaigns?.status === 'active').length || 0;
  const completedCampaigns = contributions?.filter(contrib => contrib.crowdfunding_campaigns?.status === 'completed').length || 0;

  return (
    <PageLayout
      title="Mes Contributions"
      subtitle="Suivez vos investissements et leurs performances"
      icon={<Heart className="h-6 w-6 text-pink-400" />}
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

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Total Contribué</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  ${formatAmount(totalContributed)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Campagnes Actives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {activeCampaigns}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-sm">Campagnes Terminées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400">
                  {completedCampaigns}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Toutes
              </TabsTrigger>
              <TabsTrigger value="active" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Actives
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Terminées
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-400">Chargement de vos contributions...</div>
              ) : contributions && contributions.length > 0 ? (
                <div className="space-y-4">
                  {contributions
                    .filter(contrib => {
                      if (activeTab === 'all') return true;
                      return contrib.crowdfunding_campaigns?.status === activeTab;
                    })
                    .map((contribution) => {
                      const campaign = contribution.crowdfunding_campaigns;
                      if (!campaign) return null;
                      
                      return (
                        <Card key={contribution.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                              <div className="md:col-span-2">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="text-white font-semibold text-lg line-clamp-1">
                                    {campaign.title}
                                  </h3>
                                  {getStatusBadge(campaign.status)}
                                </div>
                                
                                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                                  {campaign.description}
                                </p>
                                
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
                              </div>
                              
                              <div className="space-y-2">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-blue-400">
                                    ${formatAmount(contribution.amount)}
                                  </div>
                                  <div className="text-xs text-gray-400">Ma contribution</div>
                                </div>
                                
                                <div className="text-center">
                                  <div className="text-sm text-gray-300">
                                    {new Date(contribution.contribution_date).toLocaleDateString('fr-FR')}
                                  </div>
                                  <div className="text-xs text-gray-400">Date de contribution</div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <Link to={`/crowdfunding/${campaign.id}`}>
                                  <Button variant="outline" size="sm" className="w-full">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Voir campagne
                                  </Button>
                                </Link>
                                
                                {contribution.reward_claimed ? (
                                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30 justify-center">
                                    Récompense réclamée
                                  </Badge>
                                ) : campaign.status === 'completed' ? (
                                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                    Réclamer récompense
                                  </Button>
                                ) : (
                                  <Badge variant="outline" className="justify-center">
                                    En attente
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              ) : (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Aucune contribution</h3>
                      <p className="text-gray-400 mb-4">
                        Vous n'avez pas encore contribué à des campagnes
                      </p>
                      <Link to="/crowdfunding/campaigns">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Découvrir les campagnes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
