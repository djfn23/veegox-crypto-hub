
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
  chainId: number;
  connected: boolean;
  icon: string;
}

export const useWalletConnection = () => {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async (walletType: 'metamask' | 'coinbase' | 'walletconnect') => {
    setIsConnecting(true);
    
    try {
      // Vérifier si MetaMask est disponible
      if (walletType === 'metamask' && typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (accounts.length > 0) {
          const newWallet: ConnectedWallet = {
            id: walletType,
            name: 'MetaMask',
            address: accounts[0],
            chainId: parseInt(chainId, 16),
            connected: true,
            icon: '🦊'
          };
          
          setConnectedWallets(prev => {
            const filtered = prev.filter(w => w.id !== walletType);
            return [...filtered, newWallet];
          });
          
          toast.success(`${newWallet.name} connecté avec succès!`);
          return newWallet;
        }
      } else {
        // Pour les autres wallets, on simule la connexion pour le moment
        const walletInfo = {
          metamask: { name: 'MetaMask', icon: '🦊' },
          coinbase: { name: 'Coinbase Wallet', icon: '🔷' },
          walletconnect: { name: 'WalletConnect', icon: '🔗' }
        };
        
        // Adresse de démonstration pour les tests
        const demoAddress = '0x742d35Cc6634C0532925a3b8C17c77234567b9bc2';
        
        const newWallet: ConnectedWallet = {
          id: walletType,
          name: walletInfo[walletType].name,
          address: demoAddress,
          chainId: 1, // Ethereum mainnet
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
    } catch (error: any) {
      console.error('Erreur de connexion wallet:', error);
      toast.error('Erreur lors de la connexion du wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback((walletId: string) => {
    setConnectedWallets(prev => 
      prev.map(wallet => 
        wallet.id === walletId 
          ? { ...wallet, connected: false }
          : wallet
      )
    );
    toast.success('Wallet déconnecté');
  }, []);

  return {
    connectedWallets,
    isConnecting,
    connectWallet,
    disconnectWallet
  };
};

// Déclaration TypeScript pour window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
