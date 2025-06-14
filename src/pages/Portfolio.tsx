import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VeegoxTokenCard } from "@/components/veegox/VeegoxTokenCard";
import { FiatBalanceModule } from "@/components/modules/fiat/FiatBalanceModule";
import { RevenueDashboard } from "@/components/modules/revenue/RevenueDashboard";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PortfolioAllocationChart } from "@/components/portfolio/PortfolioAllocationChart";
import { PortfolioPerformanceChart } from "@/components/portfolio/PortfolioPerformanceChart";
import { TopHoldingsCard } from "@/components/portfolio/TopHoldingsCard";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { UnifiedTransactionHistory } from "@/components/stripe/UnifiedTransactionHistory";

const Portfolio = () => {
  const { session } = useUnifiedAuth();
  const isAdmin = session?.user?.user_metadata?.role === 'admin';
  const headerConfig = PortfolioHeader();

  return (
    <PageLayout
      title={headerConfig.title}
      subtitle={headerConfig.subtitle}
      icon={headerConfig.icon}
      actions={headerConfig.actions}
    >
      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-700">
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-700">
            Transactions Stripe
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="revenue" className="data-[state=active]:bg-slate-700">
              Revenus Platform
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          {/* Fiat Balance Module */}
          <FiatBalanceModule />

          {/* Stats Overview */}
          <PortfolioStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PortfolioAllocationChart />
            <PortfolioPerformanceChart />
          </div>

          {/* Veegox Token Highlight */}
          <VeegoxTokenCard />

          {/* Top Holdings */}
          <TopHoldingsCard />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <UnifiedTransactionHistory />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="revenue" className="space-y-6">
            <RevenueDashboard />
          </TabsContent>
        )}
      </Tabs>
    </PageLayout>
  );
};

export default Portfolio;
