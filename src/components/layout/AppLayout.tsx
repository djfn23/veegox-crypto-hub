
import { ReactNode } from "react";
import { SidebarNavigation } from "./SidebarNavigation";
import { MobileHeader } from "./MobileHeader";
import { UserMenu } from "./UserMenu";
import { texts } from "@/lib/constants/texts";
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
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
            <SidebarNavigation />
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

      {/* Mobile Content */}
      <div className="lg:hidden">
        <main className="pb-4">
          {children}
        </main>
      </div>
    </div>
  );
};
