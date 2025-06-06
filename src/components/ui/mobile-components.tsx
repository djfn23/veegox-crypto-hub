
import * as React from "react"
import { cn } from "@/lib/utils"
import { TouchTarget } from "./mobile-touch-target"

// Mobile Container Component
interface MobileContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg"
  centered?: boolean
}

export const MobileContainer = React.forwardRef<HTMLDivElement, MobileContainerProps>(
  ({ className, size = "default", centered = false, ...props }, ref) => {
    const sizeClasses = {
      sm: "mobile-container max-w-sm",
      default: "mobile-container max-w-4xl", 
      lg: "mobile-container max-w-6xl"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          sizeClasses[size],
          centered && "mx-auto",
          className
        )}
        {...props}
      />
    )
  }
)
MobileContainer.displayName = "MobileContainer"

// Mobile Section Component  
interface MobileSectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "default" | "lg"
  as?: "section" | "div" | "article" | "main"
}

export const MobileSection = React.forwardRef<HTMLDivElement, MobileSectionProps>(
  ({ className, size = "default", as: Component = "section", ...props }, ref) => {
    const sizeClasses = {
      sm: "py-4 md:py-6",
      default: "mobile-section",
      lg: "py-8 md:py-12 lg:py-16"
    }
    
    return (
      <Component
        ref={ref as any}
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    )
  }
)
MobileSection.displayName = "MobileSection"

// Mobile Grid Component
interface MobileGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5
  gap?: "sm" | "default" | "lg"
  tight?: boolean
}

export const MobileGrid = React.forwardRef<HTMLDivElement, MobileGridProps>(
  ({ className, cols = 3, gap = "default", tight = false, ...props }, ref) => {
    const colsClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2", 
      3: "mobile-grid",
      4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      5: "mobile-grid-tight"
    }
    
    const gapClasses = {
      sm: "mobile-gap-sm",
      default: "mobile-gap", 
      lg: "mobile-gap-lg"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colsClasses[cols],
          gapClasses[gap],
          tight && "gap-2 md:gap-3",
          className
        )}
        {...props}
      />
    )
  }
)
MobileGrid.displayName = "MobileGrid"

// Mobile Card Component
interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "strong" | "minimal"
  padding?: "sm" | "default" | "lg"
  interactive?: boolean
}

export const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant = "default", padding = "default", interactive = false, ...props }, ref) => {
    const variantClasses = {
      default: "mobile-glass",
      glass: "mobile-glass",
      strong: "mobile-glass-strong",
      minimal: "bg-white/5 border border-white/10"
    }
    
    const paddingClasses = {
      sm: "p-3 md:p-4",
      default: "mobile-card",
      lg: "p-6 md:p-8 lg:p-10"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          variantClasses[variant],
          paddingClasses[padding],
          interactive && "mobile-interactive cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
)
MobileCard.displayName = "MobileCard"

// Mobile Typography Components
interface MobileHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
  responsive?: boolean
}

export const MobileHeading = React.forwardRef<HTMLHeadingElement, MobileHeadingProps>(
  ({ className, level, responsive = true, children, ...props }, ref) => {
    const classes = responsive ? {
      1: "mobile-h1",
      2: "mobile-h2", 
      3: "mobile-h3",
      4: "text-base md:text-lg lg:text-xl font-medium",
      5: "text-sm md:text-base lg:text-lg font-medium",
      6: "text-xs md:text-sm lg:text-base font-medium"
    } : {
      1: "text-2xl font-bold",
      2: "text-xl font-semibold",
      3: "text-lg font-medium", 
      4: "text-base font-medium",
      5: "text-sm font-medium",
      6: "text-xs font-medium"
    }
    
    const Component = `h${level}` as keyof JSX.IntrinsicElements
    
    return React.createElement(
      Component,
      {
        ref: ref as any,
        className: cn(classes[level], "text-white", className),
        ...props
      },
      children
    )
  }
)
MobileHeading.displayName = "MobileHeading"

interface MobileTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "caption" | "small"
  responsive?: boolean
}

export const MobileText = React.forwardRef<HTMLParagraphElement, MobileTextProps>(
  ({ className, variant = "body", responsive = true, ...props }, ref) => {
    const classes = responsive ? {
      body: "mobile-body",
      caption: "mobile-caption", 
      small: "text-xs md:text-sm"
    } : {
      body: "text-sm",
      caption: "text-xs",
      small: "text-xs"
    }
    
    return (
      <p
        ref={ref}
        className={cn(classes[variant], "text-gray-300", className)}
        {...props}
      />
    )
  }
)
MobileText.displayName = "MobileText"

// Mobile Input Component
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  fullWidth?: boolean
}

export const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, error = false, fullWidth = true, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "mobile-input",
          fullWidth && "w-full",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
    )
  }
)
MobileInput.displayName = "MobileInput"

// Mobile Textarea Component
interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  fullWidth?: boolean
}

export const MobileTextarea = React.forwardRef<HTMLTextAreaElement, MobileTextareaProps>(
  ({ className, error = false, fullWidth = true, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "mobile-textarea",
          fullWidth && "w-full",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
    )
  }
)
MobileTextarea.displayName = "MobileTextarea"

// Mobile Badge Component
interface MobileBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error"
  size?: "sm" | "default" | "lg"
}

export const MobileBadge = React.forwardRef<HTMLSpanElement, MobileBadgeProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white/10 text-white border-white/20",
      primary: "bg-primary/20 text-primary border-primary/30",
      secondary: "bg-gray-500/20 text-gray-300 border-gray-500/30",
      success: "bg-green-500/20 text-green-400 border-green-500/30",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", 
      error: "bg-red-500/20 text-red-400 border-red-500/30"
    }
    
    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      default: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base"
    }
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border font-medium",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)
MobileBadge.displayName = "MobileBadge"
