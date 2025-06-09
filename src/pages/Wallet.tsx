
import { PageLayout } from "@/components/layout/PageLayout";
import { Wallet as WalletIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetsTab } from "@/components/wallet/AssetsTab";
import { TransactionsTab } from "@/components/wallet/TransactionsTab";
import { VeegoxWalletSection } from "@/components/wallet/VeegoxWalletSection";
import { AlchemyWalletsTab } from "@/components/wallet/AlchemyWalletsTab";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Wallet() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Portefeuille"
      subtitle="Gérez vos wallets et actifs numériques avec Alchemy Account Kit"
      icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-6">
        <Tabs defaultValue="alchemy" className="space-y-4">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="alchemy">Alchemy Wallets</TabsTrigger>
            <TabsTrigger value="veegox">Veegox</TabsTrigger>
            <TabsTrigger value="assets">Actifs</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="alchemy" className="space-y-4">
            <AlchemyWalletsTab />
          </TabsContent>

          <TabsContent value="veegox" className="space-y-4">
            <VeegoxWalletSection />
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <AssetsTab wallets={[]} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <TransactionsTab wallets={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
