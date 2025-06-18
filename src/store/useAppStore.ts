import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: 'USD' | 'EUR' | 'BTC' | 'ETH';
  language: 'fr' | 'en';
  notifications: {
    push: boolean;
    email: boolean;
    browser: boolean;
  };
  dashboard: {
    widgets: string[];
    layout: 'grid' | 'list';
  };
}

interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationData[];
  userPreferences: UserPreferences;
  
  // Loading states
  isLoading: {
    wallets: boolean;
    transactions: boolean;
    assets: boolean;
  };
  
  // Hydration state
  isHydrated: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<NotificationData, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (key: keyof AppState['isLoading'], loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  currency: 'USD',
  language: 'fr',
  notifications: {
    push: true,
    email: true,
    browser: true,
  },
  dashboard: {
    widgets: ['portfolio', 'transactions', 'market'],
    layout: 'grid',
  },
};

// Protection SSR simplifiée
const isClient = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const createSafeStorage = () => {
  if (!isClient) {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  
  try {
    return localStorage;
  } catch {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      theme: 'dark',
      notifications: [],
      userPreferences: defaultPreferences,
      isLoading: {
        wallets: false,
        transactions: false,
        assets: false,
      },
      isHydrated: false,

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setTheme: (theme) => {
        set({ theme });
        get().updateUserPreferences({ theme });
      },
      
      addNotification: (notification) => {
        const newNotification: NotificationData = {
          ...notification,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },
      
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      
      clearNotifications: () => set({ notifications: [] }),
      
      updateUserPreferences: (preferences) => {
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences },
        }));
      },
      
      setLoading: (key, loading) => {
        set((state) => ({
          isLoading: { ...state.isLoading, [key]: loading },
        }));
      },
      
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: 'veegox-app-store',
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({
        theme: state.theme,
        userPreferences: state.userPreferences,
        notifications: state.notifications.slice(0, 10),
      }),
      skipHydration: !isClient,
    }
  )
);

// Initialisation simplifiée côté client
if (isClient) {
  // Délai réduit pour une initialisation plus rapide
  setTimeout(() => {
    useAppStore.getState().setHydrated(true);
  }, 100);
}
