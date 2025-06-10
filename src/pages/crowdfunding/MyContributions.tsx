
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, DollarSign } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MyContributions() {
  const isMobile = useIsMobile();

  const myContributions = [
    {
      id: 1,
      campaignTitle: "DeFi Protocol révolutionnaire",
      amount: 500,
      date: "2024-01-15",
      status: "En cours",
      category: "DeFi"
    },
    {
      id: 2,
      campaignTitle: "NFT Marketplace Next-Gen",
      amount: 250,
      date: "2024-01-10",
      status: "Financé",
      category: "NFT"
    },
    {
      id: 3,
      campaignTitle: "Green Energy DAO",
      amount: 1000,
      date: "2024-01-05",
      status: "En cours",
      category: "Green"
    }
  ];

  const totalContributed = myContributions.reduce((sum, contrib) => sum + contrib.amount, 0);

  return (
    <PageLayout
      title="Mes Contributions"
      subtitle="Suivez vos investissements et contributions"
      icon={<Heart className="h-6 w-6 text-red-400" />}
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
            {/* Résumé */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${totalContributed}</div>
                  <div className="text-sm text-gray-400">Total contribué</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{myContributions.length}</div>
                  <div className="text-sm text-gray-400">Projets soutenus</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-sm text-gray-400">Projets en cours</div>
                </CardContent>
              </Card>
            </div>

            {/* Liste des contributions */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Historique des Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myContributions.map((contribution) => (
                    <div 
                      key={contribution.id} 
                      className="flex items-center justify-between p-4 bg-slate-800 rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="text-white font-medium">{contribution.campaignTitle}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-600">{contribution.category}</Badge>
                          <Badge 
                            variant={contribution.status === "Financé" ? "default" : "secondary"}
                          >
                            {contribution.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{contribution.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${contribution.amount}</div>
                        <div className="text-gray-400 text-sm">Contribution</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
