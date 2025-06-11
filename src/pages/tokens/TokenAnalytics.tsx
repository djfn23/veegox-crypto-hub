
import { PageLayout } from "@/components/layout/PageLayout";
import { BarChart3 } from "lucide-react";
import { TokenAnalyticsModule } from "@/components/modules/tokens/TokenAnalyticsModule";

const TokenAnalytics = () => {
  return (
    <PageLayout
      title="Analyses de Tokens"
      subtitle="Analysez les performances de vos tokens"
      icon={<BarChart3 className="h-6 w-6 text-green-400" />}
    >
      <TokenAnalyticsModule />
    </PageLayout>
  );
};

export default TokenAnalytics;
