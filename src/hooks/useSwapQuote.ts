
import { useState, useCallback } from 'react';
import { useAPIIntegration } from '@/hooks/useAPIIntegration';
import { useSwapTransactions } from '@/hooks/useSwapTransactions';
import { useUserPortfolio } from '@/hooks/useUserPortfolio';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useSwapQuote = () => {
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeSwap } = useAPIIntegration();
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
      // Use the new API integration service for quotes
      const { quote: quoteData } = await executeSwap(fromToken, toToken, amount, '', 1);
      setQuote(quoteData);
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors du calcul du devis');
    } finally {
      setIsLoading(false);
    }
  }, [executeSwap]);

  const executeSwapTransaction = useCallback(async (
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
      // Create transaction record
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

      // Execute swap using new API integration
      const { swapData } = await executeSwap(fromToken, toToken, amount, userAddress, slippage);

      if (swapData && window.ethereum && transaction) {
        try {
          // Execute blockchain transaction
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [swapData.tx],
          });

          // Update transaction with hash
          await updateTransaction.mutateAsync({
            id: transaction.id!,
            updates: {
              transaction_hash: txHash,
              status: 'completed',
              completed_at: new Date().toISOString()
            }
          });

          // Update portfolio
          if (quote?.fromToken && quote?.toToken) {
            await updatePortfolio.mutateAsync({
              token_address: fromToken,
              token_symbol: quote.fromToken.symbol,
              token_name: quote.fromToken.name,
              balance: -parseFloat(amount)
            });

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
  }, [quote, user, createTransaction, updateTransaction, updatePortfolio, executeSwap]);

  return {
    quote,
    isLoading,
    error,
    getQuote,
    executeSwap: executeSwapTransaction
  };
};
