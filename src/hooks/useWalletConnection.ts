
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useWeb3Wallet } from './useWeb3Wallet';
import { WalletService, WalletProvider } from '@/services/walletService';

interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
  chainId: number;
  connected: boolean;
  icon: string;
}

export const useWalletConnection = () => {
  const { connectedWallet: web3Wallet, connectMetaMask, disconnectWallet: disconnectWeb3, isConnecting } = useWeb3Wallet();
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [connectingWalletId, setConnectingWalletId] = useState<string | null>(null);
  
  const walletService = WalletService.getInstance();

  // Convertir le wallet Web3 en format compatible
  const convertedWallets = web3Wallet ? [{
    id: web3Wallet.id,
    name: web3Wallet.name,
    address: web3Wallet.address,
    chainId: web3Wallet.chainId,
    connected: web3Wallet.connected,
    icon: web3Wallet.icon
  }] : [];

  const connectWallet = useCallback(async (walletId: string) => {
    setConnectingWalletId(walletId);
    
    try {
      if (walletId === 'metamask') {
        const result = await connectMetaMask();
        setConnectingWalletId(null);
        return result;
      }

      // Utiliser le WalletService pour les autres wallets
      const provider = walletService.getProvider(walletId);
      if (!provider) {
        throw new Error(`Wallet provider ${walletId} not found`);
      }

      try {
        const connection = await provider.connect();
        
        const newWallet: ConnectedWallet = {
          id: walletId,
          name: provider.name,
          address: connection.address,
          chainId: connection.chainId,
          connected: true,
          icon: provider.icon
        };
        
        setConnectedWallets(prev => {
          const filtered = prev.filter(w => w.id !== walletId);
          return [...filtered, newWallet];
        });
        
        toast.success(`${provider.name} connecté avec succès!`);
        return newWallet;
      } catch (error: any) {
        // Si le wallet n'est pas installé, proposer de le télécharger
        if (error.message.includes('not installed') && provider.downloadUrl) {
          toast.error(`${provider.name} n'est pas installé. Téléchargez-le d'abord.`, {
            action: {
              label: 'Télécharger',
              onClick: () => window.open(provider.downloadUrl, '_blank')
            }
          });
        } else {
          toast.error(`Erreur de connexion ${provider.name}: ${error.message}`);
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast.error(`Erreur lors de la connexion: ${error.message}`);
    } finally {
      setConnectingWalletId(null);
    }
  }, [connectMetaMask, walletService]);

  const disconnectWallet = useCallback((walletId: string) => {
    if (walletId === 'metamask') {
      disconnectWeb3();
    } else {
      setConnectedWallets(prev => 
        prev.filter(wallet => wallet.id !== walletId)
      );
      toast.success('Wallet déconnecté');
    }
  }, [disconnectWeb3]);

  const getAllWallets = useCallback(() => {
    return walletService.getAllProviders();
  }, [walletService]);

  const getInstalledWallets = useCallback(() => {
    return walletService.getInstalledProviders();
  }, [walletService]);

  const getWalletsByCategory = useCallback((category: WalletProvider['category']) => {
    return walletService.getProvidersByCategory(category);
  }, [walletService]);

  const isWalletConnecting = useCallback((walletId: string) => {
    return connectingWalletId === walletId || (walletId === 'metamask' && isConnecting);
  }, [connectingWalletId, isConnecting]);

  // Fusionner les wallets
  const allWallets = [
    ...convertedWallets,
    ...connectedWallets.filter(w => w.id !== 'metamask')
  ];

  return {
    connectedWallets: allWallets,
    isConnecting: isConnecting || connectingWalletId !== null,
    connectWallet,
    disconnectWallet,
    getAllWallets,
    getInstalledWallets,
    getWalletsByCategory,
    isWalletConnecting
  };
};
