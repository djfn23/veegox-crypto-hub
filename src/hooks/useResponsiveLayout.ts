
import { useState, useEffect } from 'react';

interface ResponsiveBreakpoints {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  isLandscapePhone: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsiveLayout = (): ResponsiveBreakpoints & {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallMobile: boolean;
  getColumns: (mobile: number, tablet: number, desktop: number) => number;
  getDynamicSpacing: (device: 'mobile' | 'tablet' | 'desktop') => string;
  getFontSize: (size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl') => string;
} => {
  const [breakpoints, setBreakpoints] = useState<ResponsiveBreakpoints>({
    mobile: false,
    tablet: false,
    desktop: false,
    isLandscapePhone: false,
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      setBreakpoints({
        mobile: width < 640,
        tablet: width >= 640 && width < 1024, 
        desktop: width >= 1024,
        isLandscapePhone: width < 768 && isLandscape && height < 500,
        screenWidth: width,
        screenHeight: height,
      });
    };

    // Initial check
    updateBreakpoints();

    // Add event listener
    window.addEventListener('resize', updateBreakpoints);
    window.addEventListener('orientationchange', updateBreakpoints);

    return () => {
      window.removeEventListener('resize', updateBreakpoints);
      window.removeEventListener('orientationchange', updateBreakpoints);
    };
  }, []);

  const getColumns = (mobile: number, tablet: number, desktop: number): number => {
    if (breakpoints.desktop) return desktop;
    if (breakpoints.tablet) return tablet;
    return mobile;
  };

  const getDynamicSpacing = (device: 'mobile' | 'tablet' | 'desktop'): string => {
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

  const getFontSize = (size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'): string => {
    const fontSizeMap = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    };
    
    return fontSizeMap[size] || 'text-base';
  };

  const isSmallMobile = breakpoints.mobile && breakpoints.screenWidth < 375;

  return {
    ...breakpoints,
    isMobile: breakpoints.mobile,
    isTablet: breakpoints.tablet,
    isDesktop: breakpoints.desktop,
    isSmallMobile,
    getColumns,
    getDynamicSpacing,
    getFontSize,
  };
};
