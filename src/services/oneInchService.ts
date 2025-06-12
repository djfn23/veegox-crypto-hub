
export interface OneInchToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

export interface OneInchQuote {
  fromToken: OneInchToken;
  toToken: OneInchToken;
  fromTokenAmount: string;
  toTokenAmount: string;
  protocols: any[];
  estimatedGas: number;
}

export interface OneInchSwap {
  from: OneInchToken;
  to: OneInchToken;
  fromTokenAmount: string;
  toTokenAmount: string;
  protocols: any[];
  tx: {
    from: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
}

export class OneInchService {
  private static instance: OneInchService;
  private baseUrl = 'https://api.1inch.io/v5.0';
  private chainId = 137; // Polygon

  static getInstance(): OneInchService {
    if (!this.instance) {
      this.instance = new OneInchService();
    }
    return this.instance;
  }

  async getTokens(): Promise<Record<string, OneInchToken>> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.chainId}/tokens`);
      if (!response.ok) {
        throw new Error(`1inch API error: ${response.status}`);
      }
      const data = await response.json();
      return data.tokens;
    } catch (error) {
      console.error('1inch tokens error:', error);
      return {};
    }
  }

  async getQuote(
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string
  ): Promise<OneInchQuote | null> {
    try {
      const params = new URLSearchParams({
        fromTokenAddress,
        toTokenAddress,
        amount
      });

      const response = await fetch(`${this.baseUrl}/${this.chainId}/quote?${params}`);
      if (!response.ok) {
        throw new Error(`1inch quote error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('1inch quote error:', error);
      return null;
    }
  }

  async getSwap(
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string,
    fromAddress: string,
    slippage: number = 1
  ): Promise<OneInchSwap | null> {
    try {
      const params = new URLSearchParams({
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        slippage: slippage.toString()
      });

      const response = await fetch(`${this.baseUrl}/${this.chainId}/swap?${params}`);
      if (!response.ok) {
        throw new Error(`1inch swap error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('1inch swap error:', error);
      return null;
    }
  }

  async getProtocols(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.chainId}/liquidity-sources`);
      if (!response.ok) {
        throw new Error(`1inch protocols error: ${response.status}`);
      }
      const data = await response.json();
      return data.protocols;
    } catch (error) {
      console.error('1inch protocols error:', error);
      return [];
    }
  }
}

export const oneInchService = OneInchService.getInstance();
