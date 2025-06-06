
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
import { useIsMobile } from "@/hooks/use-mobile";

export default function AIRecommendationsModule() {
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
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
      case 'buy': return <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-green-500" />;
      case 'sell': return <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-red-500 rotate-180" />;
      case 'hold': return <Clock className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />;
      default: return <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Recommandations IA</h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed px-2 md:px-0">
          Recommandations d'investissement personnalisées basées sur l'IA
        </p>
        <div className="mt-2 text-xs md:text-sm text-green-400 px-2 md:px-0">
          🧠 Analyse avancée des marchés et opportunités uniques à Veegox
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="all"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📊 Toutes" : "Toutes"}
          </TabsTrigger>
          <TabsTrigger 
            value="pending"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "⏳ En attente" : "En attente"}
          </TabsTrigger>
          <TabsTrigger 
            value="acted"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "✅ Traitées" : "Traitées"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4 md:mt-6">
          {isLoading ? (
            <div className="text-center py-8 md:py-10">
              <div className="animate-pulse text-white">Chargement des recommandations...</div>
            </div>
          ) : filteredRecommendations && filteredRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-3 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div className="flex items-center space-x-2">
                        {getRecommendationIcon(recommendation.recommendation_type)}
                        <CardTitle className="text-base md:text-lg text-white">
                          {recommendation.recommendation_type.toUpperCase()}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant={recommendation.acted_upon ? "outline" : "default"}
                        className="self-start text-xs"
                      >
                        {recommendation.acted_upon ? "Traitée" : "Nouvelle"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs md:text-sm text-gray-400 break-all">
                      Asset: {recommendation.asset_address}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">Confiance:</span>
                        <span className={`text-xs md:text-sm font-medium ${getConfidenceColor(recommendation.confidence_score)}`}>
                          {recommendation.confidence_score}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">Date:</span>
                        <span className="text-xs md:text-sm text-white">
                          {new Date(recommendation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {recommendation.expiry_at && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm text-muted-foreground">Expire le:</span>
                          <span className="text-xs md:text-sm text-white">
                            {new Date(recommendation.expiry_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-xs md:text-sm font-medium mb-2 text-white">Analyse:</h4>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {recommendation.rationale}
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button
                      variant={recommendation.acted_upon ? "outline" : "default"}
                      size={isMobile ? "lg" : "default"}
                      className="w-full min-h-[44px] text-sm"
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
            <div className="text-center py-8 md:py-12">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-md mx-auto">
                <div className="text-4xl md:text-5xl mb-4">🤖</div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                  Aucune recommandation
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  L'IA n'a pas encore généré de recommandations pour vous
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
