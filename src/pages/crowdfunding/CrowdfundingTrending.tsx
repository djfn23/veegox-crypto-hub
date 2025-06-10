
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Users, ArrowUp } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingTrending() {
  const isMobile = useIsMobile();

  const trendingCampaigns = [
    {
      id: 1,
      title: "GameFi Platform Innovante",
      description: "Plateforme de jeux blockchain avec économie P2E",
      raised: 320000,
      goal: 500000,
      backers: 189,
      daysLeft: 15,
      category: "GameFi",
      trend: "+45%"
    },
    {
      id: 2,
      title: "Metaverse Real Estate",
      description: "Investissement immobilier dans le metaverse",
      raised: 678000,
      goal: 800000,
      backers: 298,
      daysLeft: 6,
      category: "Metaverse",
      trend: "+32%"
    },
    {
      id: 3,
      title: "Green Energy DAO",
      description: "DAO pour le financement d'énergie verte",
      raised: 156000,
      goal: 300000,
      backers: 87,
      daysLeft: 22,
      category: "Green",
      trend: "+28%"
    }
  ];

  return (
    <PageLayout
      title="Campagnes Tendances"
      subtitle="Les projets qui gagnent en popularité rapidement"
      icon={<TrendingUp className="h-6 w-6 text-green-400" />}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-white text-lg">{campaign.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{campaign.description}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600">{campaign.category}</Badge>
                        <div className="flex items-center space-x-1 text-green-400 text-sm">
                          <ArrowUp className="h-3 w-3" />
                          <span>{campaign.trend}</span>
                        </div>
                      </div>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-400" />
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
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{campaign.backers}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{campaign.daysLeft}j</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
