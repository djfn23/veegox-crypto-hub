
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const touchTargetVariants = cva(
  "touch-target transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "touch-target-sm",
        default: "touch-target",
        lg: "touch-target-lg", 
        xl: "touch-target-xl",
      },
      variant: {
        default: "hover:bg-white/10 active:scale-95",
        button: "mobile-button-primary",
        secondary: "mobile-button-secondary",
        ghost: "mobile-button-ghost",
        interactive: "mobile-interactive",
        none: "",
      },
      shape: {
        default: "rounded-xl",
        circle: "rounded-full",
        square: "rounded-lg",
        none: "",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default", 
      shape: "default",
    },
  }
)

export interface TouchTargetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof touchTargetVariants> {
  asChild?: boolean
  disabled?: boolean
}

const TouchTarget = React.forwardRef<HTMLDivElement, TouchTargetProps>(
  ({ className, size, variant, shape, asChild = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    
    return (
      <Comp
        className={cn(
          touchTargetVariants({ size, variant, shape, className }),
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        ref={ref as any}
        {...props}
      />
    )
  }
)
TouchTarget.displayName = "TouchTarget"

// Specialized components for common use cases
const TouchButton = React.forwardRef<HTMLButtonElement, TouchTargetProps>(
  ({ className, size = "lg", variant = "button", children, disabled, ...props }, ref) => (
    <TouchTarget asChild size={size} variant={variant} disabled={disabled} className={className}>
      <button ref={ref} disabled={disabled} {...props}>
        {children}
      </button>
    </TouchTarget>
  )
)
TouchButton.displayName = "TouchButton"

const TouchLink = React.forwardRef<HTMLAnchorElement, TouchTargetProps & { href: string }>(
  ({ className, size = "default", variant = "interactive", children, ...props }, ref) => (
    <TouchTarget asChild size={size} variant={variant} className={className}>
      <a ref={ref} {...props}>
        {children}
      </a>
    </TouchTarget>
  )
)
TouchLink.displayName = "TouchLink"

export { TouchTarget, TouchButton, TouchLink, touchTargetVariants }
