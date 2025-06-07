
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { MobileCard } from "@/components/ui/mobile-components"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { MobileHeader } from "./MobileHeader"
import { SidebarNavigation } from "./SidebarNavigation"
import { SidebarFooter } from "./SidebarFooter"
import { X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { NotificationSystem } from '@/components/ui/notification-system';
import { GlobalSearch } from '@/components/ui/global-search';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useTheme } from '@/hooks/useTheme';
import { useAppStore } from '@/store/useAppStore';
import { texts } from "@/lib/constants/texts";

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
  
  useTheme(); // Initialize theme management
  const { notifications } = useAppStore();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        {/* Mobile sidebar backdrop - optimisé pour mobile */}
        {sidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-mobile-fade-in lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - amélioré pour mobile */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0",
          "w-[280px] sm:w-[300px] lg:w-72",
          sidebarOpen ? "translate-x-0 animate-mobile-slide-up" : "-translate-x-full lg:translate-x-0"
        )}>
          <MobileCard className="h-full border-r border-white/10 flex flex-col overflow-hidden">
            {/* Header de la sidebar - optimisé mobile */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white font-bold text-lg md:text-xl font-heading">V</span>
                </div>
                <div className="min-w-0">
                  <span className="text-white font-bold text-lg md:text-xl font-heading block truncate">{texts.app.name}</span>
                  <p className="text-gray-400 text-xs hidden sm:block">{texts.app.tagline}</p>
                </div>
              </div>
              <TouchTarget
                size="lg"
                variant="ghost"
                shape="circle"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden flex-shrink-0"
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </TouchTarget>
            </div>

            {/* Navigation - avec scroll optimisé */}
            <div className="flex-1 overflow-hidden">
              <div className="p-3 md:p-4 h-full overflow-y-auto">
                <SidebarNavigation />
              </div>
            </div>

            {/* Footer de la sidebar */}
            <SidebarFooter onItemClick={() => isMobile && setSidebarOpen(false)} />
          </MobileCard>
        </div>

        {/* Main content - amélioré pour mobile */}
        <div className="lg:pl-72">
          {/* Mobile header */}
          <MobileHeader 
            onToggleSidebar={() => setSidebarOpen(true)}
            notificationCount={notifications?.length || 0}
          />

          {/* Page content avec optimisation mobile */}
          <main className="min-h-[calc(100vh-64px)] lg:min-h-screen">
            <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 max-w-7xl mx-auto">
              <div className="animate-mobile-fade-in">
                {/* Breadcrumbs et recherche - masqués sur très petits écrans */}
                <div className="hidden sm:flex items-center justify-between mb-4 md:mb-6">
                  <Breadcrumbs />
                  <div className="hidden md:block">
                    <GlobalSearch />
                  </div>
                </div>
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <NotificationSystem />
    </>
  )
}

export { AppLayout }
