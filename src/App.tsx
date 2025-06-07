
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

// Trading sub-pages
import TradingSpot from "./pages/trading/TradingSpot";
import TradingFutures from "./pages/trading/TradingFutures";
import TradingOptions from "./pages/trading/TradingOptions";
import TradingOrders from "./pages/trading/TradingOrders";
import TradingStrategies from "./pages/trading/TradingStrategies";

// Staking sub-pages
import StakingPools from "./pages/staking/StakingPools";
import MyStakes from "./pages/staking/MyStakes";
import StakingRewards from "./pages/staking/StakingRewards";
import Validators from "./pages/staking/Validators";
import StakingCalculator from "./pages/staking/StakingCalculator";

// Credit sub-pages
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

// Portfolio sub-pages
import PortfolioOverview from "./pages/portfolio/PortfolioOverview";
import PortfolioAssets from "./pages/portfolio/PortfolioAssets";
import PortfolioPerformance from "./pages/portfolio/PortfolioPerformance";
import PortfolioAllocations from "./pages/portfolio/PortfolioAllocations";
import PortfolioRebalancing from "./pages/portfolio/PortfolioRebalancing";

// Wallet sub-pages
import WalletOverview from "./pages/wallet/WalletOverview";
import WalletTokens from "./pages/wallet/WalletTokens";
import WalletNFTs from "./pages/wallet/WalletNFTs";
import WalletTransactions from "./pages/wallet/WalletTransactions";
import WalletAddresses from "./pages/wallet/WalletAddresses";
import WalletSecurity from "./pages/wallet/WalletSecurity";

// Marketplace sub-pages
import MarketplaceBrowse from "./pages/marketplace/MarketplaceBrowse";
import MarketplaceAuctions from "./pages/marketplace/MarketplaceAuctions";
import MyListings from "./pages/marketplace/MyListings";
import MarketplaceActivity from "./pages/marketplace/MarketplaceActivity";
import MarketplaceAnalytics from "./pages/marketplace/MarketplaceAnalytics";

// Governance sub-pages
import GovernanceProposals from "./pages/governance/GovernanceProposals";
import VotingHistory from "./pages/governance/VotingHistory";
import CreateProposal from "./pages/governance/CreateProposal";
import GovernanceTreasury from "./pages/governance/GovernanceTreasury";
import GovernanceDelegates from "./pages/governance/GovernanceDelegates";

// Analytics sub-pages
import AnalyticsMarket from "./pages/analytics/AnalyticsMarket";
import AnalyticsPortfolio from "./pages/analytics/AnalyticsPortfolio";
import AnalyticsDefi from "./pages/analytics/AnalyticsDefi";
import AnalyticsNFT from "./pages/analytics/AnalyticsNFT";
import AnalyticsSocial from "./pages/analytics/AnalyticsSocial";

// AI sub-pages
import AIChat from "./pages/ai/AIChat";
import AIPredictions from "./pages/ai/AIPredictions";
import AIStrategies from "./pages/ai/AIStrategies";
import AIPortfolioOptimizer from "./pages/ai/AIPortfolioOptimizer";
import AIRiskAnalysis from "./pages/ai/AIRiskAnalysis";

