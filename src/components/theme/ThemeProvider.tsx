
import * as React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Lazy loading du composant ThemeSync
const ThemeSync = React.lazy(() => 
  import("./ThemeSync").then(module => ({ default: module.ThemeSync }))
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Protection SSR complète - ne jamais rendre quoi que ce soit sur le serveur
  if (typeof window === "undefined") {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "hsl(222 47% 11%)", 
        color: "hsl(210 40% 98%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontFamily: "system-ui, sans-serif"
      }}>
        {children}
      </div>
    );
  }

  return <ThemeProviderClient>{children}</ThemeProviderClient>;
}

// Composant client séparé pour éviter les problèmes d'hydratation
function ThemeProviderClient({ children }: ThemeProviderProps) {
  // Vérification de sécurité pour React
  if (!React || !React.useState || !React.useEffect || !React.Suspense) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "hsl(222 47% 11%)", 
        color: "hsl(210 40% 98%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontFamily: "system-ui, sans-serif"
      }}>
        {children}
      </div>
    );
  }

  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    // Délai pour s'assurer que React et Zustand sont complètement prêts
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 150); // Un peu plus de délai pour Zustand

    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
    // Fallback pendant l'hydratation - ne pas utiliser de hooks
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "hsl(222 47% 11%)", 
        color: "hsl(210 40% 98%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        fontFamily: "system-ui, sans-serif"
      }}>
        {children}
      </div>
    );
  }

  // Une fois hydraté, on peut charger le système de thème
  return (
    <>
      <React.Suspense fallback={null}>
        <ThemeSync />
      </React.Suspense>
      {children}
    </>
  );
}
