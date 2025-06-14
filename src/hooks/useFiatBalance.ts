
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fiatBalanceService } from '@/services/fiatBalanceService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useFiatBalance = (currency: string = 'EUR') => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ['fiat-balance', user?.id, currency],
    queryFn: () => user ? fiatBalanceService.getUserFiatBalance(user.id, currency) : Promise.resolve(null),
    enabled: !!user,
  });

  const { data: cryptoRates, isLoading: isLoadingRates } = useQuery({
    queryKey: ['crypto-rates'],
    queryFn: () => fiatBalanceService.getCryptoRates(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: purchases, isLoading: isLoadingPurchases } = useQuery({
    queryKey: ['crypto-purchases', user?.id],
    queryFn: () => user ? fiatBalanceService.getUserCryptoPurchases(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['fiat-transactions', user?.id],
    queryFn: () => user ? fiatBalanceService.getUserFiatTransactions(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const purchaseCrypto = useMutation({
    mutationFn: ({ fiatAmount, cryptoSymbol }: { fiatAmount: number; cryptoSymbol: string }) => {
      if (!user) throw new Error('User not authenticated');
      return fiatBalanceService.purchaseCrypto(user.id, fiatAmount, cryptoSymbol, currency);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fiat-balance'] });
      queryClient.invalidateQueries({ queryKey: ['crypto-purchases'] });
      queryClient.invalidateQueries({ queryKey: ['fiat-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['user-portfolio'] });
      toast.success('Achat de crypto réussi !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de l\'achat de crypto');
    },
  });

  const addFunds = useMutation({
    mutationFn: ({ amount, stripePaymentIntentId }: { amount: number; stripePaymentIntentId?: string }) => {
      if (!user) throw new Error('User not authenticated');
      return fiatBalanceService.addFunds(user.id, amount, currency, stripePaymentIntentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fiat-balance'] });
      queryClient.invalidateQueries({ queryKey: ['fiat-transactions'] });
      toast.success('Fonds ajoutés avec succès !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de l\'ajout de fonds');
    },
  });

  return {
    balance,
    cryptoRates,
    purchases,
    transactions,
    isLoading: isLoadingBalance || isLoadingRates,
    isLoadingPurchases,
    isLoadingTransactions,
    purchaseCrypto,
    addFunds,
  };
};
