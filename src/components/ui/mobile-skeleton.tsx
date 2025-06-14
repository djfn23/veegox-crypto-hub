
import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface MobileSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "list" | "table" | "chart"
  count?: number
}

export const MobileSkeleton = React.forwardRef<HTMLDivElement, MobileSkeletonProps>(
  ({ className, variant = "card", count = 1, ...props }, ref) => {
    const renderSkeleton = () => {
      switch (variant) {
        case "card":
          return (
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3">
              <Skeleton className="h-4 w-3/4 bg-slate-700" />
              <Skeleton className="h-8 w-full bg-slate-700" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 bg-slate-700" />
                <Skeleton className="h-6 w-20 bg-slate-700" />
              </div>
            </div>
          )
        
        case "list":
          return (
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-slate-700" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2 bg-slate-700" />
                  <Skeleton className="h-3 w-3/4 bg-slate-700" />
                </div>
                <Skeleton className="h-4 w-16 bg-slate-700" />
              </div>
            </div>
          )
        
        case "table":
          return (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16 bg-slate-700" />
                    <Skeleton className="h-4 w-20 bg-slate-700" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20 bg-slate-700" />
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          )
        
        case "chart":
          return (
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <Skeleton className="h-6 w-1/3 bg-slate-700 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-end gap-1">
                    <Skeleton className={`w-8 bg-slate-700`} style={{ height: `${20 + Math.random() * 40}px` }} />
                    <Skeleton className={`w-8 bg-slate-700`} style={{ height: `${20 + Math.random() * 40}px` }} />
                    <Skeleton className={`w-8 bg-slate-700`} style={{ height: `${20 + Math.random() * 40}px` }} />
                  </div>
                ))}
              </div>
            </div>
          )
        
        default:
          return <Skeleton className="h-20 w-full bg-slate-700" />
      }
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            {renderSkeleton()}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
MobileSkeleton.displayName = "MobileSkeleton"
