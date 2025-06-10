
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Plus, Heart, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import CrowdfundingModule from "@/components/modules/CrowdfundingModule";
import FeaturedCampaigns from "@/components/modules/crowdfunding/FeaturedCampaigns";
import CrowdfundingStats from "@/components/modules/crowdfunding/CrowdfundingStats";
import CrowdfundingCategories from "@/components/modules/crowdfunding/CrowdfundingCategories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Crowdfunding = () => {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Crowdfunding"
      subtitle="Financez l'innovation blockchain et participez à l'économie décentralisée"
      icon={<Heart className="h-6 w-6 text-pink-400" />}
      actions={
        <div className="flex gap-2">
          <Link to="/crowdfunding/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              {isMobile ? "Créer" : "Créer une campagne"}
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Statistiques */}
        <CrowdfundingStats />

        {/* Onglets principaux */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20`}>
            <TabsTrigger value="featured" className="text-white data-[state=active]:bg-white/20">
              <Star className="h-4 w-4 mr-2" />
              {isMobile ? "Vedettes" : "En Vedette"}
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-white data-[state=active]:bg-white/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              {isMobile ? "Tendances" : "Tendances"}
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="categories" className="text-white data-[state=active]:bg-white/20">
                  Catégories
                </TabsTrigger>
                <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/20">
                  Toutes
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="featured" className="mt-6">
            <FeaturedCampaigns />
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Tendances du Moment</h2>
                <p className="text-gray-400">Les projets qui montent en ce moment</p>
              </div>
              
              <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-400" />
                    Projets en Forte Croissance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Découvrez les projets qui génèrent le plus d'engagement et d'investissements cette semaine.
                  </p>
                  <div className="mt-4">
                    <Link to="/crowdfunding/trending">
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        Voir les Tendances
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {!isMobile && (
            <>
              <TabsContent value="categories" className="mt-6">
                <CrowdfundingCategories />
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <CrowdfundingModule />
              </TabsContent>
            </>
          )}
        </Tabs>

        {/* Module mobile - affiché en bas pour mobile */}
        {isMobile && (
          <div className="space-y-6">
            <CrowdfundingCategories />
            <div>
              <Link to="/crowdfunding/campaigns">
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Voir Toutes les Campagnes
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à Lancer Votre Projet ?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers d'entrepreneurs qui utilisent notre plateforme pour financer 
              leurs innovations blockchain. Créez votre campagne en quelques minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/crowdfunding/create">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Créer ma Campagne
                </Button>
              </Link>
              <Link to="/help">
                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  En Savoir Plus
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Crowdfunding;
