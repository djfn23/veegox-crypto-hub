
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface TradingPair {
  id: string;
  base: string;
  quote: string;
  price: number;
  change24h: number;
  volume: number;
}

export interface TradingPosition {
  id: string;
  pair: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  leverage: number;
}

interface TradingState {
  // State
  selectedPair: TradingPair | null;
  positions: TradingPosition[];
  orderBook: {
    bids: Array<[number, number]>;
    asks: Array<[number, number]>;
  };
  tradingHistory: any[];
  isLoading: {
    pairs: boolean;
    positions: boolean;
    orders: boolean;
  };
  
  // Actions
  setSelectedPair: (pair: TradingPair) => void;
  addPosition: (position: TradingPosition) => void;
  updatePosition: (id: string, updates: Partial<TradingPosition>) => void;
  removePosition: (id: string) => void;
  setOrderBook: (orderBook: { bids: Array<[number, number]>; asks: Array<[number, number]> }) => void;
  setLoading: (key: keyof TradingState['isLoading'], loading: boolean) => void;
  clearTradingData: () => void;
}

export const useTradingStore = create<TradingState>()(
  persist(
    (set, get) => ({
      selectedPair: null,
      positions: [],
      orderBook: { bids: [], asks: [] },
      tradingHistory: [],
      isLoading: {
        pairs: false,
        positions: false,
        orders: false,
      },

      setSelectedPair: (pair) => set({ selectedPair: pair }),
      
      addPosition: (position) => 
        set((state) => ({ positions: [...state.positions, position] })),
      
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((pos) =>
            pos.id === id ? { ...pos, ...updates } : pos
          ),
        })),
      
      removePosition: (id) =>
        set((state) => ({
          positions: state.positions.filter((pos) => pos.id !== id),
        })),
      
      setOrderBook: (orderBook) => set({ orderBook }),
      
      setLoading: (key, loading) =>
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: loading },
        })),
      
      clearTradingData: () =>
        set({
          selectedPair: null,
          positions: [],
          orderBook: { bids: [], asks: [] },
          tradingHistory: [],
        }),
    }),
    {
      name: 'veegox-trading-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedPair: state.selectedPair,
        positions: state.positions,
      }),
    }
  )
);
