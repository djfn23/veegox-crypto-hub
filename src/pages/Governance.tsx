
import { PageLayout } from "@/components/layout/PageLayout";
import { DAOModule } from "@/components/modules/DAOModule";
import { Vote } from "lucide-react";

const Governance = () => {
  return (
    <PageLayout
      title="Gouvernance DAO"
      subtitle="Participez aux décisions de l'écosystème Veegox"
      icon={<Vote className="h-6 w-6 text-blue-400" />}
    >
      <DAOModule />
    </PageLayout>
  );
};

export default Governance;
