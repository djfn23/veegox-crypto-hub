
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import { Web3Service } from '@/services/web3Service';

export const useOptimizedTokenBalances = (address: string | null, chainId: number = 1) => {
  const { setLoading } = useAppStore();
  
  return useQuery({
    queryKey: ['optimized-token-balances', address, chainId],
    queryFn: async () => {
      setLoading('assets', true);
      try {
        const result = await Web3Service.getTokenBalances(address!, chainId);
        return result;
      } finally {
        setLoading('assets', false);
      }
    },
    enabled: !!address,
    refetchInterval: 30000,
    staleTime: 15000, // Consider data stale after 15 seconds
    cacheTime: 300000, // Keep in cache for 5 minutes
    retry: (failureCount, error) => {
      // Custom retry logic
      if (failureCount >= 3) return false;
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useOptimizedTransactionHistory = (address: string | null, chainId: number = 1) => {
  const { setLoading } = useAppStore();
  
  return useQuery({
    queryKey: ['optimized-transaction-history', address, chainId],
    queryFn: async () => {
      setLoading('transactions', true);
      try {
        const result = await Web3Service.getTransactionHistory(address!, chainId);
        return result;
      } finally {
        setLoading('transactions', false);
      }
    },
    enabled: !!address,
    refetchInterval: 60000,
    staleTime: 30000,
    cacheTime: 600000, // Keep in cache for 10 minutes
  });
};

export const useOptimizedWalletBalance = (address: string | null, chainId: number = 1) => {
  const { setLoading } = useAppStore();
  
  return useQuery({
    queryKey: ['optimized-wallet-balance', address, chainId],
    queryFn: async () => {
      setLoading('wallets', true);
      try {
        const result = await Web3Service.getWalletBalance(address!, chainId);
        return result;
      } finally {
        setLoading('wallets', false);
      }
    },
    enabled: !!address,
    refetchInterval: 30000,
    staleTime: 15000,
    cacheTime: 300000,
  });
};

// Hook pour précharger les données
export const usePrefetchData = () => {
  const queryClient = useQueryClient();
  
  const prefetchTokenPrices = (tokenAddresses: string[], chainId: number = 1) => {
    queryClient.prefetchQuery({
      queryKey: ['token-prices', tokenAddresses, chainId],
      queryFn: () => Web3Service.getTokenPrices(tokenAddresses, chainId),
      staleTime: 30000,
    });
  };
  
  const prefetchNFTs = (address: string, chainId: number = 1) => {
    queryClient.prefetchQuery({
      queryKey: ['nft-collection', address, chainId],
      queryFn: () => Web3Service.getNFTsForWallet(address, chainId),
      staleTime: 60000,
    });
  };
  
  return { prefetchTokenPrices, prefetchNFTs };
};
