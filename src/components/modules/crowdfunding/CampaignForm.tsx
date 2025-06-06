
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

type CampaignFormData = {
  title: string;
  description: string;
  target_amount: string;
  token_address?: string;
  reward_token_address?: string;
  end_date: Date;
  category?: string;
  website_url?: string;
};

export default function CampaignForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CampaignFormData>({
    defaultValues: {
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
    }
  });
  
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const queryClient = useQueryClient();
  
  const createCampaignMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour créer une campagne");
      
      const { data: campaign, error } = await supabase
        .from("crowdfunding_campaigns")
        .insert({
          creator_id: userData.user.id,
          title: data.title,
          description: data.description,
          target_amount: parseFloat(data.target_amount),
          token_address: data.token_address,
          reward_token_address: data.reward_token_address,
          end_date: data.end_date.toISOString(),
          category: data.category,
          website_url: data.website_url,
        })
        .select()
        .single();
        
      if (error) throw error;
      return campaign;
    },
    onSuccess: () => {
      toast.success("Votre campagne a été créée avec succès!");
      queryClient.invalidateQueries({ queryKey: ["crowdfunding-campaigns"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création de la campagne");
    },
  });
  
  const onSubmit = (data: CampaignFormData) => {
    createCampaignMutation.mutate(data);
  };
  
  return (
    <Card className="border-muted">
      <CardHeader>
        <CardTitle>Créer une nouvelle campagne</CardTitle>
        <CardDescription>
          Lancez une campagne de crowdfunding pour votre projet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Titre</label>
                <Input
                  id="title"
                  placeholder="Titre de votre campagne"
                  {...register("title", { required: "Un titre est requis" })}
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  placeholder="Description de votre projet"
                  rows={5}
                  {...register("description", { required: "Une description est requise" })}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="target_amount" className="text-sm font-medium">Montant cible</label>
                  <Input
                    id="target_amount"
                    placeholder="ex: 10000"
                    type="number"
                    {...register("target_amount", { 
                      required: "Un montant cible est requis",
                      min: { value: 1, message: "Le montant doit être supérieur à 0" } 
                    })}
                  />
                  {errors.target_amount && <p className="text-xs text-red-500">{errors.target_amount.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DeFi">DeFi</SelectItem>
                      <SelectItem value="NFT">NFT</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="end_date" className="text-sm font-medium">Date de fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {format(endDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        if (date) {
                          setEndDate(date);
                          setValue("end_date", date);
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="token_address" className="text-sm font-medium">Adresse du token (optionnel)</label>
                <Input
                  id="token_address"
                  placeholder="0x..."
                  {...register("token_address")}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="website_url" className="text-sm font-medium">Site web (optionnel)</label>
                <Input
                  id="website_url"
                  placeholder="https://..."
                  {...register("website_url")}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={createCampaignMutation.isPending}
            >
              {createCampaignMutation.isPending ? "Création..." : "Créer la campagne"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
