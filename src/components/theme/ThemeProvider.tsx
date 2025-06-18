
import * as React from "react";
import { useAppStore } from "@/store/useAppStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Lazy loading simplifié
const ThemeSync = React.lazy(() => 
  import("./ThemeSync").then(module => ({ default: module.ThemeSync }))
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Protection SSR - fallback sombre pendant le chargement
  if (typeof window === "undefined") {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "hsl(222 47% 11%)", 
        color: "hsl(210 40% 98%)"
      }}>
        {children}
      </div>
    );
  }

  return <ThemeProviderClient>{children}</ThemeProviderClient>;
}

function ThemeProviderClient({ children }: ThemeProviderProps) {
  const { isHydrated } = useAppStore();

  if (!isHydrated) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "hsl(222 47% 11%)", 
        color: "hsl(210 40% 98%)"
      }}>
        {children}
      </div>
    );
  }

  return (
    <>
      <React.Suspense fallback={null}>
        <ThemeSync />
      </React.Suspense>
      {children}
    </>
  );
}
