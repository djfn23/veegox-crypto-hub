
import React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

// SSR-safe: *never* run Zustand or hooks on server, or during pre-hydration
export function ThemeProvider({ children }: ThemeProviderProps) {
  // SSR guard part 1: never render hooks on server
  if (typeof window === "undefined") {
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  // SSR guard part 2: Make sure we only run after client hydration
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Define ThemeSyncClient inline so no hooks or Zustand are imported until we're sure it's client
  const ThemeSyncClient = React.useMemo(() => {
    if (!isClient) return () => null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useThemeSync } = require("@/hooks/useThemeSync");
    return function InnerThemeSyncClient() {
      useThemeSync();
      return null;
    }
  }, [isClient]);

  if (!isClient) {
    // Render minimal fallback during hydration only
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  // Safe: hooks only run after we're surely on client
  const ClientComponent = ThemeSyncClient;
  return (
    <>
      <ClientComponent />
      {children}
    </>
  );
}
