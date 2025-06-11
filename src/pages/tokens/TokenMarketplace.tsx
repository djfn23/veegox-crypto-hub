
import { PageLayout } from "@/components/layout/PageLayout";
import { Store } from "lucide-react";
import { TokenMarketplaceModule } from "@/components/modules/tokens/TokenMarketplaceModule";

const TokenMarketplace = () => {
  return (
    <PageLayout
      title="Marketplace de Tokens"
      subtitle="Découvrez et échangez des tokens"
      icon={<Store className="h-6 w-6 text-orange-400" />}
    >
      <TokenMarketplaceModule />
    </PageLayout>
  );
};

export default TokenMarketplace;
