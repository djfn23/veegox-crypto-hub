
import React from 'react';
import { Card, CardContent } from "./card";
import { Skeleton } from "./skeleton";
import { Loader2 } from "lucide-react";

interface UnifiedLoadingProps {
  variant?: 'spinner' | 'skeleton' | 'pulse' | 'dots';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  showCard?: boolean;
  lines?: number;
}

const UnifiedLoading = ({ 
  variant = 'spinner',
  size = 'md',
  text,
  className = "",
  showCard = true,
  lines = 3
}: UnifiedLoadingProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-8 w-8';
      default: return 'h-6 w-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      default: return 'text-base';
    }
  };

  const renderContent = () => {
    switch (variant) {
      case 'skeleton':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
              <Skeleton 
                key={i} 
                className={`h-4 ${i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'} bg-white/10`} 
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`flex items-center justify-center ${className}`}>
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`${getSizeClasses()} bg-blue-500 rounded-full animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
            {text && (
              <span className={`ml-3 text-white ${getTextSize()}`}>
                {text}
              </span>
            )}
          </div>
        );

      case 'dots':
        return (
          <div className={`flex items-center justify-center ${className}`}>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            {text && (
              <span className={`ml-3 text-white ${getTextSize()}`}>
                {text}
              </span>
            )}
          </div>
        );

      default: // spinner
        return (
          <div className={`flex items-center justify-center ${className}`}>
            <Loader2 className={`${getSizeClasses()} text-blue-500 animate-spin`} />
            {text && (
              <span className={`ml-3 text-white ${getTextSize()}`}>
                {text}
              </span>
            )}
          </div>
        );
    }
  };

  if (!showCard || variant === 'skeleton') {
    return <div className="p-6">{renderContent()}</div>;
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="p-6">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export { UnifiedLoading };
