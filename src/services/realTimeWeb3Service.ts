
import { supabase } from "@/integrations/supabase/client";

export interface TokenPrice {
  address: string;
  price: number;
  change24h: number;
  volume24h: number;
  lastUpdated: Date;
}

export interface WalletAsset {
  tokenAddress: string;
  balance: string;
  balanceUSD: number;
  symbol: string;
  name: string;
  decimals: number;
  logo?: string;
}

export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  gasUsed: string;
  blockNumber: number;
  timestamp: Date;
  status: 'success' | 'failed' | 'pending';
}

export class RealTimeWeb3Service {
  private static instance: RealTimeWeb3Service;
  private priceCache = new Map<string, TokenPrice>();
  private updateInterval: NodeJS.Timeout | null = null;

  static getInstance(): RealTimeWeb3Service {
    if (!this.instance) {
      this.instance = new RealTimeWeb3Service();
    }
    return this.instance;
  }

  async startPriceUpdates(tokenAddresses: string[], interval = 30000) {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    const updatePrices = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('blockchain-integration', {
          body: {
            action: 'getTokenPrices',
            params: [tokenAddresses],
            chainId: 137
          }
        });

        if (error) throw error;

        // Mettre à jour le cache des prix
        Object.entries(data.result || {}).forEach(([address, priceData]: [string, any]) => {
          this.priceCache.set(address, {
            address,
            price: priceData.usd || 0,
            change24h: priceData.usd_24h_change || 0,
            volume24h: priceData.usd_24h_vol || 0,
            lastUpdated: new Date()
          });
        });

        // Émettre un événement pour notifier les composants
        window.dispatchEvent(new CustomEvent('tokenPricesUpdated', {
          detail: { prices: this.priceCache }
        }));

      } catch (error) {
        console.error('Error updating token prices:', error);
      }
    };

    // Mise à jour initiale
    await updatePrices();

    // Démarrer les mises à jour périodiques
    this.updateInterval = setInterval(updatePrices, interval);
  }

  stopPriceUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  getPrice(tokenAddress: string): TokenPrice | null {
    return this.priceCache.get(tokenAddress.toLowerCase()) || null;
  }

  async getWalletAssets(walletAddress: string, chainId: number = 137): Promise<WalletAsset[]> {
    try {
      // Obtenir la balance ETH/MATIC
      const { data: balanceData } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'getWalletBalance',
          params: [walletAddress],
          chainId
        }
      });

      // Obtenir les tokens ERC20 (simulation avec des tokens populaires)
      const popularTokens = [
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC
        '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
        '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
      ];

      const tokenBalances = await Promise.all(
        popularTokens.map(async (tokenAddress) => {
          try {
            const { data: tokenBalance } = await supabase.functions.invoke('blockchain-integration', {
              body: {
                action: 'getTokenBalance',
                params: [tokenAddress, walletAddress],
                chainId
              }
            });

            const { data: tokenInfo } = await supabase.functions.invoke('blockchain-integration', {
              body: {
                action: 'callContractFunction',
                params: [tokenAddress, 'symbol'],
                chainId
              }
            });

            const price = this.getPrice(tokenAddress);
            const balance = tokenBalance?.result?.balance || 0;
            const balanceFormatted = (balance / Math.pow(10, 18)).toString();

            return {
              tokenAddress,
              balance: balanceFormatted,
              balanceUSD: parseFloat(balanceFormatted) * (price?.price || 0),
              symbol: tokenInfo?.result || 'UNKNOWN',
              name: tokenInfo?.result || 'Unknown Token',
              decimals: 18
            };
          } catch (error) {
            console.error(`Error fetching token ${tokenAddress}:`, error);
            return null;
          }
        })
      );

      const validTokens = tokenBalances.filter(token => 
        token && parseFloat(token.balance) > 0
      ) as WalletAsset[];

      // Ajouter la balance native (MATIC)
      const nativeBalance = balanceData?.result?.balance || 0;
      if (nativeBalance > 0) {
        const maticPrice = this.getPrice('0x0000000000000000000000000000000000001010'); // MATIC address
        validTokens.unshift({
          tokenAddress: 'native',
          balance: nativeBalance.toString(),
          balanceUSD: nativeBalance * (maticPrice?.price || 0),
          symbol: 'MATIC',
          name: 'Polygon',
          decimals: 18
        });
      }

      return validTokens;
    } catch (error) {
      console.error('Error fetching wallet assets:', error);
      return [];
    }
  }

  async getTransactionHistory(walletAddress: string, chainId: number = 137): Promise<TransactionData[]> {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'getTransactionHistory',
          params: [walletAddress],
          chainId
        }
      });

      if (error) throw error;

      const transactions = data.result?.transactions || [];
      
      return transactions.map((tx: any) => ({
        hash: tx.transactionHash || 'N/A',
        from: tx.address || walletAddress,
        to: tx.topics?.[1] || 'N/A',
        value: '0',
        gasPrice: '0',
        gasUsed: '0',
        blockNumber: parseInt(tx.blockNumber, 16) || 0,
        timestamp: new Date(),
        status: 'success' as const
      }));
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  async getCurrentGasPrice(chainId: number = 137): Promise<number> {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'getGasPrice',
          params: [],
          chainId
        }
      });

      if (error) throw error;
      return data.result?.gasPrice || 0;
    } catch (error) {
      console.error('Error fetching gas price:', error);
      return 0;
    }
  }

  async validateContractAddress(address: string, chainId: number = 137): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'validateContract',
          params: [address],
          chainId
        }
      });

      if (error) throw error;
      return data.result?.isContract || false;
    } catch (error) {
      console.error('Error validating contract:', error);
      return false;
    }
  }
}

export const web3Service = RealTimeWeb3Service.getInstance();
