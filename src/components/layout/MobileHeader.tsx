
import { useState, useEffect, useRef } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserMenu } from "./UserMenu";
import { SidebarErrorBoundary } from "@/components/ui/error-boundary-sidebar";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useSidebar } from "@/hooks/useSidebar";

export const MobileHeader = () => {
  const { isOpen, isAnimating, toggle, close } = useSidebar();
  const { isTablet, isSmallMobile, isLandscapePhone } = useResponsiveLayout();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Gesture handling for swipe to open/close
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX.current;
      const deltaY = Math.abs(touchEndY - touchStartY.current);

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
        // Swipe right from left edge to open
        if (deltaX > 0 && touchStartX.current < 50 && !isOpen) {
          toggle();
        }
        // Swipe left when menu is open to close
        else if (deltaX < 0 && isOpen) {
          close();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, toggle, close]);

  return (
    <header className={`
      lg:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 
      sticky top-0 z-50 transition-all duration-300
      ${isLandscapePhone ? 'px-6 py-2' : 'px-4 py-3'}
      ${isTablet ? 'px-6 py-4' : ''}
      ${isAnimating ? 'pointer-events-none' : ''}
    `}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className={`
                  text-white touch-target-lg transition-transform duration-200
                  ${isSmallMobile ? 'p-2 -ml-2' : 'p-3 -ml-3'}
                  ${isAnimating ? 'scale-95' : 'hover:scale-105'}
                `}
                disabled={isAnimating}
              >
                <Menu className={`${isSmallMobile ? 'h-5 w-5' : 'h-6 w-6'} transition-transform duration-200`} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className={`
                bg-slate-900 border-slate-700 p-0 z-60
                ${isTablet ? 'w-96' : 'w-80'}
                transition-transform duration-300 ease-in-out
              `}
            >
              <SidebarErrorBoundary fallback={
                <div className="p-6 text-center text-white">
                  <p>Erreur de chargement du menu</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4"
                    variant="outline"
                  >
                    Recharger
                  </Button>
                </div>
              }>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex-shrink-0 animate-pulse"></div>
                      <div>
                        <span className="text-xl font-bold text-white block">{texts.app.name}</span>
                        <Badge variant="secondary" className="text-xs mt-1">{texts.app.beta}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 py-4 overflow-y-auto">
                    <SidebarNavigation />
                  </div>
                </div>
              </SidebarErrorBoundary>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-3">
            <div className={`
              bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg
              ${isSmallMobile ? 'w-7 h-7' : 'w-8 h-8'}
            `}></div>
            <div>
              <span className={`
                font-bold text-white
                ${isSmallMobile ? 'text-base' : 'text-lg'}
                ${isTablet ? 'text-xl' : ''}
              `}>
                {texts.app.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isSmallMobile && (
            <>
              <Button 
                variant="ghost" 
                className={`
                  text-gray-400 hover:text-white touch-target transition-all duration-200
                  ${isTablet ? 'p-4' : 'p-3'}
                  hover:scale-105 active:scale-95
                `}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                className={`
                  text-gray-400 hover:text-white touch-target relative transition-all duration-200
                  ${isTablet ? 'p-4' : 'p-3'}
                  hover:scale-105 active:scale-95
                `}
              >
                <Bell className="h-5 w-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
            </>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
