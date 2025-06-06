import { supabase } from "@/integrations/supabase/client";

export interface Web3ServiceResponse<T = any> {
  result?: T;
  error?: string;
}

export class Web3Service {
  static async callWeb3Function(action: string, params: any[]): Promise<Web3ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('web3Integration', {
        body: { action, params }
      });

      if (error) {
        console.error('Web3 function error:', error);
        return { error: error.message || 'Erreur lors de l\'appel à la fonction Web3' };
      }

      return data;
    } catch (error: any) {
      console.error('Web3 service error:', error);
      return { error: error.message || 'Erreur de service Web3' };
    }
  }

  static async getWalletBalance(address: string, chainId: number = 1) {
    return this.callWeb3Function('getWalletBalance', [address, chainId]);
  }

  static async getTransactionHistory(address: string, chainId: number = 1) {
    return this.callWeb3Function('getTransactionHistory', [address, chainId]);
  }

  static async getWalletAge(address: string, chainId: number = 1) {
    return this.callWeb3Function('getWalletAge', [address, chainId]);
  }

  static async getCreditScoreData(address: string, chainId: number = 1) {
    return this.callWeb3Function('getCreditScoreData', [address, chainId]);
  }

  static async getTokenInfo(tokenAddress: string, chainId: number = 137) {
    return this.callWeb3Function('getTokenInfo', [tokenAddress, chainId]);
  }

  static async getTokenBalances(address: string, chainId: number = 1) {
    return this.callWeb3Function('getTokenBalances', [address, chainId]);
  }

  static async getNFTsForWallet(address: string, chainId: number = 1) {
    return this.callWeb3Function('getNFTsForWallet', [address, chainId]);
  }

  static async getTokenPrices(tokenAddresses: string[], chainId: number = 1) {
    return this.callWeb3Function('getTokenPrices', [tokenAddresses, chainId]);
  }

  static async getGasPrice(chainId: number = 1) {
    return this.callWeb3Function('getGasPrice', [chainId]);
  }

  static async getBlockNumber(chainId: number = 1) {
    return this.callWeb3Function('getBlockNumber', [chainId]);
  }

  static async validateContract(address: string, chainId: number = 1) {
    return this.callWeb3Function('validateContract', [address, chainId]);
  }

  // Nouvelles fonctions spécifiques pour votre ERC20Template
  static async callContractFunction(contractAddress: string, functionName: string, params: any[] = [], chainId: number = 137) {
    return this.callWeb3Function('callContractFunction', [contractAddress, functionName, params, chainId]);
  }

  static async getTokenBalance(tokenAddress: string, userAddress: string, chainId: number = 137) {
    return this.callWeb3Function('getTokenBalance', [tokenAddress, userAddress, chainId]);
  }

  static async checkAllowance(tokenAddress: string, ownerAddress: string, spenderAddress: string, chainId: number = 137) {
    return this.callWeb3Function('checkAllowance', [tokenAddress, ownerAddress, spenderAddress, chainId]);
  }
}
