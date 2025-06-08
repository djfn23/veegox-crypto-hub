
import { PageLayout } from "@/components/layout/PageLayout";
import { Wallet as WalletIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletsTab } from "@/components/wallet/WalletsTab";
import { AssetsTab } from "@/components/wallet/AssetsTab";
import { TransactionsTab } from "@/components/wallet/TransactionsTab";
import { VeegoxWalletSection } from "@/components/wallet/VeegoxWalletSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWalletConnection } from "@/hooks/useWalletConnection";

export default function Wallet() {
  const isMobile = useIsMobile();
  const { connectedWallets, isConnecting, connectWallet, disconnectWallet } = useWalletConnection();

  return (
    <PageLayout
      title="Portefeuille"
      subtitle="Gérez vos wallets et actifs numériques"
      icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        <Tabs defaultValue="veegox" className="space-y-4">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="veegox">Veegox</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="assets">Actifs</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="veegox" className="space-y-4">
            <VeegoxWalletSection />
          </TabsContent>

          <TabsContent value="wallets" className="space-y-4">
            <WalletsTab 
              wallets={connectedWallets}
              onConnectWallet={connectWallet}
              onDisconnectWallet={disconnectWallet}
              isConnecting={isConnecting}
            />
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <AssetsTab wallets={connectedWallets} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionsTab wallets={connectedWallets} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
