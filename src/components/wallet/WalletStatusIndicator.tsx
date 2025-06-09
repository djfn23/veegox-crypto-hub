
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEnhancedWallet } from '@/hooks/useEnhancedWallet';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { WalletConnectionModal } from './WalletConnectionModal';
import { Wallet, ChevronDown, Zap, AlertCircle } from 'lucide-react';

export const WalletStatusIndicator = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const { connectedWallets, disconnectWallet, switchNetwork } = useEnhancedWallet();
  const { connectWallet, isConnecting } = useWalletConnection();

  const primaryWallet = connectedWallets[0];
  const totalWallets = connectedWallets.length;

  if (totalWallets === 0) {
    return (
      <>
        <Button
          onClick={() => setShowConnectionModal(true)}
          variant="outline"
          size="sm"
          className="border-orange-600 text-orange-400 hover:bg-orange-600/10"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connecter Wallet
        </Button>
        <WalletConnectionModal 
          isOpen={showConnectionModal}
          onClose={() => setShowConnectionModal(false)}
          onConnect={connectWallet}
          isConnecting={isConnecting}
        />
      </>
    );
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-400 hover:bg-green-600/10"
          >
            <span className="text-xl mr-2">{primaryWallet.icon}</span>
            <span className="hidden sm:inline">
              {primaryWallet.address.substring(0, 6)}...{primaryWallet.address.substring(primaryWallet.address.length - 4)}
            </span>
            {totalWallets > 1 && (
              <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                +{totalWallets - 1}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-slate-900 border-slate-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-white">Wallets Connectés</h4>
              <Button
                size="sm"
                onClick={() => setShowConnectionModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Wallet className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            
            <div className="space-y-3">
              {connectedWallets.map((wallet, index) => (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{wallet.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium">
                          {wallet.name}
                        </span>
                        {index === 0 && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Principal
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {wallet.address.substring(0, 8)}...{wallet.address.substring(wallet.address.length - 6)}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          Chain {wallet.chainId}
                        </Badge>
                        {wallet.chainId !== 137 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => switchNetwork(137, wallet.id)}
                            className="text-orange-400 hover:text-orange-300 p-0 h-auto"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            <span className="text-xs">Switch to Polygon</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => disconnectWallet(wallet.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Déconnecter
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <WalletConnectionModal 
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
        onConnect={connectWallet}
        isConnecting={isConnecting}
      />
    </>
  );
};
