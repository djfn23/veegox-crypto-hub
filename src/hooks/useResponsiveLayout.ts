
import React, { useState, useEffect } from 'react';

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type Orientation = 'portrait' | 'landscape'

// Breakpoints alignés avec Tailwind CSS
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Valeurs par défaut sécurisées
const defaultWindowSize = { width: 1024, height: 768 };
const defaultOrientation: Orientation = 'landscape';

export const useResponsiveLayout = () => {
  // Guard anti SSR/absence de window
  const canUseDOM = typeof window !== 'undefined' && !!window.document && !!window.document.createElement;

  const [windowSize, setWindowSize] = useState(() =>
    canUseDOM
      ? { width: window.innerWidth, height: window.innerHeight }
      : defaultWindowSize
  );

  const [orientation, setOrientation] = useState<Orientation>(() =>
    canUseDOM
      ? window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      : defaultOrientation
  );

  useEffect(() => {
    if (!canUseDOM) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    // Debounce pour optimiser les performances
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [canUseDOM]);

  const getCurrentBreakpoint = (): BreakpointKey => {
    const width = windowSize.width;
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const getDeviceType = (): DeviceType => {
    const width = windowSize.width;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const isBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBetweenBreakpoints = (min: BreakpointKey, max: BreakpointKey): boolean => {
    return windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max];
  };

  const getColumns = (mobileColumns: number, tabletColumns: number, desktopColumns: number): number => {
    const deviceType = getDeviceType();
    switch (deviceType) {
      case 'mobile':
        return mobileColumns;
      case 'tablet':
        return tabletColumns;
      case 'desktop':
        return desktopColumns;
      default:
        return mobileColumns;
    }
  };

  const getSpacing = (mobileSpacing: string, tabletSpacing: string, desktopSpacing: string): string => {
    const deviceType = getDeviceType();
    switch (deviceType) {
      case 'mobile':
        return mobileSpacing;
      case 'tablet':
        return tabletSpacing;
      case 'desktop':
        return desktopSpacing;
      default:
        return mobileSpacing;
    }
  };

  // Mobile-first utilities améliorées
  const isSmallMobile = (): boolean => windowSize.width < 375;
  const isLargeMobile = (): boolean => windowSize.width >= 414 && windowSize.width < 768;
  const isSmallTablet = (): boolean => windowSize.width >= 768 && windowSize.width < 900;
  const isLandscapePhone = (): boolean => orientation === 'landscape' && windowSize.width < 900;
  
  // Nouvelles utilités pour le responsive
  const isExtraSmall = (): boolean => windowSize.width < 360;
  const isCompact = (): boolean => windowSize.height < 700;
  const canUseColumns = (minColumns: number): boolean => Math.floor(windowSize.width / 280) >= minColumns;
  
  // Utilitaire pour les espacements dynamiques
  const getDynamicSpacing = (base: number = 4): string => {
    const device = getDeviceType();
    const multiplier = device === 'mobile' ? 1 : device === 'tablet' ? 1.25 : 1.5;
    return `${base * multiplier}px`;
  };

  // Utilitaire pour les tailles de police dynamiques - fixed to include all valid sizes
  const getFontSize = (base: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'): string => {
    const sizes = {
      mobile: {
        xs: 'text-xs',
        sm: 'text-sm', 
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl'
      },
      tablet: {
        xs: 'text-sm',
        sm: 'text-base',
        base: 'text-lg', 
        lg: 'text-xl',
        xl: 'text-2xl',
        '2xl': 'text-3xl',
        '3xl': 'text-4xl'
      },
      desktop: {
        xs: 'text-sm',
        sm: 'text-base',
        base: 'text-lg',
        lg: 'text-xl', 
        xl: 'text-2xl',
        '2xl': 'text-3xl',
        '3xl': 'text-4xl'
      }
    };
    return sizes[getDeviceType()][base];
  };

  return {
    windowSize,
    orientation,
    currentBreakpoint: getCurrentBreakpoint(),
    deviceType: getDeviceType(),
    isMobile: getDeviceType() === 'mobile',
    isTablet: getDeviceType() === 'tablet',
    isDesktop: getDeviceType() === 'desktop',
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    isBreakpoint,
    isBetweenBreakpoints,
    getColumns,
    getSpacing,
    // Utilities existantes
    isSmallMobile,
    isLargeMobile,
    isSmallTablet,
    isLandscapePhone,
    // Nouvelles utilities
    isExtraSmall,
    isCompact,
    canUseColumns,
    getDynamicSpacing,
    getFontSize,
  };
};
