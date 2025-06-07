
import React from "react"
import { MobileGrid, MobileCard } from "@/components/ui/mobile-components"
import { texts } from "@/lib/constants/texts"

const stats = [
  { 
    label: texts.home.stats.web3Market.label, 
    value: texts.home.stats.web3Market.value, 
    growth: texts.home.stats.web3Market.growth, 
    icon: "DollarSign" 
  },
  { 
    label: texts.home.stats.defiMarket.label, 
    value: texts.home.stats.defiMarket.value, 
    growth: texts.home.stats.defiMarket.growth, 
    icon: "Wallet" 
  },
  { 
    label: texts.home.stats.tvl.label, 
    value: texts.home.stats.tvl.value, 
    growth: texts.home.stats.tvl.growth, 
    icon: "TrendingUp" 
  },
  { 
    label: texts.home.stats.users.label, 
    value: texts.home.stats.users.value, 
    growth: texts.home.stats.users.growth, 
    icon: "Users" 
  }
]

export const StatsGrid: React.FC = () => {
  return (
    <MobileGrid cols={2} gap="sm" className="mb-12 md:mb-16">
      {stats.map((stat, index) => (
        <MobileCard 
          key={index} 
          variant="glass" 
          padding="sm"
          interactive
          className="text-center"
        >
          <div className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-purple-400">
            {/* Icon placeholder - could be enhanced with dynamic icon loading */}
            <div className="w-full h-full bg-purple-400/20 rounded"></div>
          </div>
          <div className="text-lg md:text-xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-gray-400 mb-1 line-clamp-2">{stat.label}</div>
          <div className="text-xs text-green-400">{stat.growth}</div>
        </MobileCard>
      ))}
    </MobileGrid>
  )
}
