
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, Minus, AlertTriangle } from "lucide-react";

const CreditCollateral = () => {
  const collaterals = [
    {
      id: "C001",
      asset: "Bitcoin (BTC)",
      amount: "0.5",
      value: "21,625 USDT",
      ltv: "75%",
      status: "Active",
      loanId: "L001",
      liquidationPrice: "35,000 USDT"
    },
    {
      id: "C002", 
      asset: "Ethereum (ETH)",
      amount: "8.2",
      value: "21,156 USDT",
      ltv: "80%",
      status: "Active", 
      loanId: "L002",
      liquidationPrice: "2,000 USDT"
    },
    {
      id: "C003",
      asset: "VEEGOX Token",
      amount: "1,500",
      value: "18,675 USDT",
      ltv: "60%",
      status: "Available",
      loanId: "-",
      liquidationPrice: "-"
    }
  ];

  const totalCollateralValue = collaterals.reduce((sum, col) => 
    sum + parseFloat(col.value.replace(/[^\d.-]/g, '')), 0
  );

  return (
    <PageLayout
      title="Gestion des Garanties"
      subtitle="Gérez vos garanties et sécurisez vos prêts"
      icon={<Shield className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        {/* Collateral Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Valeur Totale</p>
                <p className="text-white text-xl font-bold">${totalCollateralValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Garanties Actives</p>
                <p className="text-green-400 text-xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Disponibles</p>
                <p className="text-blue-400 text-xl font-bold">1</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Ratio LTV Moyen</p>
                <p className="text-yellow-400 text-xl font-bold">71%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Alert */}
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 mt-1" />
              <div>
                <h3 className="text-amber-300 font-semibold mb-1">Alerte de Liquidation</h3>
                <p className="text-amber-200 text-sm">
                  Vos garanties BTC approchent du seuil de liquidation. 
                  Ajoutez plus de garanties ou remboursez une partie du prêt.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collateral List */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Mes Garanties</CardTitle>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Garantie
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collaterals.map((collateral) => (
                <div key={collateral.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium">{collateral.asset}</h4>
                      <p className="text-gray-400 text-sm">
                        {collateral.loanId !== "-" ? `Prêt #${collateral.loanId}` : "Non utilisée"}
                      </p>
                    </div>
                    <Badge 
                      className={collateral.status === "Active" ? "bg-green-600" : "bg-blue-600"}
                    >
                      {collateral.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">Quantité</p>
                      <p className="text-white font-medium">{collateral.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Valeur</p>
                      <p className="text-white font-medium">{collateral.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Ratio LTV</p>
                      <Badge 
                        variant={parseFloat(collateral.ltv) > 80 ? "destructive" : "secondary"}
                      >
                        {collateral.ltv}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Prix de Liquidation</p>
                      <p className="text-white font-medium">{collateral.liquidationPrice}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {collateral.status === "Active" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Plus className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                        <Button size="sm" variant="outline">
                          <Minus className="h-4 w-4 mr-1" />
                          Retirer
                        </Button>
                      </>
                    )}
                    {collateral.status === "Available" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Utiliser comme Garantie
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Collateral Management Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Conseils de Gestion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900/20 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-1">Diversifiez vos Garanties</h4>
                  <p className="text-gray-400 text-sm">Utilisez différents actifs pour réduire les risques</p>
                </div>
                
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <h4 className="text-green-300 font-medium mb-1">Surveillez les Ratios LTV</h4>
                  <p className="text-gray-400 text-sm">Maintenez des ratios sains pour éviter la liquidation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Actifs Acceptés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { asset: "Bitcoin (BTC)", ltv: "75%" },
                  { asset: "Ethereum (ETH)", ltv: "80%" },
                  { asset: "VEEGOX Token", ltv: "60%" },
                  { asset: "Chainlink (LINK)", ltv: "70%" },
                  { asset: "Polygon (MATIC)", ltv: "65%" }
                ].map((asset, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span className="text-white text-sm">{asset.asset}</span>
                    <Badge variant="secondary" className="text-xs">
                      LTV Max: {asset.ltv}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreditCollateral;
