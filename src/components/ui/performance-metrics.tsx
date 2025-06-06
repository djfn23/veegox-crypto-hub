
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Clock, Database } from 'lucide-react';
import { GlassCard } from './glass-card';

interface PerformanceMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

export const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const performance = window.performance;
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0;
      
      setMetrics([
        {
          label: 'Load Time',
          value: `${Math.round(loadTime)}ms`,
          icon: <Clock className="h-4 w-4" />,
          color: loadTime < 2000 ? 'text-green-400' : loadTime < 5000 ? 'text-yellow-400' : 'text-red-400',
        },
        {
          label: 'DOM Ready',
          value: `${Math.round(domContentLoaded)}ms`,
          icon: <Activity className="h-4 w-4" />,
          color: 'text-blue-400',
        },
        {
          label: 'First Paint',
          value: `${Math.round(firstPaint)}ms`,
          icon: <Zap className="h-4 w-4" />,
          color: 'text-purple-400',
        },
        {
          label: 'Memory Usage',
          value: `${Math.round((performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0)}MB`,
          icon: <Database className="h-4 w-4" />,
          color: 'text-orange-400',
        },
      ]);
    };

    // Update metrics initially and then every 5 seconds
    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show metrics only in development
  useEffect(() => {
    setIsVisible(import.meta.env.DEV);
  }, []);

  if (!isVisible || metrics.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <GlassCard className="p-3">
        <div className="text-xs text-gray-400 mb-2 font-medium">Performance</div>
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="flex items-center space-x-2">
              <span className={metric.color}>{metric.icon}</span>
              <div>
                <div className="text-xs text-white font-medium">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};
