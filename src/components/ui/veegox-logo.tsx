
import React from 'react';

interface VeegoxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'white' | 'dark';
  className?: string;
}

const VeegoxLogo: React.FC<VeegoxLogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-purple-600 to-blue-600';
      case 'white':
        return 'bg-white';
      case 'dark':
        return 'bg-gray-900';
      default:
        return 'bg-gradient-to-r from-purple-500 to-blue-500';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return 'text-purple-600';
      case 'dark':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`
      ${sizeClasses[size]} 
      ${getBackgroundClass()} 
      rounded-full 
      flex 
      items-center 
      justify-center 
      shadow-lg 
      ${className}
    `}>
      <span className={`font-bold ${getTextColor()} ${
        size === 'sm' ? 'text-xs' : 
        size === 'md' ? 'text-sm' : 
        size === 'lg' ? 'text-lg' : 'text-xl'
      }`}>
        VGX
      </span>
    </div>
  );
};

export default VeegoxLogo;
