
import { PageLayout } from "@/components/layout/PageLayout";
import { Plus } from "lucide-react";
import TokenCreationWizard from "@/components/modules/tokens/TokenCreationWizard";
import TokenNavigation from "@/components/modules/tokens/TokenNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CreateToken() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Créer un Token"
      subtitle="Assistant de création de tokens avec templates prédéfinis"
      icon={<Plus className="h-6 w-6 text-green-400" />}
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
          <TokenCreationWizard />
        </div>
      </div>
    </PageLayout>
  );
}
