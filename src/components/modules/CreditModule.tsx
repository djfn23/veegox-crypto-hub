
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ERC20CreditIntegration } from "./credit/ERC20CreditIntegration";
import LoansList from "./credit/LoansList";
import CreditModuleHeader from "./credit/CreditModuleHeader";
import CreditOverview from "./credit/CreditOverview";
import { useUserLoans } from "@/hooks/useCreditModule";

const CreditModule = () => {
  const { data: loans } = useUserLoans();

  return (
    <div className="space-y-6">
      <CreditModuleHeader />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="erc20-collateral" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            Token Collateral
          </TabsTrigger>
          <TabsTrigger value="loans" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            Mes Prêts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CreditOverview />
        </TabsContent>

        <TabsContent value="erc20-collateral" className="mt-6">
          <ERC20CreditIntegration />
        </TabsContent>

        <TabsContent value="loans" className="mt-6">
          <LoansList loans={loans} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditModule;
