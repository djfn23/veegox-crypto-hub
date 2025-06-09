import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from '@/components/ui/toaster';
import { Sonner } from '@/components/ui/sonner';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Staking from './pages/Staking';
import Governance from './pages/Governance';
import NotFound from './pages/NotFound';
import { AuthProvider } from './hooks/useAuth';
import { AuthGuard } from './components/auth/AuthGuard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
              <Route path="/wallet" element={<AuthGuard><Wallet /></AuthGuard>} />
              <Route path="/staking" element={<AuthGuard><Staking /></AuthGuard>} />
              <Route path="/governance" element={<AuthGuard><Governance /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
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
