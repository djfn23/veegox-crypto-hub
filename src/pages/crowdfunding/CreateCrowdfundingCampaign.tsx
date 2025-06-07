
import { PageLayout } from "@/components/layout/PageLayout";
import { Plus } from "lucide-react";
import CampaignForm from "@/components/modules/crowdfunding/CampaignForm";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CreateCrowdfundingCampaign() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Créer une Campagne"
      subtitle="Lancez votre projet et collectez des fonds"
      icon={<Plus className="h-6 w-6 text-green-400" />}
    >
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {!isMobile && (
          <div className="lg:col-span-1">
            <CrowdfundingNavigation />
          </div>
        )}
        
        <div className={isMobile ? 'col-span-1' : 'lg:col-span-3'}>
          {isMobile && (
            <div className="mb-4">
              <CrowdfundingNavigation />
            </div>
          )}
          <CampaignForm />
        </div>
      </div>
    </PageLayout>
  );
}
