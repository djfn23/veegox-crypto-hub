import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";
import { useIsHydrated } from "@/hooks/useIsHydrated";

export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  // Protection SSR complète : RENDU SANS AUCUN HOOK ni STORE
  if (typeof window === "undefined") {
    // Absolutely NO hooks or context called here
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

  // Now we're on the client, safe to call hooks in inner component
  return <ClientProvidersInner>{children}</ClientProvidersInner>;
}

// Composant interne qui utilise les hooks uniquement côté client
function ClientProvidersInner({ children }: { children: React.ReactNode }) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    // No hooks run here except useIsHydrated (safe on client)
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
