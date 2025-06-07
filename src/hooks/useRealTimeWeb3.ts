
import { useState, useEffect, useCallback } from 'react';
import { web3Service, WalletAsset, TransactionData, TokenPrice } from '@/services/realTimeWeb3Service';
import { useEnhancedWallet } from './useEnhancedWallet';

export const useRealTimeTokenPrices = (tokenAddresses: string[]) => {
  const [prices, setPrices] = useState<Map<string, TokenPrice>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tokenAddresses.length === 0) {
      setIsLoading(false);
      return;
    }

    const handlePriceUpdate = (event: CustomEvent) => {
      setPrices(new Map(event.detail.prices));
      setIsLoading(false);
    };

    window.addEventListener('tokenPricesUpdated', handlePriceUpdate as EventListener);

    // Démarrer les mises à jour de prix
    web3Service.startPriceUpdates(tokenAddresses)
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });

    return () => {
      window.removeEventListener('tokenPricesUpdated', handlePriceUpdate as EventListener);
      web3Service.stopPriceUpdates();
    };
  }, [tokenAddresses]);

  return { prices, isLoading, error };
};

export const useWalletAssets = (walletAddress?: string, chainId: number = 137) => {
  const [assets, setAssets] = useState<WalletAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAssets = useCallback(async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const walletAssets = await web3Service.getWalletAssets(walletAddress, chainId);
      setAssets(walletAssets);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, chainId]);

  useEffect(() => {
    refreshAssets();
  }, [refreshAssets]);

  return { assets, isLoading, error, refreshAssets };
};

export const useTransactionHistory = (walletAddress?: string, chainId: number = 137) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = useCallback(async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const txHistory = await web3Service.getTransactionHistory(walletAddress, chainId);
      setTransactions(txHistory);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, chainId]);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  return { transactions, isLoading, error, refreshTransactions };
};

export const useGasPrice = (chainId: number = 137) => {
  const [gasPrice, setGasPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const price = await web3Service.getCurrentGasPrice(chainId);
        setGasPrice(price);
      } catch (error) {
        console.error('Error fetching gas price:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [chainId]);

  return { gasPrice, isLoading };
};

export const useRealTimeWalletData = () => {
  const { connectedWallets } = useEnhancedWallet();
  const primaryWallet = connectedWallets[0];

  const { assets, isLoading: assetsLoading, refreshAssets } = useWalletAssets(
    primaryWallet?.address,
    primaryWallet?.chainId
  );

  const { transactions, isLoading: transactionsLoading, refreshTransactions } = useTransactionHistory(
    primaryWallet?.address,
    primaryWallet?.chainId
  );

  const { gasPrice, isLoading: gasPriceLoading } = useGasPrice(primaryWallet?.chainId);

  const tokenAddresses = assets.map(asset => asset.tokenAddress).filter(addr => addr !== 'native');
  const { prices } = useRealTimeTokenPrices(tokenAddresses);

  const totalPortfolioValue = assets.reduce((total, asset) => total + asset.balanceUSD, 0);

  const refreshAll = useCallback(async () => {
    await Promise.all([refreshAssets(), refreshTransactions()]);
  }, [refreshAssets, refreshTransactions]);

  return {
    wallet: primaryWallet,
    assets,
    transactions,
    prices,
    gasPrice,
    totalPortfolioValue,
    isLoading: assetsLoading || transactionsLoading || gasPriceLoading,
    refreshAll
  };
};
