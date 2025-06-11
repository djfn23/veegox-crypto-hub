
import { PageLayout } from "@/components/layout/PageLayout";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TradingFutures = () => {
  return (
    <PageLayout
      title="Trading Futures"
      subtitle="Trading de contrats à terme avec effet de levier"
      icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contrats Futures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">BTCUSDT Perpetual</span>
                <Badge className="bg-orange-500">x100</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">ETHUSDT Perpetual</span>
                <Badge className="bg-orange-500">x50</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">MATICUSDT Perpetual</span>
                <Badge className="bg-orange-500">x25</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Positions Ouvertes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-400">Aucune position ouverte</p>
                <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                  Ouvrir une Position
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Gestion des Risques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Marge disponible</span>
                <span className="text-white">$1,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Marge utilisée</span>
                <span className="text-white">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PnL total</span>
                <span className="text-green-400">+$0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default TradingFutures;
