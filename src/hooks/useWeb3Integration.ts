
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Web3Service } from '@/services/web3Service';
import { useAuth } from './useAuth';

interface Web3State {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useWeb3Integration = () => {
  const { user } = useAuth();
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: null,
    isLoading: false,
    error: null
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask non détecté. Veuillez l\'installer.');
      return false;
    }

    setWeb3State(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length === 0) {
        throw new Error('Aucun compte sélectionné');
      }

      // Get chain ID
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });

      const account = accounts[0];
      const numericChainId = parseInt(chainId, 16);

      // Switch to Polygon if not already
      if (numericChainId !== 137) {
        await switchToPolygon();
      }

      // Get balance
      const balanceResult = await Web3Service.getWalletBalance(account, 137);
      const balance = balanceResult.result?.balance || '0';

      setWeb3State({
        isConnected: true,
        account,
        chainId: 137,
        balance,
        isLoading: false,
        error: null
      });

      toast.success('Wallet connecté avec succès !');
      return true;

    } catch (error: any) {
      console.error('Erreur de connexion wallet:', error);
      setWeb3State(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message 
      }));
      toast.error('Erreur lors de la connexion du wallet');
      return false;
    }
  };

  const switchToPolygon = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }], // Polygon Mainnet
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
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

  const disconnectWallet = () => {
    setWeb3State({
      isConnected: false,
      account: null,
      chainId: null,
      balance: null,
      isLoading: false,
      error: null
    });
    toast.success('Wallet déconnecté');
  };

  const refreshBalance = async () => {
    if (!web3State.account) return;

    try {
      const balanceResult = await Web3Service.getWalletBalance(web3State.account, 137);
      const balance = balanceResult.result?.balance || '0';
      
      setWeb3State(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Erreur lors du refresh du balance:', error);
    }
  };

  // Listen for account/network changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setWeb3State(prev => ({ ...prev, account: accounts[0] }));
        refreshBalance();
      }
    };

    const handleChainChanged = (chainId: string) => {
      const numericChainId = parseInt(chainId, 16);
      setWeb3State(prev => ({ ...prev, chainId: numericChainId }));
      
      if (numericChainId !== 137) {
        toast.warning('Veuillez vous connecter au réseau Polygon');
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [web3State.account]);

  // Auto-refresh balance every 30 seconds
  useEffect(() => {
    if (!web3State.account) return;

    const interval = setInterval(refreshBalance, 30000);
    return () => clearInterval(interval);
  }, [web3State.account]);

  return {
    ...web3State,
    connectWallet,
    disconnectWallet,
    switchToPolygon,
    refreshBalance
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
