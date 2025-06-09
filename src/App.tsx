
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { AlchemySignerContainer } from '@/components/wallet/AlchemySignerContainer';
import { UnifiedAuthProvider } from '@/components/auth/UnifiedAuthProvider';

// Import existing pages
import Analytics from './pages/Analytics';
import Staking from './pages/Staking';
import Trading from './pages/Trading';
import Marketplace from './pages/Marketplace';
import Community from './pages/Community';
import Portfolio from './pages/Portfolio';
import Tokens from './pages/Tokens';
import Credit from './pages/Credit';
import Crowdfunding from './pages/Crowdfunding';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import AIAssistant from './pages/AIAssistant';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <UnifiedAuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/trading" element={<Trading />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/community" element={<Community />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/tokens" element={<Tokens />} />
                <Route path="/credit" element={<Credit />} />
                <Route path="/crowdfunding" element={<Crowdfunding />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <AlchemySignerContainer />
          </UnifiedAuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
