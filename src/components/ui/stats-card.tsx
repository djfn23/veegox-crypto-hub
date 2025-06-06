
import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassCard } from "./glass-card"

interface StatsCardProps {
  title: string
  value: string | number | React.ReactNode
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

    const formatValue = (val: string | number | React.ReactNode) => {
      if (React.isValidElement(val)) {
        return val;
      }
      return typeof val === 'number' ? val.toLocaleString() : val;
    }

    return (
      <GlassCard ref={ref} variant={variant} className={cn("p-4 md:p-6", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-gray-300 uppercase tracking-wide line-clamp-2">
              {title}
            </p>
            <div className="flex items-baseline space-x-1 md:space-x-2">
              <div className="text-xl md:text-3xl font-bold text-white truncate">
                {formatValue(value)}
              </div>
              {change && (
                <span className={cn("text-xs md:text-sm font-medium", changeColors[changeType])}>
                  {change}
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-2 md:p-3 rounded-xl bg-white/10 backdrop-blur-sm flex-shrink-0 ml-2">
              <div className="w-4 h-4 md:w-5 md:h-5 [&>svg]:w-full [&>svg]:h-full text-white">
                {icon}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    )
  }
)
StatsCard.displayName = "StatsCard"

export { StatsCard }
