
import { PageLayout } from "@/components/layout/PageLayout";
import { Coins, Plus } from "lucide-react";
import { TokenCreationWizard } from "@/components/modules/tokens/TokenCreationWizard";

const CreateToken = () => {
  return (
    <PageLayout
      title="Créer un Token"
      subtitle="Lancez votre propre token personnalisé"
      icon={<Plus className="h-6 w-6 text-blue-400" />}
    >
      <TokenCreationWizard />
    </PageLayout>
  );
};

export default CreateToken;
