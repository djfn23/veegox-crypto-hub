
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MobileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "list" | "elevated"
  padding?: "none" | "sm" | "default" | "lg"
  interactive?: boolean
  fullWidth?: boolean
}

export const MobileCard = React.forwardRef<HTMLDivElement, MobileCardProps>(
  ({ className, variant = "default", padding = "default", interactive = false, fullWidth = true, children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-slate-900/50 border-slate-700",
      compact: "bg-slate-900/30 border-slate-800",
      list: "bg-slate-900/20 border-slate-800 border-l-4 border-l-purple-500",
      elevated: "bg-slate-900/70 border-slate-600 shadow-lg"
    }
    
    const paddingClasses = {
      none: "p-0",
      sm: "p-3 md:p-4",
      default: "p-4 md:p-6",
      lg: "p-6 md:p-8"
    }
    
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-xl border transition-all duration-200",
          variantClasses[variant],
          paddingClasses[padding],
          fullWidth && "w-full",
          interactive && "hover:bg-slate-800/60 active:scale-[0.98] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
MobileCard.displayName = "MobileCard"

export const MobileCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardHeader
      ref={ref}
      className={cn("pb-3 md:pb-4", className)}
      {...props}
    />
  )
)
MobileCardHeader.displayName = "MobileCardHeader"

export const MobileCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <CardTitle
      ref={ref}
      className={cn("text-lg md:text-xl lg:text-2xl font-semibold text-white", className)}
      {...props}
    />
  )
)
MobileCardTitle.displayName = "MobileCardTitle"

export const MobileCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardContent
      ref={ref}
      className={cn("pt-0", className)}
      {...props}
    />
  )
)
MobileCardContent.displayName = "MobileCardContent"
