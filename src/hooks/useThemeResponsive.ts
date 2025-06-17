
import { useResponsiveLayout } from './useResponsiveLayout';
import { useTheme } from './useTheme';

export const useThemeResponsive = () => {
  const { theme } = useTheme();
  const responsive = useResponsiveLayout();
  
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const getGlassEffect = () => {
    return isDark 
      ? 'backdrop-blur-md bg-slate-900/80 border-white/10 shadow-xl' 
      : 'backdrop-blur-md bg-white/80 border-white/20 shadow-lg';
  };

  const getResponsiveSpacing = (device: 'mobile' | 'tablet' | 'desktop') => {
    switch (device) {
      case 'mobile':
        return '1rem';
      case 'tablet':
        return '1.5rem';
      case 'desktop':
        return '2rem';
      default:
        return '1rem';
    }
  };

  const getAdaptiveBackground = () => {
    return isDark
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
      : 'bg-gradient-to-br from-white via-gray-50 to-white';
  };

  return {
    ...responsive,
    isDark,
    isLight,
    theme,
    getGlassEffect,
    getResponsiveSpacing,
    getAdaptiveBackground,
  };
};
