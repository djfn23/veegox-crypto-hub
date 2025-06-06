
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CrowdfundingCampaign, CrowdfundingContribution, Wallet } from "../credit/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ExternalLink, Share2 } from "lucide-react";
import ContributeForm from "./ContributeForm";

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['crowdfunding-campaign', id],
    queryFn: async (): Promise<CrowdfundingCampaign | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('crowdfunding_campaigns')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
  
  const { data: contributions } = useQuery({
    queryKey: ['crowdfunding-contributions', id],
    queryFn: async (): Promise<CrowdfundingContribution[]> => {
      if (!id) return [];
      
      const { data, error } = await supabase
        .from('crowdfunding_contributions')
        .select('*')
        .eq('campaign_id', id)
        .order('contribution_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });
  
  if (isLoading) {
    return <div className="text-center py-10">Chargement des détails de la campagne...</div>;
  }
  
  if (!campaign) {
    return <div className="text-center py-10">Campagne non trouvée</div>;
  }
  
  const progress = (campaign.current_amount / campaign.target_amount) * 100;
  const daysLeft = Math.max(0, Math.floor((new Date(campaign.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const isActive = campaign.status === 'active' && daysLeft > 0;
  
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-white">{campaign.title}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            {campaign.website_url && (
              <Button variant="outline" size="icon" asChild>
                <a href={campaign.website_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge>{campaign.status}</Badge>
          {campaign.category && <Badge variant="outline">{campaign.category}</Badge>}
        </div>
      </div>
      
      {/* Image de couverture */}
      {campaign.banner_image_url && (
        <div className="h-64 w-full overflow-hidden rounded-lg">
          <img 
            src={campaign.banner_image_url} 
            alt={campaign.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Barre de progression et détails */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progression</CardTitle>
            <CardDescription>
              {progress.toFixed(2)}% financé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progress} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{campaign.current_amount}</div>
                <div className="text-xs text-muted-foreground">collectés sur {campaign.target_amount}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{contributions?.length || 0}</div>
                <div className="text-xs text-muted-foreground">contributeurs</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{daysLeft}</div>
                <div className="text-xs text-muted-foreground">jours restants</div>
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Fin de la campagne: {new Date(campaign.end_date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Dialog open={isContributeOpen} onOpenChange={setIsContributeOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!isActive}>
                  {isActive 
                    ? "Contribuer à ce projet" 
                    : "Campagne terminée"
                  }
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ContributeForm campaign={campaign} onClose={() => setIsContributeOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        {/* Dernières contributions */}
        <Card>
          <CardHeader>
            <CardTitle>Dernières contributions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contributions && contributions.length > 0 ? (
              <div className="space-y-4">
                {contributions.slice(0, 5).map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {contribution.contributor_id.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          Contribution de {contribution.amount} {campaign.token_address || "ETH"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(contribution.contribution_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Aucune contribution pour le moment
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>À propos de ce projet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            {campaign.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
