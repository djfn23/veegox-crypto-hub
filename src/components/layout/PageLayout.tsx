
import React from "react"
import { cn } from "@/lib/utils"
import { MobileContainer, MobileHeading, MobileText } from "@/components/ui/mobile-components"

interface PageLayoutProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  icon,
  actions,
  className,
  children
}) => {
  return (
    <div className={cn("space-y-4 md:space-y-6", className)}>
      {/* Header optimisé mobile */}
      <div className="mb-4 md:mb-6">
        <MobileContainer size="default" centered>
          <div className="flex flex-col space-y-3 md:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-start space-x-3 md:space-x-4">
              {icon && (
                <div className="flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10">
                  <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                    {icon}
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <MobileHeading 
                  level={1} 
                  className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight"
                >
                  {title}
                </MobileHeading>
                {subtitle && (
                  <MobileText 
                    variant="body" 
                    className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base"
                  >
                    {subtitle}
                  </MobileText>
                )}
              </div>
            </div>
            {actions && (
              <div className="flex items-center justify-start lg:justify-end space-x-2 md:space-x-3 overflow-x-auto pb-2 lg:pb-0">
                {actions}
              </div>
            )}
          </div>
        </MobileContainer>
      </div>
      
      {/* Contenu principal avec conteneur responsive */}
      <MobileContainer size="default" centered>
        <div className="space-y-4 md:space-y-6">
          {children}
        </div>
      </MobileContainer>
    </div>
  )
}

export { PageLayout }
