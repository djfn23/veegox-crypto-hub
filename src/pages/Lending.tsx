
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Banknote, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

const Lending = () => {
  const [supplyAmount, setSupplyAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");

  const lendingPools = [
    {
      asset: "USDC",
      supplyApy: 4.2,
      borrowApy: 6.8,
      totalSupplied: "12.4M",
      totalBorrowed: "8.9M",
      utilization: 72,
      collateralFactor: 80,
      liquidationThreshold: 85
    },
    {
      asset: "ETH",
      supplyApy: 3.8,
      borrowApy: 5.9,
      totalSupplied: "5.2M",
      totalBorrowed: "3.1M",
      utilization: 60,
      collateralFactor: 75,
      liquidationThreshold: 82
    },
    {
      asset: "MATIC",
      supplyApy: 5.1,
      borrowApy: 7.3,
      totalSupplied: "8.7M",
      totalBorrowed: "5.4M",
      utilization: 62,
      collateralFactor: 70,
      liquidationThreshold: 80
    }
  ];

  const myPositions = [
    {
      type: "supply",
      asset: "USDC",
      amount: "1,000",
      apy: 4.2,
      earned: "12.34"
    },
    {
      type: "borrow",
      asset: "ETH",
      amount: "0.5",
      apy: 5.9,
      debt: "892.45"
    }
  ];

  return (
    <PageLayout
      title="Prêt & Emprunt"
      subtitle="Prêtez vos actifs pour gagner des intérêts ou empruntez contre vos collatéraux"
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Banknote className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total Fourni</p>
                  <p className="text-white text-xl font-bold">$1,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total Emprunté</p>
                  <p className="text-white text-xl font-bold">$892</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Ratio Santé</p>
                  <p className="text-green-400 text-xl font-bold">1.85</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">Pouvoir d'Emprunt</p>
                  <p className="text-white text-xl font-bold">$108</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="markets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="markets" className="text-gray-300 data-[state=active]:text-white">
              Marchés
            </TabsTrigger>
            <TabsTrigger value="supply" className="text-gray-300 data-[state=active]:text-white">
              Mes Dépôts
            </TabsTrigger>
            <TabsTrigger value="borrow" className="text-gray-300 data-[state=active]:text-white">
              Mes Emprunts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Marchés de Prêt</h2>
            
            {lendingPools.map((pool) => (
              <Card key={pool.asset} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {pool.asset.slice(0, 2)}
                      </div>
                      <div>
                        <CardTitle className="text-white">{pool.asset}</CardTitle>
                        <CardDescription>
                          Utilisation: {pool.utilization}%
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        APY Dépôt: {pool.supplyApy}%
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Fourni</p>
                      <p className="text-white font-semibold">${pool.totalSupplied}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Emprunté</p>
                      <p className="text-white font-semibold">${pool.totalBorrowed}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">APY Emprunt</p>
                      <p className="text-red-400 font-semibold">{pool.borrowApy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Facteur Collatéral</p>
                      <p className="text-white font-semibold">{pool.collateralFactor}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Utilisation</p>
                      <Progress value={pool.utilization} className="mt-1" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder={`Montant ${pool.asset}`}
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Fournir
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Emprunter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="supply" className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Mes Positions de Dépôt</h2>
            
            {myPositions.filter(p => p.type === 'supply').map((position, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {position.asset.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{position.asset}</p>
                        <p className="text-gray-400 text-sm">Fourni: {position.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">APY: {position.apy}%</p>
                      <p className="text-gray-400 text-sm">Gagné: ${position.earned}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Retirer
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="borrow" className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Mes Positions d'Emprunt</h2>
            
            {myPositions.filter(p => p.type === 'borrow').map((position, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        {position.asset.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{position.asset}</p>
                        <p className="text-gray-400 text-sm">Emprunté: {position.amount}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-red-400 font-semibold">APY: {position.apy}%</p>
                      <p className="text-gray-400 text-sm">Dette: ${position.debt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Rembourser
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      Emprunter Plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Risk Warning */}
        <Card className="bg-red-900/20 border-red-900">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Avertissement de Risque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-300">
              Le prêt et l'emprunt impliquent des risques. Votre collatéral peut être liquidé si le ratio de santé tombe en dessous du seuil de liquidation. 
              Assurez-vous de comprendre les risques avant de procéder.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Lending;
