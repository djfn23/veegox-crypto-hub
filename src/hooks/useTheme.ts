
import { useAppStore } from '@/store/useAppStore';

/**
 * Hook simplifié pour accéder au thème
 * Remplace l'ancien hook complexe
 */
export const useTheme = () => {
  const { theme, setTheme, isHydrated } = useAppStore();

  return { 
    theme, 
    setTheme, 
    isHydrated,
    isDark: theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'system' && typeof window !== 'undefined' && !window.matchMedia('(prefers-color-scheme: dark)').matches)
  };
};
