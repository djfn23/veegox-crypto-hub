
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatsCard } from "@/components/ui/stats-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { PageHeader } from "@/components/layout/PageHeader";
import { Wallet as WalletIcon, TrendingUp, TrendingDown, Clock, Send, ArrowUpDown, Eye, Copy, Plus, Download, Upload } from "lucide-react";

const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState("metamask");

  const wallets = [
    { id: "metamask", name: "MetaMask", balance: "2.45 ETH", usdValue: 6125.50, connected: true, icon: "🦊" },
    { id: "coinbase", name: "Coinbase Wallet", balance: "1,250 USDC", usdValue: 1250.00, connected: true, icon: "🔷" },
    { id: "walletconnect", name: "WalletConnect", balance: "0.00 ETH", usdValue: 0.00, connected: false, icon: "🔗" }
  ];

  const assets = [
    { symbol: "ETH", name: "Ethereum", balance: 2.45, value: 6125.50, change: "+5.2%", changeType: "positive" as const, color: "from-blue-500 to-purple-600" },
    { symbol: "BTC", name: "Bitcoin", balance: 0.125, value: 5625.00, change: "+3.8%", changeType: "positive" as const, color: "from-orange-500 to-yellow-500" },
    { symbol: "USDC", name: "USD Coin", balance: 1250, value: 1250.00, change: "0.0%", changeType: "neutral" as const, color: "from-blue-400 to-blue-600" },
    { symbol: "UNI", name: "Uniswap", balance: 45, value: 315.00, change: "-2.1%", changeType: "negative" as const, color: "from-pink-500 to-purple-600" }
  ];

  const transactions = [
    { type: "send", amount: "-0.1 ETH", to: "0x742d...9bc2", time: "Il y a 2h", status: "confirmé", hash: "0x123...abc" },
    { type: "receive", amount: "+500 USDC", from: "0x123a...4def", time: "Il y a 5h", status: "confirmé", hash: "0x456...def" },
    { type: "swap", amount: "0.2 ETH → 350 USDC", via: "Uniswap", time: "Hier", status: "confirmé", hash: "0x789...ghi" },
    { type: "stake", amount: "1.0 ETH", to: "Lido", time: "Il y a 2 jours", status: "confirmé", hash: "0xabc...123" }
  ];

  const totalValue = wallets.reduce((sum, wallet) => sum + wallet.usdValue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Mon Portefeuille"
          subtitle="Gérez vos actifs crypto en toute sécurité"
          icon={<WalletIcon className="h-8 w-8 text-purple-400" />}
          actions={
            <div className="flex space-x-3">
              <GradientButton variant="outline" size="sm">
                <Download className="h-4 w-4" />
                Exporter
              </GradientButton>
              <GradientButton variant="primary" size="sm">
                <Plus className="h-4 w-4" />
                Connecter Wallet
              </GradientButton>
            </div>
          }
        />

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Valeur Totale"
            value={<AnimatedNumber value={totalValue} prefix="$" suffix="" className="text-3xl font-bold text-white" />}
            change="+$425.50 (+3.3%)"
            changeType="positive"
            icon={<TrendingUp className="h-6 w-6 text-green-400" />}
            variant="primary"
          />

          <StatsCard
            title="Portefeuilles"
            value={wallets.filter(w => w.connected).length}
            icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
            variant="secondary"
          />

          <StatsCard
            title="Actifs"
            value={assets.length}
            icon={<Eye className="h-6 w-6 text-purple-400" />}
            variant="accent"
          />

          <StatsCard
            title="Transactions"
            value="24h"
            change="+12"
            changeType="positive"
            icon={<ArrowUpDown className="h-6 w-6 text-pink-400" />}
          />
        </div>

        <Tabs defaultValue="assets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
            <TabsTrigger value="assets" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
              Actifs
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="wallets" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
              Portefeuilles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="mt-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Mes Actifs</h3>
                <div className="flex space-x-2">
                  <GradientButton variant="ghost" size="sm">
                    <Upload className="h-4 w-4" />
                    Déposer
                  </GradientButton>
                  <GradientButton variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                    Retirer
                  </GradientButton>
                </div>
              </div>
              
              <div className="space-y-4">
                {assets.map((asset) => (
                  <GlassCard key={asset.symbol} className="p-4 hover:scale-[1.01] transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${asset.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-lg">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">{asset.name}</div>
                          <div className="text-gray-400 text-sm">{asset.balance} {asset.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold text-lg">
                          <AnimatedNumber value={asset.value} prefix="$" />
                        </div>
                        <div className={`text-sm font-medium ${
                          asset.changeType === 'positive' ? 'text-green-400' : 
                          asset.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {asset.change}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Historique des Transactions</h3>
                <GradientButton variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                  Exporter CSV
                </GradientButton>
              </div>
              
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <GlassCard key={index} className="p-4 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                          {tx.type === 'send' && <Send className="h-5 w-5 text-red-400" />}
                          {tx.type === 'receive' && <TrendingDown className="h-5 w-5 text-green-400" />}
                          {tx.type === 'swap' && <ArrowUpDown className="h-5 w-5 text-blue-400" />}
                          {tx.type === 'stake' && <Clock className="h-5 w-5 text-purple-400" />}
                        </div>
                        <div>
                          <div className="text-white font-semibold capitalize">{tx.type}</div>
                          <div className="text-gray-400 text-sm">{tx.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{tx.amount}</div>
                        <Badge variant="secondary" className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="wallets" className="mt-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Gestion des Portefeuilles</h3>
                <GradientButton variant="primary" size="sm">
                  <Plus className="h-4 w-4" />
                  Nouveau Wallet
                </GradientButton>
              </div>
              
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <GlassCard key={wallet.id} className="p-4 hover:scale-[1.01] transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-2xl">{wallet.icon}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">{wallet.name}</div>
                          <div className="text-gray-400 text-sm">{wallet.balance}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            <AnimatedNumber value={wallet.usdValue} prefix="$" />
                          </div>
                          <Badge 
                            variant={wallet.connected ? "default" : "secondary"}
                            className={wallet.connected ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                          >
                            {wallet.connected ? "Connecté" : "Déconnecté"}
                          </Badge>
                        </div>
                        <GradientButton 
                          variant={wallet.connected ? "outline" : "primary"}
                          size="sm"
                        >
                          {wallet.connected ? "Déconnecter" : "Connecter"}
                        </GradientButton>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
