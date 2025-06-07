
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { WalletService, WalletProvider } from '@/services/walletService';

interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
  chainId: number;
  connected: boolean;
  icon: string;
  provider: any;
  category: WalletProvider['category'];
}

export const useEnhancedWallet = () => {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
  const walletService = WalletService.getInstance();

  const connectWallet = useCallback(async (walletId: string) => {
    const provider = walletService.getProvider(walletId);
    if (!provider) {
      toast.error('Wallet provider not found');
      return null;
    }

    setIsConnecting(true);
    setSelectedWallet(walletId);

    try {
      const connection = await provider.connect();
      
      const wallet: ConnectedWallet = {
        id: provider.id,
        name: provider.name,
        address: connection.address,
        chainId: connection.chainId,
        connected: true,
        icon: provider.icon,
        provider: connection.provider,
        category: provider.category
      };

      setConnectedWallets(prev => {
        const filtered = prev.filter(w => w.id !== walletId);
        return [...filtered, wallet];
      });

      toast.success(`${provider.name} connecté avec succès!`);
      return wallet;
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      if (error.message.includes('not installed')) {
        toast.error(`${provider.name} n'est pas installé. Voulez-vous le télécharger?`, {
          action: provider.downloadUrl ? {
            label: 'Télécharger',
            onClick: () => window.open(provider.downloadUrl, '_blank')
          } : undefined
        });
      } else if (error.code === 4001) {
        toast.error('Connexion refusée par l\'utilisateur');
      } else {
        toast.error(`Erreur de connexion: ${error.message}`);
      }
      
      return null;
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  }, [walletService]);

  const disconnectWallet = useCallback((walletId: string) => {
    setConnectedWallets(prev => 
      prev.filter(wallet => wallet.id !== walletId)
    );
    toast.success('Wallet déconnecté');
  }, []);

  const disconnectAllWallets = useCallback(() => {
    setConnectedWallets([]);
    toast.success('Tous les wallets déconnectés');
  }, []);

  const switchNetwork = useCallback(async (chainId: number, walletId?: string) => {
    const targetWallets = walletId 
      ? connectedWallets.filter(w => w.id === walletId)
      : connectedWallets;

    for (const wallet of targetWallets) {
      try {
        await wallet.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
        
        setConnectedWallets(prev =>
          prev.map(w => 
            w.id === wallet.id 
              ? { ...w, chainId }
              : w
          )
        );
      } catch (error: any) {
        if (error.code === 4902) {
          toast.error(`Réseau non ajouté dans ${wallet.name}`);
        } else {
          toast.error(`Erreur changement de réseau: ${error.message}`);
        }
      }
    }
  }, [connectedWallets]);

  const getWalletsByCategory = useCallback((category: WalletProvider['category']) => {
    return walletService.getProvidersByCategory(category);
  }, [walletService]);

  const getInstalledWallets = useCallback(() => {
    return walletService.getInstalledProviders();
  }, [walletService]);

  const getAllWallets = useCallback(() => {
    return walletService.getAllProviders();
  }, [walletService]);

  const isWalletConnecting = useCallback((walletId: string) => {
    return isConnecting && selectedWallet === walletId;
  }, [isConnecting, selectedWallet]);

  // Listen for account/network changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[], walletId: string) => {
      if (accounts.length === 0) {
        disconnectWallet(walletId);
      } else {
        setConnectedWallets(prev =>
          prev.map(w => 
            w.id === walletId 
              ? { ...w, address: accounts[0] }
              : w
          )
        );
      }
    };

    const handleChainChanged = (chainId: string, walletId: string) => {
      const numericChainId = parseInt(chainId, 16);
      setConnectedWallets(prev =>
        prev.map(w => 
          w.id === walletId 
            ? { ...w, chainId: numericChainId }
            : w
        )
      );
    };

    // Set up listeners for connected wallets
    connectedWallets.forEach(wallet => {
      if (wallet.provider) {
        wallet.provider.on?.('accountsChanged', (accounts: string[]) => 
          handleAccountsChanged(accounts, wallet.id)
        );
        wallet.provider.on?.('chainChanged', (chainId: string) => 
          handleChainChanged(chainId, wallet.id)
        );
      }
    });

    return () => {
      // Cleanup listeners
      connectedWallets.forEach(wallet => {
        wallet.provider?.removeAllListeners?.('accountsChanged');
        wallet.provider?.removeAllListeners?.('chainChanged');
      });
    };
  }, [connectedWallets, disconnectWallet]);

  return {
    connectedWallets,
    isConnecting,
    selectedWallet,
    connectWallet,
    disconnectWallet,
    disconnectAllWallets,
    switchNetwork,
    getWalletsByCategory,
    getInstalledWallets,
    getAllWallets,
    isWalletConnecting
  };
};
