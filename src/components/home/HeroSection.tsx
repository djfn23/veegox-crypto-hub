
import React from "react"
import { ArrowRight } from "lucide-react"
import { MobileSection, MobileContainer, MobileHeading, MobileText } from "@/components/ui/mobile-components"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { StatsGrid } from "./StatsGrid"
import { texts } from "@/lib/constants/texts"

interface HeroSectionProps {
  onSignupClick: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSignupClick }) => {
  return (
    <MobileSection size="lg">
      <MobileContainer size="default" centered>
        <div className="text-center animate-mobile-fade-in">
          <MobileHeading 
            level={1}
            className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight"
          >
            {texts.home.hero.title}
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
              {texts.home.hero.subtitle}
            </span>
          </MobileHeading>
          
          <MobileText 
            variant="body" 
            className="text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {texts.home.hero.description}
          </MobileText>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <TouchTarget
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 md:px-8 py-3 md:py-4"
              onClick={onSignupClick}
            >
              {texts.home.hero.cta.primary}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </TouchTarget>
          </div>

          <StatsGrid />
        </div>
      </MobileContainer>
    </MobileSection>
  )
}
