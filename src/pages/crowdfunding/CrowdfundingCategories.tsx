
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Grid3X3, Gamepad2, Coins, Smartphone, Users } from "lucide-react";
import { Link } from "react-router-dom";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const categories = [
    {
      name: "DeFi",
      icon: Coins,
      description: "Finance décentralisée et protocoles",
      color: "bg-green-600/20 text-green-400 border-green-600/30"
    },
    {
      name: "NFT",
      icon: Grid3X3,
      description: "Collections et marketplaces NFT",
      color: "bg-purple-600/20 text-purple-400 border-purple-600/30"
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Jeux blockchain et GameFi",
      color: "bg-blue-600/20 text-blue-400 border-blue-600/30"
    },
    {
      name: "Infrastructure",
      icon: Smartphone,
      description: "Outils et infrastructure blockchain",
      color: "bg-orange-600/20 text-orange-400 border-orange-600/30"
    },
    {
      name: "Social",
      icon: Users,
      description: "Réseaux sociaux décentralisés",
      color: "bg-pink-600/20 text-pink-400 border-pink-600/30"
    }
  ];

  const { data: categoryStats, isLoading } = useQuery({
    queryKey: ['crowdfunding-categories'],
    queryFn: async () => {
      const { data: campaigns, error } = await supabase
        .from('crowdfunding_campaigns')
        .select('*');
      
      if (error) throw error;
      
      const stats = categories.reduce((acc, category) => {
        const categoryData = campaigns?.filter(c => c.category === category.name) || [];
        acc[category.name] = {
          count: categoryData.length,
          activeCount: categoryData.filter(c => c.status === 'active').length,
          totalRaised: categoryData.reduce((sum, c) => sum + Number(c.current_amount), 0),
          campaigns: categoryData.slice(0, 3) // Top 3 campaigns
        };
        return acc;
      }, {} as Record<string, any>);
      
      return stats;
    },
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <PageLayout
      title="Catégories"
      subtitle="Explorez les projets par secteur d'activité"
      icon={<Search className="h-6 w-6 text-indigo-400" />}
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
            <div className="text-center py-8 text-gray-400">Chargement des catégories...</div>
          ) : (
            <div className="space-y-6">
              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const stats = categoryStats?.[category.name] || { count: 0, activeCount: 0, totalRaised: 0, campaigns: [] };
                  
                  return (
                    <Card 
                      key={category.name} 
                      className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer ${
                        selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Icon className="h-8 w-8 text-blue-400" />
                          <Badge className={category.color}>
                            {stats.count}
                          </Badge>
                        </div>
                        <CardTitle className="text-white">{category.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Campagnes actives</span>
                            <span className="text-green-400">{stats.activeCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Fonds collectés</span>
                            <span className="text-blue-400">${formatAmount(stats.totalRaised)}</span>
                          </div>
                        </div>

                        <Link 
                          to={`/crowdfunding/campaigns?category=${category.name}`}
                          className="inline-block w-full mt-4"
                        >
                          <div className="text-center text-blue-400 hover:text-blue-300 text-sm font-medium">
                            Voir toutes les campagnes →
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Selected Category Details */}
              {selectedCategory && categoryStats?.[selectedCategory] && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Campagnes Populaires - {selectedCategory}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoryStats[selectedCategory].campaigns.map((campaign: any) => (
                        <Link 
                          key={campaign.id} 
                          to={`/crowdfunding/${campaign.id}`}
                          className="block"
                        >
                          <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <div className="flex-1">
                              <h3 className="text-white font-medium mb-1">{campaign.title}</h3>
                              <p className="text-gray-400 text-sm line-clamp-1">{campaign.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-blue-400 font-semibold">
                                ${formatAmount(campaign.current_amount)}
                              </div>
                              <div className="text-xs text-gray-400">
                                collectés
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
