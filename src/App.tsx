
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/bridge" element={<Bridge />} />
            <Route path="/yield-farming" element={<YieldFarming />} />
            <Route path="/lending" element={<Lending />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/credit" element={<Credit />} />
            <Route path="/crowdfunding" element={<Crowdfunding />} />
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
