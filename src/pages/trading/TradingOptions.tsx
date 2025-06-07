
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const TradingOptions = () => {
  return (
    <PageLayout
      title="Trading d'Options"
      subtitle="Options sur cryptomonnaies"
      icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
    >
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-12">
          <div className="text-center">
            <TrendingUp className="h-20 w-20 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Trading d'Options</h3>
            <p className="text-gray-400">Cette fonctionnalité sera disponible prochainement</p>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default TradingOptions;
