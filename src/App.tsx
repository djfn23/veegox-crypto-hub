
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes";
import { EnhancedErrorBoundary } from '@/components/ui/enhanced-error-boundary';
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
          
          <AlchemySignerContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
