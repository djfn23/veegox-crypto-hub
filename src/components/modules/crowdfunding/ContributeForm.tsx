
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CrowdfundingCampaign } from "../credit/types";

type ContributeFormProps = {
  campaign: CrowdfundingCampaign;
  onClose?: () => void;
};

type ContributeFormData = {
  amount: string;
};

export default function ContributeForm({ campaign, onClose }: ContributeFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ContributeFormData>();
  const queryClient = useQueryClient();
  
  const contributeMarutation = useMutation({
    mutationFn: async (data: ContributeFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour contribuer");
      
      // Dans une application réelle, il y aurait ici une intégration avec un wallet
      // pour effectuer la transaction blockchain
      
      const { data: contribution, error } = await supabase
        .from("crowdfunding_contributions")
        .insert({
          campaign_id: campaign.id,
          contributor_id: userData.user.id,
          amount: parseFloat(data.amount),
          token_address: campaign.token_address || "ETH", // Par défaut ETH
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Mettre à jour le montant collecté de la campagne
      await supabase
        .from("crowdfunding_campaigns")
        .update({ 
          current_amount: campaign.current_amount + parseFloat(data.amount) 
        })
        .eq("id", campaign.id);
      
      return contribution;
    },
    onSuccess: () => {
      toast.success("Votre contribution a été enregistrée avec succès!");
      queryClient.invalidateQueries({ queryKey: ["crowdfunding-campaigns"] });
      if (onClose) onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la contribution");
    },
  });
  
  const onSubmit = (data: ContributeFormData) => {
    contributeMarutation.mutate(data);
  };
  
  const remainingAmount = campaign.target_amount - campaign.current_amount;
  
  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle className="text-xl">Contribuer à {campaign.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">Montant</label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder={`Maximum: ${remainingAmount}`}
              {...register("amount", { 
                required: "Un montant est requis",
                min: { value: 0.01, message: "Le montant doit être supérieur à 0" },
                max: { value: remainingAmount, message: `Le montant ne peut pas dépasser ${remainingAmount}` },
                valueAsNumber: true,
              })}
            />
            {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Vous contribuez à la campagne "{campaign.title}"</p>
            <p>Objectif: {campaign.target_amount} {campaign.token_address || "ETH"}</p>
            <p>Déjà collecté: {campaign.current_amount} {campaign.token_address || "ETH"}</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {onClose && <Button variant="outline" onClick={onClose}>Annuler</Button>}
        <Button 
          onClick={handleSubmit(onSubmit)}
          disabled={contributeMarutation.isPending}
        >
          {contributeMarutation.isPending ? "En cours..." : "Contribuer"}
        </Button>
      </CardFooter>
    </Card>
  );
}
