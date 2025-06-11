
import { PageLayout } from "@/components/layout/PageLayout";
import CrowdfundingModule from "@/components/modules/CrowdfundingModule";
import { CrowdfundingSubNavigation } from "@/components/modules/crowdfunding/CrowdfundingSubNavigation";
import { Heart } from "lucide-react";

const Crowdfunding = () => {
  return (
    <PageLayout
      title="Financement Participatif"
      subtitle="Soutenez et lancez des projets innovants"
      icon={<Heart className="h-6 w-6 text-red-400" />}
    >
      <div className="space-y-6">
        <CrowdfundingSubNavigation />
        <CrowdfundingModule />
      </div>
    </PageLayout>
  );
};

export default Crowdfunding;
