
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeSyncClient() {
  useThemeSync();
  return null;
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

  if (!isClient) {
    // Render minimal fallback during hydration only
    return <div style={{ minHeight: "100vh", background: "#111" }} />;
  }

  // Safe: hooks only run after we're surely on client
  return (
    <>
      <ThemeSyncClient />
      {children}
    </>
  );
}
