
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, Send, ArrowDownLeft, Eye, Copy } from "lucide-react";

const WalletPage = () => {
  return (
    <PageLayout
      title="Portefeuille"
      subtitle="Gérez vos actifs numériques"
      icon={<Wallet className="h-6 w-6" />}
    >
      <div className="space-y-6">
        {/* Solde principal */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Solde Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-white">$12,345.67</div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  +2.3% (24h)
                </Badge>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
                <Button variant="outline" className="text-white border-white/20">
                  <ArrowDownLeft className="h-4 w-4 mr-2" />
                  Recevoir
                </Button>
                <Button variant="outline" className="text-white border-white/20">
                  <Plus className="h-4 w-4 mr-2" />
                  Acheter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Adresse du wallet */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Adresse du Portefeuille</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <code className="bg-slate-800 px-3 py-2 rounded text-sm text-gray-300 flex-1">
                0x1234...abcd
              </code>
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tokens */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Mes Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ethereum", symbol: "ETH", amount: "2.5", value: "$5,234.50" },
                { name: "Bitcoin", symbol: "BTC", amount: "0.15", value: "$6,234.50" },
                { name: "USDC", symbol: "USDC", amount: "875.67", value: "$875.67" }
              ].map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <div>
                      <div className="text-white font-medium">{token.name}</div>
                      <div className="text-gray-400 text-sm">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{token.amount} {token.symbol}</div>
                    <div className="text-gray-400 text-sm">{token.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default WalletPage;
