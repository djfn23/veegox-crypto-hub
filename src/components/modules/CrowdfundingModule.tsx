import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Users, TrendingUp, Plus, ArrowRight, DollarSign, Star, Grid3X3, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";

export default function CrowdfundingModule() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['crowdfunding-campaigns-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Quick action cards
  const quickActions = [
    {
      title: "Toutes les campagnes",
      description: "Explorez tous les projets disponibles",
      icon: Grid3X3,
      link: "/crowdfunding/campaigns",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30"
    },
    {
      title: "Tendances",
      description: "Découvrez les projets populaires",
      icon: TrendingUp,
      link: "/crowdfunding/trending",
      color: "from-orange-500/20 to-orange-600/20 border-orange-500/30"
    },
    {
      title: "À la une",
      description: "Projets sélectionnés et mis en avant",
      icon: Star,
      link: "/crowdfunding/featured",
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30"
    },
    {
      title: "Analytics",
      description: "Statistiques et performances",
      icon: BarChart3,
      link: "/crowdfunding/analytics",
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30"
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Crowdfunding</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Financez des projets innovants ou lancez votre propre campagne
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/crowdfunding/create">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer une campagne
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Grid - Mobile First */}
      {isMobile && (
        <div className="mb-6">
          <CrowdfundingNavigation />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="overview"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🏠 Accueil" : "Vue d'ensemble"}
          </TabsTrigger>
          <TabsTrigger 
            value="recent"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🆕 Récentes" : "Récentes"}
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger 
                value="actions"
                className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg"
              >
                Actions rapides
              </TabsTrigger>
              <TabsTrigger 
                value="stats"
                className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg"
              >
                Statistiques
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-4 md:mt-6">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'} gap-6`}>
            {!isMobile && (
              <div className="lg:col-span-1">
                <CrowdfundingNavigation />
              </div>
            )}
            
            <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
              {/* Quick Actions for Desktop */}
              {!isMobile && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.link} to={action.link}>
                        <Card className={`bg-gradient-to-br ${action.color} backdrop-blur-sm hover:scale-105 transition-all duration-200 cursor-pointer`}>
                          <CardContent className="p-4 text-center">
                            <Icon className="h-8 w-8 mx-auto mb-2 text-white" />
                            <h3 className="text-white font-semibold text-sm mb-1">{action.title}</h3>
                            <p className="text-gray-300 text-xs">{action.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Recent Campaigns Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Campagnes Récentes</h2>
                  <Link to="/crowdfunding/campaigns">
                    <Button variant="outline" size="sm">
                      Voir toutes
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {isLoading ? (
                  <div className="text-center py-8 text-gray-400">Chargement des campagnes...</div>
                ) : campaigns && campaigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {campaigns.slice(0, isMobile ? 2 : 6).map((campaign) => (
                      <Card key={campaign.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 group">
                        {campaign.banner_image_url && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={campaign.banner_image_url} 
                              alt={campaign.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        )}
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
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
                          <p className="text-gray-300 text-sm line-clamp-2">{campaign.description}</p>
                          
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
                                <span>Contributeurs</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Link to={`/crowdfunding/${campaign.id}`}>
                              <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-500 transition-colors"
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
                ) : (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <Target className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Aucune campagne</h3>
                        <p className="text-gray-400 mb-4">
                          Soyez le premier à lancer une campagne de financement
                        </p>
                        <Link to="/crowdfunding/create">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Créer une campagne
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        
        <TabsContent value="recent" className="mt-4 md:mt-6">
          <div className="text-center py-8 text-gray-400">
            Consultez les campagnes les plus récentes dans la section{" "}
            <Link to="/crowdfunding/campaigns" className="text-blue-400 hover:text-blue-300">
              Toutes les campagnes
            </Link>
          </div>
        </TabsContent>

        {!isMobile && (
          <>
            <TabsContent value="actions" className="mt-4 md:mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.link} to={action.link}>
                      <Card className={`bg-gradient-to-br ${action.color} backdrop-blur-sm hover:scale-105 transition-all duration-200 cursor-pointer`}>
                        <CardContent className="p-6 text-center">
                          <Icon className="h-12 w-12 mx-auto mb-4 text-white" />
                          <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
                          <p className="text-gray-300 text-sm">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-4 md:mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm">Campagnes Totales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{campaigns?.length || 0}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm">Campagnes Actives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">
                      {campaigns?.filter(c => c.status === 'active').length || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm">Fonds Collectés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">
                      ${formatAmount(campaigns?.reduce((sum, c) => sum + Number(c.current_amount), 0) || 0)}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm">Taux de Réussite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">
                      {campaigns && campaigns.length > 0 
                        ? Math.round((campaigns.filter(c => c.status === 'completed').length / campaigns.length) * 100)
                        : 0}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
