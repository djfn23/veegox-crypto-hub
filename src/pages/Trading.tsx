
import { PageLayout } from "@/components/layout/PageLayout";
import { TradingInterface } from "@/components/trading/TradingInterface";
import { TrendingUp } from "lucide-react";

const Trading = () => {
  return (
    <PageLayout
      title="Trading"
      subtitle="Interface de trading avancée pour l'écosystème Veegox"
      icon={<TrendingUp className="h-6 w-6 text-green-400" />}
    >
      <TradingInterface />
    </PageLayout>
  );
};

export default Trading;
