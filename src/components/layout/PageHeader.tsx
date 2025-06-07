
import React from "react"
import { cn } from "@/lib/utils"
import { MobileHeading, MobileText, MobileContainer } from "@/components/ui/mobile-components"

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  actions,
  className
}) => {
  return (
    <div className={cn("mb-6 md:mb-8", className)}>
      <MobileContainer>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-4">
            {icon && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10 animate-mobile-scale">
                {icon}
              </div>
            )}
            <div>
              <MobileHeading 
                level={1} 
                className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                {title}
              </MobileHeading>
              {subtitle && (
                <MobileText variant="body" className="text-gray-400 mt-2">
                  {subtitle}
                </MobileText>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-3 animate-mobile-fade-in">
              {actions}
            </div>
          )}
        </div>
      </MobileContainer>
    </div>
  )
}

export { PageHeader }
