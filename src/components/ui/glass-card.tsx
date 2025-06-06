
import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent"
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, ...props }, ref) => {
    const variants = {
      default: "bg-white/5 border-white/10",
      primary: "bg-blue-500/10 border-blue-400/20",
      secondary: "bg-purple-500/10 border-purple-400/20", 
      accent: "bg-green-500/10 border-green-400/20"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "backdrop-blur-md border rounded-xl shadow-xl transition-all duration-300",
          variants[variant],
          hover && "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
