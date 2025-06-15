
import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "interactive" | "elevated"
  size?: "sm" | "default" | "lg"
}

export const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-slate-900/60 border-slate-700/60 backdrop-blur-sm",
      glass: "bg-white/5 border-white/10 backdrop-blur-md",
      interactive: "bg-slate-900/60 border-slate-700/60 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600/70 active:scale-[0.98] cursor-pointer transition-all duration-200",
      elevated: "bg-slate-900/80 border-slate-700/80 backdrop-blur-lg shadow-2xl shadow-black/20"
    }
    
    const sizeClasses = {
      sm: "p-3 rounded-lg",
      default: "p-4 rounded-xl", 
      lg: "p-6 rounded-2xl"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "border transition-all duration-200",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
MobileCard.displayName = "MobileCard"

interface MobileCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MobileCardContent = React.forwardRef<HTMLDivElement, MobileCardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
MobileCardContent.displayName = "MobileCardContent"

interface MobileCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MobileCardHeader = React.forwardRef<HTMLDivElement, MobileCardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mb-4", className)}
        {...props}
      />
    )
  }
)
MobileCardHeader.displayName = "MobileCardHeader"

interface MobileCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const MobileCardTitle = React.forwardRef<HTMLParagraphElement, MobileCardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
        {...props}
      />
    )
  }
)
MobileCardTitle.displayName = "MobileCardTitle"
