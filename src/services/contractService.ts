
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
    abi: [
      // Fonctions principales de votre ERC20Template
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function decimals() view returns (uint8)",
      "function totalSupply() view returns (uint256)",
      "function balanceOf(address account) view returns (uint256)",
      "function transfer(address to, uint256 amount) returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)",
      "function approve(address spender, uint256 amount) returns (bool)",
      "function transferFrom(address from, address to, uint256 amount) returns (bool)",
      
      // Fonctions spécifiques à votre contrat
      "function owner() view returns (address)",
      "function initialSupply() view returns (uint256)",
      "function taxFee() view returns (uint256)",
      "function taxAddress() view returns (address)",
      "function isAirdrop() view returns (bool)",
      "function blackList(address) view returns (bool)",
      "function noTaxable(address) view returns (bool)",
      "function isAntibotGlobalExemption(address) view returns (bool)",
      "function isAntiwhaleGlobalExemption(address) view returns (bool)",
      "function getOwner() view returns (address)",
      
      // Fonctions de gestion (owner only)
      "function setNotTaxable(address _address, bool _taxable)",
      "function setBlackList(address _address, bool _blackList)",
      "function setTaxAddress(address _taxAddress)",
      "function releaseAirdropMode()",
      "function releaseAntibotGlobalExemption(address _address)",
      "function releaseAntiwhaleGlobalExemption(address _address)",
      "function pause()",
      "function unpause()",
      "function burn(uint256 amount)",
      
      // Événements
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "event Approval(address indexed owner, address indexed spender, uint256 value)",
      "event Paused(address account)",
      "event Unpaused(address account)"
    ]
  };

  // Obtenir les informations du contrat principal
  static async getMainContractInfo() {
    const validation = await Web3Service.validateContract(
      this.MAIN_CONTRACT.address, 
      this.MAIN_CONTRACT.chainId
    );
    
    if (validation.result?.isContract) {
      // Obtenir les informations du token
      const [name, symbol, decimals, totalSupply, taxFee, isAirdrop] = await Promise.all([
        this.callContractFunction('name'),
        this.callContractFunction('symbol'),
        this.callContractFunction('decimals'),
        this.callContractFunction('totalSupply'),
        this.callContractFunction('taxFee'),
        this.callContractFunction('isAirdrop')
      ]);

      return {
        ...validation.result,
        tokenInfo: {
          name: name.result,
          symbol: symbol.result,
          decimals: decimals.result,
          totalSupply: totalSupply.result,
          taxFee: taxFee.result,
          isAirdrop: isAirdrop.result
        }
      };
    }
    
    return validation;
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

  // Obtenir le solde d'un utilisateur pour le token
  static async getUserBalance(userAddress: string) {
    return await this.callContractFunction('balanceOf', [userAddress]);
  }

  // Vérifier si une adresse est dans la blacklist
  static async isBlacklisted(address: string) {
    return await this.callContractFunction('blackList', [address]);
  }

  // Vérifier si une adresse est exemptée de taxes
  static async isNotTaxable(address: string) {
    return await this.callContractFunction('noTaxable', [address]);
  }

  // Vérifier les exemptions anti-bot
  static async isAntibotExempt(address: string) {
    return await this.callContractFunction('isAntibotGlobalExemption', [address]);
  }

  // Vérifier les exemptions anti-whale
  static async isAntiwhaleExempt(address: string) {
    return await this.callContractFunction('isAntiwhaleGlobalExemption', [address]);
  }

  // Obtenir l'allowance
  static async getAllowance(owner: string, spender: string) {
    return await this.callContractFunction('allowance', [owner, spender]);
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

  // Configuration du contrat principal
  static getMainContractConfig(): ContractConfig {
    return this.MAIN_CONTRACT;
  }

  // Fonctions de transaction (nécessitent une signature wallet)
  static async transfer(to: string, amount: string) {
    return await this.callContractFunction('transfer', [to, amount]);
  }

  static async approve(spender: string, amount: string) {
    return await this.callContractFunction('approve', [spender, amount]);
  }

  static async burn(amount: string) {
    return await this.callContractFunction('burn', [amount]);
  }

  // Fonctions de gestion (owner only)
  static async setNotTaxable(address: string, taxable: boolean) {
    return await this.callContractFunction('setNotTaxable', [address, taxable]);
  }

  static async setBlackList(address: string, blacklisted: boolean) {
    return await this.callContractFunction('setBlackList', [address, blacklisted]);
  }

  static async releaseAirdropMode() {
    return await this.callContractFunction('releaseAirdropMode');
  }
}
