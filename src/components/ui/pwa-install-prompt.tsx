
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePWA } from "@/hooks/usePWA";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useThemeResponsive } from "@/hooks/useThemeResponsive";

export const PWAInstallPrompt = () => {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { isInstallable, isInstalled, installPWA } = usePWA();
  const { isMobile, isTablet, isLandscapePhone, getGlassEffect, isDark } = useThemeResponsive();
  
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

  const glassEffect = getGlassEffect();
  const gradientBg = isDark 
    ? 'bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20'
    : 'bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10';

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
      ${glassEffect} ${gradientBg} border-border shadow-2xl
    `}>
      <CardContent className={`p-4 ${isTablet ? 'p-5' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {isMobile ? (
              <Smartphone className="h-5 w-5 text-primary" />
            ) : (
              <Monitor className="h-5 w-5 text-primary" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-semibold text-foreground mb-1 font-heading
              ${isTablet ? 'text-base' : 'text-sm'}
            `}>
              Installer Veegox
            </h3>
            <p className={`
              text-muted-foreground mb-3
              ${isTablet ? 'text-sm' : 'text-xs'}
            `}>
              Ajoutez Veegox à votre écran d'accueil pour un accès rapide et une expérience optimisée.
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className={`
                  bg-primary hover:bg-primary/90 text-primary-foreground
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
                  text-muted-foreground hover:text-foreground hover:bg-muted
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
            className="flex-shrink-0 p-1 h-auto text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
