
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientButton } from "@/components/ui/gradient-button";
import { PageHeader } from "@/components/layout/PageHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { AssetsTab } from "@/components/wallet/AssetsTab";
import { TransactionsTab } from "@/components/wallet/TransactionsTab";
import { WalletsTab } from "@/components/wallet/WalletsTab";
import { Wallet as WalletIcon, Download, Plus } from "lucide-react";

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

  return (
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

      <WalletOverview wallets={wallets} assetsCount={assets.length} />

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
          <AssetsTab assets={assets} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab transactions={transactions} />
        </TabsContent>

        <TabsContent value="wallets" className="mt-6">
          <WalletsTab wallets={wallets} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
