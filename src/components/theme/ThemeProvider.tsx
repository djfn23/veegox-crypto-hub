
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Ajout d'une détection client/serveur pour éviter les crashs d'accès à window/document côté SSR
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useAppStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isClient]);

  useEffect(() => {
    if (!isClient) return;
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
  }, [theme, isClient]);

  // Affiche un fallback minimal côté serveur pour éviter l'écran blanc
  if (!isClient) {
    return <div style={{ minHeight: '100vh', background: '#111' }} />;
  }

  return <>{children}</>;
}
