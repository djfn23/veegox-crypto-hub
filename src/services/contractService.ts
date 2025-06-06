
import { Web3Service } from './web3Service';

export interface ContractConfig {
  address: string;
  chainId: number;
  abi?: any[];
}

export class ContractService {
  private static readonly MAIN_CONTRACT: ContractConfig = {
    address: '0xF3E1D80dA667D50641f0110F2Bb70882cd16343E',
    chainId: 137, // Polygon Mainnet
  };

  // Obtenir les informations du contrat principal
  static async getMainContractInfo() {
    return await Web3Service.validateContract(
      this.MAIN_CONTRACT.address, 
      this.MAIN_CONTRACT.chainId
    );
  }

  // Appeler une fonction du contrat principal
  static async callContractFunction(functionName: string, params: any[] = []) {
    return await Web3Service.callWeb3Function('callContractFunction', [
      this.MAIN_CONTRACT.address,
      functionName,
      params,
      this.MAIN_CONTRACT.chainId
    ]);
  }

  // Obtenir les événements du contrat
  static async getContractEvents(fromBlock: string = 'latest', toBlock: string = 'latest') {
    return await Web3Service.callWeb3Function('getContractEvents', [
      this.MAIN_CONTRACT.address,
      fromBlock,
      toBlock,
      this.MAIN_CONTRACT.chainId
    ]);
  }

  // Vérifier si une adresse est approuvée pour le contrat
  static async checkAllowance(ownerAddress: string, spenderAddress: string) {
    return await Web3Service.callWeb3Function('checkAllowance', [
      this.MAIN_CONTRACT.address,
      ownerAddress,
      spenderAddress,
      this.MAIN_CONTRACT.chainId
    ]);
  }

  // Obtenir le solde d'un utilisateur pour le token du contrat
  static async getUserBalance(userAddress: string) {
    return await Web3Service.callWeb3Function('getTokenBalance', [
      this.MAIN_CONTRACT.address,
      userAddress,
      this.MAIN_CONTRACT.chainId
    ]);
  }

  // Configuration du contrat principal
  static getMainContractConfig(): ContractConfig {
    return this.MAIN_CONTRACT;
  }

  // Mettre à jour l'ABI du contrat
  static setContractABI(abi: any[]) {
    this.MAIN_CONTRACT.abi = abi;
  }
}
