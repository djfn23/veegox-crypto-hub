
import { supabase } from "@/integrations/supabase/client";
import { BLOCKCHAIN_NETWORKS, BlockchainNetwork } from "@/lib/blockchain/networks";

export interface MultiChainBalance {
  chainId: number;
  network: BlockchainNetwork;
  balance: number;
  balanceUSD: number;
  error?: string;
}

export interface NetworkHealth {
  chainId: number;
  network: BlockchainNetwork;
  isHealthy: boolean;
  blockNumber: number;
  gasPrice: number;
  latency: number;
  lastChecked: Date;
}

export class MultiChainWeb3Service {
  static async getMultiChainBalances(address: string, chainIds: number[]): Promise<MultiChainBalance[]> {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'getMultiChainBalances',
          params: [address, chainIds]
        }
      });

      if (error) throw error;

      return data.result.map((balance: any) => ({
        ...balance,
        network: BLOCKCHAIN_NETWORKS[balance.chainId],
        balanceUSD: balance.balance * this.getTokenPrice(balance.chainId) // Mock price
      }));
    } catch (error: any) {
      console.error('Error fetching multi-chain balances:', error);
      throw error;
    }
  }

  static async getAllNetworkHealth(): Promise<NetworkHealth[]> {
    const mainnetChainIds = Object.values(BLOCKCHAIN_NETWORKS)
      .filter(network => !network.testnet)
      .map(network => network.chainId);

    const healthPromises = mainnetChainIds.map(async (chainId) => {
      const startTime = Date.now();
      
      try {
        const { data, error } = await supabase.functions.invoke('blockchain-integration', {
          body: {
            action: 'getNetworkHealth',
            chainId
          }
        });

        const latency = Date.now() - startTime;

        if (error) throw error;

        return {
          chainId,
          network: BLOCKCHAIN_NETWORKS[chainId],
          isHealthy: data.result.isHealthy,
          blockNumber: data.result.blockNumber,
          gasPrice: data.result.gasPrice,
          latency,
          lastChecked: new Date()
        };
      } catch (error) {
        return {
          chainId,
          network: BLOCKCHAIN_NETWORKS[chainId],
          isHealthy: false,
          blockNumber: 0,
          gasPrice: 0,
          latency: Date.now() - startTime,
          lastChecked: new Date()
        };
      }
    });

    return Promise.all(healthPromises);
  }

  static async getNetworkInfo(chainId: number) {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-integration', {
        body: {
          action: 'getNetworkInfo',
          chainId
        }
      });

      if (error) throw error;
      return data.result;
    } catch (error: any) {
      console.error(`Error fetching network info for chain ${chainId}:`, error);
      throw error;
    }
  }

  static async switchNetwork(chainId: number): Promise<boolean> {
    if (!window.ethereum) {
      throw new Error('MetaMask not detected');
    }

    const network = BLOCKCHAIN_NETWORKS[chainId];
    if (!network) {
      throw new Error(`Unsupported network: ${chainId}`);
    }

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError: any) {
      // If the network is not added, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainId.toString(16)}`,
              chainName: network.name,
              nativeCurrency: network.currency,
              rpcUrls: [`https://${network.rpcUrl}.g.alchemy.com/v2/`],
              blockExplorerUrls: [network.blockExplorerUrl],
            }],
          });
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          throw addError;
        }
      } else {
        console.error('Error switching network:', switchError);
        throw switchError;
      }
    }
  }

  static async deployTokenMultiChain(
    tokenConfig: any,
    targetChainIds: number[]
  ): Promise<{ chainId: number; contractAddress: string; txHash: string }[]> {
    // Cette fonction sera implémentée pour déployer des tokens sur plusieurs chaînes
    const deployments = [];
    
    for (const chainId of targetChainIds) {
      try {
        // Simuler un déploiement pour la démonstration
        const mockDeployment = {
          chainId,
          contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`
        };
        
        deployments.push(mockDeployment);
      } catch (error) {
        console.error(`Deployment failed on chain ${chainId}:`, error);
      }
    }

    return deployments;
  }

  private static getTokenPrice(chainId: number): number {
    // Mock prices pour la démonstration
    const prices: Record<number, number> = {
      1: 2500,    // ETH
      137: 0.8,   // MATIC
      42161: 2500, // ETH on Arbitrum
      10: 2500,   // ETH on Optimism
      8453: 2500, // ETH on Base
      43114: 25,  // AVAX
      56: 300     // BNB
    };
    
    return prices[chainId] || 1;
  }

  static getSupportedNetworks(): BlockchainNetwork[] {
    return Object.values(BLOCKCHAIN_NETWORKS);
  }

  static getMainnetNetworks(): BlockchainNetwork[] {
    return Object.values(BLOCKCHAIN_NETWORKS).filter(network => !network.testnet);
  }

  static getTestnetNetworks(): BlockchainNetwork[] {
    return Object.values(BLOCKCHAIN_NETWORKS).filter(network => network.testnet);
  }
}
