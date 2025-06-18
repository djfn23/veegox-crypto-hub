
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useIsHydrated } from "./useIsHydrated";

/**
 * Synchronise la classe de thème du document root avec la valeur dans le store Zustand.
 * Optimisé pour éviter les conflits de timing et les anciens thèmes.
 */
export function useThemeSync() {
  const isHydrated = useIsHydrated();
  
  // Accès direct au store une fois hydraté (pas d'import dynamique)
  const { theme: storeTheme } = useAppStore(
    (state) => ({ theme: state.theme }),
    // Ne pas s'abonner avant l'hydratation
    isHydrated ? undefined : () => true
  );

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    // Initialisation avec le thème du store si disponible, sinon 'dark'
    return isHydrated ? storeTheme : 'dark';
  });

  // Synchronise avec le store dès que possible
  useEffect(() => {
    if (!isHydrated) return;
    setTheme(storeTheme);
  }, [storeTheme, isHydrated]);

  // Applique le thème au DOM avec nettoyage des anciennes classes
  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    
    // Nettoyage complet des anciennes classes de thème
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme, isHydrated]);

  // Écoute le changement du système quand 'system' est sélectionné
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
