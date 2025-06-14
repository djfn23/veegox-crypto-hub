
import { useState, useEffect } from 'react';
import { apiIntegrationService } from '@/services/apiIntegrationService';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { toast } from 'sonner';

export const useAPIIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(new Map());
  const { user } = useUnifiedAuth();

  useEffect(() => {
    const initAPIs = async () => {
      try {
        await apiIntegrationService.initializeAPIs();
        setApiStatus(apiIntegrationService.getAllAPIStatus());
      } catch (error) {
        console.error('API initialization error:', error);
        toast.error('Erreur lors de l\'initialisation des APIs');
      }
    };

    initAPIs();
  }, []);

  const executeSwap = async (
    fromToken: string,
    toToken: string,
    amount: string,
    walletAddress: string,
    slippage?: number
  ) => {
    setIsLoading(true);
    try {
      const result = await apiIntegrationService.executeSwap(
        fromToken,
        toToken,
        amount,
        walletAddress,
        slippage
      );

      if (user?.email) {
        await apiIntegrationService.sendNotification(
          user.email,
          'swap_success',
          {
            fromAmount: amount,
            fromToken,
            toAmount: result.quote?.toTokenAmount,
            toToken,
            txHash: 'pending',
          }
        );
      }

      toast.success('Swap exécuté avec succès!');
      return result;
    } catch (error: any) {
      toast.error(`Erreur de swap: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseCrypto = async (
    amount: number,
    currency: string = 'usd',
    cryptoSymbol: string = 'ETH'
  ) => {
    setIsLoading(true);
    try {
      const result = await apiIntegrationService.processCryptoPurchase(amount, currency, cryptoSymbol);
      toast.success('Redirection vers le paiement...');
      return result;
    } catch (error: any) {
      toast.error(`Erreur d'achat: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTokenPrices = async (tokenIds: string[]) => {
    try {
      return await apiIntegrationService.getTokenPrices(tokenIds);
    } catch (error: any) {
      console.error('Price fetch error:', error);
      return [];
    }
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      return await apiIntegrationService.verifyPayment(sessionId);
    } catch (error: any) {
      toast.error(`Erreur de vérification: ${error.message}`);
      throw error;
    }
  };

  return {
    isLoading,
    apiStatus,
    executeSwap,
    purchaseCrypto,
    getTokenPrices,
    verifyPayment,
    isAPIEnabled: (apiName: string) => apiIntegrationService.isAPIEnabled(apiName),
  };
};
