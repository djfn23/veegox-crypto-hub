
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Bridge as BridgeIcon, AlertCircle } from "lucide-react";

const Bridge = () => {
  return (
    <PageLayout
      title="Bridge"
      subtitle="Transférez vos actifs entre différentes blockchains"
      icon={<BridgeIcon className="h-6 w-6" />}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Transfert Inter-Chaînes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Réseau source */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">De</label>
              <Select>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Sélectionner le réseau source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bouton d'échange */}
            <div className="flex justify-center">
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Réseau destination */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Vers</label>
              <Select>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Sélectionner le réseau destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Montant */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Montant</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="0.0"
                  className="flex-1 bg-slate-800 border-slate-600 text-white"
                />
                <Select>
                  <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="veegox">VEEGOX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Informations de transfert */}
            <Card className="bg-slate-800 border-slate-600">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Frais de bridge</span>
                  <span className="text-white">0.005 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Temps estimé</span>
                  <span className="text-white">5-10 minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vous recevrez</span>
                  <span className="text-white">~0.995 ETH</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Lancer le Transfert
            </Button>
          </CardContent>
        </Card>

        {/* Avertissement */}
        <Card className="bg-orange-900/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 mt-1" />
              <div>
                <h3 className="text-orange-300 font-medium mb-1">Important</h3>
                <p className="text-orange-200 text-sm">
                  Vérifiez toujours les adresses et les réseaux avant de confirmer un transfert.
                  Les transferts entre blockchains sont irréversibles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Bridge;
