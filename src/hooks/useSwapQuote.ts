
import { useState, useCallback } from 'react';
import { oneInchService } from '@/services/oneInchService';
import { toast } from 'sonner';

export const useSwapQuote = () => {
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setIsLoading(true);
    setError(null);

    try {
      const swapData = await oneInchService.getSwap(
        fromToken,
        toToken,
        amount,
        userAddress,
        slippage
      );

      if (swapData && window.ethereum) {
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [swapData.tx],
        });

        toast.success('Swap exécuté avec succès!');
        return txHash;
      }
    } catch (error: any) {
      setError(error.message);
      toast.error('Erreur lors de l\'exécution du swap');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    quote,
    isLoading,
    error,
    getQuote,
    executeSwap
  };
};
