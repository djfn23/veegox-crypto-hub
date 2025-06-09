
import { 
  createSmartAccountClient,
  type SmartAccountSigner,
  type SmartAccountClient,
  LocalAccountSigner,
  getDefaultSimpleAccountFactoryAddress,
  sepolia, 
  polygon, 
  mainnet, 
  arbitrum
} from '@alchemy/aa-core';
import { AlchemySignerWebClient, AlchemySignerStatus } from '@alchemy/aa-alchemy';

export interface AlchemyWalletConnection {
  address: string;
  chainId: number;
  client: SmartAccountClient;
  accountType: 'eoa' | 'simple' | 'light';
  signer: SmartAccountSigner;
  isSmartAccount: boolean;
}

export interface AlchemyWalletProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'social' | 'smart' | 'traditional';
  type: 'google' | 'apple' | 'email' | 'metamask' | 'coinbase' | 'smart-account';
  connect: () => Promise<AlchemyWalletConnection>;
}

export class AlchemyWalletService {
  private static instance: AlchemyWalletService;
  private providers: Map<string, AlchemyWalletProvider> = new Map();
  private alchemySignerClient: AlchemySignerWebClient | null = null;

  // Configuration Alchemy
  private readonly alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY || 'demo-key';
  private readonly alchemyGasManagerPolicyId = import.meta.env.VITE_ALCHEMY_GAS_POLICY_ID;

  static getInstance(): AlchemyWalletService {
    if (!AlchemyWalletService.instance) {
      AlchemyWalletService.instance = new AlchemyWalletService();
    }
    return AlchemyWalletService.instance;
  }

  constructor() {
    this.initializeProviders();
    this.initializeAlchemySigner();
  }

