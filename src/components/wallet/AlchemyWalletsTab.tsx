
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { AlchemyWalletModal } from "./AlchemyWalletModal";
import { useAlchemyWallet } from "@/hooks/useAlchemyWallet";
import { useWalletBalance } from "@/hooks/useWalletData";
import { 
  Plus, 
  Zap, 
  Shield, 
  Brain, 
  Users, 
  Monitor, 
  Gift,
  Key,
  Layers,
  Send,
  Fuel
} from "lucide-react";

export const AlchemyWalletsTab = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const {
    connectedWallets,
    disconnectWallet,
    disconnectAllWallets,
    sponsorTransaction,
    batchTransactions,
    setupRecovery,
    isConnecting,
    connectWallet,
    getSmartAccounts,
    getTraditionalWallets
  } = useAlchemyWallet();

  const smartAccounts = getSmartAccounts();
  const traditionalWallets = getTraditionalWallets();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="h-7 w-7 text-blue-400" />
              Alchemy Account Kit
            </h3>
            <p className="text-gray-400 mt-1">
              Wallets avancés avec Account Abstraction et connexion sociale
            </p>
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

        {/* Features Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-medium">Transactions Gratuites</span>
            </div>
            <p className="text-gray-400 text-sm">Gas sponsorisé par Alchemy</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Key className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Connexion Sociale</span>
            </div>
            <p className="text-gray-400 text-sm">Google, Apple, Email</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Account Abstraction</span>
            </div>
            <p className="text-gray-400 text-sm">Smart Contract Accounts</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Récupération</span>
            </div>
            <p className="text-gray-400 text-sm">Récupération sociale</p>
          </div>
        </div>
      </GlassCard>

      {/* Connected Wallets */}
      {connectedWallets.length === 0 ? (
        <GlassCard className="p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Découvrez Alchemy Account Kit</h4>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Connectez-vous avec Google, créez des Smart Accounts, et profitez de transactions gratuites
            </p>
            <GradientButton onClick={() => setShowConnectionModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Connecter votre premier wallet
            </GradientButton>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {/* Smart Accounts Section */}
          {smartAccounts.length > 0 && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Smart Accounts ({smartAccounts.length})</h4>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Account Abstraction
                </Badge>
              </div>
              <div className="space-y-3">
                {smartAccounts.map((wallet) => (
                  <SmartAccountCard 
                    key={wallet.id}
                    wallet={wallet}
                    onDisconnect={disconnectWallet}
                    onSponsorTransaction={sponsorTransaction}
                    onBatchTransactions={batchTransactions}
                    onSetupRecovery={setupRecovery}
                  />
                ))}
              </div>
            </GlassCard>
          )}

          {/* Traditional Wallets Section */}
          {traditionalWallets.length > 0 && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Monitor className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Wallets Classiques ({traditionalWallets.length})</h4>
              </div>
              <div className="space-y-3">
                {traditionalWallets.map((wallet) => (
                  <TraditionalWalletCard 
                    key={wallet.id}
                    wallet={wallet}
                    onDisconnect={disconnectWallet}
                  />
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      )}

      <AlchemyWalletModal 
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        onConnect={connectWallet}
        isConnecting={isConnecting}
      />
    </div>
  );
};

// Component pour Smart Account Card
interface SmartAccountCardProps {
  wallet: any;
  onDisconnect: (walletId: string) => void;
  onSponsorTransaction: (walletId: string, tx: any) => void;
  onBatchTransactions: (walletId: string, txs: any[]) => void;
  onSetupRecovery: (walletId: string, guardians: string[]) => void;
}

const SmartAccountCard = ({ 
  wallet, 
  onDisconnect, 
  onSponsorTransaction,
  onBatchTransactions,
  onSetupRecovery 
}: SmartAccountCardProps) => {
  const { data: balanceData, isLoading } = useWalletBalance(wallet.address, wallet.chainId);
  const balance = balanceData?.result?.balance || 0;
  const usdValue = balance * 2500; // Prix ETH approximatif

  const getCategoryIcon = () => {
    switch (wallet.category) {
      case 'social': return <Users className="h-4 w-4" />;
      case 'smart': return <Brain className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200 border-purple-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{wallet.icon}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white font-semibold text-lg">{wallet.name}</span>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                {getCategoryIcon()}
                <span className="ml-1">{wallet.accountType.toUpperCase()}</span>
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Gift className="h-3 w-3 mr-1" />
                Gas Gratuit
              </Badge>
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <div className="font-mono">
                {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 6)}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Polygon
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
              onClick={() => onSponsorTransaction(wallet.id, {})}
              className="border-green-600 text-green-400 hover:bg-green-600/10"
            >
              <Gift className="h-3 w-3 mr-1" />
              Tx Gratuite
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

// Component pour Traditional Wallet Card
interface TraditionalWalletCardProps {
  wallet: any;
  onDisconnect: (walletId: string) => void;
}

const TraditionalWalletCard = ({ wallet, onDisconnect }: TraditionalWalletCardProps) => {
  const { data: balanceData, isLoading } = useWalletBalance(wallet.address, wallet.chainId);
  const balance = balanceData?.result?.balance || 0;
  const usdValue = balance * 2500;

  return (
    <GlassCard className="p-4 hover:scale-[1.01] transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">{wallet.icon}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-white font-semibold text-lg">{wallet.name}</span>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Monitor className="h-4 w-4 mr-1" />
                EOA
              </Badge>
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <div className="font-mono">
                {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 6)}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Polygon
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
    </GlassCard>
  );
};
