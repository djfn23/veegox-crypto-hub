
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
