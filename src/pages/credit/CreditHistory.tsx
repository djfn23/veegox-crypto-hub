
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, TrendingUp, CheckCircle } from "lucide-react";

const CreditHistory = () => {
  const creditEvents = [
    {
      date: "2024-01-15",
      type: "Loan Repayment",
      description: "Remboursement prêt #L002",
      amount: "1,000 USDT",
      impact: "+5 points",
      status: "Completed"
    },
    {
      date: "2024-01-10", 
      type: "New Loan",
      description: "Nouveau prêt approuvé #L003",
      amount: "25,000 USDT",
      impact: "0 points",
      status: "Active"
    },
    {
      date: "2024-01-05",
      type: "Score Update",
      description: "Mise à jour mensuelle du score",
      amount: "-",
      impact: "+10 points",
      status: "Completed"
    },
    {
      date: "2023-12-28",
      type: "Loan Completion",
      description: "Prêt #L001 entièrement remboursé",
      amount: "15,000 USDT",
      impact: "+15 points", 
      status: "Completed"
    },
    {
      date: "2023-12-15",
      type: "Collateral Added",
      description: "Ajout de garantie - 2 ETH",
      amount: "5,000 USDT",
      impact: "+3 points",
      status: "Completed"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Loan Repayment":
      case "Loan Completion":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "Score Update":
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
      default:
        return <History className="h-5 w-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Loan Repayment":
      case "Loan Completion":
        return "bg-green-600";
      case "New Loan":
        return "bg-blue-600";
      case "Score Update":
        return "bg-purple-600";
      case "Collateral Added":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <PageLayout
      title="Historique de Crédit"
      subtitle="Consultez l'historique complet de votre crédit"
      icon={<History className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Credit Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Prêts Totaux</p>
                <p className="text-white text-2xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Remboursés</p>
                <p className="text-green-400 text-2xl font-bold">6</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Taux de Succès</p>
                <p className="text-green-400 text-2xl font-bold">100%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Évolution Score</p>
                <p className="text-green-400 text-2xl font-bold">+85</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Timeline */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Chronologie du Crédit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(event.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium">{event.description}</h4>
                        <p className="text-gray-400 text-sm">{event.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {event.impact}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {event.amount !== "-" && (
                          <span className="text-gray-300">Montant: {event.amount}</span>
                        )}
                        <Badge variant="secondary">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Score Evolution Chart */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Évolution du Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Graphique d'Évolution</h3>
                <p className="text-gray-400">Le graphique détaillé de l'évolution de votre score sera disponible prochainement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreditHistory;
