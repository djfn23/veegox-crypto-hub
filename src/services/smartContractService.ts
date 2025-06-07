
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ContractConfig {
  address: string;
  abi: any[];
  chainId: number;
}

export interface TransactionResult {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  gasUsed?: string;
  blockNumber?: number;
}

export class SmartContractService {
  private static instance: SmartContractService;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  
  static getInstance(): SmartContractService {
    if (!this.instance) {
      this.instance = new SmartContractService();
    }
    return this.instance;
  }

  async initialize() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
    }
  }

  async executeContractFunction(
    contractConfig: ContractConfig,
    functionName: string,
    args: any[] = [],
    value?: string
  ): Promise<TransactionResult> {
    try {
      await this.initialize();
      
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      const contract = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        this.signer
      );

      const txOptions: any = {};
      if (value) {
        txOptions.value = ethers.parseEther(value);
      }

      const tx = await contract[functionName](...args, txOptions);
      
      // Enregistrer la transaction en base
      await this.saveTransaction({
        hash: tx.hash,
        contractAddress: contractConfig.address,
        functionName,
        args,
        value,
        chainId: contractConfig.chainId,
        status: 'pending'
      });

      toast.success(`Transaction envoyée: ${tx.hash.substring(0, 10)}...`);

      // Attendre la confirmation
      const receipt = await tx.wait();
      
      await this.updateTransactionStatus(tx.hash, 'success', {
        gasUsed: receipt.gasUsed.toString(),
        blockNumber: receipt.blockNumber
      });

      toast.success('Transaction confirmée!');

      return {
        hash: tx.hash,
        status: 'success',
        gasUsed: receipt.gasUsed.toString(),
        blockNumber: receipt.blockNumber
      };

    } catch (error: any) {
      console.error('Contract execution error:', error);
      toast.error(`Erreur transaction: ${error.message}`);
      
      throw error;
    }
  }

  async readContractFunction(
    contractConfig: ContractConfig,
    functionName: string,
    args: any[] = []
  ): Promise<any> {
    try {
      await this.initialize();
      
      if (!this.provider) {
        throw new Error('Provider not available');
      }

      const contract = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        this.provider
      );

      return await contract[functionName](...args);
    } catch (error: any) {
      console.error('Contract read error:', error);
      throw error;
    }
  }

  private async saveTransaction(txData: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('transactions_history').insert({
        user_id: user.id,
        tx_hash: txData.hash,
        from_address: await this.signer?.getAddress(),
        to_address: txData.contractAddress,
        amount: txData.value || '0',
        tx_type: `contract_${txData.functionName}`,
        status: txData.status,
        chain_id: txData.chainId,
        metadata: {
          function: txData.functionName,
          args: txData.args,
          contract: txData.contractAddress
        }
      });
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  }

  private async updateTransactionStatus(hash: string, status: string, data?: any) {
    try {
      await supabase
        .from('transactions_history')
        .update({
          status,
          block_number: data?.blockNumber,
          gas_fee: data?.gasUsed
        })
        .eq('tx_hash', hash);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  }

  // Fonctions spécifiques pour le staking
  async stakeTokens(
    poolAddress: string,
    amount: string,
    abi: any[]
  ): Promise<TransactionResult> {
    return this.executeContractFunction(
      { address: poolAddress, abi, chainId: 137 },
      'stake',
      [ethers.parseEther(amount)]
    );
  }

  async unstakeTokens(
    poolAddress: string,
    amount: string,
    abi: any[]
  ): Promise<TransactionResult> {
    return this.executeContractFunction(
      { address: poolAddress, abi, chainId: 137 },
      'unstake',
      [ethers.parseEther(amount)]
    );
  }

  async claimRewards(
    poolAddress: string,
    abi: any[]
  ): Promise<TransactionResult> {
    return this.executeContractFunction(
      { address: poolAddress, abi, chainId: 137 },
      'claimRewards',
      []
    );
  }

  // Fonctions pour le trading
  async swapTokens(
    dexAddress: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    minAmountOut: string,
    abi: any[]
  ): Promise<TransactionResult> {
    return this.executeContractFunction(
      { address: dexAddress, abi, chainId: 137 },
      'swapExactTokensForTokens',
      [
        ethers.parseEther(amountIn),
        ethers.parseEther(minAmountOut),
        [tokenIn, tokenOut],
        await this.signer?.getAddress(),
        Math.floor(Date.now() / 1000) + 300 // 5 minutes deadline
      ]
    );
  }
}

export const contractService = SmartContractService.getInstance();
