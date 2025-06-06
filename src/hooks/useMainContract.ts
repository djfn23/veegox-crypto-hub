
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

export const useAddressStatus = (address: string | null) => {
  return useQuery({
    queryKey: ['address-status', address],
    queryFn: async () => {
      if (!address) return null;
      
      const [blacklisted, notTaxable, antibotExempt, antiwhaleExempt] = await Promise.all([
        ContractService.isBlacklisted(address),
        ContractService.isNotTaxable(address),
        ContractService.isAntibotExempt(address),
        ContractService.isAntiwhaleExempt(address)
      ]);

      return {
        address,
        isBlacklisted: blacklisted.result,
        isNotTaxable: notTaxable.result,
        isAntibotExempt: antibotExempt.result,
        isAntiwhaleExempt: antiwhaleExempt.result
      };
    },
    enabled: !!address,
    staleTime: 60000,
  });
};

export const useContractTransfer = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  return useMutation({
    mutationFn: async ({ to, amount }: { to: string; amount: string }) => {
      return await ContractService.transfer(to, amount);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-contract-balance'] });
      queryClient.invalidateQueries({ queryKey: ['contract-events'] });
      
      addNotification({
        title: 'Transfer réussi',
        message: 'Votre transfer de tokens a été exécuté avec succès',
        type: 'success',
        read: false,
      });
      
      toast.success('Transfer réussi !');
    },
    onError: (error: any) => {
      addNotification({
        title: 'Erreur de transfer',
        message: error.message || 'Une erreur est survenue lors du transfer',
        type: 'error',
        read: false,
      });
      
      toast.error('Erreur de transfer');
    },
  });
};

export const useContractApprove = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  return useMutation({
    mutationFn: async ({ spender, amount }: { spender: string; amount: string }) => {
      return await ContractService.approve(spender, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allowance'] });
      
      addNotification({
        title: 'Approbation réussie',
        message: 'L\'approbation a été accordée avec succès',
        type: 'success',
        read: false,
      });
      
      toast.success('Approbation réussie !');
    },
    onError: (error: any) => {
      addNotification({
        title: 'Erreur d\'approbation',
        message: error.message || 'Une erreur est survenue lors de l\'approbation',
        type: 'error',
        read: false,
      });
      
      toast.error('Erreur d\'approbation');
    },
  });
};

export const useContractBurn = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  return useMutation({
    mutationFn: async ({ amount }: { amount: string }) => {
      return await ContractService.burn(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-contract-balance'] });
      queryClient.invalidateQueries({ queryKey: ['main-contract-info'] });
      
      addNotification({
        title: 'Burn réussi',
        message: 'Les tokens ont été brûlés avec succès',
        type: 'success',
        read: false,
      });
      
      toast.success('Burn réussi !');
    },
    onError: (error: any) => {
      addNotification({
        title: 'Erreur de burn',
        message: error.message || 'Une erreur est survenue lors du burn',
        type: 'error',
        read: false,
      });
      
      toast.error('Erreur de burn');
    },
  });
};

export const useOwnerFunctions = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppStore();

  const setNotTaxable = useMutation({
    mutationFn: async ({ address, taxable }: { address: string; taxable: boolean }) => {
      return await ContractService.setNotTaxable(address, taxable);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-status'] });
      toast.success('Statut de taxation mis à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const setBlackList = useMutation({
    mutationFn: async ({ address, blacklisted }: { address: string; blacklisted: boolean }) => {
      return await ContractService.setBlackList(address, blacklisted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-status'] });
      toast.success('Blacklist mise à jour');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const releaseAirdropMode = useMutation({
    mutationFn: () => ContractService.releaseAirdropMode(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['main-contract-info'] });
      toast.success('Mode airdrop désactivé');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la désactivation');
    },
  });

  return {
    setNotTaxable,
    setBlackList,
    releaseAirdropMode
  };
};

export const useAllowanceCheck = (ownerAddress: string | null, spenderAddress: string) => {
  return useQuery({
    queryKey: ['allowance', ownerAddress, spenderAddress],
    queryFn: () => ContractService.getAllowance(ownerAddress!, spenderAddress),
    enabled: !!ownerAddress,
    staleTime: 60000,
  });
};
