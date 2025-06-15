
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";
import { useIsHydrated } from "@/hooks/useIsHydrated";

export const ThemeSync = React.memo(() => {
  const isHydrated = useIsHydrated();
  
  // Ne synchronise le thème qu'après hydratation complète
  useThemeSync();
  
  // Ne rend rien - composant invisible de synchronisation
  return null;
});

ThemeSync.displayName = "ThemeSync";
