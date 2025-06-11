
import { PageLayout } from "@/components/layout/PageLayout";
import { TradingInterface } from "@/components/trading/TradingInterface";
import { TradingNavigation } from "@/components/trading/TradingNavigation";
import { TrendingUp } from "lucide-react";

const Trading = () => {
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
