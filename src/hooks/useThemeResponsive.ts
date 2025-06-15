
import { useResponsiveLayout } from './useResponsiveLayout';
import { useAppStore } from '@/store/useAppStore';
import { themeTokens } from '@/components/ui/theme-tokens';
import { useIsHydrated } from './useIsHydrated';

export const useThemeResponsive = () => {
  const responsive = useResponsiveLayout();
  const isHydrated = useIsHydrated();
  
  // Always call useAppStore unconditionally to avoid hook order issues
  const { theme } = useAppStore();

  // Sécurisation d'accès à window pour SSR
  const isDarkMode = 
    isHydrated && typeof window !== "undefined" && 
    (
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

  const isLightMode =
    isHydrated && typeof window !== "undefined" && 
    (
      theme === 'light' ||
      (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  
  const getThemeValue = (lightValue: string, darkValue: string) => {
    if (!isHydrated || typeof window === "undefined") return lightValue;
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkValue : lightValue;
    }
    return theme === 'dark' ? darkValue : lightValue;
  };

  const getGlassEffect = () => {
    return getThemeValue(themeTokens.effects.glass.light, themeTokens.effects.glass.dark);
  };

  const getShadowEffect = () => {
    return getThemeValue(themeTokens.effects.shadow.light, themeTokens.effects.shadow.dark);
  };

  const getResponsiveSpacing = (size: keyof typeof themeTokens.spacing.container) => {
    return themeTokens.spacing.container[size];
  };

  const getResponsiveFont = (size: keyof typeof themeTokens.typography.responsive) => {
    return themeTokens.typography.responsive[size];
  };

  return {
    ...responsive,
    theme,
    getThemeValue,
    getGlassEffect,
    getShadowEffect,
    getResponsiveSpacing,
    getResponsiveFont,
    isDark: isDarkMode,
    isLight: isLightMode,
  };
};
