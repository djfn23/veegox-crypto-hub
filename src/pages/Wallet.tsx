
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Clock, Send, ArrowUpDown, Eye, Copy } from "lucide-react";

const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState("metamask");

  const wallets = [
    { id: "metamask", name: "MetaMask", balance: "2.45 ETH", usdValue: "$6,125.50", connected: true },
    { id: "coinbase", name: "Coinbase Wallet", balance: "1,250 USDC", usdValue: "$1,250.00", connected: true },
    { id: "walletconnect", name: "WalletConnect", balance: "0.00 ETH", usdValue: "$0.00", connected: false }
  ];

  const assets = [
    { symbol: "ETH", name: "Ethereum", balance: "2.45", value: "$6,125.50", change: "+5.2%" },
    { symbol: "BTC", name: "Bitcoin", balance: "0.125", value: "$5,625.00", change: "+3.8%" },
    { symbol: "USDC", name: "USD Coin", balance: "1,250", value: "$1,250.00", change: "0.0%" },
    { symbol: "UNI", name: "Uniswap", balance: "45", value: "$315.00", change: "-2.1%" }
  ];

  const transactions = [
    { type: "send", amount: "-0.1 ETH", to: "0x742d...9bc2", time: "Il y a 2h", status: "confirmé" },
    { type: "receive", amount: "+500 USDC", from: "0x123a...4def", time: "Il y a 5h", status: "confirmé" },
    { type: "swap", amount: "0.2 ETH → 350 USDC", via: "Uniswap", time: "Hier", status: "confirmé" },
    { type: "stake", amount: "1.0 ETH", to: "Lido", time: "Il y a 2 jours", status: "confirmé" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <WalletIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Mon Portefeuille</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Valeur Totale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">$13,315.50</div>
              <p className="text-green-400 text-sm">+$425.50 (+3.3%) aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Portefeuilles Connectés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">2</div>
              <p className="text-gray-400 text-sm">MetaMask, Coinbase Wallet</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Nombre d'Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">4</div>
              <p className="text-gray-400 text-sm">ETH, BTC, USDC, UNI</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="assets" className="text-white">Actifs</TabsTrigger>
            <TabsTrigger value="transactions" className="text-white">Transactions</TabsTrigger>
            <TabsTrigger value="wallets" className="text-white">Portefeuilles</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Mes Actifs</CardTitle>
                <CardDescription className="text-gray-300">
                  Vue d'ensemble de vos cryptomonnaies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{asset.name}</div>
                          <div className="text-gray-400 text-sm">{asset.balance} {asset.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{asset.value}</div>
                        <div className={`text-sm ${asset.change.startsWith('+') ? 'text-green-400' : asset.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                          {asset.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Historique des Transactions</CardTitle>
                <CardDescription className="text-gray-300">
                  Vos dernières activités on-chain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          {tx.type === 'send' && <Send className="h-4 w-4 text-red-400" />}
                          {tx.type === 'receive' && <TrendingDown className="h-4 w-4 text-green-400" />}
                          {tx.type === 'swap' && <ArrowUpDown className="h-4 w-4 text-blue-400" />}
                          {tx.type === 'stake' && <Clock className="h-4 w-4 text-purple-400" />}
                        </div>
                        <div>
                          <div className="text-white font-semibold capitalize">{tx.type}</div>
                          <div className="text-gray-400 text-sm">{tx.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{tx.amount}</div>
                        <Badge variant="secondary" className="mt-1">{tx.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallets" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Gestion des Portefeuilles</CardTitle>
                <CardDescription className="text-gray-300">
                  Connectez et gérez vos portefeuilles crypto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wallets.map((wallet) => (
                    <div key={wallet.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <WalletIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{wallet.name}</div>
                          <div className="text-gray-400 text-sm">{wallet.balance}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white">{wallet.usdValue}</div>
                          <Badge variant={wallet.connected ? "default" : "secondary"}>
                            {wallet.connected ? "Connecté" : "Déconnecté"}
                          </Badge>
                        </div>
                        <Button 
                          variant={wallet.connected ? "outline" : "default"}
                          size="sm"
                        >
                          {wallet.connected ? "Déconnecter" : "Connecter"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
