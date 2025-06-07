
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, 
  Zap, 
  Clock, 
  Shield, 
  ChevronDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const chains = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', color: 'bg-blue-600', fee: '~$15.00' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', color: 'bg-purple-600', fee: '~$0.01' },
  { id: 56, name: 'BSC', symbol: 'BNB', color: 'bg-yellow-600', fee: '~$0.30' },
  { id: 43114, name: 'Avalanche', symbol: 'AVAX', color: 'bg-red-600', fee: '~$0.50' }
];

const Bridge = () => {
  return (
    <PageLayout
      title="Bridge Inter-Chaînes"
      subtitle="Transférez vos actifs entre différentes blockchains en toute sécurité"
      icon={<ArrowUpDown className="h-6 w-6 text-blue-400" />}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Bridge Interface */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-blue-400" />
              Bridge Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Chain */}
            <div className="space-y-3">
              <Label className="text-gray-300">De</Label>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2 border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  Ethereum
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="0.0" 
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  VEEGOX
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Balance: 125,000 VEEGOX (~$5,625.00)</p>
            </div>

            {/* Swap Direction */}
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 border-white/20">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* To Chain */}
            <div className="space-y-3">
              <Label className="text-gray-300">Vers</Label>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                  Polygon
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Input 
                  placeholder="0.0" 
                  className="bg-white/5 border-white/10 text-white"
                  value="1,000"
                  readOnly
                />
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                  VEEGOX
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Vous recevrez: ~1,000 VEEGOX</p>
            </div>

            {/* Bridge Details */}
            <div className="bg-white/5 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Taux de change</span>
                <span className="text-white">1:1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Frais de bridge</span>
                <span className="text-white">0.1% (~$5.63)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Frais de gas (source)</span>
                <span className="text-white">~$15.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temps estimé</span>
                <span className="text-green-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  5-10 minutes
                </span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Zap className="h-4 w-4 mr-2" />
              Initier le Bridge
            </Button>
          </CardContent>
        </Card>

        {/* Bridge Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-white font-medium">Sécurisé</h3>
                  <p className="text-green-300 text-sm">Protocole audité et décentralisé</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-medium">Rapide</h3>
                  <p className="text-blue-300 text-sm">Transferts en 5-10 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supported Chains */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Chaînes Supportées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {chains.map((chain) => (
                <div key={chain.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${chain.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">{chain.symbol.slice(0, 2)}</span>
                    </div>
                    <span className="text-white font-medium">{chain.name}</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-green-600/20 text-green-300 mb-1">
                      Actif
                    </Badge>
                    <p className="text-gray-400 text-xs">{chain.fee}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Transactions Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { from: 'Ethereum', to: 'Polygon', amount: '500 VEEGOX', status: 'Completed', time: '2h ago' },
                { from: 'Polygon', to: 'BSC', amount: '1,200 USDC', status: 'Processing', time: '5m ago' },
                { from: 'BSC', to: 'Ethereum', amount: '0.5 ETH', status: 'Failed', time: '1d ago' }
              ].map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ArrowUpDown className="h-4 w-4 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{tx.from} → {tx.to}</p>
                      <p className="text-gray-400 text-sm">{tx.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary" 
                      className={`mb-1 ${
                        tx.status === 'Completed' ? 'bg-green-600/20 text-green-300' :
                        tx.status === 'Processing' ? 'bg-yellow-600/20 text-yellow-300' :
                        'bg-red-600/20 text-red-300'
                      }`}
                    >
                      {tx.status === 'Completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {tx.status === 'Failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {tx.status}
                    </Badge>
                    <p className="text-gray-400 text-xs">{tx.time}</p>
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

export default Bridge;
