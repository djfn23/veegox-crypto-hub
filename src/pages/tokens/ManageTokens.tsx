
import { PageLayout } from "@/components/layout/PageLayout";
import { Settings } from "lucide-react";
import { TokenManagementModule } from "@/components/modules/tokens/TokenManagementModule";

const ManageTokens = () => {
  return (
    <PageLayout
      title="Gérer les Tokens"
      subtitle="Administrez vos tokens créés"
      icon={<Settings className="h-6 w-6 text-purple-400" />}
    >
      <TokenManagementModule />
    </PageLayout>
  );
};

export default ManageTokens;
