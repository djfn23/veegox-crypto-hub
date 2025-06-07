import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Users, DollarSign, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingFeatured() {
  const isMobile = useIsMobile();

  const { data: featuredCampaigns, isLoading } = useQuery({
    queryKey: ['crowdfunding-featured'],
    queryFn: async () => {
      // For now, we'll select campaigns based on certain criteria
      // In a real app, you might have a "featured" flag or admin selection
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
        .order('current_amount', { ascending: false });
      
      if (error) throw error;
      
      // Featured criteria: high funding, good progress, recent activity
      const campaignsWithScore = campaigns?.map(campaign => {
        const contributions = campaign.crowdfunding_contributions || [];
        const progressPercentage = (campaign.current_amount / campaign.target_amount) * 100;
        const contributorsCount = contributions.length;
        
        // Calculate featured score
        const featuredScore = 
          (campaign.current_amount * 0.4) + // Amount raised
          (progressPercentage * 10) + // Progress percentage
          (contributorsCount * 50) + // Number of contributors
          (campaign.category === 'DeFi' ? 100 : 0); // Bonus for certain categories
        
        return {
          ...campaign,
          contributionsCount: contributions.length,
          progressPercentage,
          featuredScore
        };
      }).sort((a, b) => b.featuredScore - a.featuredScore).slice(0, 10) || [];
      
      return campaignsWithScore;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <PageLayout
      title="À la Une"
      subtitle="Campagnes sélectionnées et mises en avant"
      icon={<Star className="h-6 w-6 text-yellow-400" />}
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
            <div className="text-center py-8 text-gray-400">Chargement des campagnes à la une...</div>
          ) : featuredCampaigns && featuredCampaigns.length > 0 ? (
            <div className="space-y-6">
              {/* Hero Featured Campaign */}
              {featuredCampaigns[0] && (
                <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-black font-bold">
                      <Award className="h-3 w-3 mr-1" />
                      FEATURED
                    </Badge>
                  </div>
                  
                  {featuredCampaigns[0].banner_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={featuredCampaigns[0].banner_image_url} 
                        alt={featuredCampaigns[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          {featuredCampaigns[0].category && (
                            <Badge variant="outline" className="text-yellow-300 border-yellow-600">
                              {featuredCampaigns[0].category}
                            </Badge>
                          )}
                          {getStatusBadge(featuredCampaigns[0].status)}
                        </div>
                        
                        <h1 className="text-3xl font-bold text-white mb-4">
                          {featuredCampaigns[0].title}
                        </h1>
                        
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {featuredCampaigns[0].description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Fin: {formatDate(featuredCampaigns[0].end_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{featuredCampaigns[0].contributionsCount} contributeurs</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Objectif</span>
                            <span className="text-white text-xl font-bold">
                              ${formatAmount(featuredCampaigns[0].target_amount)}
                            </span>
                          </div>
                          
                          <Progress 
                            value={calculateProgress(featuredCampaigns[0].current_amount, featuredCampaigns[0].target_amount)} 
                            className="h-3 bg-gray-700"
                          />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              ${formatAmount(featuredCampaigns[0].current_amount)} collectés
                            </span>
                            <span className="text-yellow-400 font-bold">
                              {Math.round(calculateProgress(featuredCampaigns[0].current_amount, featuredCampaigns[0].target_amount))}%
                            </span>
                          </div>
                        </div>

                        <Link to={`/crowdfunding/${featuredCampaigns[0].id}`}>
                          <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-lg py-3">
                            <DollarSign className="h-5 w-5 mr-2" />
                            Contribuer Maintenant
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Other Featured Campaigns */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Autres Campagnes à la Une
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredCampaigns.slice(1).map((campaign, index) => (
                    <Card key={campaign.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 group relative overflow-hidden">
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      
                      {campaign.banner_image_url && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={campaign.banner_image_url} 
                            alt={campaign.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-yellow-300 transition-colors">
                            {campaign.title}
                          </CardTitle>
                          <div className="flex flex-col gap-1">
                            {getStatusBadge(campaign.status)}
                            {campaign.category && (
                              <Badge variant="outline" className="text-xs text-gray-300 border-gray-600">
                                {campaign.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm line-clamp-3">{campaign.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Objectif</span>
                            <span className="text-white font-mono">
                              ${formatAmount(campaign.target_amount)}
                            </span>
                          </div>
                          
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

                          <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>Fin: {formatDate(campaign.end_date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{campaign.contributionsCount} contributeurs</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link to={`/crowdfunding/${campaign.id}`}>
                            <Button 
                              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black group-hover:bg-yellow-500 transition-colors font-semibold"
                              size={isMobile ? "default" : "sm"}
                            >
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
                  <Star className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Aucune campagne à la une</h3>
                  <p className="text-gray-400 mb-4">
                    Aucune campagne sélectionnée pour le moment
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
