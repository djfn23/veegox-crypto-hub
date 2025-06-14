
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stripeUnifiedService, StripeTransactionMetadata } from '@/services/stripe/StripeUnifiedService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useStripeUnified = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();

  // Create unified payment intent
  const createPayment = useMutation({
    mutationFn: async ({ 
      amount, 
      currency = 'EUR', 
      metadata, 
      description 
    }: { 
      amount: number; 
      currency?: string; 
      metadata: StripeTransactionMetadata; 
      description?: string; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      return stripeUnifiedService.createUnifiedPaymentIntent(amount, currency, metadata, description);
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        toast.success('Redirection vers le paiement sécurisé...');
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la création du paiement');
    },
  });

  // Process crypto swap with Stripe
  const processSwap = useMutation({
    mutationFn: async ({ 
      fromTokenAddress, 
      toTokenAddress, 
      fromAmount, 
      toAmount, 
      fees = 0 
    }: { 
      fromTokenAddress: string; 
      toTokenAddress: string; 
      fromAmount: number; 
      toAmount: number; 
      fees?: number; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      return stripeUnifiedService.processStripeSwap(
        fromTokenAddress, 
        toTokenAddress, 
        fromAmount, 
        toAmount, 
        user.id, 
        fees
      );
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success('Swap initié - Finalisation du paiement...');
      }
      queryClient.invalidateQueries({ queryKey: ['swap-transactions'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors du swap');
    },
  });

  // Process NFT purchase with Stripe
  const processNFTPurchase = useMutation({
    mutationFn: async ({ 
      contractAddress, 
      tokenId, 
      price, 
      currency, 
      sellerId 
    }: { 
      contractAddress: string; 
      tokenId: string; 
      price: number; 
      currency: string; 
      sellerId: string; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      return stripeUnifiedService.processStripeNFTPurchase(
        contractAddress, 
        tokenId, 
        price, 
        currency, 
        user.id, 
        sellerId
      );
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success('Achat NFT initié - Finalisation du paiement...');
      }
      queryClient.invalidateQueries({ queryKey: ['nft-transactions'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de l\'achat NFT');
    },
  });

  // Process staking with Stripe
  const processStaking = useMutation({
    mutationFn: async ({ 
      poolId, 
      amount, 
      stakingFees = 0 
    }: { 
      poolId: string; 
      amount: number; 
      stakingFees?: number; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      return stripeUnifiedService.processStripeStaking(poolId, amount, user.id, stakingFees);
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success('Staking initié - Finalisation du paiement...');
      }
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors du staking');
    },
  });

  // Process transfer with Stripe
  const processTransfer = useMutation({
    mutationFn: async ({ 
      toUserId, 
      amount, 
      currency, 
      transferFees = 0 
    }: { 
      toUserId: string; 
      amount: number; 
      currency: string; 
      transferFees?: number; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      return stripeUnifiedService.processStripeTransfer(user.id, toUserId, amount, currency, transferFees);
    },
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
        toast.success('Transfert initié - Finalisation du paiement...');
      }
      queryClient.invalidateQueries({ queryKey: ['bank-transactions'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors du transfert');
    },
  });

  // Get Stripe transaction history
  const { data: stripeHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['stripe-transactions', user?.id],
    queryFn: () => user ? stripeUnifiedService.getStripeTransactionHistory(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  // Verify payment completion
  const verifyPayment = useMutation({
    mutationFn: (paymentIntentId: string) => stripeUnifiedService.verifyPaymentCompletion(paymentIntentId),
    onSuccess: (isVerified) => {
      if (isVerified) {
        toast.success('Paiement confirmé avec succès !');
        queryClient.invalidateQueries({ queryKey: ['stripe-transactions'] });
      }
    },
  });

  return {
    createPayment,
    processSwap,
    processNFTPurchase,
    processStaking,
    processTransfer,
    verifyPayment,
    stripeHistory: stripeHistory || [],
    isLoadingHistory,
  };
};
