
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  MessageSquare,
  TrendingUp,
  Scale
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Governance = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("proposals");

  const mockProposals = [
    {
      id: 1,
      title: "Augmentation des récompenses de staking",
      description: "Proposer d'augmenter les récompenses de staking de 5% à 7% pour encourager plus de participation.",
      status: "active",
      votesFor: 1250000,
      votesAgainst: 380000,
      totalVotes: 1630000,
      quorum: 1500000,
      timeLeft: "2 jours",
      proposer: "0x1234...5678",
      category: "Économique"
    },
    {
      id: 2,
      title: "Mise à jour du protocole v2.1",
      description: "Implémentation de nouvelles fonctionnalités de sécurité et optimisations de gas.",
      status: "passed",
      votesFor: 2100000,
      votesAgainst: 450000,
      totalVotes: 2550000,
      quorum: 1500000,
      timeLeft: "Terminé",
      proposer: "0xabcd...efgh",
      category: "Technique"
    },
    {
      id: 3,
      title: "Partenariat avec protocole DeFi",
      description: "Établir un partenariat stratégique avec un protocole DeFi majeur pour étendre notre écosystème.",
      status: "rejected",
      votesFor: 800000,
      votesAgainst: 1400000,
      totalVotes: 2200000,
      quorum: 1500000,
      timeLeft: "Terminé",
      proposer: "0x9876...4321",
      category: "Partenariat"
    }
  ];

  const governanceStats = [
    { label: "Propositions Totales", value: "127", change: "+12" },
    { label: "Votants Actifs", value: "15.2K", change: "+8.5%" },
    { label: "Tokens en Vote", value: "2.1M", change: "+15%" },
    { label: "Taux de Participation", value: "68%", change: "+3%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-600/20 text-blue-400";
      case "passed": return "bg-green-600/20 text-green-400";
      case "rejected": return "bg-red-600/20 text-red-400";
      default: return "bg-gray-600/20 text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "En cours";
      case "passed": return "Adoptée";
      case "rejected": return "Rejetée";
      default: return "Inconnue";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Gouvernance DAO</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Participez aux décisions importantes de l'écosystème
          </p>
        </div>
        <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'w-full h-12' : ''}`}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Proposition
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {governanceStats.map((stat, index) => (
          <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-1 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="proposals"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📋 Propositions" : "Propositions"}
          </TabsTrigger>
          <TabsTrigger 
            value="voting"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "🗳️ Mes Votes" : "Mes Votes"}
          </TabsTrigger>
          <TabsTrigger 
            value="delegates"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "👥 Délégués" : "Délégués"}
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'justify-start text-sm py-3 px-4' : ''}`}
          >
            {isMobile ? "📊 Analytics" : "Analytics"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="mt-4 md:mt-6">
          <div className="space-y-4 md:space-y-6">
            {mockProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-white text-lg">{proposal.title}</CardTitle>
                        <Badge className={getStatusColor(proposal.status)}>
                          {getStatusText(proposal.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{proposal.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>#{proposal.id}</span>
                        <span>{proposal.category}</span>
                        <span>Par {proposal.proposer}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {proposal.timeLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Votes Pour vs Contre</span>
                        <span className="text-white">
                          {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% Pour
                        </span>
                      </div>
                      <Progress 
                        value={(proposal.votesFor / proposal.totalVotes) * 100} 
                        className="h-2"
                      />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-white">{proposal.votesFor.toLocaleString()} Pour</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-400" />
                          <span className="text-white">{proposal.votesAgainst.toLocaleString()} Contre</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Quorum: {proposal.quorum.toLocaleString()} tokens requis
                        {proposal.totalVotes >= proposal.quorum && (
                          <span className="text-green-400 ml-2">✓ Atteint</span>
                        )}
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                        <Button className={`flex-1 bg-green-600 hover:bg-green-700 ${isMobile ? 'h-12' : ''}`}>
                          <Vote className="h-4 w-4 mr-2" />
                          Voter Pour
                        </Button>
                        <Button className={`flex-1 bg-red-600 hover:bg-red-700 ${isMobile ? 'h-12' : ''}`}>
                          <Vote className="h-4 w-4 mr-2" />
                          Voter Contre
                        </Button>
                        <Button variant="outline" className={`flex-1 sm:flex-none border-white/20 text-white hover:bg-white/10 ${isMobile ? 'h-12' : ''}`}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Discuter
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voting" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Mon Historique de Vote</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-gray-400">Votes Effectués</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">250K</div>
                    <div className="text-sm text-gray-400">Tokens Utilisés</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-sm text-gray-400">Taux de Participation</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {mockProposals.slice(0, 2).map((proposal) => (
                    <div key={proposal.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium mb-1">{proposal.title}</div>
                        <div className="text-gray-400 text-sm">Vote: Pour • 25,000 tokens</div>
                      </div>
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusText(proposal.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delegates" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Délégation de Vote</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Users className="h-16 w-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Délégation de Vote</h3>
                  <p className="text-gray-400 mb-4">
                    Déléguez vos tokens de vote à des membres expérimentés de la communauté
                  </p>
                  <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'w-full h-12' : ''}`}>
                    Explorer les Délégués
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendances de Participation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Graphique de participation</p>
                    <p className="text-xs">Données en temps réel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Distribution des Votes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Propositions Économiques</span>
                    <span className="text-blue-400">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Mises à jour Techniques</span>
                    <span className="text-purple-400">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Partenariats</span>
                    <span className="text-green-400">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Autres</span>
                    <span className="text-orange-400">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Governance;
