
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface Web3Wallet {
  id: string;
  name: string;
  address: string;
  chainId: number;
  connected: boolean;
  icon: string;
  provider?: any;
}

// V2 : Ne pas appeler de hooks React côté serveur
const canUseDOM = typeof window !== "undefined";

export const useWeb3Wallet = () => {
  // Guard: don't run this hook on server
  if (!canUseDOM) {
    return {
      connectedWallet: null,
      isConnecting: false,
      connectMetaMask: async () => {},
      disconnectWallet: () => {},
      signTransaction: async () => { throw new Error("Unavailable on server"); },
    };
  }

  const [connectedWallet, setConnectedWallet] = useState<Web3Wallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const switchToPolygon = async (provider: any) => {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // Polygon Mainnet
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
            }],
          });
        } catch (addError) {
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  };

  const connectMetaMask = useCallback(async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainId, 16) !== 137) {
          await switchToPolygon(window.ethereum);
        }
        if (accounts.length > 0) {
          const wallet: Web3Wallet = {
            id: 'metamask',
            name: 'MetaMask',
            address: accounts[0],
            chainId: 137,
            connected: true,
            icon: '🦊',
            provider: window.ethereum
          };
          setConnectedWallet(wallet);
          toast.success('Wallet connecté avec succès sur Polygon!');
          return wallet;
        }
      } else {
        toast.error('MetaMask non détecté. Veuillez l\'installer.');
      }
    } catch (error: any) {
      console.error('Erreur de connexion wallet:', error);
      toast.error('Erreur lors de la connexion du wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setConnectedWallet(null);
    toast.success('Wallet déconnecté');
  }, []);

  const signTransaction = async (transaction: any) => {
    if (!connectedWallet?.provider) {
      throw new Error('Aucun wallet connecté');
    }
    try {
      const txHash = await connectedWallet.provider.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });
      return txHash;
    } catch (error: any) {
      console.error('Erreur de signature:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!canUseDOM || typeof window.ethereum === 'undefined') {
      return;
    }
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (connectedWallet) {
        setConnectedWallet({
          ...connectedWallet,
          address: accounts[0]
        });
      }
    };

    const handleChainChanged = (chainId: string) => {
      if (connectedWallet) {
        setConnectedWallet({
          ...connectedWallet,
          chainId: parseInt(chainId, 16)
        });
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [connectedWallet, disconnectWallet]);

  return {
    connectedWallet,
    isConnecting,
    connectMetaMask,
    disconnectWallet,
    signTransaction
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
