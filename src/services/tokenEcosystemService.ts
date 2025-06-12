
export interface EcosystemToken {
  id: string;
  name: string;
  symbol: string;
  address: string;
  logo?: string;
  description?: string;
  price?: number;
  marketCap?: number;
  totalSupply?: number;
  category?: string;
  isVerified?: boolean;
}

export interface CustomToken extends EcosystemToken {
  isActive?: boolean;
  holders?: number;
  volume24h?: number;
}

export interface TokenBalance {
  tokenAddress: string;
  balance: string;
  balanceUSD: number;
  token: CustomToken;
}

export interface EcosystemStats {
  totalTokens: number;
  totalMarketCap: number;
  activeUsers: number;
  stakingRewards: number;
}

export class TokenEcosystemService {
  private static instance: TokenEcosystemService;

  static getInstance(): TokenEcosystemService {
    if (!this.instance) {
      this.instance = new TokenEcosystemService();
    }
    return this.instance;
  }

  async getAllTokens(): Promise<CustomToken[]> {
    // Mock data for now - in real implementation, this would fetch from API or database
    return [
      {
        id: '1',
        name: 'Veegox Token',
        symbol: 'VGX',
        address: '0x1234567890123456789012345678901234567890',
        description: 'Token natif de l\'écosystème Veegox',
        price: 1.25,
        marketCap: 12500000,
        totalSupply: 10000000,
        category: 'utility',
        isVerified: true,
        isActive: true,
        holders: 1250,
        volume24h: 250000
      },
      {
        id: '2',
        name: 'DeFi Rewards',
        symbol: 'DFR',
        address: '0x2345678901234567890123456789012345678901',
        description: 'Token de récompenses DeFi',
        price: 0.85,
        marketCap: 8500000,
        totalSupply: 10000000,
        category: 'defi',
        isVerified: true,
        isActive: true,
        holders: 850,
        volume24h: 180000
      },
      {
        id: '3',
        name: 'Gaming Token',
        symbol: 'GMT',
        address: '0x3456789012345678901234567890123456789012',
        description: 'Token pour les jeux de l\'écosystème',
        price: 2.10,
        marketCap: 21000000,
        totalSupply: 10000000,
        category: 'gaming',
        isVerified: false,
        isActive: true,
        holders: 1100,
        volume24h: 320000
      }
    ];
  }

  async getTokenById(id: string): Promise<CustomToken | null> {
    const tokens = await this.getAllTokens();
    return tokens.find(token => token.id === id) || null;
  }

  async getTokensByCategory(category: string): Promise<CustomToken[]> {
    const tokens = await this.getAllTokens();
    return tokens.filter(token => token.category === category);
  }

  async getTokensForModule(module: string): Promise<CustomToken[]> {
    // Return tokens available for specific modules (e.g., marketplace, staking)
    const tokens = await this.getAllTokens();
    return tokens.filter(token => token.isActive);
  }

  async updateTokenPrices(tokens: CustomToken[]): Promise<CustomToken[]> {
    // Mock price updates - in real implementation, this would fetch from price APIs
    return tokens.map(token => ({
      ...token,
      price: token.price ? token.price * (0.95 + Math.random() * 0.1) : Math.random() * 10,
      volume24h: token.volume24h ? token.volume24h * (0.8 + Math.random() * 0.4) : Math.random() * 100000
    }));
  }

  async getWalletTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
    const tokens = await this.getAllTokens();
    
    // Mock wallet balances
    return tokens.map(token => ({
      tokenAddress: token.address,
      balance: (Math.random() * 1000).toFixed(4),
      balanceUSD: Math.random() * 5000,
      token
    }));
  }

  async getEcosystemStats(): Promise<EcosystemStats> {
    const tokens = await this.getAllTokens();
    
    return {
      totalTokens: tokens.length,
      totalMarketCap: tokens.reduce((sum, token) => sum + (token.marketCap || 0), 0),
      activeUsers: 1250,
      stakingRewards: 125000
    };
  }

  async createToken(tokenData: Partial<CustomToken>): Promise<CustomToken> {
    // Mock implementation - in real app, this would create the token
    const newToken: CustomToken = {
      id: Math.random().toString(36).substr(2, 9),
      name: tokenData.name || '',
      symbol: tokenData.symbol || '',
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      description: tokenData.description,
      price: 0,
      marketCap: 0,
      totalSupply: tokenData.totalSupply || 0,
      category: tokenData.category || 'utility',
      isVerified: false,
      isActive: true,
      holders: 0,
      volume24h: 0
    };

    return newToken;
  }
}

export const tokenEcosystemService = TokenEcosystemService.getInstance();
