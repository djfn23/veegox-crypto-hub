
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  AlchemyWalletService, 
  type AlchemyWalletConnection, 
  type AlchemyWalletProvider 
} from '@/services/alchemyWalletService';

interface ConnectedAlchemyWallet extends AlchemyWalletConnection {
  id: string;
  name: string;
  icon: string;
  category: AlchemyWalletProvider['category'];
}

export const useAlchemyWallet = () => {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedAlchemyWallet[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
  const alchemyService = AlchemyWalletService.getInstance();

  const connectWallet = useCallback(async (walletId: string) => {
    const provider = alchemyService.getProvider(walletId);
    if (!provider) {
      toast.error('Wallet provider not found');
      return null;
    }

    setIsConnecting(true);
    setSelectedWallet(walletId);

    try {
      const connection = await provider.connect();
      
      const wallet: ConnectedAlchemyWallet = {
        ...connection,
        id: provider.id,
        name: provider.name,
        icon: provider.icon,
        category: provider.category
      };

      setConnectedWallets(prev => {
        const filtered = prev.filter(w => w.id !== walletId);
        return [...filtered, wallet];
      });

      const accountTypeText = connection.isSmartAccount ? 'Smart Account' : 'EOA';
      toast.success(`${provider.name} connecté avec succès! (${accountTypeText})`);
      return wallet;
    } catch (error: any) {
      console.error('Alchemy wallet connection error:', error);
      
      if (error.message.includes('User rejected')) {
        toast.error('Connexion refusée par l\'utilisateur');
      } else if (error.message.includes('not installed')) {
        toast.error(`${provider.name} n'est pas disponible`);
      } else {
        toast.error(`Erreur de connexion: ${error.message}`);
      }
      
      return null;
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  }, [alchemyService]);

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

  const sponsorTransaction = useCallback(async (
    walletId: string, 
    transaction: any
  ) => {
    const wallet = connectedWallets.find(w => w.id === walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!wallet.isSmartAccount) {
      throw new Error('Gas sponsorship only available for Smart Accounts');
    }

    try {
      const txHash = await alchemyService.sponsorTransaction(wallet, transaction);
      toast.success('Transaction sponsorisée envoyée!');
      return txHash;
    } catch (error: any) {
      toast.error(`Erreur de sponsoring: ${error.message}`);
      throw error;
    }
  }, [connectedWallets, alchemyService]);

  const batchTransactions = useCallback(async (
    walletId: string,
    transactions: any[]
  ) => {
    const wallet = connectedWallets.find(w => w.id === walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!wallet.isSmartAccount) {
      throw new Error('Batch transactions only available for Smart Accounts');
    }

    try {
      const txHash = await alchemyService.batchTransactions(wallet, transactions);
      toast.success(`${transactions.length} transactions groupées envoyées!`);
      return txHash;
    } catch (error: any) {
      toast.error(`Erreur de batch: ${error.message}`);
      throw error;
    }
  }, [connectedWallets, alchemyService]);

  const setupRecovery = useCallback(async (
    walletId: string,
    guardians: string[]
  ) => {
    const wallet = connectedWallets.find(w => w.id === walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    try {
      await alchemyService.setupRecovery(wallet, guardians);
      toast.success('Récupération de compte configurée!');
    } catch (error: any) {
      toast.error(`Erreur de configuration: ${error.message}`);
      throw error;
    }
  }, [connectedWallets, alchemyService]);

  const getAllWallets = useCallback(() => {
    return alchemyService.getAllProviders();
  }, [alchemyService]);

  const getWalletsByCategory = useCallback((category: AlchemyWalletProvider['category']) => {
    return alchemyService.getProvidersByCategory(category);
  }, [alchemyService]);

  const isWalletConnecting = useCallback((walletId: string) => {
    return isConnecting && selectedWallet === walletId;
  }, [isConnecting, selectedWallet]);

  const getSmartAccounts = useCallback(() => {
    return connectedWallets.filter(w => w.isSmartAccount);
  }, [connectedWallets]);

  const getTraditionalWallets = useCallback(() => {
    return connectedWallets.filter(w => !w.isSmartAccount);
  }, [connectedWallets]);

  return {
    connectedWallets,
    isConnecting,
    selectedWallet,
    connectWallet,
    disconnectWallet,
    disconnectAllWallets,
    sponsorTransaction,
    batchTransactions,
    setupRecovery,
    getAllWallets,
    getWalletsByCategory,
    isWalletConnecting,
    getSmartAccounts,
    getTraditionalWallets
  };
};
