
import React, { useEffect, useState } from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Fournit le thème en mode client-only et synchronise la classe du document root.
 * Aucun require, 100% SSR safe.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Synchronise le thème sur le DOM seulement côté client
  useThemeSync();

  // Rendu précoce vide côté serveur (préviens les erreurs hydratation et hooks)
  if (!isClient || typeof window === "undefined") {
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return <>{children}</>;
}
