
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle } from "lucide-react";

const TradingFutures = () => {
  return (
    <PageLayout
      title="Trading de Contrats à Terme"
      subtitle="Trading avec effet de levier sur les cryptomonnaies"
      icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
    >
      <div className="space-y-6">
        <Card className="bg-amber-900/20 border-amber-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 mt-1" />
              <div>
                <h3 className="text-amber-300 font-semibold mb-2">Avertissement sur les Risques</h3>
                <p className="text-amber-200 text-sm">
                  Le trading de contrats à terme implique des risques élevés en raison de l'effet de levier. 
                  Vous pourriez perdre plus que votre investissement initial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Contrats Perpétuels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["BTC-PERP", "ETH-PERP", "VEEGOX-PERP"].map((contract) => (
                  <div key={contract} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium">{contract}</span>
                    <Badge className="bg-orange-600">Levier 50x</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Contrats à Terme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["BTC-0329", "ETH-0329", "VEEGOX-0329"].map((contract) => (
                  <div key={contract} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white font-medium">{contract}</span>
                    <Badge variant="secondary">Exp: Mars 29</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-8">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Trading de Futures</h3>
              <p className="text-gray-400">Cette fonctionnalité sera disponible prochainement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TradingFutures;
