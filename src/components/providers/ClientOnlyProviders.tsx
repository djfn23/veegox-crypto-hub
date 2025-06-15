
import React from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { UnifiedAuthProvider } from "@/components/auth/UnifiedAuthProvider";

export function ClientOnlyProviders({ children }: { children: React.ReactNode }) {
  // Complete SSR protection - never render anything on server
  if (typeof window === "undefined") {
    return null;
  }

  // Now we're guaranteed to be on client, safe to use hooks in inner component
  return <ClientProvidersInner>{children}</ClientProvidersInner>;
}

// Inner component that only runs on client side
function ClientProvidersInner({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

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
