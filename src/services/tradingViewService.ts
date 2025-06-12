
export interface TradingViewSymbol {
  symbol: string;
  full_name: string;
  description: string;
  exchange: string;
  ticker: string;
  type: string;
}

export interface TradingViewQuote {
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
  volume: number;
  market_cap?: number;
}

export class TradingViewService {
  private static instance: TradingViewService;
  private wsConnection: WebSocket | null = null;
  private subscribers = new Map<string, Set<(data: any) => void>>();
  private reconnectInterval = 5000;
  private maxReconnectAttempts = 10;
  private reconnectAttempts = 0;

  static getInstance(): TradingViewService {
    if (!this.instance) {
      this.instance = new TradingViewService();
    }
    return this.instance;
  }

  async initializeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // TradingView WebSocket connection simulation
        // In production, you would use the actual TradingView data feed
        this.simulateWebSocketConnection();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private simulateWebSocketConnection(): void {
    // Simulate real-time data updates
    setInterval(() => {
      this.subscribers.forEach((callbacks, symbol) => {
        const mockData = {
          symbol,
          price: 100 + Math.random() * 1000,
          change: (Math.random() - 0.5) * 10,
          change_percent: (Math.random() - 0.5) * 5,
          volume: Math.random() * 1000000,
          timestamp: Date.now()
        };

        callbacks.forEach(callback => callback(mockData));
      });
    }, 1000);
  }

  subscribeToSymbol(symbol: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    
    this.subscribers.get(symbol)!.add(callback);

    // Return unsubscribe function
    return () => {
      const symbolCallbacks = this.subscribers.get(symbol);
      if (symbolCallbacks) {
        symbolCallbacks.delete(callback);
        if (symbolCallbacks.size === 0) {
          this.subscribers.delete(symbol);
        }
      }
    };
  }

  async getSymbolInfo(symbol: string): Promise<TradingViewSymbol> {
    // Mock implementation - replace with actual TradingView API
    return {
      symbol,
      full_name: `${symbol}/USD`,
      description: `${symbol} to USD`,
      exchange: 'CRYPTO',
      ticker: symbol,
      type: 'crypto'
    };
  }

  async getQuote(symbol: string): Promise<TradingViewQuote> {
    // Mock implementation - replace with actual TradingView API
    return {
      symbol,
      price: 100 + Math.random() * 1000,
      change: (Math.random() - 0.5) * 10,
      change_percent: (Math.random() - 0.5) * 5,
      volume: Math.random() * 1000000
    };
  }

  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.subscribers.clear();
  }
}

export const tradingViewService = TradingViewService.getInstance();
