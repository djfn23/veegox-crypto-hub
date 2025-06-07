
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Coins, Clock, Users } from "lucide-react";

const YieldFarming = () => {
  const farms = [
    {
      id: 1,
      name: "ETH-USDC LP",
      apy: 45.2,
      tvl: 125000,
      rewards: ["MATIC", "USDC"],
      isActive: true,
      userStaked: 0
    },
    {
      id: 2,
      name: "MATIC-USDT LP",
      apy: 67.8,
      tvl: 89000,
      rewards: ["MATIC"],
      isActive: true,
      userStaked: 1250
    },
    {
      id: 3,
      name: "BTC-ETH LP",
      apy: 32.1,
      tvl: 200000,
      rewards: ["WBTC", "ETH"],
      isActive: true,
      userStaked: 0
    }
  ];

  const userPositions = farms.filter(farm => farm.userStaked > 0);

  return (
    <PageLayout
      title="Yield Farming"
      subtitle="Gagnez des récompenses en fournissant de la liquidité aux pools DeFi"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">APY Moyen</p>
                  <p className="text-white text-xl font-bold">48.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">TVL Total</p>
                  <p className="text-white text-xl font-bold">$2.1M</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Vos Positions</p>
                  <p className="text-white text-xl font-bold">{userPositions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Récompenses</p>
                  <p className="text-white text-xl font-bold">$125.43</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-farms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
            <TabsTrigger value="all-farms">Tous les Farms</TabsTrigger>
            <TabsTrigger value="my-positions">Mes Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="all-farms">
            <div className="grid gap-4">
              {farms.map((farm) => (
                <Card key={farm.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          {farm.name}
                          {farm.isActive && (
                            <Badge className="bg-green-600">Actif</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Pool de liquidité avec récompenses multiples
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">
                          {farm.apy}%
                        </p>
                        <p className="text-gray-400 text-sm">APY</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">TVL</p>
                        <p className="text-white font-semibold">
                          ${farm.tvl.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Récompenses</p>
                        <div className="flex gap-1">
                          {farm.rewards.map((reward) => (
                            <Badge key={reward} variant="outline" className="text-xs">
                              {reward}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Votre Stake</p>
                        <p className="text-white font-semibold">
                          {farm.userStaked > 0 ? `$${farm.userStaked}` : "Non stakée"}
                        </p>
                      </div>
                      <div className="flex items-end">
                        {farm.userStaked > 0 ? (
                          <div className="flex gap-2 w-full">
                            <Button size="sm" variant="outline" className="flex-1">
                              Récolter
                            </Button>
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              Ajouter
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                            Staker
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-positions">
            {userPositions.length > 0 ? (
              <div className="grid gap-4">
                {userPositions.map((farm) => (
                  <Card key={farm.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{farm.name}</CardTitle>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">+$12.34</p>
                          <p className="text-gray-400 text-sm">Récompenses disponibles</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Staké</p>
                          <p className="text-white font-semibold">${farm.userStaked}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">APY</p>
                          <p className="text-green-400 font-semibold">{farm.apy}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Gains totaux</p>
                          <p className="text-white font-semibold">+$45.67</p>
                        </div>
                        <div className="flex items-end gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Retirer
                          </Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            Récolter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  Vous n'avez pas encore de positions actives
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Découvrir les farms
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default YieldFarming;
