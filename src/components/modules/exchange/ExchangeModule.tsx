
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwapInterface } from "./SwapInterface";
import PoolsList from "./PoolsList";
import LiquidityForm from "./LiquidityForm";
import { LiquidityPool } from "../credit/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExchangeModule() {
  const [activeTab, setActiveTab] = useState("swap");
  const isMobile = useIsMobile();
  
  const { data: pools, isLoading } = useQuery({
    queryKey: ['liquidity-pools'],
    queryFn: async (): Promise<LiquidityPool[]> => {
      const { data, error } = await supabase
        .from('liquidity_pools')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    },
  });
  
  const { data: userWallet } = useQuery({
    queryKey: ['user-primary-wallet'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_primary', true)
        .maybeSingle();

      return data;
    },
  });
  
  return (
    <div className="space-y-4 md:space-y-6 px-4 lg:px-0">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Module Exchange</h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Échangez facilement vos tokens et fournissez de la liquidité pour générer des frais
        </p>
        <div className="mt-2 text-xs md:text-sm text-purple-400">
          💱 Alternative simple et efficace à Uniswap et autres DEX complexes
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="swap"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🔄 Swap" : "Swap"}
          </TabsTrigger>
          <TabsTrigger 
            value="pools"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🏊 Pools" : "Pools"}
          </TabsTrigger>
          <TabsTrigger 
            value="provide"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "💧 Liquidité" : "Fournir de la liquidité"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="swap" className="mt-4 md:mt-6">
          {pools && pools.length > 0 ? (
            <SwapInterface pools={pools} userWallet={userWallet} />
          ) : (
            <div className="text-center py-8 md:py-10">
              {isLoading ? "Chargement des pools..." : "Aucun pool de liquidité disponible"}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pools" className="mt-4 md:mt-6">
          <PoolsList pools={pools || []} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="provide" className="mt-4 md:mt-6">
          {userWallet ? (
            <LiquidityForm userWallet={userWallet} />
          ) : (
            <div className="text-center py-8 md:py-10 text-gray-400">
              Vous devez être connecté avec un portefeuille pour fournir de la liquidité
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
