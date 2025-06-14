
import React, { useState, useEffect } from 'react'

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

  // TOUJOURS appeler useState - pas conditionnellement
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
      timeoutId = setTimeout(handleResize, 150);
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
    // Breakpoints améliorés pour une meilleure détection
    if (width < 768) return 'mobile'; // xs et sm
    if (width < 1024) return 'tablet'; // md
    return 'desktop'; // lg et plus
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

  // Nouvelles helpers pour transitions et responsive utilities
  const isSmallMobile = (): boolean => windowSize.width < 375;
  const isLargeMobile = (): boolean => windowSize.width >= 414 && windowSize.width < 768;
  const isSmallTablet = (): boolean => windowSize.width >= 768 && windowSize.width < 900;
  const isLandscapePhone = (): boolean => orientation === 'landscape' && windowSize.width < 900;

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
    // Nouvelles utilities
    isSmallMobile,
    isLargeMobile,
    isSmallTablet,
    isLandscapePhone,
  };
};
