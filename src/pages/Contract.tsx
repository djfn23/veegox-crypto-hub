
import { PageLayout } from "@/components/layout/PageLayout";
import { MainContractDashboard } from "@/components/contract/MainContractDashboard";
import { FileText } from "lucide-react";

const Contract = () => {
  return (
    <PageLayout
      title="Smart Contracts"
      subtitle="Interagissez avec les contrats intelligents de l'écosystème"
      icon={<FileText className="h-6 w-6 text-blue-400" />}
    >
      <MainContractDashboard />
    </PageLayout>
  );
};

export default Contract;
