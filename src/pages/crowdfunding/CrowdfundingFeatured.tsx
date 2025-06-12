
import { PageLayout } from "@/components/layout/PageLayout";
import { Star } from "lucide-react";
import FeaturedCampaigns from "@/components/modules/crowdfunding/FeaturedCampaigns";

const CrowdfundingFeatured = () => {
  return (
    <PageLayout
      title="Campagnes Vedettes"
      subtitle="Découvrez les projets mis en avant"
      icon={<Star className="h-6 w-6 text-yellow-400" />}
    >
      <FeaturedCampaigns />
    </PageLayout>
  );
};

export default CrowdfundingFeatured;
