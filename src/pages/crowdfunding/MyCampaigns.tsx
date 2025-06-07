
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Plus, Edit, BarChart3, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MyCampaigns() {
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['my-crowdfunding-campaigns', activeTab],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return [];
      
      let query = supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .eq('creator_id', userData.user.id)
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
        return <Badge variant="outline">Brouillon</Badge>;
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

  return (
    <PageLayout
      title="Mes Campagnes"
      subtitle="Gérez et suivez vos campagnes de financement"
      icon={<User className="h-6 w-6 text-purple-400" />}
      actions={
        <Link to="/crowdfunding/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle campagne
          </Button>
        </Link>
      }
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Toutes
              </TabsTrigger>
              <TabsTrigger value="active" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Actives
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="completed" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                    Terminées
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                    Brouillons
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-400">Chargement de vos campagnes...</div>
              ) : campaigns && campaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-white text-lg line-clamp-2">
                            {campaign.title}
                          </CardTitle>
                          {getStatusBadge(campaign.status)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Objectif</span>
                            <span className="text-white font-mono">
                              ${formatAmount(campaign.target_amount)}
                            </span>
                          </div>
                          
                          <Progress 
                            value={calculateProgress(campaign.current_amount, campaign.target_amount)} 
                            className="h-2 bg-gray-700"
                          />
                          
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>${formatAmount(campaign.current_amount)} collectés</span>
                            <span>{Math.round(calculateProgress(campaign.current_amount, campaign.target_amount))}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <Link to={`/crowdfunding/${campaign.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </Button>
                          </Link>
                          
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Stats
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <User className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Aucune campagne</h3>
                      <p className="text-gray-400 mb-4">
                        Vous n'avez pas encore créé de campagne de financement
                      </p>
                      <Link to="/crowdfunding/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Créer ma première campagne
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
