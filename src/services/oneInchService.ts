
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
  gasPrice?: string;
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
  private chainId = 137; // Polygon by default
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  static getInstance(apiKey?: string): OneInchService {
    if (!this.instance) {
      this.instance = new OneInchService(apiKey);
    }
    return this.instance;
  }

  setChainId(chainId: number) {
    this.chainId = chainId;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }
    
    return headers;
  }

  async getTokens(): Promise<Record<string, OneInchToken>> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.chainId}/tokens`, {
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`1inch API error: ${response.status} - ${response.statusText}`);
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
    amount: string,
    options: {
      slippage?: number;
      protocols?: string;
      fee?: number;
      gasPrice?: string;
      complexityLevel?: number;
      connectorTokens?: string;
      gasLimit?: number;
      mainRouteParts?: number;
      parts?: number;
    } = {}
  ): Promise<OneInchQuote | null> {
    try {
      const params = new URLSearchParams({
        fromTokenAddress,
        toTokenAddress,
        amount,
        ...Object.fromEntries(
          Object.entries(options).map(([key, value]) => [key, value?.toString() || ''])
        ),
      });

      const response = await fetch(`${this.baseUrl}/${this.chainId}/quote?${params}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`1inch quote error: ${response.status} - ${errorData.description || response.statusText}`);
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
    slippage: number = 1,
    options: {
      protocols?: string;
      destReceiver?: string;
      referrerAddress?: string;
      fee?: number;
      gasPrice?: string;
      burnChi?: boolean;
      allowPartialFill?: boolean;
      disableEstimate?: boolean;
      usePatching?: boolean;
    } = {}
  ): Promise<OneInchSwap | null> {
    try {
      const params = new URLSearchParams({
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        slippage: slippage.toString(),
        ...Object.fromEntries(
          Object.entries(options).map(([key, value]) => [key, value?.toString() || ''])
        ),
      });

      const response = await fetch(`${this.baseUrl}/${this.chainId}/swap?${params}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`1inch swap error: ${response.status} - ${errorData.description || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('1inch swap error:', error);
      return null;
    }
  }

  async getProtocols(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.chainId}/liquidity-sources`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`1inch protocols error: ${response.status}`);
      }

      const data = await response.json();
      return data.protocols || [];
    } catch (error) {
      console.error('1inch protocols error:', error);
      return [];
    }
  }

  async getSpender(): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.chainId}/approve/spender`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`1inch spender error: ${response.status}`);
      }

      const data = await response.json();
      return data.address;
    } catch (error) {
      console.error('1inch spender error:', error);
      return null;
    }
  }

  async getApprovalData(tokenAddress: string, amount?: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        tokenAddress,
        ...(amount && { amount }),
      });

      const response = await fetch(`${this.baseUrl}/${this.chainId}/approve/transaction?${params}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`1inch approval error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('1inch approval error:', error);
      return null;
    }
  }
}

// Instance avec clé API si disponible
export const oneInchService = OneInchService.getInstance();
