
export interface BlockchainNetwork {
  chainId: number;
  name: string;
  shortName: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrl: string;
  blockExplorerUrl: string;
  icon: string;
  testnet: boolean;
  category: 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' | 'base' | 'avalanche' | 'bsc';
}

export const BLOCKCHAIN_NETWORKS: Record<number, BlockchainNetwork> = {
  // Ethereum
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    shortName: 'Ethereum',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'eth-mainnet',
    blockExplorerUrl: 'https://etherscan.io',
    icon: '⟠',
    testnet: false,
    category: 'ethereum'
  },
  11155111: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    shortName: 'Sepolia',
    currency: { name: 'Sepolia Ether', symbol: 'SEP', decimals: 18 },
    rpcUrl: 'eth-sepolia',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    icon: '⟠',
    testnet: true,
    category: 'ethereum'
  },

  // Polygon
  137: {
    chainId: 137,
    name: 'Polygon Mainnet',
    shortName: 'Polygon',
    currency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrl: 'polygon-mainnet',
    blockExplorerUrl: 'https://polygonscan.com',
    icon: '🔮',
    testnet: false,
    category: 'polygon'
  },
  80001: {
    chainId: 80001,
    name: 'Mumbai Testnet',
    shortName: 'Mumbai',
    currency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrl: 'polygon-mumbai',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    icon: '🔮',
    testnet: true,
    category: 'polygon'
  },

  // Arbitrum
  42161: {
    chainId: 42161,
    name: 'Arbitrum One',
    shortName: 'Arbitrum',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'arb-mainnet',
    blockExplorerUrl: 'https://arbiscan.io',
    icon: '🔷',
    testnet: false,
    category: 'arbitrum'
  },
  421614: {
    chainId: 421614,
    name: 'Arbitrum Sepolia',
    shortName: 'Arb Sepolia',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'arb-sepolia',
    blockExplorerUrl: 'https://sepolia.arbiscan.io',
    icon: '🔷',
    testnet: true,
    category: 'arbitrum'
  },

  // Optimism
  10: {
    chainId: 10,
    name: 'Optimism Mainnet',
    shortName: 'Optimism',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'opt-mainnet',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    icon: '🔴',
    testnet: false,
    category: 'optimism'
  },
  11155420: {
    chainId: 11155420,
    name: 'Optimism Sepolia',
    shortName: 'OP Sepolia',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'opt-sepolia',
    blockExplorerUrl: 'https://sepolia-optimism.etherscan.io',
    icon: '🔴',
    testnet: true,
    category: 'optimism'
  },

  // Base
  8453: {
    chainId: 8453,
    name: 'Base Mainnet',
    shortName: 'Base',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'base-mainnet',
    blockExplorerUrl: 'https://basescan.org',
    icon: '🔵',
    testnet: false,
    category: 'base'
  },
  84532: {
    chainId: 84532,
    name: 'Base Sepolia',
    shortName: 'Base Sepolia',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'base-sepolia',
    blockExplorerUrl: 'https://sepolia.basescan.org',
    icon: '🔵',
    testnet: true,
    category: 'base'
  },

  // Avalanche
  43114: {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    shortName: 'Avalanche',
    currency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrl: 'avax-mainnet',
    blockExplorerUrl: 'https://snowtrace.io',
    icon: '🏔️',
    testnet: false,
    category: 'avalanche'
  },
  43113: {
    chainId: 43113,
    name: 'Avalanche Fuji',
    shortName: 'Fuji',
    currency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrl: 'avax-fuji',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
    icon: '🏔️',
    testnet: true,
    category: 'avalanche'
  },

  // BNB Smart Chain
  56: {
    chainId: 56,
    name: 'BNB Smart Chain',
    shortName: 'BSC',
    currency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrl: 'bnb-mainnet',
    blockExplorerUrl: 'https://bscscan.com',
    icon: '💛',
    testnet: false,
    category: 'bsc'
  },
  97: {
    chainId: 97,
    name: 'BSC Testnet',
    shortName: 'BSC Testnet',
    currency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
    rpcUrl: 'bnb-testnet',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    icon: '💛',
    testnet: true,
    category: 'bsc'
  }
};

export const getNetworkByChainId = (chainId: number): BlockchainNetwork | null => {
  return BLOCKCHAIN_NETWORKS[chainId] || null;
};

export const getMainnetNetworks = (): BlockchainNetwork[] => {
  return Object.values(BLOCKCHAIN_NETWORKS).filter(network => !network.testnet);
};

export const getTestnetNetworks = (): BlockchainNetwork[] => {
  return Object.values(BLOCKCHAIN_NETWORKS).filter(network => network.testnet);
};

export const getNetworksByCategory = (category: string): BlockchainNetwork[] => {
  return Object.values(BLOCKCHAIN_NETWORKS).filter(network => network.category === category);
};
