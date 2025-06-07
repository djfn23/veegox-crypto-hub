
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { texts, getResponsiveText } from "@/lib/constants/texts";

interface StakingTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const StakingTabs = ({ defaultValue, children }: StakingTabsProps) => {
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
        <TabsTrigger 
          value="erc20-staking" 
          className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
        >
          {getResponsiveText(texts.staking.tabs.erc20, isMobile)}
        </TabsTrigger>
        <TabsTrigger 
          value="pools" 
          className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
        >
          {getResponsiveText(texts.staking.tabs.pools, isMobile)}
        </TabsTrigger>
        <TabsTrigger 
          value="my-stakes" 
          className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
        >
          {getResponsiveText(texts.staking.tabs.stakes, isMobile)}
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
