
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNavigation } from "./SidebarNavigation";
import { UserMenu } from "./UserMenu";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden bg-slate-900 border-b border-slate-700 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-slate-900 border-slate-700 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0"></div>
                    <span className="text-lg font-bold text-white">{texts.app.name}</span>
                    <Badge variant="secondary" className="text-xs">{texts.app.beta}</Badge>
                  </div>
                </div>
                <div className="flex-1 py-4">
                  <SidebarNavigation />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
            <span className="text-lg font-bold text-white">{texts.app.name}</span>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};
