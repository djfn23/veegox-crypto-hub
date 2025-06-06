import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { EnhancedAppLayout } from "@/components/layout/EnhancedAppLayout";
import { PerformanceMetrics } from "@/components/ui/performance-metrics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TokenManager from "./components/modules/TokenManager";
import CreditModule from "./components/modules/CreditModule";
import StakingModule from "./components/modules/StakingModule";
import DAOModule from "./components/modules/DAOModule";
import ProfileSettings from "./components/modules/ProfileSettings";
import CrowdfundingModule from "./components/modules/CrowdfundingModule";
import MarketAnalysisModule from "./components/modules/market/MarketAnalysisModule";
import ExchangeModule from "./components/modules/exchange/ExchangeModule";
import AIRecommendationsModule from "./components/modules/ai/AIRecommendationsModule";
import SocialModule from "./components/modules/social/SocialModule";
import CampaignDetails from "./components/modules/crowdfunding/CampaignDetails";
import Wallet from "./pages/Wallet";
import Contract from "./pages/Contract";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Legal from "./pages/Legal";
import About from "./pages/About";
import Security from "./pages/Security";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EnhancedAppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tokens" element={<TokenManager />} />
              <Route path="/credit" element={<CreditModule />} />
              <Route path="/staking" element={<StakingModule />} />
              <Route path="/dao" element={<DAOModule />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/crowdfunding" element={<CrowdfundingModule />} />
              <Route path="/crowdfunding/:id" element={<CampaignDetails />} />
              <Route path="/market-analysis" element={<MarketAnalysisModule />} />
              <Route path="/exchange" element={<ExchangeModule />} />
              <Route path="/ai-recommendations" element={<AIRecommendationsModule />} />
              <Route path="/social" element={<SocialModule />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<Help />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/about" element={<About />} />
              <Route path="/security" element={<Security />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EnhancedAppLayout>
        </BrowserRouter>
        <PerformanceMetrics />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
