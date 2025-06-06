
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

type CampaignFormData = {
  title: string;
  description: string;
  target_amount: string;
  token_address?: string;
  reward_token_address?: string;
  end_date: Date;
  category?: string;
  website_url?: string;
  banner_image_url?: string;
};

const CreateCampaign = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CampaignFormData>({
    defaultValues: {
      end_date: endDate,
    }
  });

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
          banner_image_url: data.banner_image_url,
        })
        .select()
        .single();
        
      if (error) throw error;
      return campaign;
    },
    onSuccess: (campaign) => {
      toast.success("Votre campagne a été créée avec succès!");
      queryClient.invalidateQueries({ queryKey: ["crowdfunding-campaigns"] });
      navigate(`/crowdfunding/${campaign.id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création de la campagne");
    },
  });

  const onSubmit = (data: CampaignFormData) => {
    createCampaignMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/crowdfunding")}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Créer une campagne</h1>
          <p className="text-gray-400">Lancez votre projet de financement participatif</p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Informations de la campagne</CardTitle>
          <CardDescription className="text-gray-400">
            Remplissez les détails de votre campagne de crowdfunding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-white">
                  Titre de la campagne *
                </label>
                <Input
                  id="title"
                  placeholder="Un titre accrocheur pour votre projet"
                  {...register("title", { required: "Un titre est requis" })}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                />
                {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-white">
                  Description *
                </label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre projet en détail..."
                  rows={6}
                  {...register("description", { required: "Une description est requise" })}
                  className="bg-slate-800 border-slate-600 text-white resize-none"
                />
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="target_amount" className="text-sm font-medium text-white">
                  Objectif de financement *
                </label>
                <Input
                  id="target_amount"
                  placeholder="10000"
                  type="number"
                  step="0.01"
                  {...register("target_amount", { 
                    required: "Un montant cible est requis",
                    min: { value: 1, message: "Le montant doit être supérieur à 0" } 
                  })}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                />
                {errors.target_amount && <p className="text-xs text-red-400">{errors.target_amount.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-white">
                  Catégorie
                </label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="DeFi">DeFi</SelectItem>
                    <SelectItem value="NFT">NFT</SelectItem>
                    <SelectItem value="Gaming">Gaming</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="DAO">DAO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Date de fin *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal bg-slate-800 border-slate-600 text-white hover:bg-slate-700 ${isMobile ? 'h-12' : ''}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(endDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
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
                <label htmlFor="token_address" className="text-sm font-medium text-white">
                  Adresse du token de financement
                </label>
                <Input
                  id="token_address"
                  placeholder="0x... (optionnel, ETH par défaut)"
                  {...register("token_address")}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website_url" className="text-sm font-medium text-white">
                  Site web du projet
                </label>
                <Input
                  id="website_url"
                  placeholder="https://monprojet.com"
                  {...register("website_url")}
                  className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="banner_image_url" className="text-sm font-medium text-white">
                  Image de bannière
                </label>
                <div className="flex gap-2">
                  <Input
                    id="banner_image_url"
                    placeholder="URL de l'image de bannière"
                    {...register("banner_image_url")}
                    className={`bg-slate-800 border-slate-600 text-white flex-1 ${isMobile ? 'h-12' : ''}`}
                  />
                  <Button type="button" variant="outline" className={`bg-slate-700 border-slate-600 hover:bg-slate-600 ${isMobile ? 'h-12 px-4' : ''}`}>
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/crowdfunding")}
                className={`flex-1 sm:flex-none bg-transparent border-white/20 text-white hover:bg-white/10 ${isMobile ? 'h-12' : ''}`}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={createCampaignMutation.isPending}
                className={`flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-12' : ''}`}
              >
                {createCampaignMutation.isPending ? "Création..." : "Créer la campagne"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
