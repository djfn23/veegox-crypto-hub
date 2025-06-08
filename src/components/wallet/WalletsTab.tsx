
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Plus, Wallet } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletData";
import { WalletConnectionModal } from './WalletConnectionModal';

interface WalletData {
  id: string;
  name: string;
  address: string;
  connected: boolean;
  icon: string;
  chainId: number;
}

interface WalletsTabProps {
  wallets: WalletData[];
  onConnectWallet: (walletId: string) => void;
  onDisconnectWallet: (walletId: string) => void;
  isConnecting: boolean;
}

const WalletsTab = ({ wallets, onConnectWallet, onDisconnectWallet, isConnecting }: WalletsTabProps) => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);

  return (
    <>
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Gestion des Portefeuilles</h3>
          <GradientButton 
            variant="primary" 
            size="sm"
            onClick={() => setShowConnectionModal(true)}
            disabled={isConnecting}
          >
            <Plus className="h-4 w-4" />
            {isConnecting ? "Connexion..." : "Connecter Wallet"}
          </GradientButton>
        </div>
        
        {wallets.length === 0 ? (
          <div className="text-center py-12">
            <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-white mb-2">Aucun wallet connecté</h4>
            <p className="text-gray-400 mb-6">Connectez votre premier wallet pour commencer</p>
            <GradientButton 
              variant="primary"
              onClick={() => setShowConnectionModal(true)}
              disabled={isConnecting}
            >
              <Plus className="h-4 w-4 mr-2" />
              Connecter un Wallet
            </GradientButton>
          </div>
        ) : (
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <WalletCard 
                key={wallet.id} 
                wallet={wallet} 
                onDisconnect={onDisconnectWallet}
                isConnecting={isConnecting}
              />
            ))}
          </div>
        )}
      </GlassCard>

      <WalletConnectionModal 
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        onConnect={onConnectWallet}
        isConnecting={isConnecting}
      />
    </>
  );
};

interface WalletCardProps {
  wallet: WalletData;
  onDisconnect: (walletId: string) => void;
  isConnecting: boolean;
}

const WalletCard = ({ wallet, onDisconnect, isConnecting }: WalletCardProps) => {
  const { data: balanceData, isLoading } = useWalletBalance(
    wallet.connected ? wallet.address : null,
    wallet.chainId
  );

  const balance = balanceData?.result?.balance || 0;
  const ethPrice = 2500; // Prix ETH approximatif
  const usdValue = balance * ethPrice;

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{wallet.icon}</span>
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{wallet.name}</div>
            <div className="text-gray-400 text-sm">
              {wallet.connected ? (
                <>
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                  <br />
                  {isLoading ? "Chargement..." : `${balance.toFixed(4)} ETH`}
                </>
              ) : (
                "Non connecté"
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            {wallet.connected && !isLoading ? (
              <div className="text-white font-semibold">
                <AnimatedNumber value={usdValue} prefix="$" />
              </div>
            ) : null}
            <Badge 
              variant={wallet.connected ? "default" : "secondary"}
              className={wallet.connected ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
            >
              {wallet.connected ? "Connecté" : "Déconnecté"}
            </Badge>
          </div>
          <GradientButton 
            variant="outline"
            size="sm"
            onClick={() => onDisconnect(wallet.id)}
            disabled={isConnecting}
          >
            Déconnecter
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
};

export { WalletsTab };
