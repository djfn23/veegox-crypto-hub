
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/**
 * Hook simplifié pour synchroniser le thème avec le DOM
 * Élimine tous les conflits de timing et problèmes d'hydratation
 */
export function useThemeSync() {
  const { theme, isHydrated } = useAppStore();

  // Applique le thème au DOM une fois hydraté
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    
    // Nettoyage complet des anciennes classes
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isHydrated]);

  // Écoute les changements du système pour le thème 'system'
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
