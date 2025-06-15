
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeSyncClient() {
  useThemeSync();
  return null;
}

// SSR-safe: ne pas exécuter de hooks côté serveur
export function ThemeProvider({ children }: ThemeProviderProps) {
  if (typeof window === "undefined") {
    // SSR: rendu minimal
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  return (
    <>
      <ThemeSyncClient />
      {children}
    </>
  );
}
