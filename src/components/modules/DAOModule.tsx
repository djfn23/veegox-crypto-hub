
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Vote, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const DAOModule = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    proposal_type: "",
    voting_duration: "7"
  });

  const queryClient = useQueryClient();

  const { data: proposals } = useQuery({
    queryKey: ['dao-proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dao_proposals')
        .select(`
          *,
          profiles!dao_proposals_proposer_id_fkey (
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: userVotes } = useQuery({
    queryKey: ['user-votes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('dao_votes')
        .select('proposal_id, vote_choice')
        .eq('voter_id', user.id);

      if (error) throw error;
      return data;
    },
  });

  const createProposalMutation = useMutation({
    mutationFn: async (proposalData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const votingEndsAt = new Date();
      votingEndsAt.setDate(votingEndsAt.getDate() + parseInt(proposalData.voting_duration));

      const { data, error } = await supabase
        .from('dao_proposals')
        .insert({
          proposer_id: user.id,
          title: proposalData.title,
          description: proposalData.description,
          proposal_type: proposalData.proposal_type,
          voting_ends_at: votingEndsAt.toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dao-proposals'] });
      toast.success("Proposition créée avec succès !");
      setShowCreateForm(false);
      setProposalData({
        title: "",
        description: "",
        proposal_type: "",
        voting_duration: "7"
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création de la proposition");
    },
  });

  const voteMutation = useMutation({
    mutationFn: async ({ proposalId, choice }: { proposalId: string; choice: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // Simuler le vote power basé sur les tokens détenus
      const votePower = 100; // À remplacer par la vraie logique

      const { data, error } = await supabase
        .from('dao_votes')
        .insert({
          proposal_id: proposalId,
          voter_id: user.id,
          vote_choice: choice,
          vote_power: votePower
        })
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour les compteurs de la proposition
      const { error: updateError } = await supabase.rpc('update_proposal_votes', {
        proposal_id: proposalId,
        vote_power: votePower,
        is_for: choice
      });

      if (updateError) throw updateError;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dao-proposals'] });
      queryClient.invalidateQueries({ queryKey: ['user-votes'] });
      toast.success("Vote enregistré avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du vote");
    },
  });

  const getProposalStatus = (proposal: any) => {
    const now = new Date();
    const votingEnds = new Date(proposal.voting_ends_at);
    
    if (now > votingEnds) {
      const totalVotes = (proposal.votes_for || 0) + (proposal.votes_against || 0);
      if (totalVotes >= (proposal.quorum_required || 50)) {
        return proposal.votes_for > proposal.votes_against ? 'passed' : 'rejected';
      }
      return 'rejected';
    }
    return 'active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'passed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'executed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'passed': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      case 'executed': return 'Exécutée';
      default: return 'Inconnue';
    }
  };

  const calculateProgress = (proposal: any) => {
    const totalVotes = (proposal.votes_for || 0) + (proposal.votes_against || 0);
    const quorum = proposal.quorum_required || 50;
    return Math.min((totalVotes / quorum) * 100, 100);
  };

  const hasUserVoted = (proposalId: string) => {
    return userVotes?.some(vote => vote.proposal_id === proposalId);
  };

  const getUserVote = (proposalId: string) => {
    return userVotes?.find(vote => vote.proposal_id === proposalId);
  };

  const daysUntilEnd = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Module DAO</h2>
          <p className="text-gray-400">Participez à la gouvernance décentralisée de Veegox</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Proposition
        </Button>
      </div>

      {/* DAO Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Vote className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-white">
              {proposals?.length || 0}
            </div>
            <div className="text-sm text-gray-400">Propositions Totales</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-white">
              {proposals?.filter(p => getProposalStatus(p) === 'passed').length || 0}
            </div>
            <div className="text-sm text-gray-400">Approuvées</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-white">
              {proposals?.filter(p => getProposalStatus(p) === 'active').length || 0}
            </div>
            <div className="text-sm text-gray-400">En Cours</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-white">1,247</div>
            <div className="text-sm text-gray-400">Votants Actifs</div>
          </CardContent>
        </Card>
      </div>

      {/* Create Proposal Form */}
      {showCreateForm && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Créer une Nouvelle Proposition</CardTitle>
            <CardDescription className="text-gray-400">
              Soumettez votre idée à la communauté pour vote
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Titre de la Proposition</Label>
                <Input
                  id="title"
                  placeholder="Amélioration du protocole..."
                  value={proposalData.title}
                  onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Type de Proposition</Label>
                <Select 
                  value={proposalData.proposal_type} 
                  onValueChange={(value) => setProposalData({...proposalData, proposal_type: value})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="protocol">Protocole</SelectItem>
                    <SelectItem value="treasury">Trésorerie</SelectItem>
                    <SelectItem value="governance">Gouvernance</SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description Détaillée</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre proposition en détail..."
                rows={6}
                value={proposalData.description}
                onChange={(e) => setProposalData({...proposalData, description: e.target.value})}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Durée de Vote (jours)</Label>
              <Select 
                value={proposalData.voting_duration} 
                onValueChange={(value) => setProposalData({...proposalData, voting_duration: value})}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 jours</SelectItem>
                  <SelectItem value="7">7 jours</SelectItem>
                  <SelectItem value="14">14 jours</SelectItem>
                  <SelectItem value="30">30 jours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Annuler
              </Button>
              <Button 
                onClick={() => createProposalMutation.mutate(proposalData)}
                disabled={!proposalData.title || !proposalData.description || createProposalMutation.isPending}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {createProposalMutation.isPending ? "Création..." : "Créer la Proposition"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals && proposals.length > 0 ? (
          proposals.map((proposal) => {
            const status = getProposalStatus(proposal);
            const userVote = getUserVote(proposal.id);
            const progress = calculateProgress(proposal);
            const daysLeft = daysUntilEnd(proposal.voting_ends_at);

            return (
              <Card key={proposal.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={`${getStatusColor(status)} text-white`}>
                          {getStatusLabel(status)}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-white">
                          {proposal.proposal_type}
                        </Badge>
                        {status === 'active' && (
                          <Badge variant="outline" className="border-orange-500 text-orange-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-white">{proposal.title}</CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        Par {proposal.profiles?.full_name || proposal.profiles?.username || 'Utilisateur'} • 
                        {new Date(proposal.created_at || '').toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{proposal.description}</p>

                  {/* Voting Results */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Participation</span>
                      <span className="text-white">
                        {((proposal.votes_for || 0) + (proposal.votes_against || 0))} / {proposal.quorum_required || 50} votes
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">
                        {proposal.votes_for || 0}
                      </div>
                      <div className="text-sm text-gray-400">Pour</div>
                    </div>
                    <div className="text-center p-3 bg-red-500/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-500">
                        {proposal.votes_against || 0}
                      </div>
                      <div className="text-sm text-gray-400">Contre</div>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  {status === 'active' && !hasUserVoted(proposal.id) && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => voteMutation.mutate({ proposalId: proposal.id, choice: true })}
                        disabled={voteMutation.isPending}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Voter Pour
                      </Button>
                      <Button
                        onClick={() => voteMutation.mutate({ proposalId: proposal.id, choice: false })}
                        disabled={voteMutation.isPending}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Voter Contre
                      </Button>
                    </div>
                  )}

                  {userVote && (
                    <div className="flex items-center justify-center p-2 bg-slate-800/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-white">
                        Vous avez voté {userVote.vote_choice ? 'Pour' : 'Contre'}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Vote className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-white mb-2">Aucune proposition active</h3>
              <p className="text-gray-400 mb-4">Soyez le premier à proposer une amélioration !</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer une proposition
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DAOModule;
