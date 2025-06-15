
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const MobileTabs = TabsPrimitive.Root

const MobileTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-xl bg-slate-900/50 p-1 text-muted-foreground backdrop-blur-sm border border-slate-700/50 overflow-x-auto scrollbar-hide gap-1",
      className
    )}
    {...props}
  />
))
MobileTabsList.displayName = TabsPrimitive.List.displayName

interface MobileTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode
}

const MobileTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  MobileTabsTriggerProps
>(({ className, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-white hover:bg-slate-800/50 touch-target min-w-0 flex-shrink-0",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-1.5 min-w-0">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate text-xs sm:text-sm font-semibold">{children}</span>
    </div>
  </TabsPrimitive.Trigger>
))
MobileTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const MobileTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
      className
    )}
    {...props}
  />
))
MobileTabsContent.displayName = TabsPrimitive.Content.displayName

export { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent }
