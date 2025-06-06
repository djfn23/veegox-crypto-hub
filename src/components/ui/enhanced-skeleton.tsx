
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'avatar' | 'text' | 'button';
  animate?: boolean;
  lines?: number;
}

const skeletonVariants = {
  default: 'h-4 bg-white/10 rounded',
  card: 'h-32 bg-white/5 rounded-xl border border-white/10',
  avatar: 'h-10 w-10 bg-white/10 rounded-full',
  text: 'h-3 bg-white/10 rounded',
  button: 'h-10 bg-white/10 rounded-lg px-6',
};

export const EnhancedSkeleton: React.FC<EnhancedSkeletonProps> = ({
  className,
  variant = 'default',
  animate = true,
  lines = 1,
}) => {
  const skeletonClass = cn(skeletonVariants[variant], className);
  
  const shimmerAnimation = {
    initial: { backgroundPosition: '-200px 0' },
    animate: {
      backgroundPosition: '200px 0',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              skeletonClass,
              i === lines - 1 && 'w-3/4', // Last line shorter
              animate && 'bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:400px_100%]'
            )}
            {...(animate ? shimmerAnimation : {})}
            style={animate ? {
              backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            } : {}}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        skeletonClass,
        animate && 'bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:400px_100%]'
      )}
      {...(animate ? shimmerAnimation : {})}
      style={animate ? {
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      } : {}}
    />
  );
};

// Composant pour des grilles de skeleton
export const SkeletonGrid: React.FC<{
  count: number;
  variant?: EnhancedSkeletonProps['variant'];
  className?: string;
}> = ({ count, variant = 'card', className }) => {
  return (
    <div className={cn('grid gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <EnhancedSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
};
