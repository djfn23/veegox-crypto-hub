
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignsList from "./crowdfunding/CampaignsList";
import CampaignForm from "./crowdfunding/CampaignForm";
import { supabase } from "@/integrations/supabase/client";

const CrowdfundingModule = () => {
  const [activeTab, setActiveTab] = useState("browse");
  
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
        <h2 className="text-3xl font-bold text-white mb-2">Module Crowdfunding</h2>
        <p className="text-gray-400">Financez ou créez des projets Web3 innovants directement dans l'application</p>
        <div className="mt-2 text-sm text-green-400">
          🔥 Nouvel écosystème permettant aux porteurs de projets de lever des fonds facilement
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Parcourir les campagnes</TabsTrigger>
          <TabsTrigger value="create">Créer une campagne</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="mt-6">
          <CampaignsList />
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          {userWallet ? (
            <CampaignForm />
          ) : (
            <div className="text-center py-10 space-y-4">
              <h3 className="text-xl font-semibold">Connectez votre portefeuille</h3>
              <p className="text-muted-foreground">
                Vous devez connecter un portefeuille pour créer une campagne de crowdfunding.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrowdfundingModule;
