
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

const Lending = () => {
  const [supplyAmount, setSupplyAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");

  const pools = [
    {
      asset: "USDC",
      supplyApy: 5.2,
      borrowApy: 8.7,
      totalSupplied: 1250000,
      totalBorrowed: 890000,
      utilizationRate: 71.2,
      collateralFactor: 85,
      userSupplied: 5000,
      userBorrowed: 0
    },
    {
      asset: "ETH",
      supplyApy: 3.8,
      borrowApy: 6.1,
      totalSupplied: 450000,
      totalBorrowed: 280000,
      utilizationRate: 62.2,
      collateralFactor: 80,
      userSupplied: 0,
      userBorrowed: 1.5
    },
    {
      asset: "MATIC",
      supplyApy: 7.1,
      borrowApy: 12.3,
      totalSupplied: 2800000,
      totalBorrowed: 1900000,
      utilizationRate: 67.9,
      collateralFactor: 70,
      userSupplied: 15000,
      userBorrowed: 0
    }
  ];

  const userTotalSupplied = pools.reduce((acc, pool) => acc + pool.userSupplied, 0);
  const userTotalBorrowed = pools.reduce((acc, pool) => acc + (pool.userBorrowed * 2000), 0); // Estimation ETH price

  return (
    <PageLayout
      title="Prêt & Emprunt"
      subtitle="Gagnez des intérêts en prêtant vos actifs ou empruntez contre vos collatéraux"
    >
      <div className="space-y-6">
        {/* User Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total Prêté</p>
                  <p className="text-white text-xl font-bold">${userTotalSupplied.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total Emprunté</p>
                  <p className="text-white text-xl font-bold">${userTotalBorrowed.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Ratio Santé</p>
                  <p className="text-green-400 text-xl font-bold">2.34</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">APY Net</p>
                  <p className="text-white text-xl font-bold">4.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="supply" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="supply">Prêter</TabsTrigger>
            <TabsTrigger value="borrow">Emprunter</TabsTrigger>
            <TabsTrigger value="positions">Mes Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="supply">
            <div className="grid gap-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Prêter vos actifs</CardTitle>
                  <CardDescription>
                    Gagnez des intérêts en prêtant vos tokens aux emprunteurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {pools.map((pool) => (
                      <div key={pool.asset} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{pool.asset.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{pool.asset}</h3>
                            <p className="text-gray-400 text-sm">Balance: 1,250.00</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-bold text-lg">{pool.supplyApy}%</p>
                          <p className="text-gray-400 text-sm">APY</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold">${pool.totalSupplied.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">Total prêté</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Prêter
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="borrow">
            <div className="grid gap-4">
              <Card className="bg-gray-800/50 border-gray-700 border-orange-500/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <CardTitle className="text-white">Emprunter des actifs</CardTitle>
                  </div>
                  <CardDescription>
                    Empruntez contre vos collatéraux. Attention au ratio de liquidation!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {pools.map((pool) => (
                      <div key={pool.asset} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{pool.asset.slice(0, 2)}</span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{pool.asset}</h3>
                            <p className="text-gray-400 text-sm">Collatéral: {pool.collateralFactor}%</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-red-400 font-bold text-lg">{pool.borrowApy}%</p>
                          <p className="text-gray-400 text-sm">APY</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold">${pool.totalBorrowed.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">Disponible</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          disabled={userTotalSupplied === 0}
                        >
                          Emprunter
                        </Button>
                      </div>
                    ))}
                  </div>
                  {userTotalSupplied === 0 && (
                    <div className="mt-4 p-4 bg-orange-900/20 border border-orange-500/50 rounded-lg">
                      <p className="text-orange-400 text-sm">
                        ⚠️ Vous devez d'abord déposer des collatéraux avant de pouvoir emprunter
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="positions">
            <div className="grid gap-4">
              {/* Supply Positions */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Positions de Prêt</CardTitle>
                </CardHeader>
                <CardContent>
                  {pools.filter(p => p.userSupplied > 0).length > 0 ? (
                    <div className="space-y-4">
                      {pools.filter(p => p.userSupplied > 0).map((pool) => (
                        <div key={pool.asset} className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/50 rounded-lg">
                          <div>
                            <h3 className="text-white font-semibold">{pool.asset}</h3>
                            <p className="text-gray-400 text-sm">Prêté: ${pool.userSupplied.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">{pool.supplyApy}% APY</p>
                            <p className="text-gray-400 text-sm">+$2.15/jour</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Retirer
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Aucune position de prêt active</p>
                  )}
                </CardContent>
              </Card>

              {/* Borrow Positions */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Positions d'Emprunt</CardTitle>
                </CardHeader>
                <CardContent>
                  {pools.filter(p => p.userBorrowed > 0).length > 0 ? (
                    <div className="space-y-4">
                      {pools.filter(p => p.userBorrowed > 0).map((pool) => (
                        <div key={pool.asset} className="flex items-center justify-between p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
                          <div>
                            <h3 className="text-white font-semibold">{pool.asset}</h3>
                            <p className="text-gray-400 text-sm">Emprunté: {pool.userBorrowed} {pool.asset}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-red-400 font-bold">{pool.borrowApy}% APY</p>
                            <p className="text-gray-400 text-sm">-$0.82/jour</p>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Rembourser
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">Aucune position d'emprunt active</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Lending;
