
import React from "react"
import { Search, Bell, Menu, User } from "lucide-react"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { MobileContainer, MobileBadge } from "@/components/ui/mobile-components"
import { cn } from "@/lib/utils"

interface MobileHeaderProps {
  onToggleSidebar: () => void
  notificationCount?: number
  className?: string
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onToggleSidebar,
  notificationCount = 0,
  className
}) => {
  return (
    <div className={cn(
      "lg:hidden sticky top-0 z-30 bg-black/20 backdrop-blur-xl border-b border-white/10",
      className
    )}>
      <div className="px-3 sm:px-4">
        <div className="flex items-center justify-between py-3 min-h-[64px]">
          {/* Menu burger */}
          <TouchTarget
            size="lg"
            variant="ghost"
            shape="circle"
            onClick={onToggleSidebar}
            className="animate-mobile-scale flex-shrink-0"
          >
            <Menu className="h-6 w-6 text-white" />
          </TouchTarget>

          {/* Logo central - optimisé pour petits écrans */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 justify-center">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-base">V</span>
            </div>
            <span className="text-white font-bold text-base sm:text-lg font-heading truncate">Veegox</span>
          </div>

          {/* Actions rapides - optimisé pour mobile */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Recherche - caché sur très petits écrans */}
            <TouchTarget
              size="lg"
              variant="ghost"
              shape="circle"
              className="relative hidden xs:flex"
            >
              <Search className="h-5 w-5 text-white" />
            </TouchTarget>

            {/* Notifications avec badge */}
            <TouchTarget
              size="lg"
              variant="ghost"
              shape="circle"
              className="relative"
            >
              <Bell className="h-5 w-5 text-white" />
              {notificationCount > 0 && (
                <MobileBadge
                  variant="error"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-4 h-4 text-xs flex items-center justify-center px-1"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </MobileBadge>
              )}
            </TouchTarget>

            {/* Avatar utilisateur */}
            <TouchTarget
              size="lg"
              variant="ghost"
              shape="circle"
              className="ml-1"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </TouchTarget>
          </div>
        </div>
      </div>
    </div>
  )
}
