
import { useQuery } from "@tanstack/react-query";
import { Web3Service } from "@/services/web3Service";

export const useWalletBalance = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['wallet-balance', address, chainId],
    queryFn: () => Web3Service.getWalletBalance(address!, chainId),
    enabled: !!address,
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
  });
};

export const useTransactionHistory = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['transaction-history', address, chainId],
    queryFn: () => Web3Service.getTransactionHistory(address!, chainId),
    enabled: !!address,
    refetchInterval: 60000, // Rafraîchir toutes les minutes
  });
};

export const useWalletAge = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['wallet-age', address, chainId],
    queryFn: () => Web3Service.getWalletAge(address!, chainId),
    enabled: !!address,
    staleTime: 300000, // 5 minutes - l'âge ne change pas souvent
  });
};

export const useCreditScoreData = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['credit-score-data', address, chainId],
    queryFn: () => Web3Service.getCreditScoreData(address!, chainId),
    enabled: !!address,
    refetchInterval: 300000, // Rafraîchir toutes les 5 minutes
  });
};
