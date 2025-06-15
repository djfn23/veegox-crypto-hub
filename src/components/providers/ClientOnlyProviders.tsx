
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";
import { useIsHydrated } from "@/hooks/useIsHydrated";

export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  // Protection SSR complète
  if (typeof window === "undefined") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Chargement de l'application...
      </div>
    );
  }

  return <ClientProvidersInner>{children}</ClientProvidersInner>;
}

// Composant interne qui utilise les hooks uniquement côté client
function ClientProvidersInner({ children }: { children: React.ReactNode }) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Initialisation sécurisée...
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
