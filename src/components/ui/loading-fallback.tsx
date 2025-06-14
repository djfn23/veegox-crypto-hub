
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Chargement...", 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-purple-400 mb-4" />
      <p className="text-white/70 text-sm animate-pulse">{message}</p>
    </div>
  );
};

export const SidebarLoadingFallback = () => (
  <LoadingFallback 
    message="Chargement du menu..."
    className="bg-slate-900/50 border border-slate-700 rounded-xl min-h-[200px]"
  />
);
