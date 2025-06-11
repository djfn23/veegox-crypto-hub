
import { PageLayout } from "@/components/layout/PageLayout";
import { User, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const MyCampaigns = () => {
  return (
    <PageLayout
      title="Mes Campagnes"
      subtitle="Gérez vos projets de financement"
      icon={<User className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Mes Projets</h2>
          <Link to="/crowdfunding/create">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Campagne
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Mon Projet DeFi</CardTitle>
                <Badge className="bg-green-500">Actif</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                Plateforme DeFi innovante pour l'écosystème Veegox
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collecté</span>
                  <span className="text-white">25.5 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Objectif</span>
                  <span className="text-white">100 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Progression</span>
                  <span className="text-white">25.5%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-purple-600 text-purple-400">
                  Modifier
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-blue-600 text-blue-400">
                  Statistiques
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-12 text-center">
              <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Créer une nouvelle campagne
              </h3>
              <p className="text-gray-400 mb-6">
                Lancez votre projet et collectez des fonds
              </p>
              <Link to="/crowdfunding/create">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Commencer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default MyCampaigns;
