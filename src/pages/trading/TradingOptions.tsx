
import { PageLayout } from "@/components/layout/PageLayout";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TradingOptions = () => {
  return (
    <PageLayout
      title="Trading Options"
      subtitle="Trading d'options sur crypto-monnaies"
      icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Options Call</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">BTC Call $45,000</span>
                  <Badge className="bg-green-500">ITM</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ETH Call $2,700</span>
                  <Badge className="bg-red-500">OTM</Badge>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Acheter Call
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Options Put</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">BTC Put $42,000</span>
                  <Badge className="bg-red-500">OTM</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ETH Put $2,500</span>
                  <Badge className="bg-green-500">ITM</Badge>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Acheter Put
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Mes Positions Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-400">Aucune position d'options active</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                Explorer les Options
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TradingOptions;
