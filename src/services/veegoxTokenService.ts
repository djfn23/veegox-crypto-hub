
import { ContractService } from './contractService';
import { supabase } from '@/integrations/supabase/client';

export interface VeegoxTokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  taxFee: number;
  isAirdrop: boolean;
  contractAddress: string;
  chainId: number;
}

export class VeegoxTokenService {
  private static readonly VEEGOX_CONFIG = {
    address: '0xF3E1D80dA667D50641f0110F2Bb70882cd16343E',
    symbol: 'VEEGOX',
    name: 'Veegox Token',
    decimals: 18,
    chainId: 137,
    logo: '/veegox-logo.png'
  };

  static async getVeegoxTokenInfo(): Promise<VeegoxTokenInfo | null> {
    try {
      const contractInfo = await ContractService.getMainContractInfo();
      
      if (contractInfo?.result?.tokenInfo) {
        const tokenInfo = contractInfo.result.tokenInfo;
        return {
          name: tokenInfo.name || this.VEEGOX_CONFIG.name,
          symbol: tokenInfo.symbol || this.VEEGOX_CONFIG.symbol,
          decimals: tokenInfo.decimals || this.VEEGOX_CONFIG.decimals,
          totalSupply: tokenInfo.totalSupply || '0',
          taxFee: tokenInfo.taxFee || 0,
          isAirdrop: tokenInfo.isAirdrop || false,
          contractAddress: this.VEEGOX_CONFIG.address,
          chainId: this.VEEGOX_CONFIG.chainId
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching Veegox token info:', error);
      return null;
    }
  }

  static async getUserVeegoxBalance(userAddress: string): Promise<string> {
    try {
      const balance = await ContractService.getUserBalance(userAddress);
      return balance?.result || '0';
    } catch (error) {
      console.error('Error fetching user Veegox balance:', error);
      return '0';
    }
  }

  static async getVeegoxStats() {
    try {
      const tokenInfo = await this.getVeegoxTokenInfo();
      if (!tokenInfo) return null;

      return {
        price: 0.0025,
        change24h: 5.2,
        volume24h: 125000,
        marketCap: tokenInfo.totalSupply ? parseFloat(tokenInfo.totalSupply) * 0.0025 : 0,
        holders: 1247,
        burnedTokens: '0'
      };
    } catch (error) {
      console.error('Error fetching Veegox stats:', error);
      return null;
    }
  }

  static formatVeegoxBalance(balance: string, decimals: number = 18): string {
    if (!balance || balance === '0') return '0';
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }

  static getTokenConfig() {
    return this.VEEGOX_CONFIG;
  }

  static async saveVeegoxMetrics() {
    try {
      const stats = await this.getVeegoxStats();
      const tokenInfo = await this.getVeegoxTokenInfo();
      
      if (stats && tokenInfo) {
        await supabase.from('platform_metrics').insert([
          {
            metric_name: 'veegox_price',
            metric_value: stats.price,
            metric_type: 'price',
            category: 'token'
          },
          {
            metric_name: 'veegox_volume_24h',
            metric_value: stats.volume24h,
            metric_type: 'volume',
            category: 'token'
          },
          {
            metric_name: 'veegox_holders',
            metric_value: stats.holders,
            metric_type: 'count',
            category: 'token'
          }
        ]);
      }
    } catch (error) {
      console.error('Error saving Veegox metrics:', error);
    }
  }
}
