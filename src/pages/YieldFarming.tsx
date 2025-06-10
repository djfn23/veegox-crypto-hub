
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, Coins, AlertTriangle } from "lucide-react";

const YieldFarming = () => {
  return (
    <PageLayout
      title="Yield Farming"
      subtitle="Maximisez vos rendements avec nos stratégies de farming"
      icon={<Sprout className="h-6 w-6" />}
    >
      <div className="space-y-6">
        {/* Avertissement */}
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-1" />
              <div>
                <h3 className="text-amber-300 font-medium mb-1">Avertissement</h3>
                <p className="text-amber-200 text-sm">
                  Le yield farming implique des risques. Assurez-vous de comprendre les mécanismes avant d'investir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pools de farming */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pools de Yield Farming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pair: "ETH/USDC", apy: "15.2%", tvl: "$2.4M", risk: "Low" },
                { pair: "VEEGOX/ETH", apy: "45.8%", tvl: "$856K", risk: "Medium" },
                { pair: "BTC/USDT", apy: "8.9%", tvl: "$5.1M", risk: "Low" }
              ].map((pool) => (
                <Card key={pool.pair} className="bg-slate-800 border-slate-600">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">{pool.pair}</h3>
                        <Badge variant={pool.risk === "Low" ? "secondary" : "destructive"}>
                          {pool.risk}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">APY</span>
                          <span className="text-green-400 font-medium">{pool.apy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">TVL</span>
                          <span className="text-white">{pool.tvl}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Farmer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mes positions */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Mes Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Aucune position de farming active</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                Commencer le Farming
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default YieldFarming;
