import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Clock, Users } from "lucide-react";

const stakingPools = [
  {
    id: 1,
    name: "MATIC Staking",
    apy: "12.5%",
    tvl: "$2.4M",
    token: "MATIC",
    minStake: "1 MATIC",
    lockPeriod: "7 jours",
    status: "Active"
  },
  {
    id: 2,
    name: "ETH 2.0 Staking",
    apy: "4.2%",
    tvl: "$15.8M",
    token: "ETH",
    minStake: "0.1 ETH",
    lockPeriod: "30 jours",
    status: "Active"
  },
  {
    id: 3,
    name: "USDC Yield",
    apy: "8.1%",
    tvl: "$5.2M",
    token: "USDC",
    minStake: "100 USDC",
    lockPeriod: "Flexible",
    status: "Active"
  }
];

export default function Staking() {
  return (
    <PageLayout
      title="Staking"
      subtitle="Gagnez des récompenses en stakant vos tokens"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Staké</p>
                  <p className="text-lg font-bold text-white">$23.4M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">APY Moyen</p>
                  <p className="text-lg font-bold text-white">8.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Stakers</p>
                  <p className="text-lg font-bold text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Mes Récompenses</p>
                  <p className="text-lg font-bold text-white">$124.50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staking Pools */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pools de Staking Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stakingPools.map((pool) => (
                <div key={pool.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-semibold">{pool.name}</h3>
                        <Badge variant="secondary">{pool.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">APY</p>
                          <p className="text-green-400 font-bold">{pool.apy}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">TVL</p>
                          <p className="text-white">{pool.tvl}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Min. Stake</p>
                          <p className="text-white">{pool.minStake}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Lock Period</p>
                          <p className="text-white">{pool.lockPeriod}</p>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Staker
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Stakes */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Mes Stakes Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Coins className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Vous n'avez aucun stake actif</p>
              <p className="text-gray-500 text-sm">Commencez à staker pour gagner des récompenses</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
