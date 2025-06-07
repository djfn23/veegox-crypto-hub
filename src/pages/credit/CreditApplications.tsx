
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

const CreditApplications = () => {
  const applications = [
    {
      id: "APP001",
      amount: "25,000 USDT",
      purpose: "Trading Portfolio",
      status: "Under Review",
      submittedDate: "2024-01-10",
      expectedDecision: "2024-01-17"
    },
    {
      id: "APP002", 
      amount: "15,000 USDT",
      purpose: "Yield Farming",
      status: "Approved",
      submittedDate: "2024-01-05",
      approvedDate: "2024-01-08"
    },
    {
      id: "APP003",
      amount: "50,000 USDT", 
      purpose: "Real Estate Investment",
      status: "Rejected",
      submittedDate: "2023-12-20",
      rejectedDate: "2023-12-28"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Under Review":
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case "Approved":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-600";
      case "Approved":
        return "bg-green-600";
      case "Rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <PageLayout
      title="Demandes de Prêt"
      subtitle="Suivez l'état de vos demandes de crédit"
      icon={<FileText className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Application Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Total Demandes</p>
                <p className="text-white text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">En Attente</p>
                <p className="text-yellow-400 text-2xl font-bold">1</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Approuvées</p>
                <p className="text-green-400 text-2xl font-bold">1</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Refusées</p>
                <p className="text-red-400 text-2xl font-bold">1</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Historique des Demandes</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle Demande
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <h4 className="text-white font-medium">Demande #{app.id}</h4>
                        <p className="text-gray-400 text-sm">{app.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">Montant Demandé</p>
                      <p className="text-white font-medium">{app.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date de Soumission</p>
                      <p className="text-white font-medium">{app.submittedDate}</p>
                    </div>
                    {app.status === "Under Review" && (
                      <div>
                        <p className="text-gray-400 text-xs">Décision Attendue</p>
                        <p className="text-white font-medium">{app.expectedDecision}</p>
                      </div>
                    )}
                    {app.status === "Approved" && (
                      <div>
                        <p className="text-gray-400 text-xs">Date d'Approbation</p>
                        <p className="text-green-400 font-medium">{app.approvedDate}</p>
                      </div>
                    )}
                    {app.status === "Rejected" && (
                      <div>
                        <p className="text-gray-400 text-xs">Date de Refus</p>
                        <p className="text-red-400 font-medium">{app.rejectedDate}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Voir Détails
                    </Button>
                    {app.status === "Under Review" && (
                      <Button size="sm" variant="outline">
                        Modifier
                      </Button>
                    )}
                    {app.status === "Approved" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accepter l'Offre
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Tips */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Conseils pour vos Demandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-900/20 rounded-lg">
                <h4 className="text-blue-300 font-medium mb-2">Améliorez vos Chances</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Maintenez un score de crédit élevé</li>
                  <li>• Fournissez des garanties suffisantes</li>
                  <li>• Détaillez l'utilisation des fonds</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-900/20 rounded-lg">
                <h4 className="text-green-300 font-medium mb-2">Documents Requis</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Preuve de revenus</li>
                  <li>• Historique de transactions</li>
                  <li>• Plan d'utilisation des fonds</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreditApplications;
