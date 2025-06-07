
import { PageLayout } from "@/components/layout/PageLayout";
import { CreditModule } from "@/components/modules/CreditModule";
import { CreditScore } from "lucide-react";

const Credit = () => {
  return (
    <PageLayout
      title="Crédit DeFi"
      subtitle="Système de crédit décentralisé basé sur votre historique blockchain"
      icon={<CreditScore className="h-6 w-6 text-purple-400" />}
    >
      <CreditModule />
    </PageLayout>
  );
};

export default Credit;
