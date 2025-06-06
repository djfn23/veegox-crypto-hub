
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, Users, TrendingUp, Plus, ArrowRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingModule() {
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['crowdfunding-campaigns', activeTab],
    queryFn: async () => {
      let query = supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activeTab !== 'all') {
        query = query.eq('status', activeTab);
      }
      
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
          <Link to="/create-campaign">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer une campagne
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="all"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🌟 Toutes" : "Toutes"}
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🔥 Actives" : "Actives"}
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "✅ Terminées" : "Terminées"}
          </TabsTrigger>
          <TabsTrigger 
            value="trending"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📈 Tendances" : "Tendances"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 md:mt-6">
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Chargement des campagnes...</div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {campaigns.map((campaign) => (
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
                    <Link to="/create-campaign">
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
        </TabsContent>
      </Tabs>

      {/* Statistics Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Statistiques Globales</h2>
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
      </div>
    </div>
  );
}
