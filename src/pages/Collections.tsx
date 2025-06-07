
import { PageLayout } from "@/components/layout/PageLayout";
import { CollectionsGrid } from "@/components/modules/marketplace/CollectionsGrid";
import { Grid3X3 } from "lucide-react";

const Collections = () => {
  return (
    <PageLayout
      title="Collections NFT"
      subtitle="Explorez les collections NFT populaires et tendances"
      icon={<Grid3X3 className="h-6 w-6 text-purple-400" />}
    >
      <CollectionsGrid />
    </PageLayout>
  );
};

export default Collections;
