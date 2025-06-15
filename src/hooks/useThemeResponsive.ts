
import { useResponsiveLayout } from './useResponsiveLayout';
import { useAppStore } from '@/store/useAppStore';
import { themeTokens } from '@/components/ui/theme-tokens';

export const useThemeResponsive = () => {
  const { theme } = useAppStore();
  const responsive = useResponsiveLayout();
  
  const getThemeValue = (lightValue: string, darkValue: string) => {
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
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
};
