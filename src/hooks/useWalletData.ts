
import { useQuery } from "@tanstack/react-query";
import { Web3Service } from "@/services/web3Service";
import { useAppStore } from "@/store/useAppStore";

export const useWalletBalance = (address: string | null, chainId: number = 1) => {
  const { setLoading } = useAppStore();
  
  return useQuery({
    queryKey: ['wallet-balance', address, chainId],
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
    onError: () => {
      setLoading('wallets', false);
    },
  });
};

export const useTransactionHistory = (address: string | null, chainId: number = 1) => {
  const { setLoading, addNotification } = useAppStore();
  
  return useQuery({
    queryKey: ['transaction-history', address, chainId],
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
    onError: (error: any) => {
      setLoading('transactions', false);
      addNotification({
        title: 'Erreur de chargement',
        message: 'Impossible de récupérer l\'historique des transactions',
        type: 'error',
        read: false,
      });
    },
  });
};

export const useWalletAge = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['wallet-age', address, chainId],
    queryFn: () => Web3Service.getWalletAge(address!, chainId),
    enabled: !!address,
    staleTime: 300000,
  });
};

export const useCreditScoreData = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['credit-score-data', address, chainId],
    queryFn: () => Web3Service.getCreditScoreData(address!, chainId),
    enabled: !!address,
    refetchInterval: 300000,
  });
};
