
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BLOCKCHAIN_NETWORKS, BlockchainNetwork } from '@/lib/blockchain/networks';
import { Activity, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface NetworkStatus {
  chainId: number;
  isOnline: boolean;
  latency: number;
  blockNumber: number;
  gasPrice: number;
  lastUpdated: Date;
}

export default function NetworkMonitor() {
  const [networkStatuses, setNetworkStatuses] = useState<NetworkStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNetworkStatuses = async () => {
      // Simuler des données de monitoring pour la démonstration
      const statuses: NetworkStatus[] = Object.values(BLOCKCHAIN_NETWORKS)
        .filter(network => !network.testnet) // Afficher seulement les mainnets
        .map(network => ({
          chainId: network.chainId,
          isOnline: Math.random() > 0.1, // 90% de chance d'être en ligne
          latency: Math.floor(Math.random() * 200) + 50, // 50-250ms
          blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
          gasPrice: Math.floor(Math.random() * 100) + 10, // 10-110 gwei
          lastUpdated: new Date()
        }));
      
      setNetworkStatuses(statuses);
      setIsLoading(false);
    };

    fetchNetworkStatuses();
    const interval = setInterval(fetchNetworkStatuses, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-green-400';
    if (latency < 200) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getLatencyProgress = (latency: number) => {
    return Math.min((latency / 300) * 100, 100);
  };

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 animate-pulse" />
            Chargement du monitoring...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Monitoring des Réseaux
        </CardTitle>
        <p className="text-white/60 text-sm">
          Statut en temps réel des nœuds blockchain
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {networkStatuses.map((status) => {
            const network = BLOCKCHAIN_NETWORKS[status.chainId];
            if (!network) return null;

            return (
              <Card key={status.chainId} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{network.icon}</span>
                      <span className="text-white font-medium">{network.shortName}</span>
                    </div>
                    <Badge variant={status.isOnline ? 'default' : 'destructive'}>
                      {status.isOnline ? 'Online' : 'Offline'}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {/* Latence */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Latence
                        </span>
                        <span className={`text-sm font-mono ${getLatencyColor(status.latency)}`}>
                          {status.latency}ms
                        </span>
                      </div>
                      <Progress 
                        value={getLatencyProgress(status.latency)} 
                        className="h-2"
                      />
                    </div>

                    {/* Gas Price */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Gas Price
                        </span>
                        <span className="text-white text-sm font-mono">
                          {status.gasPrice} gwei
                        </span>
                      </div>
                    </div>

                    {/* Block Number */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-sm flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Bloc actuel
                        </span>
                        <span className="text-white text-sm font-mono">
                          #{status.blockNumber.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Dernière mise à jour */}
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-white/60 text-xs">
                        Mis à jour: {status.lastUpdated.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alertes */}
        <div className="mt-6">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertes Système
          </h4>
          <div className="space-y-2">
            {networkStatuses.filter(s => !s.isOnline).length > 0 ? (
              networkStatuses
                .filter(s => !s.isOnline)
                .map(status => {
                  const network = BLOCKCHAIN_NETWORKS[status.chainId];
                  return (
                    <div key={status.chainId} className="flex items-center gap-2 p-2 bg-red-900/20 border border-red-500/20 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-red-300 text-sm">
                        {network?.shortName} est actuellement hors ligne
                      </span>
                    </div>
                  );
                })
            ) : (
              <div className="flex items-center gap-2 p-2 bg-green-900/20 border border-green-500/20 rounded">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-green-300 text-sm">
                  Tous les réseaux sont opérationnels
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
