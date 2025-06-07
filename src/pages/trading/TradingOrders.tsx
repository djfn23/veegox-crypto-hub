
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, X } from "lucide-react";

const TradingOrders = () => {
  const openOrders = [
    { id: "1", pair: "BTC/USDT", type: "Limit", side: "Buy", amount: "0.1", price: "42,000", status: "Open" },
    { id: "2", pair: "ETH/USDT", type: "Stop", side: "Sell", amount: "2.5", price: "2,500", status: "Open" },
  ];

  const orderHistory = [
    { id: "3", pair: "VEEGOX/USDT", type: "Market", side: "Buy", amount: "100", price: "12.45", status: "Filled", time: "2024-01-15 14:30" },
    { id: "4", pair: "ADA/USDT", type: "Limit", side: "Sell", amount: "500", price: "0.48", status: "Filled", time: "2024-01-15 12:15" },
  ];

  return (
    <PageLayout
      title="Gestion des Ordres"
      subtitle="Suivez vos ordres actifs et votre historique"
      icon={<History className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        {/* Active Orders */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Ordres Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {openOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{order.pair}</p>
                      <p className="text-gray-400 text-sm">{order.type} • {order.side}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">{order.amount}</p>
                    <p className="text-gray-400 text-sm">Montant</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">${order.price}</p>
                    <p className="text-gray-400 text-sm">Prix</p>
                  </div>
                  
                  <Badge className="bg-yellow-600">
                    {order.status}
                  </Badge>
                  
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {openOrders.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Aucun ordre actif</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Historique des Ordres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{order.pair}</p>
                      <p className="text-gray-400 text-sm">{order.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">{order.type}</p>
                    <p className="text-gray-400 text-sm">Type</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">{order.side}</p>
                    <p className="text-gray-400 text-sm">Côté</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">{order.amount}</p>
                    <p className="text-gray-400 text-sm">Montant</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white">${order.price}</p>
                    <p className="text-gray-400 text-sm">Prix</p>
                  </div>
                  
                  <Badge className="bg-green-600">
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TradingOrders;
