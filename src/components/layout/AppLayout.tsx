
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
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 mobile-overlay lg:hidden animate-mobile-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-72",
          sidebarOpen ? "translate-x-0 animate-mobile-slide-up" : "-translate-x-full lg:translate-x-0"
        )}>
          <MobileCard className="h-full mobile-card border-r border-white/10 flex flex-col">
            {/* Header de la sidebar */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl font-heading">V</span>
                </div>
                <div>
                  <span className="text-white font-bold text-xl font-heading">Veegox</span>
                  <p className="text-gray-400 text-xs">Crypto Hub</p>
                </div>
              </div>
              <TouchTarget
                size="lg"
                variant="ghost"
                shape="circle"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-6 w-6 text-white" />
              </TouchTarget>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-hidden">
              <div className="p-4">
                <SidebarNavigation 
                  onItemClick={() => isMobile && setSidebarOpen(false)}
                  isMobile={isMobile}
                />
              </div>
            </div>

            {/* Footer de la sidebar */}
            <SidebarFooter onItemClick={() => isMobile && setSidebarOpen(false)} />
          </MobileCard>
        </div>

        {/* Main content */}
        <div className="lg:pl-72">
          {/* Mobile header */}
          <MobileHeader 
            onToggleSidebar={() => setSidebarOpen(true)}
            notificationCount={notifications?.length || 0}
          />

          {/* Page content avec optimisation mobile */}
          <main className="mobile-container mobile-section min-h-screen">
            <div className="max-w-7xl mx-auto animate-mobile-fade-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Breadcrumbs />
                  <GlobalSearch />
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
