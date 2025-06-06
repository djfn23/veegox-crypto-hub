
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useWeb3Wallet } from './useWeb3Wallet';

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

  // Convertir le wallet Web3 en format compatible
  const convertedWallets = web3Wallet ? [{
    id: web3Wallet.id,
    name: web3Wallet.name,
    address: web3Wallet.address,
    chainId: web3Wallet.chainId,
    connected: web3Wallet.connected,
    icon: web3Wallet.icon
  }] : [];

  const connectWallet = useCallback(async (walletType: 'metamask' | 'coinbase' | 'walletconnect') => {
    if (walletType === 'metamask') {
      return await connectMetaMask();
    } else {
      // Pour les autres wallets, on simule la connexion pour le moment
      const walletInfo = {
        coinbase: { name: 'Coinbase Wallet', icon: '🔷' },
        walletconnect: { name: 'WalletConnect', icon: '🔗' }
      };
      
      const demoAddress = '0x742d35Cc6634C0532925a3b8C17c77234567b9bc2';
      
      const newWallet: ConnectedWallet = {
        id: walletType,
        name: walletInfo[walletType].name,
        address: demoAddress,
        chainId: 1,
        connected: true,
        icon: walletInfo[walletType].icon
      };
      
      setConnectedWallets(prev => {
        const filtered = prev.filter(w => w.id !== walletType);
        return [...filtered, newWallet];
      });
      
      toast.success(`${newWallet.name} connecté avec succès!`);
      return newWallet;
    }
  }, [connectMetaMask]);

  const disconnectWallet = useCallback((walletId: string) => {
    if (walletId === 'metamask') {
      disconnectWeb3();
    } else {
      setConnectedWallets(prev => 
        prev.map(wallet => 
          wallet.id === walletId 
            ? { ...wallet, connected: false }
            : wallet
        )
      );
      toast.success('Wallet déconnecté');
    }
  }, [disconnectWeb3]);

  // Fusionner les wallets
  const allWallets = [
    ...convertedWallets,
    ...connectedWallets.filter(w => w.id !== 'metamask')
  ];

  return {
    connectedWallets: allWallets,
    isConnecting,
    connectWallet,
    disconnectWallet
  };
};
