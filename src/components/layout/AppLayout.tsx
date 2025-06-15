
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
  // Complete SSR protection - never call hooks on server
  if (typeof window === "undefined") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        Chargement de l'application...
      </div>
    );
  }

  return <AppLayoutClient>{children}</AppLayoutClient>;
}

// Client-only component that can safely use hooks
function AppLayoutClient({ children }: AppLayoutProps) {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    isLandscapePhone,
    getGlassEffect,
    getResponsiveSpacing,
    isDark
  } = useThemeResponsive();

  const glassEffect = getGlassEffect();
  const backgroundGradient = isDark 
    ? "bg-gradient-to-br from-background via-muted/50 to-background"
    : "bg-gradient-to-br from-background via-muted/30 to-background";

  return (
    <div className={`min-h-screen ${backgroundGradient}`}>
      <PWAInstallPrompt />

      {!isDesktop && <MobileHeader />}

      {isDesktop && (
        <div className="flex min-h-screen">
          <SidebarErrorBoundary>
            <div className={`w-64 ${glassEffect} border-r border-border min-h-screen flex-shrink-0`}>
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex-shrink-0"></div>
                  <span className="text-lg font-bold text-foreground font-heading">{texts.app.name}</span>
                  <Badge variant="secondary" className="text-xs">{texts.app.beta}</Badge>
                </div>
              </div>
              <div className="py-4">
                <SimplifiedNavigation />
              </div>
            </div>
          </SidebarErrorBoundary>

          <div className="flex-1 flex flex-col min-w-0">
            <header className={`${glassEffect} border-b border-border px-6 py-4 flex-shrink-0`}>
              <div className="flex items-center justify-end">
                <UserMenu />
              </div>
            </header>
            
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      )}

      {!isDesktop && (
        <div className="flex flex-col min-h-screen">
          <main className={`flex-1 ${isMobile ? 'pb-20' : 'pb-4'} ${isLandscapePhone ? 'pb-16' : ''}`}>
            <div 
              className={`py-4 ${isTablet ? 'px-6 py-6 max-w-6xl mx-auto' : ''}`}
              style={{ paddingLeft: getResponsiveSpacing(isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop') }}
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
