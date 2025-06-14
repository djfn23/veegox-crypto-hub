import { useState, useCallback } from 'react';
import { oneInchService } from '@/services/oneInchService';
import { SwapService } from '@/services/swapService';
import { useSwapTransactions } from '@/hooks/useSwapTransactions';
import { useUserPortfolio } from '@/hooks/useUserPortfolio';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useSwapQuote = () => {
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createTransaction, updateTransaction } = useSwapTransactions();
  const { updatePortfolio } = useUserPortfolio();
  const { user } = useUnifiedAuth();

  const getQuote = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: string
  ) => {
    if (!fromToken || !toToken || !amount) return;

    setIsLoading(true);
    setError(null);

    try {
      const quoteData = await oneInchService.getQuote(fromToken, toToken, amount);
      setQuote(quoteData);
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors du calcul du devis');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const executeSwap = useCallback(async (
    fromToken: string,
    toToken: string,
    amount: string,
    userAddress: string,
    slippage: number = 1
  ) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour effectuer un swap');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Créer la transaction en base de données
      const transaction = await createTransaction.mutateAsync({
        from_token_address: fromToken,
        to_token_address: toToken,
        from_amount: parseFloat(amount),
        to_amount: quote?.toTokenAmount ? parseFloat(quote.toTokenAmount) : 0,
        exchange_rate: quote?.toTokenAmount ? parseFloat(quote.toTokenAmount) / parseFloat(amount) : 0,
        slippage_tolerance: slippage,
        status: 'pending',
        protocol_used: '1inch'
      });

      // Obtenir les données de swap de 1inch
      const swapData = await oneInchService.getSwap(
        fromToken,
        toToken,
        amount,
        userAddress,
        slippage
      );

      if (swapData && window.ethereum && transaction) {
        try {
          // Exécuter la transaction sur la blockchain
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [swapData.tx],
          });

          // Mettre à jour la transaction avec le hash
          await updateTransaction.mutateAsync({
            id: transaction.id!,
            updates: {
              transaction_hash: txHash,
              status: 'completed',
              completed_at: new Date().toISOString()
            }
          });

          // Mettre à jour le portfolio
          if (quote?.fromToken && quote?.toToken) {
            // Déduire le token source
            await updatePortfolio.mutateAsync({
              token_address: fromToken,
              token_symbol: quote.fromToken.symbol,
              token_name: quote.fromToken.name,
              balance: -parseFloat(amount)
            });

            // Ajouter le token de destination
            await updatePortfolio.mutateAsync({
              token_address: toToken,
              token_symbol: quote.toToken.symbol,
              token_name: quote.toToken.name,
              balance: parseFloat(quote.toTokenAmount)
            });
          }

          toast.success('Swap exécuté avec succès!');
          return txHash;
        } catch (txError: any) {
          // Marquer la transaction comme échouée
          await updateTransaction.mutateAsync({
            id: transaction.id!,
            updates: { status: 'failed' }
          });
          throw txError;
        }
      }
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors de l\'exécution du swap');
    } finally {
      setIsLoading(false);
    }
  }, [quote, user, createTransaction, updateTransaction, updatePortfolio]);

  return {
    quote,
    isLoading,
    error,
    getQuote,
    executeSwap
  };
};
