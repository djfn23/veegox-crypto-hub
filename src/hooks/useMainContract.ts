
import { useQuery, useMutation } from '@tanstack/react-query';
import { ContractService } from '@/services/contractService';
import { toast } from 'sonner';

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

export const useContractTransfer = () => {
  return useMutation({
    mutationFn: async ({ to, amount }: { to: string; amount: string }) => {
      const result = await ContractService.executeContractFunction('transfer', [to, amount]);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Transfer successful!');
    },
    onError: (error: Error) => {
      toast.error(`Transfer failed: ${error.message}`);
    },
  });
};

export const useContractApprove = () => {
  return useMutation({
    mutationFn: async ({ spender, amount }: { spender: string; amount: string }) => {
      const result = await ContractService.executeContractFunction('approve', [spender, amount]);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Approval successful!');
    },
    onError: (error: Error) => {
      toast.error(`Approval failed: ${error.message}`);
    },
  });
};

export const useContractBurn = () => {
  return useMutation({
    mutationFn: async ({ amount }: { amount: string }) => {
      const result = await ContractService.executeContractFunction('burn', [amount]);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success('Tokens burned successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Burn failed: ${error.message}`);
    },
  });
};
