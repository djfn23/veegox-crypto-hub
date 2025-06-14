
import { Web3Service } from './web3Service';

export interface ContractInfo {
  tokenInfo: {
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    taxFee: number;
    isAirdrop: boolean;
  };
  isContract: boolean;
  contractType?: string;
}

export interface ContractValidationResult {
  result?: ContractInfo;
  error?: string;
}

export class ContractService {
  static async getMainContractInfo(): Promise<ContractValidationResult> {
    try {
      // Mock contract info for demo
      const contractInfo: ContractInfo = {
        tokenInfo: {
          name: 'Veegox Token',
          symbol: 'VEEGOX',
          decimals: 18,
          totalSupply: '1000000000000000000000000',
          taxFee: 5,
          isAirdrop: false
        },
        isContract: true,
        contractType: 'ERC20'
      };

      return {
        result: contractInfo
      };
    } catch (error: any) {
      console.error('Error fetching contract info:', error);
      return {
        error: error.message || 'Error fetching contract info'
      };
    }
  }

  static async getUserBalance(address: string): Promise<{ result?: string; error?: string }> {
    try {
      const balanceResult = await Web3Service.getWalletBalance(address, 137);
      return {
        result: balanceResult.result?.balance?.toString() || '0'
      };
    } catch (error: any) {
      console.error('Error fetching user balance:', error);
      return {
        error: error.message || 'Error fetching user balance'
      };
    }
  }

  static async validateContract(address: string, chainId: number = 137) {
    try {
      const validation = await Web3Service.validateContract(address, chainId);
      return validation;
    } catch (error: any) {
      console.error('Error validating contract:', error);
      return {
        error: error.message || 'Error validating contract'
      };
    }
  }

  static async executeContractFunction(functionName: string, params: any[]) {
    try {
      const result = await Web3Service.callWeb3Function(functionName, params);
      return result;
    } catch (error: any) {
      console.error('Error executing contract function:', error);
      return {
        error: error.message || 'Error executing contract function'
      };
    }
  }

  static async stakeTokens(amount: string, duration: number, address: string) {
    try {
      const result = await Web3Service.callWeb3Function('stake', [amount, duration, address]);
      return result;
    } catch (error: any) {
      console.error('Error staking tokens:', error);
      return {
        error: error.message || 'Error staking tokens'
      };
    }
  }
}
