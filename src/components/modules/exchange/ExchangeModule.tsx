
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwapInterface from "./SwapInterface";
import PoolsList from "./PoolsList";
import LiquidityForm from "./LiquidityForm";
import { LiquidityPool } from "../credit/types";

export default function ExchangeModule() {
  const [activeTab, setActiveTab] = useState("swap");
  
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Exchange</h2>
        <p className="text-gray-400">Échangez facilement vos tokens et fournissez de la liquidité pour générer des frais</p>
        <div className="mt-2 text-sm text-purple-400">
          💱 Alternative simple et efficace à Uniswap et autres DEX complexes
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="pools">Pools</TabsTrigger>
          <TabsTrigger value="provide">Fournir de la liquidité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="swap" className="mt-6">
          {pools && pools.length > 0 ? (
            <SwapInterface pools={pools} userWallet={userWallet} />
          ) : (
            <div className="text-center py-10">
              {isLoading ? "Chargement des pools..." : "Aucun pool de liquidité disponible"}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pools" className="mt-6">
          <PoolsList pools={pools || []} isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="provide" className="mt-6">
          {userWallet ? (
            <LiquidityForm userWallet={userWallet} />
          ) : (
            <div className="text-center py-10">
              Vous devez être connecté avec un portefeuille pour fournir de la liquidité
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
