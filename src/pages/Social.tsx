
import { PageLayout } from "@/components/layout/PageLayout";
import SocialModule from "@/components/modules/social/SocialModule";
import { MessageCircle } from "lucide-react";

const Social = () => {
  return (
    <PageLayout
      title="Forum Social"
      subtitle="Connectez-vous avec la communauté Veegox"
      icon={<MessageCircle className="h-6 w-6 text-purple-400" />}
    >
      <SocialModule />
    </PageLayout>
  );
};

export default Social;
