
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CrowdfundingCampaign } from "../credit/types";
import { supabase } from "@/integrations/supabase/client";

export default function CampaignsList() {
  const [category, setCategory] = useState<string | null>(null);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['crowdfunding-campaigns', category],
    queryFn: async (): Promise<CrowdfundingCampaign[]> => {
      let query = supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });

  const categories = ["DeFi", "NFT", "Gaming", "Infrastructure", "Social"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Campagnes de crowdfunding</h2>
        <Button variant="outline">Créer une campagne</Button>
      </div>

      <div className="flex gap-2 pb-4 overflow-x-auto">
        <Badge 
          variant={category === null ? "default" : "outline"} 
          className="cursor-pointer"
          onClick={() => setCategory(null)}
        >
          Tous
        </Badge>
        {categories.map((cat) => (
          <Badge 
            key={cat}
            variant={category === cat ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Chargement des campagnes...</div>
      ) : campaigns && campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden bg-card border-muted hover:border-primary transition-all">
              {campaign.banner_image_url && (
                <div className="h-40 overflow-hidden">
                  <img 
                    src={campaign.banner_image_url} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <Badge>{campaign.status}</Badge>
                </div>
                {campaign.category && (
                  <CardDescription className="text-xs">{campaign.category}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="line-clamp-3 text-sm text-muted-foreground">
                  {campaign.description}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{Math.round((campaign.current_amount / campaign.target_amount) * 100)}% financé</span>
                    <span>{campaign.current_amount} / {campaign.target_amount}</span>
                  </div>
                  <Progress 
                    value={(campaign.current_amount / campaign.target_amount) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Fin le {new Date(campaign.end_date).toLocaleDateString()}
                </div>
                <Button size="sm">Contribuer</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          Aucune campagne trouvée
        </div>
      )}
    </div>
  );
}
