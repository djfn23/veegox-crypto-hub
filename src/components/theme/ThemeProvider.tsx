
import React, { useEffect, useState } from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // On garde la logique de "ne montrer l'app que côté client"
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Synchronisation du thème côté client seulement
  useThemeSync();

  if (!isClient || typeof window === "undefined") {
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return <>{children}</>;
}
