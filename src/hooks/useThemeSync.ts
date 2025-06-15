
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/**
 * Synchronise la classe de thème du document root avec la valeur dans le store Zustand.
 * Sécurisé contre l'utilisation SSR (ne fait rien côté serveur).
 */
export function useThemeSync() {
  const { theme } = useAppStore();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Écoute le changement du système quand 'system'
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);
}
