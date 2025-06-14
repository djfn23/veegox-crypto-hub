
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const PWAInstallPrompt = () => {
  const [isClient, setIsClient] = useState(false);
  
  // TOUJOURS appeler les hooks - pas conditionnellement
  const { isInstallable, isInstalled, installPWA } = usePWA();
  const { isMobile, isTablet, isLandscapePhone } = useResponsiveLayout();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <Card className={`
      fixed z-40
      ${isMobile 
        ? isLandscapePhone 
          ? 'bottom-2 left-2 right-2' 
          : 'bottom-24 left-4 right-4'
        : isTablet
          ? 'bottom-4 right-4 w-96'
          : 'bottom-4 right-4 w-80'
      }
      bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-lg 
      border-purple-500/50 shadow-2xl
    `}>
      <CardContent className={`p-4 ${isTablet ? 'p-5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-purple-400" />
            ) : (
              <Monitor className="h-5 w-5 text-purple-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold text-white mb-1
              ${isTablet ? 'text-base' : 'text-sm'}
            `}>
              Installer Veegox
            </h3>
            <p className={`
              text-gray-300 mb-3
              ${isTablet ? 'text-sm' : 'text-xs'}
            `}>
              Ajoutez Veegox à votre écran d'accueil pour un accès rapide et une expérience optimisée.
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className={`
                  bg-purple-600 hover:bg-purple-700
                  ${isTablet ? 'text-sm px-4 py-2' : 'text-xs'}
                `}
              >
                <Download className="h-3 w-3 mr-1" />
                Installer
              </Button>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className={`
                  text-gray-400 hover:text-white
                  ${isTablet ? 'text-sm' : 'text-xs'}
                `}
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
