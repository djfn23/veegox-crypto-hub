
import React from "react"
import { ArrowRight } from "lucide-react"
import { MobileSection, MobileContainer, MobileHeading, MobileText } from "@/components/ui/mobile-components"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { texts } from "@/lib/constants/texts"

interface CTASectionProps {
  onSignupClick: () => void
}

export const CTASection: React.FC<CTASectionProps> = ({ onSignupClick }) => {
  return (
    <MobileSection size="lg">
      <MobileContainer size="default" centered>
        <div className="text-center">
          <MobileHeading 
            level={2}
            className="text-white mb-6 md:mb-8"
          >
            {texts.home.cta.title}
          </MobileHeading>
          <MobileText 
            variant="body"
            className="text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            {texts.home.cta.description}
          </MobileText>
          <TouchTarget
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 md:px-8 py-3 md:py-4 text-lg"
            onClick={onSignupClick}
          >
            {texts.home.cta.button}
            <ArrowRight className="ml-3 h-4 w-4 md:h-5 md:w-5" />
          </TouchTarget>
        </div>
      </MobileContainer>
    </MobileSection>
  )
}
