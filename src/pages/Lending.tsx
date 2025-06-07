
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Banknote, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Percent,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const lendingPools = [
  {
    asset: 'USDC',
    supplyAPY: '8.5%',
    borrowAPY: '12.3%',
    totalSupplied: '$12.5M',
    totalBorrowed: '$8.9M',
    utilization: '71%',
    mySupply: '$2,500',
    myBorrow: '$0',
    collateralFactor: '85%'
  },
  {
    asset: 'ETH',
    supplyAPY: '4.2%',
    borrowAPY: '6.8%',
    totalSupplied: '$45.2M',
    totalBorrowed: '$28.1M',
    utilization: '62%',
    mySupply: '$0',
    myBorrow: '$1,200',
    collateralFactor: '80%'
  },
  {
    asset: 'VEEGOX',
    supplyAPY: '15.6%',
    borrowAPY: '22.4%',
    totalSupplied: '$5.8M',
    totalBorrowed: '$3.2M',
    utilization: '55%',
    mySupply: '$1,000',
    myBorrow: '$0',
    collateralFactor: '70%'
  }
];

const Lending = () => {
  return (
    <PageLayout
      title="Lending & Borrowing"
      subtitle="Prêtez vos actifs ou empruntez contre collatéral"
      icon={<Banknote className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Fourni</p>
                  <p className="text-2xl font-bold text-white">$3,500</p>
                  <p className="text-green-400 text-sm">2 actifs</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Emprunté</p>
                  <p className="text-2xl font-bold text-white">$1,200</p>
                  <p className="text-blue-400 text-sm">1 actif</p>
                </div>
                <Banknote className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Revenus Net</p>
                  <p className="text-2xl font-bold text-white">$156.80</p>
                  <p className="text-purple-400 text-sm">Ce mois</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Ratio Santé</p>
                  <p className="text-2xl font-bold text-white">2.8</p>
                  <p className="text-orange-400 text-sm">Sécurisé</p>
                </div>
                <Shield className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lending Interface */}
        <Tabs defaultValue="supply" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="supply">Fournir</TabsTrigger>
            <TabsTrigger value="borrow">Emprunter</TabsTrigger>
          </TabsList>

          <TabsContent value="supply" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Fournir des Liquidités
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Asset à Fournir</Label>
                    <Button variant="outline" className="w-full mt-2 border-green-500/30 text-green-300 hover:bg-green-500/10">
                      USDC
                    </Button>
                  </div>
                  <div>
                    <Label className="text-gray-300">Montant</Label>
                    <Input 
                      placeholder="0.0" 
                      className="bg-white/5 border-white/10 text-white mt-2"
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">APY de Supply</span>
                    <span className="text-green-400 font-bold">8.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Revenus Estimés (annuel)</span>
                    <span className="text-white">~$85.00</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Fournir USDC
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="borrow" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-blue-400" />
                  Emprunter des Actifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Asset à Emprunter</Label>
                    <Button variant="outline" className="w-full mt-2 border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                      ETH
                    </Button>
                  </div>
                  <div>
                    <Label className="text-gray-300">Montant</Label>
                    <Input 
                      placeholder="0.0" 
                      className="bg-white/5 border-white/10 text-white mt-2"
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">APY d'Emprunt</span>
                    <span className="text-red-400 font-bold">6.8%</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Collatéral Requis</span>
                    <span className="text-white">125%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Ratio de Santé</span>
                    <span className="text-green-400">2.5 (Sécurisé)</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Emprunter ETH
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Markets Overview */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Marchés de Prêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 pb-3">Asset</th>
                    <th className="text-left text-gray-400 pb-3">Supply APY</th>
                    <th className="text-left text-gray-400 pb-3">Borrow APY</th>
                    <th className="text-left text-gray-400 pb-3">Total Supplied</th>
                    <th className="text-left text-gray-400 pb-3">Utilisation</th>
                    <th className="text-left text-gray-400 pb-3">Mes Positions</th>
                  </tr>
                </thead>
                <tbody>
                  {lendingPools.map((pool, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            pool.asset === 'USDC' ? 'bg-green-600' :
                            pool.asset === 'ETH' ? 'bg-blue-600' : 'bg-purple-600'
                          }`}>
                            <span className="text-white font-bold text-xs">{pool.asset.slice(0, 2)}</span>
                          </div>
                          <span className="text-white font-medium">{pool.asset}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-green-400 font-medium">{pool.supplyAPY}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-red-400 font-medium">{pool.borrowAPY}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-white">{pool.totalSupplied}</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{pool.utilization}</span>
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
                              style={{ width: pool.utilization }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          {pool.mySupply !== '$0' && (
                            <div className="text-green-400 text-sm">Supply: {pool.mySupply}</div>
                          )}
                          {pool.myBorrow !== '$0' && (
                            <div className="text-red-400 text-sm">Borrow: {pool.myBorrow}</div>
                          )}
                          {pool.mySupply === '$0' && pool.myBorrow === '$0' && (
                            <span className="text-gray-400 text-sm">Aucune position</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Risk Management */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Gestion des Risques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Ratio de Liquidation</span>
                <span className="text-yellow-400">1.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Seuil d'Alerte</span>
                <span className="text-orange-400">1.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">État Actuel</span>
                <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Sécurisé
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Percent className="h-5 w-5 text-purple-400" />
                Revenus et Coûts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Revenus de Supply</span>
                <span className="text-green-400">+$12.50/mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Coûts d'Emprunt</span>
                <span className="text-red-400">-$6.80/mois</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Net</span>
                <span className="text-green-400 font-bold">+$5.70/mois</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Lending;
