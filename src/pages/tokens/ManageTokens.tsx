
import { PageLayout } from "@/components/layout/PageLayout";
import { Settings } from "lucide-react";
import TokenNavigation from "@/components/modules/tokens/TokenNavigation";
import TokenManagementModule from "@/components/modules/tokens/TokenManagementModule";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ManageTokens() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Gérer les Tokens"
      subtitle="Administration et gestion post-déploiement de vos tokens"
      icon={<Settings className="h-6 w-6 text-orange-400" />}
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
          <TokenManagementModule />
        </div>
      </div>
    </PageLayout>
  );
}
