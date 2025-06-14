
import React, { Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoaderProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const DefaultFallback = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-24 w-full" />
  </div>
);

export const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  fallback = <DefaultFallback />, 
  children 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export const withLazyLoading = <T extends Record<string, any>>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) => {
  const WrappedComponent = (props: T) => (
    <LazyLoader fallback={fallback}>
      <Component {...props} />
    </LazyLoader>
  );
  
  WrappedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};
