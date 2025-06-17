
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientOnlyProviders } from "@/components/providers/ClientOnlyProviders";

// Import pages principales
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';
import PaymentCanceled from './pages/PaymentCanceled';
import PaymentSuccess from './pages/PaymentSuccess';
import Trading from './pages/Trading';
import Wallet from './pages/Wallet';
import CryptoBank from './pages/CryptoBank';
import Credit from './pages/Credit';
import Crowdfunding from './pages/Crowdfunding';
import Governance from './pages/Governance';
import Social from './pages/Social';
import Settings from './pages/Settings';
import Tokens from './pages/Tokens';
import Marketplace from './pages/Marketplace';
import Collections from './pages/Collections';
import Staking from './pages/Staking';
import Contract from './pages/Contract';
import Notifications from './pages/Notifications';
import APITest from './pages/APITest';
import CrowdfundingCampaign from './pages/CrowdfundingCampaign';

// Import sous-pages Credit
import CreditScore from './pages/credit/CreditScore';
import CreditLoans from './pages/credit/CreditLoans';
import CreditHistory from './pages/credit/CreditHistory';
import CreditApplications from './pages/credit/CreditApplications';
import CreditCollateral from './pages/credit/CreditCollateral';

// Import sous-pages Crowdfunding
import CreateCrowdfundingCampaign from './pages/crowdfunding/CreateCrowdfundingCampaign';
import CrowdfundingCampaigns from './pages/crowdfunding/CrowdfundingCampaigns';
import CrowdfundingFeatured from './pages/crowdfunding/CrowdfundingFeatured';
import CrowdfundingTrending from './pages/crowdfunding/CrowdfundingTrending';
import CrowdfundingAnalytics from './pages/crowdfunding/CrowdfundingAnalytics';
import CrowdfundingCategories from './pages/crowdfunding/CrowdfundingCategories';
import MyCampaigns from './pages/crowdfunding/MyCampaigns';
import MyContributions from './pages/crowdfunding/MyContributions';

// Import sous-pages Trading
import TradingSpot from './pages/trading/TradingSpot';
import TradingFutures from './pages/trading/TradingFutures';
import TradingOptions from './pages/trading/TradingOptions';
import TradingOrders from './pages/trading/TradingOrders';
import TradingStrategies from './pages/trading/TradingStrategies';

// Import sous-pages Tokens
import CreateToken from './pages/tokens/CreateToken';
import ManageTokens from './pages/tokens/ManageTokens';
import TokenAnalytics from './pages/tokens/TokenAnalytics';
import TokenMarketplace from './pages/tokens/TokenMarketplace';

// Import autres pages
import About from './pages/About';
import Help from './pages/Help';
import Legal from './pages/Legal';
import Profile from './pages/Profile';
import Security from './pages/Security';
import Community from './pages/Community';
import AIAssistant from './pages/AIAssistant';
import YieldFarming from './pages/YieldFarming';
import Lending from './pages/Lending';
import Bridge from './pages/Bridge';
import Liquidity from './pages/Liquidity';
import Automation from './pages/Automation';
import BlockchainDashboard from './pages/BlockchainDashboard';
import CreateCampaign from './pages/CreateCampaign';
import CreateNFT from './pages/CreateNFT';
import MyNFTs from './pages/MyNFTs';
import NotFound from './pages/NotFound';

// Toaster avec lazy loading sécurisé
const LazyToaster = React.lazy(() =>
  import('@/components/ui/sonner').then(module => ({ default: module.Toaster }))
);

// Composant Toaster sécurisé qui ne charge qu'après l'hydratation
function SafeToaster() {
  const [canRender, setCanRender] = React.useState(false);

  React.useEffect(() => {
    // S'assure que l'hydratation est complète avant de charger Sonner
    const timer = setTimeout(() => {
      setCanRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!canRender) return null;

  return (
    <React.Suspense fallback={null}>
      <LazyToaster />
    </React.Suspense>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientOnlyProviders>
        <Routes>
          {/* Page principale */}
          <Route path="/" element={<Index />} />
          
          {/* Pages principales */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/crypto-bank" element={<CryptoBank />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/community" element={<Community />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/social" element={<Social />} />
          
          {/* Pages Credit */}
          <Route path="/credit" element={<Credit />} />
          <Route path="/credit/score" element={<CreditScore />} />
          <Route path="/credit/loans" element={<CreditLoans />} />
          <Route path="/credit/history" element={<CreditHistory />} />
          <Route path="/credit/applications" element={<CreditApplications />} />
          <Route path="/credit/collateral" element={<CreditCollateral />} />
          
          {/* Pages Crowdfunding */}
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/crowdfunding/campaigns" element={<CrowdfundingCampaigns />} />
          <Route path="/crowdfunding/create" element={<CreateCrowdfundingCampaign />} />
          <Route path="/crowdfunding/featured" element={<CrowdfundingFeatured />} />
          <Route path="/crowdfunding/trending" element={<CrowdfundingTrending />} />
          <Route path="/crowdfunding/analytics" element={<CrowdfundingAnalytics />} />
          <Route path="/crowdfunding/categories" element={<CrowdfundingCategories />} />
          <Route path="/crowdfunding/my-campaigns" element={<MyCampaigns />} />
          <Route path="/crowdfunding/my-contributions" element={<MyContributions />} />
          <Route path="/crowdfunding/campaign/:id" element={<CrowdfundingCampaign />} />
          
          {/* Pages Trading */}
          <Route path="/trading/spot" element={<TradingSpot />} />
          <Route path="/trading/futures" element={<TradingFutures />} />
          <Route path="/trading/options" element={<TradingOptions />} />
          <Route path="/trading/orders" element={<TradingOrders />} />
          <Route path="/trading/strategies" element={<TradingStrategies />} />
          
          {/* Pages Tokens */}
          <Route path="/tokens/create" element={<CreateToken />} />
          <Route path="/tokens/manage" element={<ManageTokens />} />
          <Route path="/tokens/analytics" element={<TokenAnalytics />} />
          <Route path="/tokens/marketplace" element={<TokenMarketplace />} />
          
          {/* Pages DeFi */}
          <Route path="/yield-farming" element={<YieldFarming />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/liquidity" element={<Liquidity />} />
          <Route path="/automation" element={<Automation />} />
          
          {/* Pages Blockchain */}
          <Route path="/blockchain" element={<BlockchainDashboard />} />
          
          {/* Pages NFT */}
          <Route path="/create-nft" element={<CreateNFT />} />
          <Route path="/my-nfts" element={<MyNFTs />} />
          
          {/* Pages utilitaires */}
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/api-test" element={<APITest />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          
          {/* Pages informatives */}
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/legal" element={<Legal />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SafeToaster />
      </ClientOnlyProviders>
    </BrowserRouter>
  </React.StrictMode>
);
