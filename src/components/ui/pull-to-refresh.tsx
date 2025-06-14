
import * as React from "react"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  className?: string
}

export const PullToRefresh = React.forwardRef<HTMLDivElement, PullToRefreshProps>(
  ({ onRefresh, children, className, ...props }, ref) => {
    const [isPulling, setIsPulling] = React.useState(false)
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const [pullDistance, setPullDistance] = React.useState(0)
    const startY = React.useRef(0)
    const currentY = React.useRef(0)
    const maxPullDistance = 80

    const handleTouchStart = (e: React.TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isPulling || window.scrollY > 0) return

      currentY.current = e.touches[0].clientY
      const distance = Math.max(0, Math.min(currentY.current - startY.current, maxPullDistance))
      setPullDistance(distance)

      if (distance > 0) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      setIsPulling(false)

      if (pullDistance >= maxPullDistance * 0.7) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
          setPullDistance(0)
        }
      } else {
        setPullDistance(0)
      }
    }

    const refreshOpacity = Math.min(pullDistance / (maxPullDistance * 0.7), 1)
    const refreshRotation = (pullDistance / maxPullDistance) * 180

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {/* Pull to refresh indicator */}
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 z-10"
          style={{
            height: `${pullDistance}px`,
            opacity: refreshOpacity,
            transform: `translateY(-${Math.max(0, maxPullDistance - pullDistance)}px)`
          }}
        >
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-full p-3 border border-slate-600">
            <RefreshCw 
              className={cn(
                "h-5 w-5 text-purple-400 transition-transform duration-200",
                isRefreshing && "animate-spin"
              )}
              style={{
                transform: `rotate(${refreshRotation}deg)`
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            transform: `translateY(${pullDistance}px)`,
            transition: isPulling ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)
PullToRefresh.displayName = "PullToRefresh"
