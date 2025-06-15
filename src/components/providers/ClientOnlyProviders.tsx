
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";

// ClientOnlyProviders : strictement côté client via window
export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") {
    // Fallback loading SSR
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
