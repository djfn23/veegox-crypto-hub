
export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'browser' | 'mobile' | 'hardware' | 'social' | 'institutional';
  downloadUrl?: string;
  isInstalled?: boolean;
  connect: () => Promise<{
    address: string;
    chainId: number;
    provider: any;
  }>;
  disconnect?: () => Promise<void>;
}

export class WalletService {
  private static instance: WalletService;
  private providers: Map<string, WalletProvider> = new Map();

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Browser Extension Wallets
    this.registerProvider({
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'The most popular Ethereum wallet',
      category: 'browser',
      downloadUrl: 'https://metamask.io/download/',
      isInstalled: typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
      connect: this.connectMetaMask.bind(this)
    });

    this.registerProvider({
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔷',
      description: 'Secure wallet by Coinbase',
      category: 'browser',
      downloadUrl: 'https://www.coinbase.com/wallet',
      isInstalled: typeof window !== 'undefined' && !!window.ethereum?.isCoinbaseWallet,
      connect: this.connectCoinbase.bind(this)
    });

    this.registerProvider({
      id: 'trust',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Simple and secure mobile wallet',
      category: 'mobile',
      downloadUrl: 'https://trustwallet.com/download',
      isInstalled: typeof window !== 'undefined' && !!window.ethereum?.isTrust,
      connect: this.connectTrust.bind(this)
    });

    this.registerProvider({
      id: 'phantom',
      name: 'Phantom',
      icon: '👻',
      description: 'Multi-chain wallet for Solana & Ethereum',
      category: 'browser',
      downloadUrl: 'https://phantom.app/download',
      isInstalled: typeof window !== 'undefined' && !!window.phantom?.ethereum,
      connect: this.connectPhantom.bind(this)
    });

    this.registerProvider({
      id: 'rainbow',
      name: 'Rainbow',
      icon: '🌈',
      description: 'Beautiful and user-friendly wallet',
      category: 'mobile',
      downloadUrl: 'https://rainbow.me/download',
      isInstalled: typeof window !== 'undefined' && !!window.ethereum?.isRainbow,
      connect: this.connectRainbow.bind(this)
    });

    this.registerProvider({
      id: 'argent',
      name: 'Argent',
      icon: '🔒',
      description: 'Smart contract wallet with advanced features',
      category: 'mobile',
      downloadUrl: 'https://www.argent.xyz/download',
      connect: this.connectArgent.bind(this)
    });

    this.registerProvider({
      id: 'safe',
      name: 'Gnosis Safe',
      icon: '🏦',
      description: 'Multi-signature wallet for teams',
      category: 'institutional',
      downloadUrl: 'https://safe.global',
      connect: this.connectSafe.bind(this)
    });

    this.registerProvider({
      id: 'frame',
      name: 'Frame',
      icon: '🖼️',
      description: 'Secure desktop wallet',
      category: 'browser',
      downloadUrl: 'https://frame.sh',
      isInstalled: typeof window !== 'undefined' && !!window.ethereum?.isFrame,
      connect: this.connectFrame.bind(this)
    });

    // WalletConnect
    this.registerProvider({
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect with 300+ wallets',
      category: 'mobile',
      connect: this.connectWalletConnect.bind(this)
    });

    // Exchange Wallets
    this.registerProvider({
      id: 'binance',
      name: 'Binance Wallet',
      icon: '🟨',
      description: 'Binance Chain Wallet',
      category: 'browser',
      downloadUrl: 'https://www.binance.org/wallet',
      isInstalled: typeof window !== 'undefined' && !!window.BinanceChain,
      connect: this.connectBinance.bind(this)
    });

    this.registerProvider({
      id: 'okx',
      name: 'OKX Wallet',
      icon: '⚫',
      description: 'OKX Web3 Wallet',
      category: 'browser',
      downloadUrl: 'https://www.okx.com/wallet',
      isInstalled: typeof window !== 'undefined' && !!window.okxwallet,
      connect: this.connectOKX.bind(this)
    });
  }

  registerProvider(provider: WalletProvider) {
    this.providers.set(provider.id, provider);
  }

  getProvider(id: string): WalletProvider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): WalletProvider[] {
    return Array.from(this.providers.values());
  }

  getProvidersByCategory(category: WalletProvider['category']): WalletProvider[] {
    return this.getAllProviders().filter(p => p.category === category);
  }

  getInstalledProviders(): WalletProvider[] {
    return this.getAllProviders().filter(p => p.isInstalled);
  }

  // Connection methods for each wallet
  private async connectMetaMask() {
    if (!window.ethereum?.isMetaMask) {
      throw new Error('MetaMask not installed');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.ethereum
    };
  }

  private async connectCoinbase() {
    if (!window.ethereum?.isCoinbaseWallet) {
      throw new Error('Coinbase Wallet not installed');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.ethereum
    };
  }

  private async connectTrust() {
    if (!window.ethereum?.isTrust) {
      throw new Error('Trust Wallet not installed');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.ethereum
    };
  }

  private async connectPhantom() {
    if (!window.phantom?.ethereum) {
      throw new Error('Phantom Wallet not installed');
    }
    
    const accounts = await window.phantom.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.phantom.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.phantom.ethereum
    };
  }

  private async connectRainbow() {
    if (!window.ethereum?.isRainbow) {
      throw new Error('Rainbow Wallet not installed');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.ethereum
    };
  }

  private async connectArgent() {
    // Argent uses WalletConnect protocol
    return this.connectWalletConnect();
  }

  private async connectSafe() {
    // Safe uses WalletConnect protocol
    return this.connectWalletConnect();
  }

  private async connectFrame() {
    if (!window.ethereum?.isFrame) {
      throw new Error('Frame Wallet not installed');
    }
    
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.ethereum
    };
  }

  private async connectWalletConnect() {
    // This will be implemented with @walletconnect/modal
    throw new Error('WalletConnect implementation in progress');
  }

  private async connectBinance() {
    if (!window.BinanceChain) {
      throw new Error('Binance Wallet not installed');
    }
    
    const accounts = await window.BinanceChain.request({ method: 'eth_requestAccounts' });
    const chainId = await window.BinanceChain.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.BinanceChain
    };
  }

  private async connectOKX() {
    if (!window.okxwallet) {
      throw new Error('OKX Wallet not installed');
    }
    
    const accounts = await window.okxwallet.request({ method: 'eth_requestAccounts' });
    const chainId = await window.okxwallet.request({ method: 'eth_chainId' });
    
    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16),
      provider: window.okxwallet
    };
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
    phantom?: any;
    BinanceChain?: any;
    okxwallet?: any;
    solana?: any;
  }
}
