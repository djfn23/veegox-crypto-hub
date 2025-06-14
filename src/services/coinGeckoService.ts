
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
  private apiKey = 'CG-XTrKfNLMbVBos9kzPknX2WTh';

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
      const headers: Record<string, string> = {
        'accept': 'application/json'
      };
      
      if (this.apiKey) {
        headers['x-cg-demo-api-key'] = this.apiKey;
      }

      const response = await fetch(url, { headers });
      
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
    const url = `${this.baseUrl}/coins/markets?vs_currency=eur&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;
    
    return this.fetchWithCache<CoinGeckoPrice[]>(url, `prices-${ids}`);
  }

  async getTokenPrice(tokenId: string): Promise<CoinGeckoPrice | null> {
    const prices = await this.getTokenPrices([tokenId]);
    return prices[0] || null;
  }

  async getCryptoRates(): Promise<Record<string, number>> {
    try {
      const cryptoMap: Record<string, string> = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum',
        'USDC': 'usd-coin',
        'USDT': 'tether',
        'MATIC': 'matic-network',
        'BNB': 'binancecoin'
      };

      const tokenIds = Object.values(cryptoMap);
      const prices = await this.getTokenPrices(tokenIds);
      
      const rates: Record<string, number> = {};
      
      for (const [symbol, coinId] of Object.entries(cryptoMap)) {
        const priceData = prices.find(p => p.id === coinId);
        if (priceData) {
          rates[symbol] = priceData.current_price;
        }
      }

      // Fallback to mock data if API fails
      if (Object.keys(rates).length === 0) {
        return {
          'BTC': 45000,
          'ETH': 3000,
          'USDC': 1.00,
          'USDT': 1.00,
          'MATIC': 0.85,
          'BNB': 350
        };
      }

      return rates;
    } catch (error) {
      console.error('Error fetching crypto rates:', error);
      // Return fallback rates on error
      return {
        'BTC': 45000,
        'ETH': 3000,
        'USDC': 1.00,
        'USDT': 1.00,
        'MATIC': 0.85,
        'BNB': 350
      };
    }
  }

  async getTrendingTokens(): Promise<any> {
    const url = `${this.baseUrl}/search/trending`;
    return this.fetchWithCache(url, 'trending');
  }

  async getMarketData(tokenId: string, days: number = 7): Promise<CoinGeckoMarketData> {
    const url = `${this.baseUrl}/coins/${tokenId}/market_chart?vs_currency=eur&days=${days}`;
    return this.fetchWithCache<CoinGeckoMarketData>(url, `market-${tokenId}-${days}`);
  }

  async searchTokens(query: string): Promise<any> {
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}`;
    return this.fetchWithCache(url, `search-${query}`);
  }
}

export const coinGeckoService = CoinGeckoService.getInstance();
