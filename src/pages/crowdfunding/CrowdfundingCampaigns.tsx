
import { PageLayout } from "@/components/layout/PageLayout";
import { Grid3X3 } from "lucide-react";
import CrowdfundingNavigation from "@/components/modules/crowdfunding/CrowdfundingNavigation";
import CampaignsList from "@/components/modules/crowdfunding/CampaignsList";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CrowdfundingCampaigns() {
  const isMobile = useIsMobile();

  return (
    <PageLayout
      title="Toutes les Campagnes"
      subtitle="Découvrez et soutenez des projets innovants"
      icon={<Grid3X3 className="h-6 w-6 text-blue-400" />}
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
          <CampaignsList />
        </div>
      </div>
    </PageLayout>
  );
}
