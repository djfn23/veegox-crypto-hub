
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Fournit le thème en mode client-only et synchronise la classe du document root.
 * Aucun require, 100% SSR safe.
 */
function ThemeSyncClient() {
  useThemeSync();
  return null;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // On considère que ce provider sera désormais TOUJOURS monté côté client via ClientOnlyProviders
  return (
    <>
      <ThemeSyncClient />
      {children}
    </>
  );
}
