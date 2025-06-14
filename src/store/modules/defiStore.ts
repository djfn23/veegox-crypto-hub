
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface YieldFarmPool {
  id: string;
  name: string;
  tokens: string[];
  apy: number;
  tvl: number;
  userStaked: number;
  rewards: number;
  protocol: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface LiquidityPosition {
  id: string;
  poolId: string;
  tokens: string[];
  liquidity: number;
  fees24h: number;
  impermanentLoss: number;
}

interface DeFiState {
  // Yield Farming
  yieldPools: YieldFarmPool[];
  userPositions: LiquidityPosition[];
  totalYieldEarned: number;
  
  // Multi-chain
  supportedChains: {
    id: number;
    name: string;
    symbol: string;
    rpcUrl: string;
    blockExplorer: string;
    isActive: boolean;
  }[];
  currentChain: number;
  
  // Portfolio Analytics
  portfolioMetrics: {
    totalValue: number;
    dailyChange: number;
    weeklyChange: number;
    monthlyChange: number;
    allocation: Record<string, number>;
    riskScore: number;
  };
  
  // Loading states
  isLoading: {
    pools: boolean;
    positions: boolean;
    analytics: boolean;
  };
  
  // Actions
  setYieldPools: (pools: YieldFarmPool[]) => void;
  addPosition: (position: LiquidityPosition) => void;
  removePosition: (id: string) => void;
  setCurrentChain: (chainId: number) => void;
  updatePortfolioMetrics: (metrics: Partial<DeFiState['portfolioMetrics']>) => void;
  setLoading: (key: keyof DeFiState['isLoading'], loading: boolean) => void;
}

export const useDeFiStore = create<DeFiState>()(
  persist(
    (set, get) => ({
      yieldPools: [],
      userPositions: [],
      totalYieldEarned: 0,
      supportedChains: [
        { id: 1, name: 'Ethereum', symbol: 'ETH', rpcUrl: '', blockExplorer: 'https://etherscan.io', isActive: true },
        { id: 137, name: 'Polygon', symbol: 'MATIC', rpcUrl: '', blockExplorer: 'https://polygonscan.com', isActive: true },
        { id: 56, name: 'BSC', symbol: 'BNB', rpcUrl: '', blockExplorer: 'https://bscscan.com', isActive: true },
        { id: 42161, name: 'Arbitrum', symbol: 'ARB', rpcUrl: '', blockExplorer: 'https://arbiscan.io', isActive: true },
      ],
      currentChain: 1,
      portfolioMetrics: {
        totalValue: 0,
        dailyChange: 0,
        weeklyChange: 0,
        monthlyChange: 0,
        allocation: {},
        riskScore: 0,
      },
      isLoading: {
        pools: false,
        positions: false,
        analytics: false,
      },

      setYieldPools: (pools) => set({ yieldPools: pools }),
      
      addPosition: (position) =>
        set((state) => ({ userPositions: [...state.userPositions, position] })),
      
      removePosition: (id) =>
        set((state) => ({
          userPositions: state.userPositions.filter((pos) => pos.id !== id),
        })),
      
      setCurrentChain: (chainId) => set({ currentChain: chainId }),
      
      updatePortfolioMetrics: (metrics) =>
        set((state) => ({
          portfolioMetrics: { ...state.portfolioMetrics, ...metrics },
        })),
      
      setLoading: (key, loading) =>
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: loading },
        })),
    }),
    {
      name: 'veegox-defi-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userPositions: state.userPositions,
        currentChain: state.currentChain,
        totalYieldEarned: state.totalYieldEarned,
      }),
    }
  )
);
