
import { useQuery } from '@tanstack/react-query';
import { revenueService } from '@/services/revenueService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';

export const useRevenue = () => {
  const { user } = useUnifiedAuth();

  const { data: fees, isLoading: isLoadingFees } = useQuery({
    queryKey: ['marketplace-fees'],
    queryFn: () => revenueService.getMarketplaceFees(),
  });

  const { data: revenueRecords, isLoading: isLoadingRecords } = useQuery({
    queryKey: ['revenue-records'],
    queryFn: () => revenueService.getRevenueRecords(100),
    enabled: !!user,
  });

  const { data: revenueMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['revenue-metrics'],
    queryFn: () => revenueService.getRevenueMetrics(30),
    enabled: !!user,
    refetchInterval: 60000, // Refresh every minute
  });

  return {
    fees: fees || [],
    revenueRecords: revenueRecords || [],
    revenueMetrics,
    isLoading: isLoadingFees || isLoadingRecords || isLoadingMetrics,
    isLoadingFees,
    isLoadingRecords,
    isLoadingMetrics,
  };
};
