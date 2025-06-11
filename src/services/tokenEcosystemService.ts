
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

export class TokenEcosystemService {
  private static instance: TokenEcosystemService;

  static getInstance(): TokenEcosystemService {
    if (!this.instance) {
      this.instance = new TokenEcosystemService();
    }
    return this.instance;
  }

  async getAllTokens(): Promise<EcosystemToken[]> {
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
        isVerified: true
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
        isVerified: true
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
        isVerified: false
      }
    ];
  }

  async getTokenById(id: string): Promise<EcosystemToken | null> {
    const tokens = await this.getAllTokens();
    return tokens.find(token => token.id === id) || null;
  }

  async getTokensByCategory(category: string): Promise<EcosystemToken[]> {
    const tokens = await this.getAllTokens();
    return tokens.filter(token => token.category === category);
  }

  async createToken(tokenData: Partial<EcosystemToken>): Promise<EcosystemToken> {
    // Mock implementation - in real app, this would create the token
    const newToken: EcosystemToken = {
      id: Math.random().toString(36).substr(2, 9),
      name: tokenData.name || '',
      symbol: tokenData.symbol || '',
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      description: tokenData.description,
      price: 0,
      marketCap: 0,
      totalSupply: tokenData.totalSupply || 0,
      category: tokenData.category || 'utility',
      isVerified: false
    };

    return newToken;
  }
}

export const tokenEcosystemService = TokenEcosystemService.getInstance();
