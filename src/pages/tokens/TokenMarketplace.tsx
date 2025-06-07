
import { PageLayout } from "@/components/layout/PageLayout";
import { ShoppingBag } from "lucide-react";
import TokenNavigation from "@/components/modules/tokens/TokenNavigation";
import TokenMarketplaceModule from "@/components/modules/tokens/TokenMarketplaceModule";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TokenMarketplace() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Token Marketplace"
      subtitle="Découvrez, tradez et investissez dans de nouveaux tokens"
      icon={<ShoppingBag className="h-6 w-6 text-green-400" />}
    >
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {!isMobile && (
          <div className="lg:col-span-1">
            <TokenNavigation />
          </div>
        )}
        
        <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
          {isMobile && (
            <div className="mb-4">
              <TokenNavigation />
            </div>
          )}
          <TokenMarketplaceModule />
        </div>
      </div>
    </PageLayout>
  );
}
