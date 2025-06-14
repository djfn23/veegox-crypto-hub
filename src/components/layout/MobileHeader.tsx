
import { useState } from "react";
import { Menu, X, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserMenu } from "./UserMenu";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white touch-target-lg p-3 -ml-3">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-slate-900 border-slate-700 p-0">
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
                <div className="flex-1 py-4">
                  <SidebarNavigation />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
            <div>
              <span className="text-lg font-bold text-white">{texts.app.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="text-gray-400 hover:text-white touch-target p-3">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white touch-target p-3 relative">
            <Bell className="h-5 w-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
