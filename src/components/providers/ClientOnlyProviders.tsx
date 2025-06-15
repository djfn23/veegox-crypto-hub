
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";

// Ce composant N'EST MONTE que côté client et encapsule tous les providers 
// qui dépendent de hooks React, Zustand, localStorage, etc.
export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || typeof window === "undefined") {
    // Fallback loading pour éviter tout appel de hook côté serveur
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

  // Important : TOUS les providers dépendant du client doivent être imbriqués ici
  return (
    <ThemeProvider>
      <UnifiedAuthProvider>
        {children}
      </UnifiedAuthProvider>
    </ThemeProvider>
  );
}
