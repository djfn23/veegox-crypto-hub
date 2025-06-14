
import { ReactNode, useState, useEffect } from "react";
import { SimplifiedNavigation } from "./SimplifiedNavigation";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNavigation } from "./MobileBottomNavigation";
import { UserMenu } from "./UserMenu";
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt";
import { SidebarErrorBoundary } from "@/components/ui/error-boundary-sidebar";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isClient, setIsClient] = useState(false);
  const { isMobile, isTablet, isDesktop, isLandscapePhone } = useResponsiveLayout();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="text-white text-lg animate-pulse">
          Chargement de l'interface Veegox...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      <PWAInstallPrompt />

      {!isDesktop && <MobileHeader />}

      {isDesktop && (
        <div className="flex min-h-screen">
          <SidebarErrorBoundary>
            <div className="w-64 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700 min-h-screen flex-shrink-0">
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0"></div>
                  <span className="text-lg font-bold text-white">{texts.app.name}</span>
                  <Badge variant="secondary" className="text-xs">{texts.app.beta}</Badge>
                </div>
              </div>
              <div className="py-4">
                <SimplifiedNavigation />
              </div>
            </div>
          </SidebarErrorBoundary>

          <div className="flex-1 flex flex-col min-w-0">
            <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4 flex-shrink-0">
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
            <div className={`px-4 py-4 ${isTablet ? 'px-6 py-6 max-w-6xl mx-auto' : ''}`}>
              {children}
            </div>
          </main>
          {isMobile && <MobileBottomNavigation />}
        </div>
      )}
    </div>
  );
}
