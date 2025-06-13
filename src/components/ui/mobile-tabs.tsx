
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const MobileTabs = TabsPrimitive.Root

const MobileTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "default" | "pills" | "underline"
    orientation?: "horizontal" | "vertical"
  }
>(({ className, variant = "default", orientation = "horizontal", ...props }, ref) => {
  const isMobile = useIsMobile()
  
  const variantClasses = {
    default: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1",
    pills: "bg-transparent gap-2",
    underline: "bg-transparent border-b border-white/20"
  }
  
  const orientationClasses = {
    horizontal: isMobile ? "flex-col space-y-1" : "flex-row space-x-1",
    vertical: "flex-col space-y-1"
  }
  
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex w-full",
        variantClasses[variant],
        orientationClasses[orientation],
        className
      )}
      {...props}
    />
  )
})
MobileTabsList.displayName = TabsPrimitive.List.displayName

const MobileTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "default" | "pills" | "underline"
    icon?: React.ReactNode
  }
>(({ className, variant = "default", icon, children, ...props }, ref) => {
  const isMobile = useIsMobile()
  
  const variantClasses = {
    default: "text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg",
    pills: "text-white bg-white/10 data-[state=active]:bg-white/30 rounded-xl",
    underline: "text-white border-b-2 border-transparent data-[state=active]:border-white rounded-none"
  }
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "touch-target-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        isMobile ? "justify-start text-sm py-3 px-4 w-full" : "justify-center px-6 py-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        <span>{children}</span>
      </div>
    </TabsPrimitive.Trigger>
  )
})
MobileTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const MobileTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 md:mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
MobileTabsContent.displayName = TabsPrimitive.Content.displayName

export { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent }
