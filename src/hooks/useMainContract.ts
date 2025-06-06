
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContractService } from "@/services/contractService";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export const useMainContractInfo = () => {
  return useQuery({
    queryKey: ['main-contract-info'],
    queryFn: () => ContractService.getMainContractInfo(),
    staleTime: 300000, // 5 minutes
  });
};

export const useUserContractBalance = (userAddress: string | null) => {
  return useQuery({
    queryKey: ['user-contract-balance', userAddress],
    queryFn: () => ContractService.getUserBalance(userAddress!),
    enabled: !!userAddress,
    refetchInterval: 30000,
  });
};

export const useContractEvents = (fromBlock: string = 'latest') => {
  return useQuery({
    queryKey: ['contract-events', fromBlock],
    queryFn: () => ContractService.getContractEvents(fromBlock),
    refetchInterval: 60000,
  });
};

export const useContractFunction = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  return useMutation({
    mutationFn: async ({ functionName, params }: { functionName: string; params: any[] }) => {
      return await ContractService.callContractFunction(functionName, params);
    },
    onSuccess: (data) => {
      // Invalider les caches pertinents
      queryClient.invalidateQueries({ queryKey: ['user-contract-balance'] });
      queryClient.invalidateQueries({ queryKey: ['contract-events'] });
      
      addNotification({
        title: 'Transaction réussie',
        message: 'Votre transaction a été exécutée avec succès',
        type: 'success',
        read: false,
      });
      
      toast.success('Transaction réussie !');
    },
    onError: (error: any) => {
      addNotification({
        title: 'Erreur de transaction',
        message: error.message || 'Une erreur est survenue lors de la transaction',
        type: 'error',
        read: false,
      });
      
      toast.error('Erreur de transaction');
    },
  });
};

export const useAllowanceCheck = (ownerAddress: string | null, spenderAddress: string) => {
  return useQuery({
    queryKey: ['allowance', ownerAddress, spenderAddress],
    queryFn: () => ContractService.checkAllowance(ownerAddress!, spenderAddress),
    enabled: !!ownerAddress,
    staleTime: 60000,
  });
};
