
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientButton } from "@/components/ui/gradient-button";
import { PageHeader } from "@/components/layout/PageHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { AssetsTab } from "@/components/wallet/AssetsTab";
import { TransactionsTab } from "@/components/wallet/TransactionsTab";
import { WalletsTab } from "@/components/wallet/WalletsTab";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { Wallet as WalletIcon, Download, Plus } from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const { connectedWallets, isConnecting, connectWallet, disconnectWallet } = useWalletConnection();
  
  // Ajouter des wallets par défaut non connectés pour l'interface
  const defaultWallets = [
    { id: "metamask", name: "MetaMask", address: "", chainId: 1, connected: false, icon: "🦊" },
    { id: "coinbase", name: "Coinbase Wallet", address: "", chainId: 1, connected: false, icon: "🔷" },
    { id: "walletconnect", name: "WalletConnect", address: "", chainId: 1, connected: false, icon: "🔗" }
  ];

  // Fusionner les wallets connectés avec les wallets par défaut
  const allWallets = defaultWallets.map(defaultWallet => {
    const connectedWallet = connectedWallets.find(cw => cw.id === defaultWallet.id);
    return connectedWallet || defaultWallet;
  });

  const handleConnectNewWallet = () => {
    connectWallet('metamask');
  };

  const handleExport = () => {
    toast.success("Export en développement");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Mon Portefeuille"
        subtitle="Gérez vos actifs crypto en toute sécurité avec des données blockchain en temps réel"
        icon={<WalletIcon className="h-8 w-8 text-purple-400" />}
        actions={
          <div className="flex space-x-3">
            <GradientButton variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exporter
            </GradientButton>
            <GradientButton 
              variant="primary" 
              size="sm" 
              onClick={handleConnectNewWallet}
              disabled={isConnecting}
            >
              <Plus className="h-4 w-4" />
              {isConnecting ? "Connexion..." : "Connecter Wallet"}
            </GradientButton>
          </div>
        }
      />

      <WalletOverview wallets={allWallets} />

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
          <AssetsTab wallets={allWallets} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab wallets={allWallets} />
        </TabsContent>

        <TabsContent value="wallets" className="mt-6">
          <WalletsTab 
            wallets={allWallets} 
            onConnectWallet={connectWallet}
            onDisconnectWallet={disconnectWallet}
            isConnecting={isConnecting}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
