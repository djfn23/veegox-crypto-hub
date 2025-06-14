
import { PageLayout } from "@/components/layout/PageLayout";
import { TradingInterface } from "@/components/trading/TradingInterface";
import { TradingNavigation } from "@/components/trading/TradingNavigation";
import { TrendingUp } from "lucide-react";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/ui/mobile-tabs";

const Trading = () => {
  const { isMobile } = useResponsiveLayout();

  if (isMobile) {
    return (
      <PageLayout
        title="Trading"
        subtitle="Interface de trading mobile optimisée"
        icon={<TrendingUp className="h-6 w-6 text-green-400" />}
      >
        <MobileTabs defaultValue="spot" className="w-full">
          <MobileTabsList>
            <MobileTabsTrigger value="spot" icon={<TrendingUp className="h-4 w-4" />}>
              Spot Trading
            </MobileTabsTrigger>
            <MobileTabsTrigger value="futures" icon={<TrendingUp className="h-4 w-4" />}>
              Futures
            </MobileTabsTrigger>
          </MobileTabsList>
          
          <MobileTabsContent value="spot">
            <TradingInterface />
          </MobileTabsContent>
          
          <MobileTabsContent value="futures">
            <div className="text-center py-12 text-gray-400">
              <TrendingUp className="h-12 w-12 mx-auto mb-4" />
              <p>Trading Futures bientôt disponible</p>
            </div>
          </MobileTabsContent>
        </MobileTabs>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Trading"
      subtitle="Interface de trading avancée pour l'écosystème Veegox"
      icon={<TrendingUp className="h-6 w-6 text-green-400" />}
    >
      <div className="space-y-6">
        <TradingNavigation />
        <TradingInterface />
      </div>
    </PageLayout>
  );
};

export default Trading;
