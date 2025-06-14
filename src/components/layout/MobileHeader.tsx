
import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserMenu } from "./UserMenu";
import { SidebarErrorBoundary } from "@/components/ui/error-boundary-sidebar";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isTablet, isSmallMobile, isLandscapePhone } = useResponsiveLayout();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <header className={`
      lg:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 
      sticky top-0 z-50 transition-all duration-300
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
                  text-white touch-target-lg transition-transform duration-200
                  ${isSmallMobile ? 'p-2 -ml-2' : 'p-3 -ml-3'}
                  hover:scale-105 hover:bg-slate-800
                `}
              >
                <Menu className={`${isSmallMobile ? 'h-5 w-5' : 'h-6 w-6'} transition-transform duration-200`} />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className={`
                bg-slate-900 border-slate-700 p-0 z-[60]
                ${isTablet ? 'w-96' : 'w-80'}
                transition-transform duration-300 ease-in-out
              `}
            >
              <SidebarErrorBoundary>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex-shrink-0"></div>
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
                  hover:scale-105 active:scale-95 hover:bg-slate-800
                `}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                className={`
                  text-gray-400 hover:text-white touch-target relative transition-all duration-200
                  ${isTablet ? 'p-4' : 'p-3'}
                  hover:scale-105 active:scale-95 hover:bg-slate-800
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
