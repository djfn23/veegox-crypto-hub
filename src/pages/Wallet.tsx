
import { PageLayout } from "@/components/layout/PageLayout";
import { RealTimeWalletOverview } from "@/components/wallet/RealTimeWalletOverview";
import { Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  return (
    <PageLayout
      title="Wallet"
      subtitle="Gérez vos actifs numériques et NFTs"
      icon={<WalletIcon className="h-6 w-6 text-blue-400" />}
    >
      <RealTimeWalletOverview />
    </PageLayout>
  );
};

export default Wallet;
