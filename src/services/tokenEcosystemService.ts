
import { supabase } from "@/integrations/supabase/client";
import { VeegoxTokenService } from "./veegoxTokenService";

export interface CustomToken {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  logo?: string;
  creatorId: string;
  isActive: boolean;
  marketCap?: number;
  price?: number;
  volume24h?: number;
  holders?: number;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
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
  totalVolume24h: number;
  stakingRewards: number;
}

export class TokenEcosystemService {
  private static instance: TokenEcosystemService;
  private tokenCache = new Map<string, CustomToken>();

  static getInstance(): TokenEcosystemService {
    if (!this.instance) {
      this.instance = new TokenEcosystemService();
    }
    return this.instance;
  }

  // Récupérer tous les tokens de l'écosystème
  async getAllTokens(): Promise<CustomToken[]> {
    try {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('is_deployed', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const tokens = (data || []).map(this.formatTokenFromDB);
      
      // Mettre à jour le cache
      tokens.forEach(token => this.tokenCache.set(token.address, token));
      
      return tokens;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      return [];
    }
  }

  // Récupérer les balances de tous les tokens pour un wallet
  async getWalletTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
    try {
      const tokens = await this.getAllTokens();
      const balances: TokenBalance[] = [];

      // Ajouter Veegox en premier
      const veegoxBalance = await VeegoxTokenService.getUserVeegoxBalance(walletAddress);
      const veegoxInfo = await VeegoxTokenService.getVeegoxTokenInfo();
      
      if (veegoxBalance && veegoxInfo) {
        const veegoxToken: CustomToken = {
          id: 'veegox',
          address: VeegoxTokenService.getTokenConfig().address,
          name: veegoxInfo.name,
          symbol: veegoxInfo.symbol,
          decimals: veegoxInfo.decimals,
          totalSupply: veegoxInfo.totalSupply.toString(),
          logo: VeegoxTokenService.getTokenConfig().logo,
          creatorId: 'veegox',
          isActive: true,
          description: 'Token principal de l\'écosystème Veegox'
        };

        const formattedBalance = VeegoxTokenService.formatVeegoxBalance(veegoxBalance, veegoxInfo.decimals);
        balances.push({
          tokenAddress: veegoxToken.address,
          balance: formattedBalance,
          balanceUSD: parseFloat(formattedBalance) * 1.2, // Prix simulé
          token: veegoxToken
        });
      }

      // Récupérer les balances des autres tokens
      for (const token of tokens) {
        try {
          const { data } = await supabase.functions.invoke('blockchain-integration', {
            body: {
              action: 'getTokenBalance',
              params: [token.address, walletAddress],
              chainId: 137
            }
          });

          if (data?.result?.balance) {
            const balance = (data.result.balance / Math.pow(10, token.decimals)).toString();
            if (parseFloat(balance) > 0) {
              balances.push({
                tokenAddress: token.address,
                balance,
                balanceUSD: parseFloat(balance) * (token.price || 0),
                token
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);
        }
      }

      return balances;
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      return [];
    }
  }

  // Récupérer les statistiques de l'écosystème
  async getEcosystemStats(): Promise<EcosystemStats> {
    try {
      const tokens = await this.getAllTokens();
      
      return {
        totalTokens: tokens.length + 1, // +1 pour Veegox
        totalMarketCap: tokens.reduce((sum, token) => sum + (token.marketCap || 0), 0),
        activeUsers: 1250, // Simulation
        totalVolume24h: tokens.reduce((sum, token) => sum + (token.volume24h || 0), 0),
        stakingRewards: 45820 // Simulation
      };
    } catch (error) {
      console.error('Error fetching ecosystem stats:', error);
      return {
        totalTokens: 0,
        totalMarketCap: 0,
        activeUsers: 0,
        totalVolume24h: 0,
        stakingRewards: 0
      };
    }
  }

  // Vérifier si un token peut être utilisé dans un module spécifique
  canUseTokenInModule(tokenAddress: string, module: string): boolean {
    const token = this.tokenCache.get(tokenAddress);
    if (!token) return false;

    // Veegox peut être utilisé partout
    if (tokenAddress === VeegoxTokenService.getTokenConfig().address) return true;

    // Règles par module
    switch (module) {
      case 'marketplace':
        return token.isActive && (token.holders || 0) >= 10;
      case 'staking':
        return token.isActive && (token.marketCap || 0) >= 1000;
      case 'crowdfunding':
        return token.isActive;
      case 'exchange':
        return token.isActive && (token.volume24h || 0) >= 100;
      default:
        return token.isActive;
    }
  }

  // Obtenir les tokens utilisables pour un module
  async getTokensForModule(module: string): Promise<CustomToken[]> {
    const tokens = await this.getAllTokens();
    return tokens.filter(token => this.canUseTokenInModule(token.address, module));
  }

  private formatTokenFromDB(dbToken: any): CustomToken {
    return {
      id: dbToken.id,
      address: dbToken.contract_address || `token_${dbToken.id}`,
      name: dbToken.name,
      symbol: dbToken.symbol,
      decimals: dbToken.decimals || 18,
      totalSupply: dbToken.total_supply || '0',
      logo: dbToken.logo_url,
      creatorId: dbToken.creator_id,
      isActive: dbToken.is_deployed,
      description: dbToken.description,
      website: dbToken.website_url
    };
  }

  // Simuler des prix de marché pour les tokens
  async updateTokenPrices(tokens: CustomToken[]): Promise<CustomToken[]> {
    return tokens.map(token => ({
      ...token,
      price: Math.random() * 10, // Prix simulé
      volume24h: Math.random() * 10000,
      marketCap: Math.random() * 100000,
      holders: Math.floor(Math.random() * 1000) + 10
    }));
  }
}

export const tokenEcosystemService = TokenEcosystemService.getInstance();
