
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import { AlchemySignerContainer } from '@/components/wallet/AlchemySignerContainer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/" element={<Wallet />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <AlchemySignerContainer />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
