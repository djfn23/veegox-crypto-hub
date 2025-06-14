
import { useQuery } from '@tanstack/react-query';
import { Web3Service } from '@/services/web3Service';

export const useWalletBalance = (address: string | null, chainId: number = 137) => {
  return useQuery({
    queryKey: ['wallet-balance', address, chainId],
    queryFn: () => address ? Web3Service.getWalletBalance(address, chainId) : null,
    enabled: !!address,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 30, // 30 seconds
  });
};

export const useTransactionHistory = (address: string | null, chainId: number = 137) => {
  return useQuery({
    queryKey: ['transaction-history', address, chainId],
    queryFn: () => address ? Web3Service.getTransactionHistory(address, chainId) : null,
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreditScoreData = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['credit-score-data', address, chainId],
    queryFn: async () => {
      if (!address) return null;
      
      // Mock credit score data for demo
      const balance = await Web3Service.getWalletBalance(address, chainId);
      const transactions = await Web3Service.getTransactionHistory(address, chainId);
      
      return {
        result: {
          balance: balance.result?.balance || 0,
          walletAgeDays: Math.floor(Math.random() * 365) + 30,
          transactionCount: transactions.result?.length || 0,
          uniqueContacts: Math.floor(Math.random() * 50) + 10,
          totalValue: (balance.result?.balance || 0) * 2500,
          lastMonthActivityCount: Math.floor(Math.random() * 20) + 5
        }
      };
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
