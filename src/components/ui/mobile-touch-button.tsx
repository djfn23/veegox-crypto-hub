
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout"
import { Slot } from "@radix-ui/react-slot"

interface MobileTouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline" | "destructive"
  size?: "sm" | "default" | "lg" | "xl"
  fullWidth?: boolean
  asChild?: boolean
  loading?: boolean
}

export const MobileTouchButton = React.forwardRef<HTMLButtonElement, MobileTouchButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    fullWidth = false, 
    asChild = false,
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const { isMobile, isTablet } = useResponsiveLayout()
    
    // Enhanced sizes for better mobile touch experience
    const sizeClasses = {
      sm: isMobile ? "h-10 px-4 text-sm" : "h-9 px-3 text-sm",
      default: isMobile ? "h-12 px-6 text-base" : isTablet ? "h-11 px-5 text-sm" : "h-10 px-4 text-sm",
      lg: isMobile ? "h-14 px-8 text-lg" : isTablet ? "h-12 px-6 text-base" : "h-11 px-6 text-base",
      xl: isMobile ? "h-16 px-10 text-xl" : isTablet ? "h-14 px-8 text-lg" : "h-12 px-8 text-base"
    }
    
    // Mobile-optimized variants
    const mobileVariants = {
      default: "bg-slate-800 hover:bg-slate-700 text-white border-slate-600",
      primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
      ghost: "hover:bg-slate-800/50 text-white",
      outline: "border-2 border-slate-600 hover:bg-slate-800/50 text-white",
      destructive: "bg-red-600 hover:bg-red-700 text-white"
    }
    
    const buttonProps = {
      className: cn(
        // Base styles
        "font-medium rounded-xl transition-all duration-200 touch-manipulation",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
        "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        // Size classes
        sizeClasses[size],
        // Variant classes for mobile
        isMobile ? mobileVariants[variant] : "",
        // Full width
        fullWidth && "w-full",
        // Loading state
        loading && "cursor-wait opacity-75",
        // Minimum touch target for mobile
        isMobile && "min-h-[44px] min-w-[44px]",
        className
      ),
      disabled: disabled || loading,
      ...props
    }

    if (asChild) {
      return (
        <Slot ref={ref} {...buttonProps}>
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          )}
          {children}
        </Slot>
      )
    }
    
    return (
      <Button ref={ref} {...buttonProps}>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {children}
      </Button>
    )
  }
)
MobileTouchButton.displayName = "MobileTouchButton"

// Quick action button for wallet interface
interface QuickActionButtonProps extends Omit<MobileTouchButtonProps, 'children'> {
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: string | number
}

export const QuickActionButton = React.forwardRef<HTMLButtonElement, QuickActionButtonProps>(
  ({ icon: Icon, label, badge, className, ...props }, ref) => {
    const { isMobile, getFontSize } = useResponsiveLayout()
    
    return (
      <MobileTouchButton
        ref={ref}
        variant="ghost"
        size={isMobile ? "lg" : "default"}
        className={cn(
          "flex flex-col items-center justify-center gap-2 relative",
          "hover:bg-slate-800/50 active:bg-slate-800/70",
          isMobile ? "p-4 min-h-[80px]" : "p-3 min-h-[70px]",
          className
        )}
        {...props}
      >
        <div className="relative">
          <Icon className={cn(
            "transition-transform duration-200",
            isMobile ? "h-7 w-7" : "h-6 w-6"
          )} />
          {badge && (
            <div className={cn(
              "absolute -top-2 -right-2 bg-red-500 text-white rounded-full",
              "flex items-center justify-center font-bold text-xs",
              isMobile ? "h-5 w-5 min-w-[20px]" : "h-4 w-4 min-w-[16px]"
            )}>
              {badge}
            </div>
          )}
        </div>
        <span className={cn(
          "font-medium text-center leading-tight",
          getFontSize('xs')
        )}>
          {label}
        </span>
      </MobileTouchButton>
    )
  }
)
QuickActionButton.displayName = "QuickActionButton"