// Help sub-pages
import HelpGettingStarted from "./pages/help/HelpGettingStarted";
import HelpTutorials from "./pages/help/HelpTutorials";
import HelpFAQ from "./pages/help/HelpFAQ";
import HelpContact from "./pages/help/HelpContact";
import HelpDocumentation from "./pages/help/HelpDocumentation";

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
            <Route path="/analytics/market" element={<AnalyticsMarket />} />
            <Route path="/analytics/portfolio" element={<AnalyticsPortfolio />} />
            <Route path="/analytics/defi" element={<AnalyticsDefi />} />
            <Route path="/analytics/nft" element={<AnalyticsNFT />} />
            <Route path="/analytics/social" element={<AnalyticsSocial />} />
            
            <Route path="/contract" element={<Contract />} />
            
            <Route path="/governance" element={<Governance />} />
            <Route path="/governance/create" element={<CreateCampaign />} />
            <Route path="/governance/proposals" element={<GovernanceProposals />} />
            <Route path="/governance/voting-history" element={<VotingHistory />} />
            <Route path="/governance/create-proposal" element={<CreateProposal />} />
            <Route path="/governance/treasury" element={<GovernanceTreasury />} />
            <Route path="/governance/delegates" element={<GovernanceDelegates />} />
            
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/tokens" element={<Navigate to="/wallet" replace />} />
            <Route path="/exchange" element={<Navigate to="/trading" replace />} />
            
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/browse" element={<MarketplaceBrowse />} />
            <Route path="/marketplace/auctions" element={<MarketplaceAuctions />} />
            <Route path="/marketplace/my-listings" element={<MyListings />} />
            <Route path="/marketplace/activity" element={<MarketplaceActivity />} />
            <Route path="/marketplace/analytics" element={<MarketplaceAnalytics />} />
            
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading/spot" element={<TradingSpot />} />
            <Route path="/trading/futures" element={<TradingFutures />} />
            <Route path="/trading/options" element={<TradingOptions />} />
            <Route path="/trading/orders" element={<TradingOrders />} />
            <Route path="/trading/strategies" element={<TradingStrategies />} />
            
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/overview" element={<WalletOverview />} />
            <Route path="/wallet/tokens" element={<WalletTokens />} />
            <Route path="/wallet/nfts" element={<WalletNFTs />} />
            <Route path="/wallet/transactions" element={<WalletTransactions />} />
            <Route path="/wallet/addresses" element={<WalletAddresses />} />
            <Route path="/wallet/security" element={<WalletSecurity />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/yield-farming" element={<YieldFarming />} />
            <Route path="/lending" element={<Lending />} />
            
            <Route path="/staking" element={<Staking />} />
            <Route path="/staking/pools" element={<StakingPools />} />
            <Route path="/staking/my-stakes" element={<MyStakes />} />
            <Route path="/staking/rewards" element={<StakingRewards />} />
            <Route path="/staking/validators" element={<Validators />} />
            <Route path="/staking/calculator" element={<StakingCalculator />} />
            
            <Route path="/credit" element={<Credit />} />
            <Route path="/credit/score" element={<CreditScore />} />
            <Route path="/credit/loans" element={<CreditLoans />} />
            <Route path="/credit/applications" element={<CreditApplications />} />
            <Route path="/credit/history" element={<CreditHistory />} />
            <Route path="/credit/collateral" element={<CreditCollateral />} />
            
            <Route path="/crowdfunding" element={<Crowdfunding />} />
            <Route path="/crowdfunding/:id" element={<CrowdfundingCampaign />} />
            <Route path="/crowdfunding/campaigns" element={<CrowdfundingCampaigns />} />
            <Route path="/crowdfunding/my-campaigns" element={<MyCampaigns />} />
            <Route path="/crowdfunding/my-contributions" element={<MyContributions />} />
            <Route path="/crowdfunding/create" element={<CreateCrowdfundingCampaign />} />
            <Route path="/crowdfunding/analytics" element={<CrowdfundingAnalytics />} />
            
            <Route path="/social" element={<Social />} />
            <Route path="/collections" element={<Collections />} />
            
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/ai/chat" element={<AIChat />} />
            <Route path="/ai/predictions" element={<AIPredictions />} />
            <Route path="/ai/strategies" element={<AIStrategies />} />
            <Route path="/ai/portfolio-optimizer" element={<AIPortfolioOptimizer />} />
            <Route path="/ai/risk-analysis" element={<AIRiskAnalysis />} />
            
            <Route path="/notifications" element={<Notifications />} />
            
            <Route path="/help" element={<Help />} />
            <Route path="/help/getting-started" element={<HelpGettingStarted />} />
            <Route path="/help/tutorials" element={<HelpTutorials />} />
            <Route path="/help/faq" element={<HelpFAQ />} />
            <Route path="/help/contact" element={<HelpContact />} />
            <Route path="/help/documentation" element={<HelpDocumentation />} />
            
            <Route path="/security" element={<Security />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/overview" element={<PortfolioOverview />} />
            <Route path="/portfolio/assets" element={<PortfolioAssets />} />
            <Route path="/portfolio/performance" element={<PortfolioPerformance />} />
            <Route path="/portfolio/allocations" element={<PortfolioAllocations />} />
            <Route path="/portfolio/rebalancing" element={<PortfolioRebalancing />} />
            
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
