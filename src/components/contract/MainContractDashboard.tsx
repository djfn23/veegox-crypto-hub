
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";
import { useMainContractInfo, useUserContractBalance, useContractEvents } from "@/hooks/useMainContract";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { ExternalLink, Activity, Coins, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const MainContractDashboard = () => {
  const { data: contractInfo, isLoading: isLoadingContract } = useMainContractInfo();
  const { data: contractEvents, isLoading: isLoadingEvents } = useContractEvents();
  const { connectedWallets } = useWalletConnection();
  
  const primaryWallet = connectedWallets.find(w => w.connected);
  const { data: userBalance, isLoading: isLoadingBalance } = useUserContractBalance(
    primaryWallet?.address || null
  );

  const contractAddress = "0xF3E1D80dA667D50641f0110F2Bb70882cd16343E";

  if (isLoadingContract) {
    return (
      <GlassCard className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3 bg-white/10" />
          <Skeleton className="h-4 w-2/3 bg-white/10" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 bg-white/10" />
            <Skeleton className="h-20 bg-white/10" />
            <Skeleton className="h-20 bg-white/10" />
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête du contrat */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Contrat Principal - Polygon
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-mono text-sm">
                {contractAddress}
              </span>
              <ExternalLink 
                className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
                onClick={() => window.open(`https://polygonscan.com/address/${contractAddress}`, '_blank')}
              />
            </div>
          </div>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Shield className="h-3 w-3 mr-1" />
            Vérifié
          </Badge>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Mon Solde</span>
            </div>
            {isLoadingBalance ? (
              <Skeleton className="h-6 w-20 bg-white/10" />
            ) : (
              <p className="text-white text-xl font-bold">
                {userBalance?.result?.balance || '0'} Tokens
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-medium">Réseau</span>
            </div>
            <p className="text-white text-xl font-bold">Polygon</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Statut</span>
            </div>
            <p className="text-white text-xl font-bold">
              {contractInfo?.result?.isContract ? 'Actif' : 'Inactif'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Actions rapides */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <GradientButton variant="outline" size="sm">
            Consulter Balance
          </GradientButton>
          <GradientButton variant="outline" size="sm">
            Voir Historique
          </GradientButton>
          <GradientButton variant="outline" size="sm">
            Approuver Token
          </GradientButton>
          <GradientButton variant="primary" size="sm">
            Interagir
          </GradientButton>
        </div>
      </GlassCard>

      {/* Événements récents */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Événements Récents</h3>
        {isLoadingEvents ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 bg-white/10" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {contractEvents?.result?.length > 0 ? (
              contractEvents.result.map((event: any, index: number) => (
                <div key={index} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{event.event || 'Transaction'}</span>
                    <span className="text-gray-400 text-sm">{event.blockNumber || 'Récent'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">
                Aucun événement récent
              </p>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
};
