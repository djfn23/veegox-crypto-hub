
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CrowdfundingCampaign() {
  const { id } = useParams();

  return (
    <PageLayout
      title="Détails de la Campagne"
      subtitle="Informations complètes sur cette campagne de financement"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/crowdfunding">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux campagnes
            </Button>
          </Link>
        </div>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">
                Campagne #{id}
              </h3>
              <p className="text-gray-400">
                Les détails de cette campagne seront affichés ici.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
