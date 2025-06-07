
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Clock, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Bridge = () => {
  const [amount, setAmount] = useState("");
  const [fromChain, setFromChain] = useState("polygon");
  const [toChain, setToChain] = useState("ethereum");

  const chains = [
    { id: "ethereum", name: "Ethereum", icon: "🔷", fee: "~$15" },
    { id: "polygon", name: "Polygon", icon: "🟣", fee: "~$0.01" },
    { id: "arbitrum", name: "Arbitrum", icon: "🔵", fee: "~$2" },
    { id: "base", name: "Base", icon: "🔷", fee: "~$1" }
  ];

  const getChainInfo = (chainId: string) => chains.find(c => c.id === chainId);

  return (
    <PageLayout
      title="Bridge Multi-Chain"
      subtitle="Transférez vos actifs entre différentes blockchains en toute sécurité"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Bridge Form */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Transfert Cross-Chain
            </CardTitle>
            <CardDescription>
              Transférez vos tokens entre blockchains compatibles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Chain */}
            <div className="space-y-2">
              <Label className="text-gray-300">De</Label>
              <div className="flex gap-2">
                <Select value={fromChain} onValueChange={setFromChain}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map((chain) => (
                      <SelectItem key={chain.id} value={chain.id}>
                        <div className="flex items-center gap-2">
                          <span>{chain.icon}</span>
                          <span>{chain.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {chain.fee}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Balance: 2.45 ETH sur {getChainInfo(fromChain)?.name}
              </p>
            </div>

            {/* Switch Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 rounded-full"
                onClick={() => {
                  const temp = fromChain;
                  setFromChain(toChain);
                  setToChain(temp);
                }}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Chain */}
            <div className="space-y-2">
              <Label className="text-gray-300">Vers</Label>
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chains.filter(c => c.id !== fromChain).map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center gap-2">
                        <span>{chain.icon}</span>
                        <span>{chain.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {chain.fee}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                Vous recevrez: ~{amount || "0.0"} ETH sur {getChainInfo(toChain)?.name}
              </p>
            </div>

            {/* Transaction Details */}
            {amount && (
              <div className="bg-gray-900/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Frais de bridge:</span>
                  <span className="text-white">0.001 ETH (~$2.50)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Temps estimé:</span>
                  <span className="text-white flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    5-10 minutes
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vous recevrez:</span>
                  <span className="text-white font-semibold">
                    {(parseFloat(amount) - 0.001).toFixed(3)} ETH
                  </span>
                </div>
              </div>
            )}

            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Initier le transfert
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Sécurisé</h3>
              <p className="text-gray-400 text-sm">Protocole audité et sécurisé</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Rapide</h3>
              <p className="text-gray-400 text-sm">Transferts en quelques minutes</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-4 text-center">
              <ArrowUpDown className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Multi-Chain</h3>
              <p className="text-gray-400 text-sm">Support de 10+ blockchains</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Bridge;
