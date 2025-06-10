
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Plus, Edit, BarChart3 } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MyCampaigns() {
  const isMobile = useIsMobile();

  const myCampaigns = [
    {
      id: 1,
      title: "Mon Projet DeFi",
      status: "Active",
      raised: 45000,
      goal: 100000,
      backers: 23,
      daysLeft: 18
    },
    {
      id: 2,
      title: "NFT Collection Artistique",
      status: "Terminée",
      raised: 75000,
      goal: 50000,
      backers: 156,
      daysLeft: 0
    }
  ];

  return (
    <PageLayout
      title="Mes Campagnes"
      subtitle="Gérez vos projets de crowdfunding"
      icon={<FolderOpen className="h-6 w-6 text-purple-400" />}
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
            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Campagne
              </Button>
            </div>

            {myCampaigns.length > 0 ? (
              <div className="space-y-4">
                {myCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="bg-slate-900/50 border-slate-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white">{campaign.title}</CardTitle>
                          <Badge 
                            variant={campaign.status === "Active" ? "default" : "secondary"}
                            className="mt-2"
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="text-white border-white/20">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-white border-white/20">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
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
                      
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{campaign.backers} contributeurs</span>
                        <span>
                          {campaign.daysLeft > 0 ? `${campaign.daysLeft} jours restants` : "Terminée"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-12 text-center">
                  <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Aucune campagne</h3>
                  <p className="text-gray-400 mb-6">Vous n'avez pas encore créé de campagne de crowdfunding</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer ma première campagne
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
