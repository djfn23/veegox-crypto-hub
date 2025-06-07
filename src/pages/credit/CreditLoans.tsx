
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Calendar, DollarSign } from "lucide-react";

const CreditLoans = () => {
  const activeLoans = [
    {
      id: "L001",
      amount: "10,000 USDT",
      remaining: "7,500 USDT",
      apr: "8.5%",
      dueDate: "2024-06-15",
      collateral: "2.5 ETH",
      progress: 25
    },
    {
      id: "L002", 
      amount: "5,000 USDT",
      remaining: "2,000 USDT",
      apr: "7.2%",
      dueDate: "2024-04-20",
      collateral: "0.15 BTC",
      progress: 60
    }
  ];

  return (
    <PageLayout
      title="Mes Prêts Actifs"
      subtitle="Gérez vos emprunts en cours"
      icon={<CreditCard className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Loan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Emprunté</p>
                  <p className="text-white text-xl font-bold">$15,000</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Restant à Payer</p>
                  <p className="text-white text-xl font-bold">$9,500</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Prêts Actifs</p>
                  <p className="text-white text-xl font-bold">2</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Loans */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Prêts en Cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">Prêt #{loan.id}</h4>
                      <p className="text-gray-400 text-sm">Échéance: {loan.dueDate}</p>
                    </div>
                    <Badge className="bg-blue-600">Actif</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">Montant Initial</p>
                      <p className="text-white font-medium">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Restant</p>
                      <p className="text-white font-medium">{loan.remaining}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Taux (APR)</p>
                      <p className="text-white font-medium">{loan.apr}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Garantie</p>
                      <p className="text-white font-medium">{loan.collateral}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Progression du remboursement</span>
                      <span className="text-white text-sm">{loan.progress}%</span>
                    </div>
                    <Progress value={loan.progress} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Rembourser
                    </Button>
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 p-4 h-auto">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Nouveau Prêt</p>
                  <p className="text-xs opacity-80">Demander un nouveau prêt</p>
                </div>
              </Button>
              
              <Button variant="outline" className="p-4 h-auto">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Planifier Remboursements</p>
                  <p className="text-xs opacity-80">Automatiser les paiements</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreditLoans;
