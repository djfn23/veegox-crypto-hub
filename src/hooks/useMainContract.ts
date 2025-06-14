
import { useQuery } from '@tanstack/react-query';
import { ContractService } from '@/services/contractService';

export const useMainContractInfo = () => {
  return useQuery({
    queryKey: ['main-contract-info'],
    queryFn: () => ContractService.getMainContractInfo(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUserContractBalance = (address: string | null) => {
  return useQuery({
    queryKey: ['user-contract-balance', address],
    queryFn: () => address ? ContractService.getUserBalance(address) : null,
    enabled: !!address,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 30, // 30 seconds
  });
};
