import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SwapService, SwapTransaction } from '@/services/swapService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useSwapTransactions = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['swap-transactions', user?.id],
    queryFn: () => user ? SwapService.getUserSwapTransactions(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  const createTransaction = useMutation({
    mutationFn: (transaction: Omit<SwapTransaction, 'id' | 'created_at' | 'user_id'>) => {
      if (!user) throw new Error('User not authenticated');
      return SwapService.createSwapTransaction({
        ...transaction,
        user_id: user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['swap-transactions'] });
      toast.success('Transaction créée avec succès');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la création de la transaction');
    },
  });

  const updateTransaction = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SwapTransaction> }) =>
      SwapService.updateSwapTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['swap-transactions'] });
      toast.success('Transaction mise à jour');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    },
  });

  return {
    transactions: transactions || [],
    isLoading,
    createTransaction,
    updateTransaction,
  };
};
