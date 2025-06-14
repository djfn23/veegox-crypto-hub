
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout"

interface MobileWalletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "featured"
  interactive?: boolean
  padding?: "sm" | "default" | "lg"
}

export const MobileWalletCard = React.forwardRef<HTMLDivElement, MobileWalletCardProps>(
  ({ className, variant = "default", interactive = false, padding = "default", children, ...props }, ref) => {
    const { isMobile, isTablet, getDynamicSpacing } = useResponsiveLayout()
    
    const variantClasses = {
      default: "bg-slate-900/50 backdrop-blur-sm border-slate-700",
      compact: "bg-slate-900/30 backdrop-blur-sm border-slate-700/50",
      featured: "bg-gradient-to-r from-slate-900/80 to-purple-900/40 border-purple-500/30"
    }
    
    const paddingClasses = {
      sm: isMobile ? "p-3" : "p-4",
      default: isMobile ? "p-4" : isTablet ? "p-5" : "p-6",
      lg: isMobile ? "p-5" : isTablet ? "p-6" : "p-8"
    }
    
    const interactiveClasses = interactive 
      ? "cursor-pointer transition-all duration-200 hover:bg-slate-800/50 active:scale-[0.98] touch-manipulation"
      : ""
    
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-xl border transition-all duration-200",
          variantClasses[variant],
          paddingClasses[padding],
          interactiveClasses,
          isMobile && "min-h-[44px]", // Minimum touch target
          className
        )}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
MobileWalletCard.displayName = "MobileWalletCard"

interface MobileWalletCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const MobileWalletCardHeader = React.forwardRef<HTMLDivElement, MobileWalletCardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    const { isMobile, getFontSize } = useResponsiveLayout()
    
    return (
      <CardHeader 
        ref={ref}
        className={cn(
          "flex-row items-center justify-between space-y-0",
          isMobile ? "pb-2" : "pb-3",
          className
        )}
        {...props}
      >
        <div className="space-y-1">
          {title && (
            <h3 className={cn("font-semibold text-white", getFontSize('base'))}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={cn("text-gray-400", getFontSize('sm'))}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </CardHeader>
    )
  }
)
MobileWalletCardHeader.displayName = "MobileWalletCardHeader"

interface MobileWalletCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "tight" | "default" | "loose"
}

export const MobileWalletCardContent = React.forwardRef<HTMLDivElement, MobileWalletCardContentProps>(
  ({ className, spacing = "default", children, ...props }, ref) => {
    const { isMobile } = useResponsiveLayout()
    
    const spacingClasses = {
      tight: isMobile ? "space-y-2" : "space-y-3",
      default: isMobile ? "space-y-3" : "space-y-4",
      loose: isMobile ? "space-y-4" : "space-y-6"
    }
    
    return (
      <CardContent
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          isMobile ? "pt-2" : "pt-3",
          className
        )}
        {...props}
      >
        {children}
      </CardContent>
    )
  }
)
MobileWalletCardContent.displayName = "MobileWalletCardContent"
