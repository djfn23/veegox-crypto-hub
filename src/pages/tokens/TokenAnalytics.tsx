
import { PageLayout } from "@/components/layout/PageLayout";
import { BarChart3 } from "lucide-react";
import TokenNavigation from "@/components/modules/tokens/TokenNavigation";
import TokenAnalyticsModule from "@/components/modules/tokens/TokenAnalyticsModule";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TokenAnalytics() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Analytics Tokens"
      subtitle="Analyses et métriques de performance de vos tokens"
      icon={<BarChart3 className="h-6 w-6 text-purple-400" />}
    >
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {!isMobile && (
          <div className="lg:col-span-1">
            <TokenNavigation />
          </div>
        )}
        
        <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
          {isMobile && (
            <div className="mb-4">
              <TokenNavigation />
            </div>
          )}
          <TokenAnalyticsModule />
        </div>
      </div>
    </PageLayout>
  );
}
