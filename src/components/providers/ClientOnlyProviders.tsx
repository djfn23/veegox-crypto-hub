
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";

// This component ensures *no hooks* are run on the server.
export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  // Prevent *all* hooks when rendering on the server.
  if (typeof window === "undefined") {
    // SSR fallback: no hooks, minimal UI only.
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Chargement de l’application...
      </div>
    );
  }

  // Safe to run hooks on the client.
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Still on initial client-side hydration: show loading
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Chargement de l’application...
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
