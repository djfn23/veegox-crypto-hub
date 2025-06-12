
import { useState, useEffect, useCallback } from 'react';
import { coinGeckoService } from '@/services/coinGeckoService';
import { tradingViewService } from '@/services/tradingViewService';
import { toast } from 'sonner';

export const useRealTimePrices = (tokenIds: string[]) => {
  const [prices, setPrices] = useState<Map<string, any>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialPrices = useCallback(async () => {
    if (tokenIds.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const priceData = await coinGeckoService.getTokenPrices(tokenIds);
      
      const priceMap = new Map();
      priceData.forEach(token => {
        priceMap.set(token.id, {
          price: token.current_price,
          change24h: token.price_change_percentage_24h,
          volume: token.total_volume,
          marketCap: token.market_cap,
          symbol: token.symbol,
          name: token.name
        });
      });

      setPrices(priceMap);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching prices:', error);
      setError(error.message);
      toast.error('Erreur lors du chargement des prix');
    } finally {
      setIsLoading(false);
    }
  }, [tokenIds]);

  const subscribeToRealTimeUpdates = useCallback(() => {
    const unsubscribeFunctions: (() => void)[] = [];

    tokenIds.forEach(tokenId => {
      const unsubscribe = tradingViewService.subscribeToSymbol(
        tokenId,
        (data) => {
          setPrices(prev => {
            const newPrices = new Map(prev);
            const existingData = newPrices.get(tokenId) || {};
            newPrices.set(tokenId, {
              ...existingData,
              price: data.price,
              change24h: data.change_percent,
              volume: data.volume,
              lastUpdate: data.timestamp
            });
            return newPrices;
          });
        }
      );
      unsubscribeFunctions.push(unsubscribe);
    });

    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, [tokenIds]);

  useEffect(() => {
    fetchInitialPrices();
  }, [fetchInitialPrices]);

  useEffect(() => {
    if (!isLoading && tokenIds.length > 0) {
      const cleanup = subscribeToRealTimeUpdates();
      return cleanup;
    }
  }, [isLoading, subscribeToRealTimeUpdates, tokenIds]);

  const refreshPrices = useCallback(() => {
    fetchInitialPrices();
  }, [fetchInitialPrices]);

  return {
    prices,
    isLoading,
    error,
    refreshPrices
  };
};

export const useTrendingTokens = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await coinGeckoService.getTrendingTokens();
        setTrending(data.coins || []);
      } catch (error) {
        console.error('Error fetching trending tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { trending, isLoading };
};
