
import React, { Suspense } from "react";
import { useIsHydrated } from "@/hooks/useIsHydrated";

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Lazy loading du composant ThemeSync
const ThemeSync = React.lazy(() => 
  import("./ThemeSync").then(module => ({ default: module.ThemeSync }))
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Protection SSR : ne jamais rendre sur le serveur
  if (typeof window === "undefined") {
    return (
      <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
        {children}
      </div>
    );
  }

  return <ThemeProviderClient>{children}</ThemeProviderClient>;
}

// Composant client séparé pour éviter les problèmes d'hydratation
function ThemeProviderClient({ children }: ThemeProviderProps) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    // Fallback pendant l'hydratation
    return (
      <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
        {children}
      </div>
    );
  }

  // Une fois hydraté, on peut charger le système de thème
  return (
    <>
      <Suspense fallback={null}>
        <ThemeSync />
      </Suspense>
      {children}
    </>
  );
}
