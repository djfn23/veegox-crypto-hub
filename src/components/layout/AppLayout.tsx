
import { ReactNode, useState, useEffect } from "react";
// Je conserve les imports
import { SimplifiedNavigation } from "./SimplifiedNavigation";
import { MobileHeader } from "./MobileHeader";
import { MobileBottomNavigation } from "./MobileBottomNavigation";
import { UserMenu } from "./UserMenu";
import { PWAInstallPrompt } from "@/components/ui/pwa-install-prompt";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
// Supprimé l'import TooltipProvider ici

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  // Guard : hook only called client-side
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isMobile, isTablet } = isClient ? useResponsiveLayout() : { isMobile: false, isTablet: false };

  // Fallback d'erreur UI très simple si une erreur inattendue survient
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
        
        {/* Mobile Header */}
        <MobileHeader />
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Sidebar */}
          <div className="w-64 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700 min-h-screen">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
                <span className="text-lg font-bold text-white">{texts.app.name}</span>
                <Badge variant="secondary" className="text-xs">{texts.app.beta}</Badge>
              </div>
            </div>
            <div className="py-4">
              <SimplifiedNavigation />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Desktop Header */}
            <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
              <div className="flex items-center justify-end">
                <UserMenu />
              </div>
            </header>
            
            {/* Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile/Tablet Content */}
        <div className="lg:hidden">
          <main className={`${isMobile ? 'pb-20' : 'pb-4'} min-h-screen`}>
            <div className="px-4 py-4">
              {children}
            </div>
          </main>
          
          {/* Mobile Bottom Navigation */}
          {isMobile && <MobileBottomNavigation />}
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="text-white text-lg">
          Une erreur technique est survenue.<br />
          <span className="text-sm text-gray-300">Veuillez recharger la page ou contacter le support.</span>
        </div>
      </div>
    );
  }
}

