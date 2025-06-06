
import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard } from "./glass-card"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ title, value, change, changeType = "neutral", icon, variant = "default", className }, ref) => {
    const changeColors = {
      positive: "text-green-400",
      negative: "text-red-400", 
      neutral: "text-gray-400"
    }

    return (
      <GlassCard ref={ref} variant={variant} className={cn("p-6", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              {change && (
                <span className={cn("text-sm font-medium", changeColors[changeType])}>
                  {change}
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              {icon}
            </div>
          )}
        </div>
      </GlassCard>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }
