
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const PWAInstallPrompt = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, []);

  // Les hooks doivent être appelés seulement côté client
  const { isInstallable, isInstalled, installPWA } = isClient ? usePWA() : { isInstallable: false, isInstalled: false, installPWA: async () => false };
  const { isMobile } = isClient ? useResponsiveLayout() : { isMobile: false };
  const [isVisible, setIsVisible] = useState(true);

  if (!isClient || !isInstallable || isInstalled || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      setIsVisible(false);
    }
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-lg border-purple-500/50 z-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-purple-400" />
            ) : (
              <Monitor className="h-5 w-5 text-purple-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white mb-1">
              Installer Veegox
            </h3>
            <p className="text-xs text-gray-300 mb-3">
              Ajoutez Veegox à votre écran d'accueil pour un accès rapide et une expérience optimisée.
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Installer
              </Button>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white text-xs"
              >
                Plus tard
              </Button>
            </div>
          </div>
          
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 p-1 h-auto text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
