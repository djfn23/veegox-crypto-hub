
import React, { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Rendu précoce vide côté serveur (préviens les erreurs hydratation et hooks Zustand)
  if (!isClient || typeof window === "undefined") {
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return (
    <>
      <ThemeSyncClient />
      {children}
    </>
  );
}
