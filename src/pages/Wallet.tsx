
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientButton } from "@/components/ui/gradient-button";
import { PageHeader } from "@/components/layout/PageHeader";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { AssetsTab } from "@/components/wallet/AssetsTab";
import { TransactionsTab } from "@/components/wallet/TransactionsTab";
import { EnhancedWalletsTab } from "@/components/wallet/EnhancedWalletsTab";
import { WalletConnectionModal } from "@/components/wallet/WalletConnectionModal";
import { useEnhancedWallet } from "@/hooks/useEnhancedWallet";
import { Wallet as WalletIcon, Download, Plus } from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const { connectedWallets, isConnecting } = useEnhancedWallet();

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
              onClick={() => setShowConnectionModal(true)}
              disabled={isConnecting}
            >
              <Plus className="h-4 w-4" />
              {isConnecting ? "Connexion..." : "Connecter Wallet"}
            </GradientButton>
          </div>
        }
      />

      <WalletOverview wallets={connectedWallets} />

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
          <AssetsTab wallets={connectedWallets} />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab wallets={connectedWallets} />
        </TabsContent>

        <TabsContent value="wallets" className="mt-6">
          <EnhancedWalletsTab />
        </TabsContent>
      </Tabs>

      <WalletConnectionModal 
        isOpen={showConnectionModal}
        onClose={() => setShowConnectionModal(false)}
      />
    </div>
  );
};

export default Wallet;
