
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VeegoxTokenService } from "@/services/veegoxTokenService";
import { useWeb3Wallet } from "./useWeb3Wallet";
import { toast } from "sonner";

export const useVeegoxTokenInfo = () => {
  return useQuery({
    queryKey: ['veegox-token-info'],
    queryFn: () => VeegoxTokenService.getVeegoxTokenInfo(),
    staleTime: 300000, // 5 minutes
  });
};

export const useVeegoxBalance = () => {
  const { connectedWallet } = useWeb3Wallet();
  
  return useQuery({
    queryKey: ['veegox-balance', connectedWallet?.address],
    queryFn: () => VeegoxTokenService.getUserVeegoxBalance(connectedWallet?.address!),
    enabled: !!connectedWallet?.address,
    refetchInterval: 30000,
  });
};

export const useVeegoxStats = () => {
  return useQuery({
    queryKey: ['veegox-stats'],
    queryFn: () => VeegoxTokenService.getVeegoxStats(),
    refetchInterval: 60000,
  });
};

export const useSaveVeegoxMetrics = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => VeegoxTokenService.saveVeegoxMetrics(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform_metrics'] });
      toast.success('Métriques Veegox sauvegardées');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la sauvegarde des métriques');
    },
  });
};
