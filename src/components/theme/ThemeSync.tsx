
import React from "react";
import { useThemeSync } from "@/hooks/useThemeSync";

export const ThemeSync = React.memo(() => {
  // Synchronisation simple du thème
  useThemeSync();
  
  // Composant invisible
  return null;
});

ThemeSync.displayName = "ThemeSync";
