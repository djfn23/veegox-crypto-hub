
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AIRecommendation } from "../credit/types";

export default function AIRecommendationsModule() {
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();
  
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['ai-recommendations'],
    queryFn: async (): Promise<AIRecommendation[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('ai_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
  
  const markAsActedMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ai_recommendations')
        .update({ acted_upon: true })
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] });
      toast.success("Recommandation marquée comme traitée");
    },
  });
  
  const filteredRecommendations = activeTab === "all" 
    ? recommendations 
    : activeTab === "pending" 
      ? recommendations?.filter(rec => !rec.acted_upon)
      : recommendations?.filter(rec => rec.acted_upon);
  
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getRecommendationIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'buy': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'sell': return <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />;
      case 'hold': return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Recommandations AI</h2>
        <p className="text-gray-400">Recommandations d'investissement personnalisées basées sur l'IA</p>
        <div className="mt-2 text-sm text-green-400">
          🧠 Analyse avancée des marchés et opportunités uniques à Veegox
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="acted">Traitées</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="text-center py-10">Chargement des recommandations...</div>
          ) : filteredRecommendations && filteredRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="overflow-hidden hover:border-primary transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        {getRecommendationIcon(recommendation.recommendation_type)}
                        <CardTitle className="text-lg">{recommendation.recommendation_type.toUpperCase()}</CardTitle>
                      </div>
                      <Badge variant={recommendation.acted_upon ? "outline" : "default"}>
                        {recommendation.acted_upon ? "Traitée" : "Nouvelle"}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      Asset: {recommendation.asset_address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confiance:</span>
                        <span className={`text-sm font-medium ${getConfidenceColor(recommendation.confidence_score)}`}>
                          {recommendation.confidence_score}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Date:</span>
                        <span className="text-sm">
                          {new Date(recommendation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {recommendation.expiry_at && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Expire le:</span>
                          <span className="text-sm">
                            {new Date(recommendation.expiry_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Analyse:</h4>
                      <p className="text-sm text-muted-foreground line-clamp-4">
                        {recommendation.rationale}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={recommendation.acted_upon ? "outline" : "default"}
                      className="w-full"
                      disabled={recommendation.acted_upon || markAsActedMutation.isPending}
                      onClick={() => markAsActedMutation.mutate(recommendation.id)}
                    >
                      {recommendation.acted_upon ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Traitée
                        </>
                      ) : (
                        "Marquer comme traitée"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Aucune recommandation trouvée</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
