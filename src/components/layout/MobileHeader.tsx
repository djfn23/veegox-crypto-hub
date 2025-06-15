
import { useState } from "react";
import { Menu, Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserMenu } from "./UserMenu";
import { SidebarErrorBoundary } from "@/components/ui/error-boundary-sidebar";
import { texts } from "@/lib/constants/texts";
import {  } from "@/components/ui/badge";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isTablet, isSmallMobile, isLandscapePhone } = useResponsiveLayout();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <header className={`
      lg:hidden bg-slate-900/98 backdrop-blur-xl border-b border-slate-700/80 
      sticky top-0 z-50 transition-all duration-300 shadow-lg
      ${isLandscapePhone ? 'px-6 py-2' : 'px-4 py-3'}
      ${isTablet ? 'px-6 py-4' : ''}
    `}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className={`
                  text-white touch-target-lg transition-all duration-300 group
                  ${isSmallMobile ? 'p-2 -ml-2' : 'p-3 -ml-3'}
                  hover:scale-110 hover:bg-slate-800/80 active:scale-95 active:bg-slate-700
                `}
              >
                <Menu className={`${isSmallMobile ? 'h-5 w-5' : 'h-6 w-6'} transition-transform duration-300 group-hover:rotate-90`} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className={`
                bg-slate-900/98 border-slate-700/80 p-0 z-[60] backdrop-blur-xl
                ${isTablet ? 'w-96' : 'w-80'}
                transition-all duration-300 ease-out
              `}
            >
              <SidebarErrorBoundary>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-700/80 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex-shrink-0 shadow-lg"></div>
                      <div>
                        <span className="text-xl font-bold text-white block">{texts.app.name}</span>
                        <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mt-1 border border-blue-500/30">
                          {texts.app.beta}
                        </div>
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
              bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg
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

        <div className="flex items-center space-x-1">
          {!isSmallMobile && (
            <>
              <Button 
                variant="ghost" 
                className={`
                  text-gray-400 hover:text-white touch-target transition-all duration-300 group
                  ${isTablet ? 'p-4' : 'p-3'}
                  hover:scale-110 active:scale-95 hover:bg-slate-800/50
                `}
              >
                <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
              <Button 
                variant="ghost" 
                className={`
                  text-gray-400 hover:text-white touch-target relative transition-all duration-300 group
                  ${isTablet ? 'p-4' : 'p-3'}
                  hover:scale-110 active:scale-95 hover:bg-slate-800/50
                `}
              >
                <Bell className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg border border-red-400"></div>
              </Button>
            </>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
