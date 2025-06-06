
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Vote, Clock, CheckCircle, XCircle, PlusCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

type ProposalFormData = {
  title: string;
  description: string;
  proposal_type: string;
  voting_ends_at: string;
};

export default function DAOModule() {
  const [activeTab, setActiveTab] = useState("proposals");
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProposalFormData>();

  const { data: proposals, isLoading } = useQuery({
    queryKey: ['dao-proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dao_proposals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const createProposalMutation = useMutation({
    mutationFn: async (data: ProposalFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour créer une proposition");
      
      const { data: proposal, error } = await supabase
        .from("dao_proposals")
        .insert({
          proposer_id: userData.user.id,
          title: data.title,
          description: data.description,
          proposal_type: data.proposal_type,
          voting_ends_at: new Date(data.voting_ends_at).toISOString(),
        })
        .select()
        .single();
        
      if (error) throw error;
      return proposal;
    },
    onSuccess: () => {
      toast.success("Proposition créée avec succès!");
      queryClient.invalidateQueries({ queryKey: ["dao-proposals"] });
      reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création de la proposition");
    },
  });

  const voteOnProposalMutation = useMutation({
    mutationFn: async ({ proposalId, voteChoice }: { proposalId: string; voteChoice: boolean }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour voter");
      
      const { data: vote, error } = await supabase
        .from("dao_votes")
        .insert({
          proposal_id: proposalId,
          voter_id: userData.user.id,
          vote_choice: voteChoice,
          vote_power: 1, // Simplified voting power
        })
        .select()
        .single();
        
      if (error) throw error;
      return vote;
    },
    onSuccess: () => {
      toast.success("Vote enregistré avec succès!");
      queryClient.invalidateQueries({ queryKey: ["dao-proposals"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du vote");
    },
  });

  const onSubmit = (data: ProposalFormData) => {
    createProposalMutation.mutate(data);
  };

  const handleVote = (proposalId: string, voteChoice: boolean) => {
    voteOnProposalMutation.mutate({ proposalId, voteChoice });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Actif</Badge>;
      case 'passed':
        return <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">Adopté</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Rejeté</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateVoteProgress = (votesFor: number, votesAgainst: number) => {
    const total = votesFor + votesAgainst;
    if (total === 0) return 0;
    return (votesFor / total) * 100;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">DAO Gouvernance</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Participez à la gouvernance décentralisée de Veegox
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/governance">
            <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
              <Vote className="h-4 w-4 mr-2" />
              Gouvernance Avancée
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-3'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="proposals"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📊 Propositions" : "Propositions"}
          </TabsTrigger>
          <TabsTrigger 
            value="create"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "➕ Créer" : "Créer une Proposition"}
          </TabsTrigger>
          <TabsTrigger 
            value="stats"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📈 Stats" : "Statistiques"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="mt-4 md:mt-6">
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Chargement des propositions...</div>
            ) : proposals && proposals.length > 0 ? (
              proposals.map((proposal) => (
                <Card key={proposal.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <CardTitle className="text-white text-lg">{proposal.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(proposal.status)}
                        <Badge variant="outline" className="text-gray-300 border-gray-600">
                          {proposal.proposal_type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{proposal.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Votes Pour/Contre</span>
                        <span className="text-white">
                          {proposal.votes_for || 0} / {proposal.votes_against || 0}
                        </span>
                      </div>
                      <Progress 
                        value={calculateVoteProgress(proposal.votes_for || 0, proposal.votes_against || 0)} 
                        className="h-2 bg-gray-700"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Fin: {formatDate(proposal.voting_ends_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{(proposal.votes_for || 0) + (proposal.votes_against || 0)} votes</span>
                        </div>
                      </div>

                      {proposal.status === 'active' && (
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            onClick={() => handleVote(proposal.id, true)}
                            disabled={voteOnProposalMutation.isPending}
                            className={`flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white ${isMobile ? 'h-10' : ''}`}
                            size={isMobile ? "default" : "sm"}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Pour
                          </Button>
                          <Button
                            onClick={() => handleVote(proposal.id, false)}
                            disabled={voteOnProposalMutation.isPending}
                            className={`flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white ${isMobile ? 'h-10' : ''}`}
                            size={isMobile ? "default" : "sm"}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Contre
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Vote className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Aucune proposition</h3>
                    <p className="text-gray-400 mb-4">
                      Soyez le premier à créer une proposition pour la communauté
                    </p>
                    <Button 
                      onClick={() => setActiveTab("create")}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Créer une proposition
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Créer une Nouvelle Proposition</CardTitle>
              <CardDescription className="text-gray-400">
                Soumettez une proposition à la communauté pour vote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-white">
                      Titre de la proposition *
                    </label>
                    <Input
                      id="title"
                      placeholder="Titre court et descriptif"
                      {...register("title", { required: "Un titre est requis" })}
                      className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                    />
                    {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="proposal_type" className="text-sm font-medium text-white">
                      Type de proposition *
                    </label>
                    <select
                      id="proposal_type"
                      {...register("proposal_type", { required: "Un type est requis" })}
                      className={`w-full bg-slate-800 border-slate-600 text-white rounded-md px-3 py-2 ${isMobile ? 'h-12' : ''}`}
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="governance">Gouvernance</option>
                      <option value="treasury">Trésorerie</option>
                      <option value="protocol">Protocole</option>
                      <option value="partnership">Partenariat</option>
                    </select>
                    {errors.proposal_type && <p className="text-xs text-red-400">{errors.proposal_type.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="voting_ends_at" className="text-sm font-medium text-white">
                      Date de fin du vote *
                    </label>
                    <Input
                      id="voting_ends_at"
                      type="datetime-local"
                      {...register("voting_ends_at", { required: "Une date de fin est requise" })}
                      className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}
                    />
                    {errors.voting_ends_at && <p className="text-xs text-red-400">{errors.voting_ends_at.message}</p>}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-white">
                      Description détaillée *
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre proposition en détail..."
                      rows={6}
                      {...register("description", { required: "Une description est requise" })}
                      className="bg-slate-800 border-slate-600 text-white resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={createProposalMutation.isPending}
                    className={`flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-12' : ''}`}
                  >
                    {createProposalMutation.isPending ? "Création..." : "Créer la proposition"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Propositions Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {proposals?.length || 0}
                </div>
                <div className="text-gray-400 text-sm">Toutes les propositions</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Propositions Actives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
                  {proposals?.filter(p => p.status === 'active').length || 0}
                </div>
                <div className="text-gray-400 text-sm">En cours de vote</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Taux d'Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                  {proposals && proposals.length > 0 
                    ? Math.round((proposals.filter(p => p.status === 'passed').length / proposals.length) * 100)
                    : 0}%
                </div>
                <div className="text-gray-400 text-sm">Propositions adoptées</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
