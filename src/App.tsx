
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
