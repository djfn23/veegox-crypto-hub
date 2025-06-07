
import React from "react"
import { Coins, TrendingUp, Zap, Vote } from "lucide-react"
import { MobileSection, MobileContainer, MobileGrid, MobileCard, MobileHeading, MobileText } from "@/components/ui/mobile-components"
import { texts } from "@/lib/constants/texts"

const features = [
  {
    icon: Coins,
    title: texts.home.features.items.tokens.title,
    description: texts.home.features.items.tokens.description,
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    title: texts.home.features.items.credit.title,
    description: texts.home.features.items.credit.description,
    color: "bg-green-500",
  },
  {
    icon: Zap,
    title: texts.home.features.items.staking.title,
    description: texts.home.features.items.staking.description,
    color: "bg-purple-500",
  },
  {
    icon: Vote,
    title: texts.home.features.items.dao.title,
    description: texts.home.features.items.dao.description,
    color: "bg-orange-500",
  }
]

export const FeaturesSection: React.FC = () => {
  return (
    <MobileSection size="lg">
      <MobileContainer size="default" centered>
        <div className="text-center mb-8 md:mb-16">
          <MobileHeading 
            level={2}
            className="text-white mb-4 md:mb-6"
          >
            {texts.home.features.title}
          </MobileHeading>
        </div>

        <MobileGrid cols={1} gap="default" className="lg:grid-cols-2">
          {features.map((feature, index) => (
            <MobileCard 
              key={index} 
              variant="glass" 
              interactive
              className="mobile-interactive"
            >
              <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                <div className={`p-3 md:p-4 rounded-xl ${feature.color} flex-shrink-0`}>
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <MobileHeading level={3} className="text-white mb-2">
                    {feature.title}
                  </MobileHeading>
                  <MobileText className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </MobileText>
                </div>
              </div>
            </MobileCard>
          ))}
        </MobileGrid>
      </MobileContainer>
    </MobileSection>
  )
}
