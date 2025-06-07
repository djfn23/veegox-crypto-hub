
import { useState, useCallback } from 'react';
import { contractService, TransactionResult } from '@/services/smartContractService';
import { notificationService } from '@/services/notificationService';
import { useAuth } from './useAuth';

export const useSmartContract = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<TransactionResult | null>(null);
  const { user } = useAuth();

  const executeContract = useCallback(async (
    contractAddress: string,
    abi: any[],
    functionName: string,
    args: any[] = [],
    value?: string
  ) => {
    setIsExecuting(true);
    
    try {
      const result = await contractService.executeContractFunction(
        { address: contractAddress, abi, chainId: 137 },
        functionName,
        args,
        value
      );

      setLastTransaction(result);

      // Notifier le succès
      if (user) {
        await notificationService.notifyTransactionSuccess(
          result.hash,
          functionName
        );
      }

      return result;
    } catch (error: any) {
      console.error('Contract execution failed:', error);
      
      // Notifier l'échec
      if (user) {
        await notificationService.notifyTransactionFailed(
          error.message
        );
      }

      throw error;
    } finally {
      setIsExecuting(false);
    }
  }, [user]);

  const readContract = useCallback(async (
    contractAddress: string,
    abi: any[],
    functionName: string,
    args: any[] = []
  ) => {
    try {
      return await contractService.readContractFunction(
        { address: contractAddress, abi, chainId: 137 },
        functionName,
        args
      );
    } catch (error) {
      console.error('Contract read failed:', error);
      throw error;
    }
  }, []);

  return {
    executeContract,
    readContract,
    isExecuting,
    lastTransaction
  };
};
