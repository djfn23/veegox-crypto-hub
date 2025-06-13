
import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface MobileFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  spacing?: "tight" | "default" | "loose"
}

export const MobileForm = React.forwardRef<HTMLFormElement, MobileFormProps>(
  ({ className, spacing = "default", ...props }, ref) => {
    const spacingClasses = {
      tight: "space-y-3",
      default: "space-y-4 md:space-y-6",
      loose: "space-y-6 md:space-y-8"
    }
    
    return (
      <form
        ref={ref}
        className={cn("w-full", spacingClasses[spacing], className)}
        {...props}
      />
    )
  }
)
MobileForm.displayName = "MobileForm"

interface MobileFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  error?: string
  description?: string
}

export const MobileFormField = React.forwardRef<HTMLDivElement, MobileFormFieldProps>(
  ({ className, label, required, error, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {label && (
          <Label className="text-sm md:text-base text-white font-medium">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && (
          <p className="text-xs md:text-sm text-gray-400">{description}</p>
        )}
        {error && (
          <p className="text-xs md:text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
MobileFormField.displayName = "MobileFormField"

export const MobileInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      "touch-target h-12 md:h-10 text-base md:text-sm rounded-xl border-white/20 bg-white/5 text-white placeholder-gray-400",
      "focus:border-primary focus:ring-2 focus:ring-primary/20",
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      className
    )}
    {...props}
  />
))
MobileInput.displayName = "MobileInput"

export const MobileTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <Textarea
    ref={ref}
    className={cn(
      "min-h-[100px] md:min-h-[120px] text-base md:text-sm rounded-xl border-white/20 bg-white/5 text-white placeholder-gray-400 resize-none",
      "focus:border-primary focus:ring-2 focus:ring-primary/20",
      error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
      className
    )}
    {...props}
  />
))
MobileTextarea.displayName = "MobileTextarea"

export const MobileButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "secondary" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
    fullWidth?: boolean
  }
>(({ className, variant = "default", size = "default", fullWidth = false, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    default: "touch-target-lg px-6 text-base md:text-sm",
    lg: "h-14 px-8 text-lg md:text-base"
  }
  
  return (
    <Button
      ref={ref}
      className={cn(
        "rounded-xl font-medium transition-all",
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  )
})
MobileButton.displayName = "MobileButton"
