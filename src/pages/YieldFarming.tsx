
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TreePine, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap,
  ChevronRight,
  Plus
} from "lucide-react";

const yieldPools = [
  {
    name: "VEEGOX-ETH LP",
    tvl: "$2.4M",
    apy: "145.5%",
    rewards: "VEEGOX",
    duration: "30 jours",
    userStaked: "$1,250",
    earned: "$89.50"
  },
  {
    name: "USDC-USDT",
    tvl: "$8.7M", 
    apy: "23.8%",
    rewards: "VEEGOX + Fees",
    duration: "Flexible",
    userStaked: "$0",
    earned: "$0"
  },
  {
    name: "ETH-BTC LP",
    tvl: "$5.2M",
    apy: "67.2%", 
    rewards: "VEEGOX",
    duration: "90 jours",
    userStaked: "$500",
    earned: "$12.30"
  }
];

const YieldFarming = () => {
  return (
    <PageLayout
      title="Yield Farming"
      subtitle="Maximisez vos rendements avec les pools de liquidité Veegox"
      icon={<TreePine className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="h-6 w-6 text-green-400" />
                <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-400">
                  +12.5%
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">TVL Total</p>
                <p className="text-2xl font-bold text-white">$16.3M</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <span className="text-xs px-2 py-1 rounded-full bg-blue-600/20 text-blue-400">
                  Moyenne
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">APY Moyen</p>
                <p className="text-2xl font-bold text-white">78.8%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Zap className="h-6 w-6 text-purple-400" />
                <span className="text-xs px-2 py-1 rounded-full bg-purple-600/20 text-purple-400">
                  Votre position
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Staké Total</p>
                <p className="text-2xl font-bold text-white">$1,750</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <TreePine className="h-6 w-6 text-green-400" />
                <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-400">
                  À réclamer
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Récompenses</p>
                <p className="text-2xl font-bold text-white">$101.80</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pools List */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Pools de Yield Farming</span>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer une Position
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {yieldPools.map((pool, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Pool Info */}
                    <div className="lg:col-span-3">
                      <h3 className="text-white font-semibold text-lg mb-1">{pool.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                          {pool.rewards}
                        </Badge>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {pool.duration}
                        </Badge>
                      </div>
                    </div>

                    {/* Pool Stats */}
                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">TVL</p>
                        <p className="text-white font-semibold">{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">APY</p>
                        <p className="text-green-400 font-semibold text-lg">{pool.apy}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Votre Stake</p>
                        <p className="text-white font-semibold">{pool.userStaked}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-3 flex flex-col gap-2">
                      {pool.userStaked !== "$0" ? (
                        <>
                          <div className="text-center mb-2">
                            <p className="text-gray-400 text-sm">Récompenses Gagnées</p>
                            <p className="text-green-400 font-semibold">{pool.earned}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              Réclamer
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-white">
                              + Stake
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                          <Plus className="h-4 w-4 mr-2" />
                          Commencer à Farmer
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar for Active Stakes */}
                  {pool.userStaked !== "$0" && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Temps restant</span>
                        <span className="text-white">22 jours</span>
                      </div>
                      <Progress value={73} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white">Comment fonctionne le Yield Farming ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Fournir la Liquidité</h3>
                <p className="text-gray-300 text-sm">
                  Déposez vos tokens dans les pools de liquidité pour commencer à gagner des récompenses.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TreePine className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Gagner des Récompenses</h3>
                <p className="text-gray-300 text-sm">
                  Recevez des tokens VEEGOX et des frais de trading en récompense de votre participation.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Composés Automatiques</h3>
                <p className="text-gray-300 text-sm">
                  Réinvestissez automatiquement vos gains pour maximiser vos rendements composés.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default YieldFarming;
