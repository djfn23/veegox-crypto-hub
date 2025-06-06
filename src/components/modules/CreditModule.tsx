
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ERC20CreditIntegration } from "./credit/ERC20CreditIntegration";
import LoansList from "./credit/LoansList";
import CreditModuleHeader from "./credit/CreditModuleHeader";
import CreditOverview from "./credit/CreditOverview";
import { useUserLoans } from "@/hooks/useCreditModule";
import { useIsMobile } from "@/hooks/use-mobile";

const CreditModule = () => {
  const { data: loans } = useUserLoans();
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <CreditModuleHeader />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="overview" 
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3' : ''}`}
          >
            {isMobile ? "🏠 Vue d'ensemble" : "Vue d'ensemble"}
          </TabsTrigger>
          <TabsTrigger 
            value="erc20-collateral" 
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3' : ''}`}
          >
            {isMobile ? "💰 Token Collateral" : "Token Collateral"}
          </TabsTrigger>
          <TabsTrigger 
            value="loans" 
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3' : ''}`}
          >
            {isMobile ? "📋 Mes Prêts" : "Mes Prêts"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <CreditOverview />
        </TabsContent>

        <TabsContent value="erc20-collateral" className="mt-6">
          <div className="px-4 lg:px-0">
            <ERC20CreditIntegration />
          </div>
        </TabsContent>

        <TabsContent value="loans" className="mt-6">
          <div className="px-4 lg:px-0">
            <LoansList loans={loans} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreditModule;
