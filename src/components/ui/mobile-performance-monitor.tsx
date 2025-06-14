
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Clock, Download, Wifi, Battery } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  memoryUsage: number
  networkSpeed: string
  cacheHitRate: number
  apiResponseTime: number
  batteryLevel?: number
  connectionType: string
}

export const MobilePerformanceMonitor = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    networkSpeed: 'unknown',
    cacheHitRate: 0,
    apiResponseTime: 0,
    connectionType: 'unknown'
  })
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Only show in development or when performance debugging is needed
    const showPerformanceMonitor = localStorage.getItem('show-performance-monitor') === 'true'
    setIsVisible(showPerformanceMonitor)

    if (showPerformanceMonitor) {
      const updateMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const memory = (performance as any).memory

        setMetrics({
          loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.loadEventStart) : 0,
          memoryUsage: memory ? Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) : 0,
          networkSpeed: (navigator as any).connection?.effectiveType || 'unknown',
          cacheHitRate: Math.random() * 100, // Mock cache hit rate
          apiResponseTime: Math.random() * 500 + 100, // Mock API response time
          batteryLevel: (navigator as any).getBattery ? 85 : undefined, // Mock battery level
          connectionType: (navigator as any).connection?.type || 'unknown'
        })
      }

      updateMetrics()
      const interval = setInterval(updateMetrics, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  const getPerformanceColor = (value: number, thresholds: { good: number, fair: number }) => {
    if (value <= thresholds.good) return 'text-green-400'
    if (value <= thresholds.fair) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 w-80">
      <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-400" />
            Performance Monitor
            <Badge variant="outline" className="text-xs border-purple-500 text-purple-400">
              DEV
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Load Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-300">Load Time</span>
            </div>
            <span className={cn("text-xs font-mono", getPerformanceColor(metrics.loadTime, { good: 1000, fair: 3000 }))}>
              {metrics.loadTime}ms
            </span>
          </div>

          {/* Memory Usage */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-xs text-gray-300">Memory</span>
              </div>
              <span className={cn("text-xs font-mono", getPerformanceColor(metrics.memoryUsage, { good: 50, fair: 80 }))}>
                {metrics.memoryUsage}%
              </span>
            </div>
            <Progress value={metrics.memoryUsage} className="h-1" />
          </div>

          {/* Network */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-300">Network</span>
            </div>
            <Badge variant="outline" className="text-xs border-green-500 text-green-400">
              {metrics.networkSpeed}
            </Badge>
          </div>

          {/* API Response */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-gray-300">API Response</span>
            </div>
            <span className={cn("text-xs font-mono", getPerformanceColor(metrics.apiResponseTime, { good: 200, fair: 500 }))}>
              {Math.round(metrics.apiResponseTime)}ms
            </span>
          </div>

          {/* Cache Hit Rate */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-300">Cache Hit Rate</span>
              <span className="text-xs font-mono text-blue-400">
                {Math.round(metrics.cacheHitRate)}%
              </span>
            </div>
            <Progress value={metrics.cacheHitRate} className="h-1" />
          </div>

          {/* Battery (if available) */}
          {metrics.batteryLevel && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-gray-300">Battery</span>
              </div>
              <span className="text-xs font-mono text-yellow-400">
                {metrics.batteryLevel}%
              </span>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => {
              localStorage.removeItem('show-performance-monitor')
              setIsVisible(false)
            }}
            className="w-full mt-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Masquer
          </button>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to enable performance monitoring
export const enablePerformanceMonitor = () => {
  localStorage.setItem('show-performance-monitor', 'true')
  window.location.reload()
}

// Helper function to disable performance monitoring
export const disablePerformanceMonitor = () => {
  localStorage.removeItem('show-performance-monitor')
  window.location.reload()
}
