
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { EnhancedErrorBoundary } from '@/components/ui/enhanced-error-boundary';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AlchemySignerContainer } from "@/components/wallet/AlchemySignerContainer";
import { AppLayout } from "@/components/layout/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  console.log('App: Rendering main application component');
  
  React.useEffect(() => {
    console.log('App: Component mounted successfully');
    
    const handleUnhandledError = (event: ErrorEvent) => {
      console.error('App: Unhandled error caught:', event.error);
    };

    window.addEventListener('error', handleUnhandledError);
    
    return () => {
      window.removeEventListener('error', handleUnhandledError);
    };
  }, []);
  
  try {
    return (
      <EnhancedErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">Welcome to Veegox</h1>
                <p className="text-gray-300">Your decentralized finance platform</p>
              </div>
            </AppLayout>
            
            <Sonner />
            <AlchemySignerContainer />
          </ThemeProvider>
        </QueryClientProvider>
      </EnhancedErrorBoundary>
    );
  } catch (error) {
    console.error('App: Critical error in App component render:', error);
    return (
      <div className="min-h-screen bg-red-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Application Error</h1>
          <p>A critical error occurred while loading the application.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }
}

export default App;
