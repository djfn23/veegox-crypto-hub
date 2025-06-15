
import { useEffect, useState } from 'react';

/**
 * Hook centralisé pour détecter si l'application est complètement hydratée côté client.
 * Garantit qu'aucun hook ou store Zustand ne s'exécute avant l'hydratation complète.
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Délai pour s'assurer que React est complètement prêt
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return isHydrated;
}
