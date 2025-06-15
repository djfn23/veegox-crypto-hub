
import { useEffect, useState } from "react";
import { useIsHydrated } from "./useIsHydrated";

/**
 * Synchronise la classe de thème du document root avec la valeur dans le store Zustand.
 * Complètement sécurisé contre l'utilisation SSR et les problèmes d'hydratation.
 */
export function useThemeSync() {
  const isHydrated = useIsHydrated();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');

  // Ne charge le store qu'après l'hydratation complète
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    // Import dynamique du store après hydratation
    import("@/store/useAppStore").then(({ useAppStore }) => {
      const { theme: storeTheme } = useAppStore.getState();
      setTheme(storeTheme);

      // Subscribe aux changements du store
      const unsubscribe = useAppStore.subscribe(
        (state) => state.theme,
        (newTheme) => setTheme(newTheme)
      );

      return unsubscribe;
    });
  }, [isHydrated]);

  // Applique le thème au DOM
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isHydrated]);

  // Écoute le changement du système quand 'system'
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined" || theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mediaQuery.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, isHydrated]);
}
