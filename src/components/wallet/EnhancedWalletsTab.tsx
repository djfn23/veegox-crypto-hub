
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { WalletConnectionModal } from "./WalletConnectionModal";
import { useEnhancedWallet } from "@/hooks/useEnhancedWallet";
import { useWalletBalance } from "@/hooks/useWalletData";
import { Plus, Settings, ExternalLink, Zap, Shield, Smartphone } from "lucide-react";

export const EnhancedWalletsTab = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const {
    connectedWallets,
    disconnectWallet,
    disconnectAllWallets,
    switchNetwork,
    isConnecting
  } = useEnhancedWallet();

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Portefeuilles Connectés</h3>
            <p className="text-gray-400">Gérez vos connexions Web3</p>
          </div>
          <div className="flex space-x-3">
            {connectedWallets.length > 1 && (
              <Button
                onClick={disconnectAllWallets}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600/10"
              >
                Tout déconnecter
              </Button>
            )}
            <GradientButton 
              variant="primary" 
              onClick={() => setShowConnectionModal(true)}
              disabled={isConnecting}
            >
              <Plus className="h-4 w-4 mr-2" />
              Connecter Wallet
            </GradientButton>
          </div>
        </div>

        {connectedWallets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Aucun wallet connecté</h4>
            <p className="text-gray-400 mb-6">
              Connectez votre premier wallet pour commencer à utiliser la plateforme
            </p>
            <GradientButton onClick={() => setShowConnectionModal(true)}>
              Connecter un Wallet
            </GradientButton>
          </div>
        ) : (
          <div className="space-y-4">
            {connectedWallets.map((wallet) => (
              <ConnectedWalletCard 
                key={wallet.id}
                wallet={wallet}
                onDisconnect={disconnectWallet}
                onSwitchNetwork={switchNetwork}
              />
            ))}
          </div>
        )}
      </GlassCard>

      <WalletConnectionModal 
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
      />
    </div>
  );
};

interface ConnectedWalletCardProps {
  wallet: any;
  onDisconnect: (walletId: string) => void;
  onSwitchNetwork: (chainId: number, walletId?: string) => void;
}

const ConnectedWalletCard = ({ wallet, onDisconnect, onSwitchNetwork }: ConnectedWalletCardProps) => {
  const { data: balanceData, isLoading } = useWalletBalance(wallet.address, wallet.chainId);
  
  const balance = balanceData?.result?.balance || 0;
  const ethPrice = 2500; // Prix ETH approximatif
  const usdValue = balance * ethPrice;

  const getCategoryIcon = () => {
    switch (wallet.category) {
      case 'browser': return <ExternalLink className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'hardware': return <Shield className="h-4 w-4" />;
      case 'institutional': return <Settings className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum';
      case 137: return 'Polygon';
      case 56: return 'BSC';
      case 43114: return 'Avalanche';
      case 250: return 'Fantom';
      default: return `Chain ${chainId}`;
    }
  };

  const getNetworkColor = (chainId: number) => {
    switch (chainId) {
      case 1: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 137: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 56: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{wallet.icon}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white font-semibold text-lg">{wallet.name}</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {getCategoryIcon()}
                <span className="ml-1 capitalize">{wallet.category}</span>
              </Badge>
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <div className="font-mono">
                {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getNetworkColor(wallet.chainId)}>
                  {getNetworkName(wallet.chainId)}
                </Badge>
                {isLoading ? (
                  <span>Chargement...</span>
                ) : (
                  <span>{balance.toFixed(4)} ETH</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            {!isLoading && (
              <div className="text-white font-semibold">
                <AnimatedNumber value={usdValue} prefix="$" />
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwitchNetwork(137, wallet.id)}
              className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
            >
              Polygon
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDisconnect(wallet.id)}
              className="border-red-600 text-red-400 hover:bg-red-600/10"
            >
              Déconnecter
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
