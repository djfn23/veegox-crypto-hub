
import React, { useEffect, useState } from 'react';

// Separate import to avoid SSR Zustand hook errors
let ThemeUpdater: React.FC<{ children: React.ReactNode }> | null = null;

if (typeof window !== "undefined") {
  // Only define ThemeUpdater on the client
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useAppStore } = require('@/store/useAppStore');
  ThemeUpdater = function ThemeUpdaterFn({ children }: { children: React.ReactNode }) {
    const { theme } = useAppStore();

    useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }, [theme]);

    useEffect(() => {
      if (theme === 'system') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
          const root = window.document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(mediaQuery.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }, [theme]);

    return <>{children}</>;
  };
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || typeof window === "undefined" || !ThemeUpdater) {
    return <div style={{ minHeight: '100vh', background: '#111' }} />;
  }

  const RenderThemeUpdater = ThemeUpdater;
  return <RenderThemeUpdater>{children}</RenderThemeUpdater>;
}
