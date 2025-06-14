
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
import CryptoBankPage from './pages/CryptoBank';

// Import new main pages
import Help from './pages/Help';
import Security from './pages/Security';
import YieldFarming from './pages/YieldFarming';
import Bridge from './pages/Bridge';
import Governance from './pages/Governance';

// Import crowdfunding sub-pages
import CreateCrowdfundingCampaign from './pages/crowdfunding/CreateCrowdfundingCampaign';
import CrowdfundingCampaigns from './pages/crowdfunding/CrowdfundingCampaigns';
import CrowdfundingFeatured from './pages/crowdfunding/CrowdfundingFeatured';
import CrowdfundingTrending from './pages/crowdfunding/CrowdfundingTrending';
import MyCampaigns from './pages/crowdfunding/MyCampaigns';
import MyContributions from './pages/crowdfunding/MyContributions';

// Import tokens sub-pages
import CreateToken from './pages/tokens/CreateToken';
import TokenAnalytics from './pages/tokens/TokenAnalytics';
import ManageTokens from './pages/tokens/ManageTokens';
import TokenMarketplace from './pages/tokens/TokenMarketplace';

// Import trading sub-pages
import TradingSpot from './pages/trading/TradingSpot';
import TradingFutures from './pages/trading/TradingFutures';
import TradingOptions from './pages/trading/TradingOptions';

// Import credit sub-pages
import CreditScore from './pages/credit/CreditScore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <TooltipProvider>
            <UnifiedAuthProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Main routes */}
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
                <Route path="/crypto-bank" element={<CryptoBankPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                
                {/* New main pages */}
                <Route path="/help" element={<Help />} />
                <Route path="/security" element={<Security />} />
                <Route path="/yield-farming" element={<YieldFarming />} />
                <Route path="/bridge" element={<Bridge />} />
                <Route path="/governance" element={<Governance />} />
                
                {/* Crowdfunding sub-routes */}
                <Route path="/crowdfunding/create" element={<CreateCrowdfundingCampaign />} />
                <Route path="/crowdfunding/campaigns" element={<CrowdfundingCampaigns />} />
                <Route path="/crowdfunding/featured" element={<CrowdfundingFeatured />} />
                <Route path="/crowdfunding/trending" element={<CrowdfundingTrending />} />
                <Route path="/crowdfunding/my-campaigns" element={<MyCampaigns />} />
                <Route path="/crowdfunding/my-contributions" element={<MyContributions />} />
                
                {/* Tokens sub-routes */}
                <Route path="/tokens/create" element={<CreateToken />} />
                <Route path="/tokens/analytics" element={<TokenAnalytics />} />
                <Route path="/tokens/manage" element={<ManageTokens />} />
                <Route path="/tokens/marketplace" element={<TokenMarketplace />} />
                
                {/* Trading sub-routes */}
                <Route path="/trading/spot" element={<TradingSpot />} />
                <Route path="/trading/futures" element={<TradingFutures />} />
                <Route path="/trading/options" element={<TradingOptions />} />
                
                {/* Credit sub-routes */}
                <Route path="/credit/score" element={<CreditScore />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AlchemySignerContainer />
            </UnifiedAuthProvider>
          </TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
