
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { MultiChainWeb3Service, MultiChainBalance, NetworkHealth } from '@/services/multiChainWeb3Service';
import { BLOCKCHAIN_NETWORKS, BlockchainNetwork } from '@/lib/blockchain/networks';

export const useMultiChain = () => {
  const [currentChainId, setCurrentChainId] = useState<number>(137); // Default to Polygon
  const [networkHealth, setNetworkHealth] = useState<NetworkHealth[]>([]);
  const [multiChainBalances, setMultiChainBalances] = useState<MultiChainBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentNetwork = BLOCKCHAIN_NETWORKS[currentChainId];

  const switchNetwork = useCallback(async (chainId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await MultiChainWeb3Service.switchNetwork(chainId);
      if (success) {
        setCurrentChainId(chainId);
        toast.success(`Basculé vers ${BLOCKCHAIN_NETWORKS[chainId]?.name}`);
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(`Erreur lors du changement de réseau: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshNetworkHealth = useCallback(async () => {
    try {
      const health = await MultiChainWeb3Service.getAllNetworkHealth();
      setNetworkHealth(health);
    } catch (error: any) {
      console.error('Error refreshing network health:', error);
    }
  }, []);

  const getMultiChainBalances = useCallback(async (address: string) => {
    if (!address) return;

    setIsLoading(true);
    try {
      const mainnetChainIds = MultiChainWeb3Service.getMainnetNetworks().map(n => n.chainId);
      const balances = await MultiChainWeb3Service.getMultiChainBalances(address, mainnetChainIds);
      setMultiChainBalances(balances);
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors de la récupération des balances multi-chaînes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deployTokenMultiChain = useCallback(async (tokenConfig: any, targetChainIds: number[]) => {
    setIsLoading(true);
    try {
      const deployments = await MultiChainWeb3Service.deployTokenMultiChain(tokenConfig, targetChainIds);
      toast.success(`Token déployé sur ${deployments.length} chaînes`);
      return deployments;
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors du déploiement multi-chaînes');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen for network changes from MetaMask
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleChainChanged = (chainId: string) => {
        const numericChainId = parseInt(chainId, 16);
        setCurrentChainId(numericChainId);
      };

      window.ethereum.on('chainChanged', handleChainChanged);

      // Get initial chain ID
      window.ethereum.request({ method: 'eth_chainId' })
        .then((chainId: string) => {
          setCurrentChainId(parseInt(chainId, 16));
        })
        .catch(console.error);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  // Auto-refresh network health every minute
  useEffect(() => {
    refreshNetworkHealth();
    const interval = setInterval(refreshNetworkHealth, 60000);
    return () => clearInterval(interval);
  }, [refreshNetworkHealth]);

  return {
    currentChainId,
    currentNetwork,
    networkHealth,
    multiChainBalances,
    isLoading,
    error,
    switchNetwork,
    refreshNetworkHealth,
    getMultiChainBalances,
    deployTokenMultiChain,
    getSupportedNetworks: MultiChainWeb3Service.getSupportedNetworks,
    getMainnetNetworks: MultiChainWeb3Service.getMainnetNetworks,
    getTestnetNetworks: MultiChainWeb3Service.getTestnetNetworks
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
