
import * as React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";

export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
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
        Chargement de l'application...
      </div>
    );
  }

  // Maintenant nous sommes garantis d'être côté client
  return <ClientProvidersInner>{children}</ClientProvidersInner>;
}

// Composant interne qui s'exécute uniquement côté client
function ClientProvidersInner({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    // Délai pour s'assurer que React est complètement prêt
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated) {
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
        Initialisation...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <UnifiedAuthProvider>
        {children}
      </UnifiedAuthProvider>
    </ThemeProvider>
  );
}
