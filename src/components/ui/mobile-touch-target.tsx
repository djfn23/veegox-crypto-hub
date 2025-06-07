
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
        ref={ref}
        {...props}
      />
    )
  }
)
TouchTarget.displayName = "TouchTarget"

// Interfaces spécifiques pour chaque composant spécialisé
export interface TouchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<VariantProps<typeof touchTargetVariants>, 'size' | 'variant' | 'shape'> {
  disabled?: boolean
}

export interface TouchLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Pick<VariantProps<typeof touchTargetVariants>, 'size' | 'variant' | 'shape'> {
  href: string
}

// Composants spécialisés avec leurs propres types
const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, size = "lg", variant = "button", shape, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        touchTargetVariants({ size, variant, shape }),
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
TouchButton.displayName = "TouchButton"

const TouchLink = React.forwardRef<HTMLAnchorElement, TouchLinkProps>(
  ({ className, size = "default", variant = "interactive", shape, children, href, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        touchTargetVariants({ size, variant, shape }),
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
TouchLink.displayName = "TouchLink"

export { TouchTarget, TouchButton, TouchLink, touchTargetVariants }
