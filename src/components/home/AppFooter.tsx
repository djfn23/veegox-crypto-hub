
import React from "react"
import { MobileContainer, MobileText } from "@/components/ui/mobile-components"
import { texts } from "@/lib/constants/texts"

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-6 md:py-8">
      <MobileContainer size="default" centered>
        <div className="text-center">
          <MobileText variant="caption" className="text-gray-400">
            {texts.home.footer}
          </MobileText>
        </div>
      </MobileContainer>
    </footer>
  )
}
