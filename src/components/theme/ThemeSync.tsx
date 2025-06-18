
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

export const ThemeSync = React.memo(() => {
  // Synchronise le thème - toute la logique est dans useThemeSync
  useThemeSync();
  
  // Ne rend rien - composant invisible de synchronisation
  return null;
});

ThemeSync.displayName = "ThemeSync";
