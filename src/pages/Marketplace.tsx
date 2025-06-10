
import { PageLayout } from "@/components/layout/PageLayout";
import { EnhancedNFTMarketplace } from "@/components/modules/marketplace/EnhancedNFTMarketplace";
import VeegoxLogo from "@/components/ui/veegox-logo";

const Marketplace = () => {
  return (
    <PageLayout
      title="NFT Marketplace Veegox"
      subtitle="Découvrez, achetez et vendez des NFTs avec vos tokens"
      icon={<VeegoxLogo size="md" />}
    >
      <EnhancedNFTMarketplace />
    </PageLayout>
  );
};

export default Marketplace;
