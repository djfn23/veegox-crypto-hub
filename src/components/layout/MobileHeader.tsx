
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
      "lg:hidden sticky top-0 z-30 mobile-glass border-b border-white/10 backdrop-blur-xl",
      className
    )}>
      <MobileContainer>
        <div className="flex items-center justify-between py-3">
          {/* Menu burger */}
          <TouchTarget
            size="lg"
            variant="ghost"
            shape="circle"
            onClick={onToggleSidebar}
            className="animate-mobile-scale"
          >
            <Menu className="h-6 w-6 text-white" />
          </TouchTarget>

          {/* Logo central */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-white font-bold text-lg font-heading">Veegox</span>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center space-x-2">
            {/* Recherche */}
            <TouchTarget
              size="lg"
              variant="ghost"
              shape="circle"
              className="relative"
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
                  className="absolute -top-1 -right-1 min-w-5 h-5 text-xs flex items-center justify-center"
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </TouchTarget>
          </div>
        </div>
      </MobileContainer>
    </div>
  )
}
