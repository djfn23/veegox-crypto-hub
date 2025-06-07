
import React from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MobileContainer } from "@/components/ui/mobile-components"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { texts } from "@/lib/constants/texts"

interface NavigationBarProps {
  onLoginClick: () => void
  onSignupClick: () => void
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onLoginClick,
  onSignupClick
}) => {
  return (
    <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-40">
      <MobileContainer size="default" centered>
        <div className="flex justify-between items-center py-3 md:py-4 min-h-[64px]">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0"></div>
            <span className="text-lg md:text-xl font-bold text-white truncate">{texts.app.name}</span>
            <Badge variant="secondary" className="ml-1 md:ml-2 text-xs px-2 py-0.5">{texts.app.beta}</Badge>
          </div>
          <div className="flex space-x-2 md:space-x-3 flex-shrink-0">
            <TouchTarget
              size="lg"
              variant="ghost"
              onClick={onLoginClick}
              className="text-white hover:bg-white/10 px-3 md:px-4"
            >
              {texts.auth.modal.messages.connectionButtons.login}
            </TouchTarget>
            <TouchTarget
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-3 md:px-4"
              onClick={onSignupClick}
            >
              {texts.auth.modal.messages.connectionButtons.start}
              <ArrowRight className="ml-2 h-4 w-4" />
            </TouchTarget>
          </div>
        </div>
      </MobileContainer>
    </nav>
  )
}
