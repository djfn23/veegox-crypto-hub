
import { MainContractDashboard } from "@/components/contract/MainContractDashboard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield } from "lucide-react";

const Contract = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Smart Contract"
        subtitle="Gérez votre token ERC20Template sur Polygon avec fonctionnalités avancées"
        icon={<Shield className="h-8 w-8 text-purple-400" />}
      />
      
      <MainContractDashboard />
    </div>
  );
};

export default Contract;
