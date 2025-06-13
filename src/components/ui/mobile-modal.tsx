
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const MobileModal = DialogPrimitive.Root

const MobileModalTrigger = DialogPrimitive.Trigger

const MobileModalPortal = DialogPrimitive.Portal

const MobileModalClose = DialogPrimitive.Close

const MobileModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-mobile-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
))
MobileModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const MobileModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    variant?: "default" | "sheet" | "fullscreen"
  }
>(({ className, variant = "default", children, ...props }, ref) => {
  const isMobile = useIsMobile()
  
  const variantClasses = {
    default: isMobile 
      ? "fixed inset-x-4 top-1/2 -translate-y-1/2 max-h-[90vh]" 
      : "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-full max-w-lg",
    sheet: isMobile
      ? "fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl"
      : "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-full max-w-lg rounded-xl",
    fullscreen: isMobile
      ? "fixed inset-0"
      : "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vh] w-[90vw] max-w-4xl"
  }
  
  const animationClasses = variant === "sheet" && isMobile
    ? "data-[state=open]:animate-mobile-slide-up data-[state=closed]:animate-fade-out"
    : "data-[state=open]:animate-mobile-scale data-[state=closed]:animate-fade-out"

  return (
    <MobileModalPortal>
      <MobileModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 overflow-hidden bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl",
          "focus:outline-none",
          variantClasses[variant],
          animationClasses,
          variant !== "fullscreen" && "rounded-xl",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors touch-target">
          <X className="h-5 w-5" />
          <span className="sr-only">Fermer</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </MobileModalPortal>
  )
})
MobileModalContent.displayName = DialogPrimitive.Content.displayName

const MobileModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pb-0", className)}
    {...props}
  />
))
MobileModalHeader.displayName = "MobileModalHeader"

const MobileModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl md:text-2xl font-semibold text-white", className)}
    {...props}
  />
))
MobileModalTitle.displayName = DialogPrimitive.Title.displayName

const MobileModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm md:text-base text-gray-400 mt-2", className)}
    {...props}
  />
))
MobileModalDescription.displayName = DialogPrimitive.Description.displayName

const MobileModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 overflow-y-auto", className)}
    {...props}
  />
))
MobileModalBody.displayName = "MobileModalBody"

const MobileModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0 gap-2 sm:gap-0", className)}
    {...props}
  />
))
MobileModalFooter.displayName = "MobileModalFooter"

export {
  MobileModal,
  MobileModalPortal,
  MobileModalOverlay,
  MobileModalClose,
  MobileModalTrigger,
  MobileModalContent,
  MobileModalHeader,
  MobileModalTitle,
  MobileModalDescription,
  MobileModalBody,
  MobileModalFooter,
}
