
export interface CoinGeckoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number;
  last_updated: string;
}

export interface CoinGeckoMarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export class CoinGeckoService {
  private static instance: CoinGeckoService;
  private baseUrl = 'https://api.coingecko.com/api/v3';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 60000; // 1 minute

  static getInstance(): CoinGeckoService {
    if (!this.instance) {
      this.instance = new CoinGeckoService();
    }
    return this.instance;
  }

  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: now });
      return data;
    } catch (error) {
      console.error('CoinGecko API error:', error);
      if (cached) {
        return cached.data; // Return stale data if available
      }
      throw error;
    }
  }

  async getTokenPrices(tokenIds: string[]): Promise<CoinGeckoPrice[]> {
    if (tokenIds.length === 0) return [];

    const ids = tokenIds.join(',');
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
    
    return this.fetchWithCache<CoinGeckoPrice[]>(url, `prices-${ids}`);
  }

  async getTokenPrice(tokenId: string): Promise<CoinGeckoPrice | null> {
    const prices = await this.getTokenPrices([tokenId]);
    return prices[0] || null;
  }

  async getTrendingTokens(): Promise<any> {
    const url = `${this.baseUrl}/search/trending`;
    return this.fetchWithCache(url, 'trending');
  }

  async getMarketData(tokenId: string, days: number = 7): Promise<CoinGeckoMarketData> {
    const url = `${this.baseUrl}/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`;
    return this.fetchWithCache<CoinGeckoMarketData>(url, `market-${tokenId}-${days}`);
  }

  async searchTokens(query: string): Promise<any> {
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.fetchWithCache(url, `search-${query}`);
  }
}

export const coinGeckoService = CoinGeckoService.getInstance();
