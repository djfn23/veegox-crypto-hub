
import { PageLayout } from "@/components/layout/PageLayout";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CrowdfundingTrending = () => {
  return (
    <PageLayout
      title="Campagnes Tendances"
      subtitle="Les projets qui cartonnent en ce moment"
      icon={<TrendingUp className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Projet Tendance #{i}</CardTitle>
                  <Badge className="bg-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Description du projet innovant qui attire beaucoup d'investisseurs.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collecté</span>
                    <span className="text-white">{(Math.random() * 50 + 10).toFixed(1)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Objectif</span>
                    <span className="text-white">{(Math.random() * 50 + 50).toFixed(1)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contributeurs</span>
                    <span className="text-white">{Math.floor(Math.random() * 200 + 50)}</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Voir les Détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CrowdfundingTrending;
