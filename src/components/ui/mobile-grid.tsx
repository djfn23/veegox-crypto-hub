
import * as React from "react"
import { cn } from "@/lib/utils"
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout"

interface MobileGridProps extends React.HTMLAttributes<HTMLDivElement> {
  mobileColumns?: 1 | 2
  tabletColumns?: 2 | 3 | 4
  desktopColumns?: 3 | 4 | 5 | 6
  gap?: "sm" | "default" | "lg"
}

export const MobileGrid = React.forwardRef<HTMLDivElement, MobileGridProps>(
  ({ className, mobileColumns = 1, tabletColumns = 2, desktopColumns = 3, gap = "default", children, ...props }, ref) => {
    const { getColumns } = useResponsiveLayout()
    
    const columns = getColumns(mobileColumns, tabletColumns, desktopColumns)
    
    const gapClasses = {
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6"
    }
    
    const gridClasses = {
      1: "grid-cols-1",
      2: "grid-cols-2", 
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6"
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full",
          gridClasses[columns as keyof typeof gridClasses],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MobileGrid.displayName = "MobileGrid"

interface MobileGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: {
    mobile?: 1 | 2
    tablet?: 1 | 2 | 3 | 4
    desktop?: 1 | 2 | 3 | 4 | 5 | 6
  }
}

export const MobileGridItem = React.forwardRef<HTMLDivElement, MobileGridItemProps>(
  ({ className, span, children, ...props }, ref) => {
    const spanClasses = []
    
    if (span?.mobile) {
      spanClasses.push(`col-span-${span.mobile}`)
    }
    if (span?.tablet) {
      spanClasses.push(`md:col-span-${span.tablet}`)
    }
    if (span?.desktop) {
      spanClasses.push(`lg:col-span-${span.desktop}`)
    }
    
    return (
      <div
        ref={ref}
        className={cn(spanClasses.join(" "), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MobileGridItem.displayName = "MobileGridItem"
