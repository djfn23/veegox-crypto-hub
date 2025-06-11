
import { PageLayout } from "@/components/layout/PageLayout";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MyContributions = () => {
  return (
    <PageLayout
      title="Mes Contributions"
      subtitle="Projets que vous avez soutenus"
      icon={<Heart className="h-6 w-6 text-red-400" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Projet Soutenu #{i}</CardTitle>
                  <Badge className="bg-blue-500">Soutenu</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Vous avez contribué à ce projet prometteur
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ma contribution</span>
                    <span className="text-white">{(Math.random() * 5 + 0.5).toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white">
                      {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Statut</span>
                    <Badge className="bg-green-500">Financé</Badge>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Voir les Mises à Jour
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary card */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Résumé de mes Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">12.5 ETH</div>
                <div className="text-gray-400">Total Contribué</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">8</div>
                <div className="text-gray-400">Projets Soutenus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">6</div>
                <div className="text-gray-400">Projets Réussis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default MyContributions;
