import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SwapService, UserPortfolio } from '@/services/swapService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useUserPortfolio = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['user-portfolio', user?.id],
    queryFn: () => user ? SwapService.getUserPortfolio(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const updatePortfolio = useMutation({
    mutationFn: (portfolioData: Omit<UserPortfolio, 'id' | 'last_updated' | 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');
      return SwapService.updateUserPortfolio({
        ...portfolioData,
        user_id: user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-portfolio'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour du portfolio');
    },
  });

  const totalPortfolioValue = portfolio?.reduce((total, item) => {
    return total + (item.balance * (item.average_buy_price || 0));
  }, 0) || 0;

  return {
    portfolio: portfolio || [],
    isLoading,
    updatePortfolio,
    totalPortfolioValue,
  };
};
