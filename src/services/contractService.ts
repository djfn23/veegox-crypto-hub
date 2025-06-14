
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
      console.log('ContractService: Getting main contract info');
      
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

      console.log('ContractService: Contract info retrieved:', contractInfo);

      return {
        result: contractInfo
      };
    } catch (error: any) {
      console.error('ContractService: Error fetching contract info:', error);
      return {
        error: error.message || 'Error fetching contract info'
      };
    }
  }

  static async getUserBalance(address: string): Promise<{ result?: string; error?: string }> {
    try {
      console.log('ContractService: Getting user balance for address:', address);
      
      const balanceResult = await Web3Service.getWalletBalance(address, 137);
      
      console.log('ContractService: Balance result:', balanceResult);
      
      return {
        result: balanceResult.result?.balance?.toString() || '0'
      };
    } catch (error: any) {
      console.error('ContractService: Error fetching user balance:', error);
      return {
        error: error.message || 'Error fetching user balance'
      };
    }
  }

  static async validateContract(address: string, chainId: number = 137) {
    try {
      console.log('ContractService: Validating contract:', { address, chainId });
      
      const validation = await Web3Service.validateContract(address, chainId);
      
      console.log('ContractService: Validation result:', validation);
      
      return validation;
    } catch (error: any) {
      console.error('ContractService: Error validating contract:', error);
      return {
        error: error.message || 'Error validating contract'
      };
    }
  }

  static async executeContractFunction(functionName: string, params: any[]) {
    try {
      console.log('ContractService: Executing contract function:', { functionName, params });
      
      const result = await Web3Service.callWeb3Function(functionName, params);
      
      console.log('ContractService: Function execution result:', result);
      
      return result;
    } catch (error: any) {
      console.error('ContractService: Error executing contract function:', error);
      return {
        error: error.message || 'Error executing contract function'
      };
    }
  }

  static async stakeTokens(amount: string, duration: number, address: string) {
    try {
      console.log('ContractService: Staking tokens:', { amount, duration, address });
      
      const result = await Web3Service.callWeb3Function('stake', [amount, duration, address]);
      
      console.log('ContractService: Staking result:', result);
      
      return result;
    } catch (error: any) {
      console.error('ContractService: Error staking tokens:', error);
      return {
        error: error.message || 'Error staking tokens'
      };
    }
  }
}
