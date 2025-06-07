
import { PageLayout } from "@/components/layout/PageLayout";
import { NFTMarketplaceModule } from "@/components/modules/marketplace/NFTMarketplaceModule";

const Marketplace = () => {
  return (
    <PageLayout
      title="NFT Marketplace"
      subtitle="Découvrez, achetez et vendez des NFTs uniques sur Polygon"
    >
      <NFTMarketplaceModule />
    </PageLayout>
  );
};

export default Marketplace;
