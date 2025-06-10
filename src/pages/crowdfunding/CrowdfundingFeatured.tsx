
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Clock, Users } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingFeatured() {
  const isMobile = useIsMobile();

  const featuredCampaigns = [
    {
      id: 1,
      title: "DeFi Protocol révolutionnaire",
      description: "Un nouveau protocole DeFi qui change la donne",
      raised: 850000,
      goal: 1000000,
      backers: 234,
      daysLeft: 12,
      category: "DeFi"
    },
    {
      id: 2,
      title: "NFT Marketplace Next-Gen",
      description: "Marketplace NFT avec IA intégrée",
      raised: 420000,
      goal: 750000,
      backers: 156,
      daysLeft: 8,
      category: "NFT"
    }
  ];

  return (
    <PageLayout
      title="Campagnes Vedettes"
      subtitle="Découvrez les projets les plus prometteurs sélectionnés par notre équipe"
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
          
          <div className="space-y-6">
            {featuredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-white">{campaign.title}</CardTitle>
                      <p className="text-gray-400">{campaign.description}</p>
                      <Badge className="bg-yellow-600">{campaign.category}</Badge>
                    </div>
                    <Star className="h-6 w-6 text-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Collecté</span>
                      <span className="text-white">${campaign.raised.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(campaign.raised / campaign.goal) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Objectif: ${campaign.goal.toLocaleString()}</span>
                      <span className="text-green-400">{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{campaign.backers} contributeurs</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{campaign.daysLeft} jours restants</span>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Contribuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
