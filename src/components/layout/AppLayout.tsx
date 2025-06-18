
import React, { ReactNode } from "react";
import { SimplifiedNavigation } from "./SimplifiedNavigation";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNavigation } from "./MobileBottomNavigation";
import { UserMenu } from "./UserMenu";
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt";
import { SidebarErrorBoundary } from "@/components/ui/error-boundary-sidebar";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";
import { useThemeResponsive } from "@/hooks/useThemeResponsive";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  // Protection SSR complète - ne jamais appeler de hooks sur le serveur
  if (typeof window === "undefined") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "hsl(222 47% 11%)",
        color: "hsl(210 40% 98%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        Chargement...
      </div>
    );
  }

  return <AppLayoutClient>{children}</AppLayoutClient>;
}

// Composant client qui peut utiliser les hooks en sécurité
function AppLayoutClient({ children }: AppLayoutProps) {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    isLandscapePhone,
    getGlassEffect,
    isDark
  } = useThemeResponsive();

  const glassEffect = getGlassEffect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <PWAInstallPrompt />

      {!isDesktop && <MobileHeader />}

      {isDesktop && (
        <div className="flex min-h-screen">
          <SidebarErrorBoundary>
            <div className={`w-64 ${glassEffect} border-r border-border/50 min-h-screen flex-shrink-0 shadow-lg`}>
              <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex-shrink-0 shadow-lg"></div>
                  <div>
                    <span className="text-lg font-bold text-foreground font-heading">{texts.app.name}</span>
                    <Badge variant="secondary" className="text-xs mt-1 bg-primary/20 text-primary border-primary/30">
                      {texts.app.beta}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="py-6">
                <SimplifiedNavigation />
              </div>
            </div>
          </SidebarErrorBoundary>

          <div className="flex-1 flex flex-col min-w-0">
            <header className={`${glassEffect} border-b border-border/50 px-6 py-4 flex-shrink-0 shadow-sm`}>
              <div className="flex items-center justify-end">
                <UserMenu />
              </div>
            </header>
            
            <main className="flex-1 overflow-auto bg-gradient-to-b from-background/50 to-background">
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="flex flex-col min-h-screen">
          <main className={`flex-1 ${isMobile ? 'pb-20' : 'pb-4'} ${isLandscapePhone ? 'pb-16' : ''} safe-bottom`}>
            <div 
              className={`py-6 ${isTablet ? 'px-8 py-8 max-w-6xl mx-auto' : 'px-4'}`}
            >
              {children}
            </div>
          </main>
          {isMobile && <MobileBottomNavigation />}
        </div>
      )}
    </div>
  );
}
