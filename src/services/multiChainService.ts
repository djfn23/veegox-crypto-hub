
export interface ChainConfig {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  contracts: {
    multicall?: string;
    uniswapV2Router?: string;
    uniswapV3Router?: string;
  };
}

export const SUPPORTED_CHAINS: Record<number, ChainConfig> = {
  1: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/',
    blockExplorer: 'https://etherscan.io',
    contracts: {
      multicall: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
      uniswapV2Router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      uniswapV3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    },
  },
  137: {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    contracts: {
      multicall: '0x275617327c958bD06b5D6b871E7f491D76113dd8',
      uniswapV2Router: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
      uniswapV3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    },
  },
  56: {
    id: 56,
    name: 'BSC',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
    contracts: {
      multicall: '0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C',
      uniswapV2Router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    },
  },
  42161: {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ARB',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    contracts: {
      multicall: '0x842eC2c7D803033Edf55E478F461FC547Bc54EB2',
      uniswapV3Router: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    },
  },
};

export class MultiChainService {
  static async getChainConfig(chainId: number): Promise<ChainConfig | null> {
    return SUPPORTED_CHAINS[chainId] || null;
  }

  static async switchChain(chainId: number): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const chainHex = `0x${chainId.toString(16)}`;
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainHex }],
        });
        return true;
      } catch (switchError: any) {
        // Chain not added, try to add it
        if (switchError.code === 4902) {
          const chainConfig = SUPPORTED_CHAINS[chainId];
          if (!chainConfig) throw new Error('Unsupported chain');

          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainHex,
              chainName: chainConfig.name,
              nativeCurrency: {
                name: chainConfig.symbol,
                symbol: chainConfig.symbol,
                decimals: 18,
              },
              rpcUrls: [chainConfig.rpcUrl],
              blockExplorerUrls: [chainConfig.blockExplorer],
            }],
          });
          return true;
        }
        throw switchError;
      }
    } catch (error) {
      console.error('Error switching chain:', error);
      return false;
    }
  }

  static async getTokenBalances(address: string, chainId: number, tokens: string[]) {
    try {
      const chainConfig = SUPPORTED_CHAINS[chainId];
      if (!chainConfig) throw new Error('Unsupported chain');

      // Mock implementation - in real app, use multicall contract
      const balances = tokens.map(token => ({
        token,
        balance: Math.random() * 1000,
        value: Math.random() * 1000,
      }));

      return { success: true, data: balances };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static getSupportedChains() {
    return Object.values(SUPPORTED_CHAINS);
  }
}