  private async initializeAlchemySigner() {
    try {
      this.alchemySignerClient = new AlchemySignerWebClient({
        connectionConfig: {
          rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${this.alchemyApiKey}`,
        },
        iframeConfig: {
          iframeContainerId: "alchemy-signer-iframe-container",
        },
      });
    } catch (error) {
      console.error('Failed to initialize Alchemy Signer:', error);
    }
  }

  private initializeProviders() {
    // Social Login Providers
    this.registerProvider({
      id: 'alchemy-google',
      name: 'Google Account',
      icon: '🔍',
      description: 'Connect with your Google account using Account Abstraction',
      category: 'social',
      type: 'google',
      connect: this.connectWithGoogle.bind(this)
    });

    this.registerProvider({
      id: 'alchemy-apple',
      name: 'Apple ID',
      icon: '🍎',
      description: 'Connect with your Apple ID using Account Abstraction',
      category: 'social',
      type: 'apple',
      connect: this.connectWithApple.bind(this)
    });

    this.registerProvider({
      id: 'alchemy-email',
      name: 'Email & Password',
      icon: '📧',
      description: 'Create account with email and password',
      category: 'social',
      type: 'email',
      connect: this.connectWithEmail.bind(this)
    });

    // Smart Account Providers
    this.registerProvider({
      id: 'alchemy-simple-account',
      name: 'Simple Smart Account',
      icon: '🧠',
      description: 'Create a Simple Smart Contract Account with Account Abstraction',
      category: 'smart',
      type: 'smart-account',
      connect: this.connectSimpleSmartAccount.bind(this)
    });

    // Traditional Wallet Integration via Alchemy
    this.registerProvider({
      id: 'alchemy-metamask',
      name: 'MetaMask via Alchemy',
      icon: '🦊',
      description: 'Connect MetaMask with Alchemy infrastructure',
      category: 'traditional',
      type: 'metamask',
      connect: this.connectMetaMaskViaAlchemy.bind(this)
    });
  }

  registerProvider(provider: AlchemyWalletProvider) {
    this.providers.set(provider.id, provider);
  }

  getProvider(id: string): AlchemyWalletProvider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): AlchemyWalletProvider[] {
    return Array.from(this.providers.values());
  }

  getProvidersByCategory(category: AlchemyWalletProvider['category']): AlchemyWalletProvider[] {
    return this.getAllProviders().filter(p => p.category === category);
  }

  // Social Login Methods
  private async connectWithGoogle(): Promise<AlchemyWalletConnection> {
    if (!this.alchemySignerClient) {
      throw new Error('Alchemy Signer not initialized');
    }

    const signer = await this.alchemySignerClient.authenticate({
      type: "oauth",
      authProviderId: "google",
      mode: "popup",
    });

    return this.createSmartAccountWithSigner(signer, 'simple');
  }

  private async connectWithApple(): Promise<AlchemyWalletConnection> {
    if (!this.alchemySignerClient) {
      throw new Error('Alchemy Signer not initialized');
    }

    const signer = await this.alchemySignerClient.authenticate({
      type: "oauth",
      authProviderId: "apple",
      mode: "popup",
    });

    return this.createSmartAccountWithSigner(signer, 'simple');
  }

  private async connectWithEmail(): Promise<AlchemyWalletConnection> {
    if (!this.alchemySignerClient) {
      throw new Error('Alchemy Signer not initialized');
    }

    // This would typically show a form to collect email/password
    // For now, we'll use the authenticate method
    const signer = await this.alchemySignerClient.authenticate({
      type: "email",
      mode: "popup",
    });

    return this.createSmartAccountWithSigner(signer, 'simple');
  }

  // Smart Account Methods
  private async connectSimpleSmartAccount(): Promise<AlchemyWalletConnection> {
    const signer = LocalAccountSigner.privateKeyToAccountSigner('0x' + '0'.repeat(64));
    
    const client = createSmartAccountClient({
      transport: `https://polygon-mainnet.g.alchemy.com/v2/${this.alchemyApiKey}`,
      chain: polygon,
      account: {
        type: 'SimpleSmartAccount',
        signer,
        factoryAddress: getDefaultSimpleAccountFactoryAddress(polygon),
        salt: BigInt(0),
      },
    });

    return {
      address: await client.getAddress(),
      chainId: polygon.id,
      client,
      accountType: 'simple',
      signer,
      isSmartAccount: true
    };
  }

  private async createSmartAccountWithSigner(
    signer: SmartAccountSigner, 
    accountType: 'simple' | 'light' = 'simple'
  ): Promise<AlchemyWalletConnection> {
    
    const client = createSmartAccountClient({
      transport: `https://polygon-mainnet.g.alchemy.com/v2/${this.alchemyApiKey}`,
      chain: polygon,
      account: {
        type: 'SimpleSmartAccount',
        signer,
        factoryAddress: getDefaultSimpleAccountFactoryAddress(polygon),
        salt: BigInt(0),
      },
    });

    return {
      address: await client.getAddress(),
      chainId: polygon.id,
      client,
      accountType,
      signer,
      isSmartAccount: true
    };
  }

  // Traditional Wallet Integration
  private async connectMetaMaskViaAlchemy(): Promise<AlchemyWalletConnection> {
    if (!window.ethereum?.isMetaMask) {
      throw new Error('MetaMask not installed');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    const client = createSmartAccountClient({
      transport: `https://polygon-mainnet.g.alchemy.com/v2/${this.alchemyApiKey}`,
      chain: this.getChainById(parseInt(chainId, 16)),
      account: {
        type: 'SimpleSmartAccount',
        signer: window.ethereum as any,
        factoryAddress: getDefaultSimpleAccountFactoryAddress(polygon),
        salt: BigInt(0),
      },
    });

    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      client,
      accountType: 'eoa',
      signer: window.ethereum as any,
      isSmartAccount: false
    };
  }

  // Utility Methods
  private getChainById(chainId: number) {
    switch (chainId) {
      case 1: return mainnet;
      case 137: return polygon;
      case 42161: return arbitrum;
      case 11155111: return sepolia;
      default: return polygon; // Default to Polygon
    }
  }

  // Gas Sponsorship Methods
  async sponsorTransaction(
    connection: AlchemyWalletConnection, 
    transaction: any
  ): Promise<string> {
    if (!this.alchemyGasManagerPolicyId) {
      throw new Error('Gas Manager Policy ID not configured');
    }

    if (!connection.isSmartAccount) {
      throw new Error('Gas sponsorship only available for Smart Accounts');
    }

    const sponsoredTx = {
      ...transaction,
      paymasterAndData: this.alchemyGasManagerPolicyId,
    };

    return connection.client.sendTransaction(sponsoredTx);
  }

  // Session Key Methods
  async createSessionKey(
    connection: AlchemyWalletConnection,
    permissions: {
      validAfter?: number;
      validUntil?: number;
      maxTransactions?: number;
      allowedTargets?: string[];
    }
  ): Promise<string> {
    if (!connection.isSmartAccount) {
      throw new Error('Session keys only available for Smart Accounts');
    }

    // Implementation would depend on the specific session key plugin used
    // This is a simplified version
    return 'session_key_placeholder';
  }

  // Account Recovery Methods
  async setupRecovery(
    connection: AlchemyWalletConnection,
    guardians: string[]
  ): Promise<void> {
    if (!connection.isSmartAccount) {
      throw new Error('Account recovery only available for Smart Accounts');
    }

    // Implementation would set up social recovery or guardian-based recovery
    console.log('Setting up recovery with guardians:', guardians);
  }

  // Batch Transaction Methods
  async batchTransactions(
    connection: AlchemyWalletConnection,
    transactions: any[]
  ): Promise<string> {
    if (!connection.isSmartAccount) {
      throw new Error('Batch transactions only available for Smart Accounts');
    }

    // Implementation would batch multiple transactions into one
    return connection.client.sendTransactionBatch(transactions);
  }
}

// Global declarations
declare global {
  interface Window {
    ethereum?: any;
  }
}
