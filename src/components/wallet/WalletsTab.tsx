
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Plus } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletData";

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
  onConnectWallet: (walletType: 'metamask' | 'coinbase' | 'walletconnect') => void;
  onDisconnectWallet: (walletId: string) => void;
  isConnecting: boolean;
}

const WalletsTab = ({ wallets, onConnectWallet, onDisconnectWallet, isConnecting }: WalletsTabProps) => {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Gestion des Portefeuilles</h3>
        <GradientButton 
          variant="primary" 
          size="sm"
          onClick={() => onConnectWallet('metamask')}
          disabled={isConnecting}
        >
          <Plus className="h-4 w-4" />
          {isConnecting ? "Connexion..." : "Nouveau Wallet"}
        </GradientButton>
      </div>
      
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <WalletCard 
            key={wallet.id} 
            wallet={wallet} 
            onConnect={onConnectWallet}
            onDisconnect={onDisconnectWallet}
            isConnecting={isConnecting}
          />
        ))}
      </div>
    </GlassCard>
  );
};

interface WalletCardProps {
  wallet: WalletData;
  onConnect: (walletType: 'metamask' | 'coinbase' | 'walletconnect') => void;
  onDisconnect: (walletId: string) => void;
  isConnecting: boolean;
}

const WalletCard = ({ wallet, onConnect, onDisconnect, isConnecting }: WalletCardProps) => {
  const { data: balanceData, isLoading } = useWalletBalance(
    wallet.connected ? wallet.address : null,
    wallet.chainId
  );

  const balance = balanceData?.result?.balance || 0;
  const ethPrice = 2500; // Prix ETH approximatif
  const usdValue = balance * ethPrice;

  const handleAction = () => {
    if (wallet.connected) {
      onDisconnect(wallet.id);
    } else {
      onConnect(wallet.id as 'metamask' | 'coinbase' | 'walletconnect');
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
            variant={wallet.connected ? "outline" : "primary"}
            size="sm"
            onClick={handleAction}
            disabled={isConnecting}
          >
            {isConnecting ? "..." : (wallet.connected ? "Déconnecter" : "Connecter")}
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
};

export { WalletsTab };
