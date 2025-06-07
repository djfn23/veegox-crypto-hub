
import { PageLayout } from "@/components/layout/PageLayout";
import { NFTMarketplaceModule } from "@/components/modules/marketplace/NFTMarketplaceModule";
import { ShoppingBag } from "lucide-react";

const Marketplace = () => {
  return (
    <PageLayout
      title="NFT Marketplace"
      subtitle="Découvrez, achetez et vendez des NFTs uniques"
      icon={<ShoppingBag className="h-6 w-6 text-purple-400" />}
    >
      <NFTMarketplaceModule />
    </PageLayout>
  );
};

export default Marketplace;
