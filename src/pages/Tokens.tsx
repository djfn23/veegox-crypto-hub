
import { PageLayout } from "@/components/layout/PageLayout";
import { Coins } from "lucide-react";
import TokenManager from "@/components/modules/TokenManager";
import TokenNavigation from "@/components/modules/tokens/TokenNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Tokens() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Gestionnaire de Tokens"
      subtitle="Créez, déployez et gérez vos tokens personnalisés"
      icon={<Coins className="h-6 w-6 text-blue-400" />}
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
          <TokenManager />
        </div>
      </div>
    </PageLayout>
  );
}
