
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useState } from "react";

const YieldFarming = () => {
  const [stakeAmount, setStakeAmount] = useState("");

  const farms = [
    {
      id: 1,
      name: "ETH-USDC LP",
      apy: 24.5,
      tvl: "2.4M",
      earned: "0.00",
      staked: "0.00",
      token1: "ETH",
      token2: "USDC",
      rewardToken: "MATIC"
    },
    {
      id: 2,
      name: "MATIC-USDT LP",
      apy: 18.2,
      tvl: "1.8M",
      earned: "0.00",
      staked: "0.00",
      token1: "MATIC",
      token2: "USDT",
      rewardToken: "REWARDS"
    },
    {
      id: 3,
      name: "BTC-ETH LP",
      apy: 32.1,
      tvl: "3.2M",
      earned: "0.00",
      staked: "0.00",
      token1: "BTC",
      token2: "ETH",
      rewardToken: "FARM"
    }
  ];

  return (
    <PageLayout
      title="Yield Farming"
      subtitle="Gagnez des récompenses en fournissant de la liquidité aux pools"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">TVL Total</p>
                  <p className="text-white text-xl font-bold">$7.4M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">APY Moyen</p>
                  <p className="text-white text-xl font-bold">24.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sprout className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Mes Stakes</p>
                  <p className="text-white text-xl font-bold">$0.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">Récompenses</p>
                  <p className="text-white text-xl font-bold">$0.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Farms */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Pools de Farming Actifs</h2>
          
          {farms.map((farm) => (
            <Card key={farm.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-bold">
                        {farm.token1.slice(0, 2)}
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-bold">
                        {farm.token2.slice(0, 2)}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-white">{farm.name}</CardTitle>
                      <CardDescription>
                        Récompenses en {farm.rewardToken}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    APY {farm.apy}%
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">TVL</p>
                    <p className="text-white font-semibold">${farm.tvl}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Mes LP Tokens</p>
                    <p className="text-white font-semibold">{farm.staked}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Récompenses gagnées</p>
                    <p className="text-white font-semibold">{farm.earned} {farm.rewardToken}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">APY</p>
                    <p className="text-green-400 font-semibold">{farm.apy}%</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Montant à staker"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Staker
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Unstaker
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Récolter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it works */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Fournir de la liquidité</h3>
                <p className="text-gray-400 text-sm">Déposez vos tokens dans un pool de liquidité pour créer des LP tokens</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Staker les LP tokens</h3>
                <p className="text-gray-400 text-sm">Stakez vos LP tokens dans une farm pour commencer à gagner des récompenses</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Récolter les récompenses</h3>
                <p className="text-gray-400 text-sm">Récoltez régulièrement vos récompenses et composez vos gains</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default YieldFarming;
