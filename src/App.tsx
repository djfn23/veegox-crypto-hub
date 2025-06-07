
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Contract from "./pages/Contract";
import CreateCampaign from "./pages/CreateCampaign";
import Governance from "./pages/Governance";
import Help from "./pages/Help";
import Legal from "./pages/Legal";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Security from "./pages/Security";
import Trading from "./pages/Trading";
import Wallet from "./pages/Wallet";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Bridge from "./pages/Bridge";
import YieldFarming from "./pages/YieldFarming";
import Lending from "./pages/Lending";
import Staking from "./pages/Staking";
import Credit from "./pages/Credit";
import Social from "./pages/Social";
import Collections from "./pages/Collections";
import AIAssistant from "./pages/AIAssistant";
import Crowdfunding from "./pages/Crowdfunding";
import CrowdfundingCampaign from "./pages/CrowdfundingCampaign";
import Portfolio from "./pages/Portfolio";
import Liquidity from "./pages/Liquidity";
import CreateNFT from "./pages/CreateNFT";
import MyNFTs from "./pages/MyNFTs";
import Community from "./pages/Community";
import Automation from "./pages/Automation";

// Trading sub-pages (actually created)
import TradingSpot from "./pages/trading/TradingSpot";
import TradingFutures from "./pages/trading/TradingFutures";
import TradingOptions from "./pages/trading/TradingOptions";
import TradingOrders from "./pages/trading/TradingOrders";
import TradingStrategies from "./pages/trading/TradingStrategies";

// Credit sub-pages (actually created)
import CreditScore from "./pages/credit/CreditScore";
import CreditLoans from "./pages/credit/CreditLoans";
import CreditApplications from "./pages/credit/CreditApplications";
import CreditHistory from "./pages/credit/CreditHistory";
import CreditCollateral from "./pages/credit/CreditCollateral";

// Crowdfunding sub-pages
import CrowdfundingCampaigns from "./pages/crowdfunding/CrowdfundingCampaigns";
import MyCampaigns from "./pages/crowdfunding/MyCampaigns";
import MyContributions from "./pages/crowdfunding/MyContributions";
import CreateCrowdfundingCampaign from "./pages/crowdfunding/CreateCrowdfundingCampaign";
import CrowdfundingAnalytics from "./pages/crowdfunding/CrowdfundingAnalytics";
import CrowdfundingCategories from "./pages/crowdfunding/CrowdfundingCategories";
import CrowdfundingTrending from "./pages/crowdfunding/CrowdfundingTrending";
import CrowdfundingFeatured from "./pages/crowdfunding/CrowdfundingFeatured";

// Token pages
import Tokens from "./pages/Tokens";
import CreateToken from "./pages/tokens/CreateToken";
import TokenAnalytics from "./pages/tokens/TokenAnalytics";
import ManageTokens from "./pages/tokens/ManageTokens";
import TokenMarketplace from "./pages/tokens/TokenMarketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            
            <Route path="/contract" element={<Contract />} />
            
            <Route path="/governance" element={<Governance />} />
            <Route path="/governance/create" element={<CreateCampaign />} />
            
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/exchange" element={<Navigate to="/trading" replace />} />
            
            <Route path="/marketplace" element={<Marketplace />} />
            
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading/spot" element={<TradingSpot />} />
            <Route path="/trading/futures" element={<TradingFutures />} />
            <Route path="/trading/options" element={<TradingOptions />} />
            <Route path="/trading/orders" element={<TradingOrders />} />
            <Route path="/trading/strategies" element={<TradingStrategies />} />
            
            <Route path="/wallet" element={<Wallet />} />
            
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/tokens/create" element={<CreateToken />} />
            <Route path="/tokens/analytics" element={<TokenAnalytics />} />
            <Route path="/tokens/manage" element={<ManageTokens />} />
            <Route path="/tokens/marketplace" element={<TokenMarketplace />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/yield-farming" element={<YieldFarming />} />
            <Route path="/lending" element={<Lending />} />
            
            <Route path="/staking" element={<Staking />} />
            
            <Route path="/credit" element={<Credit />} />
            <Route path="/credit/score" element={<CreditScore />} />
            <Route path="/credit/loans" element={<CreditLoans />} />
            <Route path="/credit/applications" element={<CreditApplications />} />
            <Route path="/credit/history" element={<CreditHistory />} />
            <Route path="/credit/collateral" element={<CreditCollateral />} />
            
            <Route path="/crowdfunding" element={<Crowdfunding />} />
            <Route path="/crowdfunding/campaigns" element={<CrowdfundingCampaigns />} />
            <Route path="/crowdfunding/my-campaigns" element={<MyCampaigns />} />
            <Route path="/crowdfunding/my-contributions" element={<MyContributions />} />
            <Route path="/crowdfunding/create" element={<CreateCrowdfundingCampaign />} />
            <Route path="/crowdfunding/analytics" element={<CrowdfundingAnalytics />} />
            <Route path="/crowdfunding/categories" element={<CrowdfundingCategories />} />
            <Route path="/crowdfunding/trending" element={<CrowdfundingTrending />} />
            <Route path="/crowdfunding/featured" element={<CrowdfundingFeatured />} />
            <Route path="/crowdfunding/:id" element={<CrowdfundingCampaign />} />
            
            <Route path="/social" element={<Social />} />
            <Route path="/collections" element={<Collections />} />
            
            <Route path="/ai" element={<AIAssistant />} />
            
            <Route path="/notifications" element={<Notifications />} />
            
            <Route path="/help" element={<Help />} />
            
            <Route path="/security" element={<Security />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/portfolio" element={<Portfolio />} />
            
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/create-nft" element={<CreateNFT />} />
            <Route path="/my-nfts" element={<MyNFTs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
