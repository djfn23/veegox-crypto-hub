
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Activity, Wallet, Settings } from "lucide-react";
import NetworkSelector from "@/components/blockchain/NetworkSelector";
import NetworkMonitor from "@/components/blockchain/NetworkMonitor";
import { useMultiChain } from "@/hooks/useMultiChain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function BlockchainDashboard() {
  const {
    currentChainId,
    currentNetwork,
    networkHealth,
    multiChainBalances,
    isLoading,
    switchNetwork,
    refreshNetworkHealth,
    getMultiChainBalances,
    getSupportedNetworks
  } = useMultiChain();

  const supportedNetworks = getSupportedNetworks();
  const healthyNetworks = networkHealth.filter(n => n.isHealthy).length;
  const totalNetworks = networkHealth.length;

  return (
    <PageLayout
      title="Blockchain Dashboard"
      subtitle="Gérez vos connexions multi-chaînes et surveillez les réseaux"
      icon={<Globe className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Réseau Actuel</p>
                  <p className="text-white font-bold">{currentNetwork?.shortName || 'Non connecté'}</p>
                </div>
                <span className="text-2xl">{currentNetwork?.icon}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Réseaux Supportés</p>
                  <p className="text-white font-bold">{supportedNetworks.length}</p>
                </div>
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Réseaux En Ligne</p>
                  <p className="text-white font-bold">{healthyNetworks}/{totalNetworks}</p>
                </div>
                <Activity className={`h-6 w-6 ${healthyNetworks === totalNetworks ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Balances Multi-Chaînes</p>
                  <p className="text-white font-bold">{multiChainBalances.length}</p>
                </div>
                <Wallet className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="networks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="networks">Sélection Réseau</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="balances">Balances Multi-Chaînes</TabsTrigger>
          </TabsList>

          <TabsContent value="networks" className="space-y-4">
            <NetworkSelector
              selectedChainId={currentChainId}
              onNetworkChange={switchNetwork}
              showTestnets={true}
            />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Monitoring des Réseaux</h3>
              <Button
                onClick={refreshNetworkHealth}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <Activity className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
            <NetworkMonitor />
          </TabsContent>

          <TabsContent value="balances" className="space-y-4">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Balances Multi-Chaînes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {multiChainBalances.length === 0 ? (
                  <div className="text-center py-8 text-white/60">
                    <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Connectez votre wallet pour voir les balances multi-chaînes</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {multiChainBalances.map((balance) => (
                      <Card key={balance.chainId} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{balance.network.icon}</span>
                              <span className="text-white font-medium">{balance.network.shortName}</span>
                            </div>
                            <Badge variant={balance.error ? 'destructive' : 'secondary'}>
                              {balance.error ? 'Erreur' : 'OK'}
                            </Badge>
                          </div>
                          {balance.error ? (
                            <p className="text-red-400 text-sm">{balance.error}</p>
                          ) : (
                            <div>
                              <p className="text-white text-lg font-bold">
                                {balance.balance.toFixed(4)} {balance.network.currency.symbol}
                              </p>
                              <p className="text-white/60 text-sm">
                                ≈ ${balance.balanceUSD.toFixed(2)} USD
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
