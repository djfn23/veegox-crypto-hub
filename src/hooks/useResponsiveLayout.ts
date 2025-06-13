
import { useState, useEffect } from 'react'

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type Orientation = 'portrait' | 'landscape'

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useResponsiveLayout = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const [orientation, setOrientation] = useState<Orientation>('portrait')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })
      setOrientation(width > height ? 'landscape' : 'portrait')
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize() // Call once to set initial values
      
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getCurrentBreakpoint = (): BreakpointKey => {
    const width = windowSize.width
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    return 'xs'
  }

  const getDeviceType = (): DeviceType => {
    const width = windowSize.width
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
  }

  const isBreakpoint = (breakpoint: BreakpointKey): boolean => {
    return windowSize.width >= breakpoints[breakpoint]
  }

  const isBetweenBreakpoints = (min: BreakpointKey, max: BreakpointKey): boolean => {
    return windowSize.width >= breakpoints[min] && windowSize.width < breakpoints[max]
  }

  const getColumns = (mobileColumns: number, tabletColumns: number, desktopColumns: number): number => {
    const deviceType = getDeviceType()
    switch (deviceType) {
      case 'mobile':
        return mobileColumns
      case 'tablet':
        return tabletColumns
      case 'desktop':
        return desktopColumns
      default:
        return mobileColumns
    }
  }

  const getSpacing = (mobileSpacing: string, tabletSpacing: string, desktopSpacing: string): string => {
    const deviceType = getDeviceType()
    switch (deviceType) {
      case 'mobile':
        return mobileSpacing
      case 'tablet':
        return tabletSpacing
      case 'desktop':
        return desktopSpacing
      default:
        return mobileSpacing
    }
  }

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
  }
}
