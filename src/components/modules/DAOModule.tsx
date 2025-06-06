
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Vote, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Plus,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DAOModule() {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const stats = [
    { title: "Membres", value: "2,547", change: "+12%", icon: Users },
    { title: "Propositions", value: "23", change: "+3", icon: Vote },
    { title: "Trésorerie", value: "$1.2M", change: "+8%", icon: TrendingUp },
    { title: "Votes Actifs", value: "5", change: "En cours", icon: Calendar }
  ];

  const recentProposals = [
    {
      id: 1,
      title: "Allocation budget marketing Q2",
      status: "active",
      votes: { for: 1250, against: 340 },
      timeLeft: "2j 14h",
      quorum: 70
    },
    {
      id: 2,
      title: "Partenariat protocole X",
      status: "passed",
      votes: { for: 2100, against: 450 },
      timeLeft: "Terminé",
      quorum: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-600/20 text-blue-400";
      case "passed": return "bg-green-600/20 text-green-400";
      case "rejected": return "bg-red-600/20 text-red-400";
      default: return "bg-gray-600/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">DAO Gouvernance</h1>
        <p className="text-gray-400 text-sm md:text-base px-2 md:px-0">
          Participez à la gouvernance décentralisée et votez sur les propositions
        </p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-600/20 text-green-400' : 'bg-blue-600/20 text-blue-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-lg md:text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 gap-1 h-auto p-1' : 'grid-cols-4'} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1`}>
          <TabsTrigger 
            value="overview"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            {isMobile ? "Vue d'ensemble" : "Vue d'ensemble"}
          </TabsTrigger>
          <TabsTrigger 
            value="proposals"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            Propositions
          </TabsTrigger>
          <TabsTrigger 
            value="treasury"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            {isMobile ? "Trésorerie" : "Trésorerie"}
          </TabsTrigger>
          <TabsTrigger 
            value="members"
            className={`text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg ${isMobile ? 'text-xs py-3 px-2' : ''}`}
          >
            Membres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Proposals */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between text-lg">
                  <span>Propositions Récentes</span>
                  <Button size="sm" className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-8 text-xs' : ''}`}>
                    <Plus className="h-4 w-4 mr-1" />
                    {isMobile ? "Nouvelle" : "Nouvelle"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="p-3 md:p-4 bg-white/5 rounded-lg space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 mb-2">
                          {proposal.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(proposal.status)}>
                            {proposal.status === 'active' ? 'Actif' : 'Adopté'}
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {proposal.timeLeft}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-400">Quorum: {proposal.quorum}%</span>
                        <span className="text-white">
                          {Math.round((proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100)}% Pour
                        </span>
                      </div>
                      <Progress 
                        value={(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100} 
                        className="h-2"
                      />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-white">{proposal.votes.for} Pour</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-400" />
                          <span className="text-white">{proposal.votes.against} Contre</span>
                        </div>
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className={`flex-1 bg-green-600 hover:bg-green-700 ${isMobile ? 'h-8 text-xs' : ''}`}>
                          Pour
                        </Button>
                        <Button size="sm" className={`flex-1 bg-red-600 hover:bg-red-700 ${isMobile ? 'h-8 text-xs' : ''}`}>
                          Contre
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Activity */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Activité de la Communauté</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Discussion Forum</p>
                        <p className="text-gray-400 text-xs">45 nouveaux messages</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className={`border-white/20 text-white hover:bg-white/10 ${isMobile ? 'text-xs px-2' : ''}`}>
                      Voir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Vote className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Votes en Cours</p>
                        <p className="text-gray-400 text-xs">5 propositions actives</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className={`border-white/20 text-white hover:bg-white/10 ${isMobile ? 'text-xs px-2' : ''}`}>
                      Voter
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Nouveaux Membres</p>
                        <p className="text-gray-400 text-xs">+127 cette semaine</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className={`border-white/20 text-white hover:bg-white/10 ${isMobile ? 'text-xs px-2' : ''}`}>
                      Inviter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between text-lg md:text-xl">
                <span>Toutes les Propositions</span>
                <Button className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-10 text-sm' : ''}`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Proposition
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <Vote className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} mx-auto text-gray-500 mb-4`} />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Liste des Propositions</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Consultez toutes les propositions passées et actuelles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treasury" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actifs de la Trésorerie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { token: "ETH", amount: "150.5", value: "$370,000", percentage: "60%" },
                  { token: "USDC", amount: "250,000", value: "$250,000", percentage: "40%" },
                ].map((asset, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white font-medium text-sm">{asset.token}</div>
                      <div className="text-gray-400 text-xs">{asset.amount} tokens</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-mono text-sm">{asset.value}</div>
                      <div className="text-gray-400 text-xs">{asset.percentage}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg">Dépenses Récentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { description: "Marketing Q1", amount: "$25,000", date: "15 Mars" },
                  { description: "Développement", amount: "$50,000", date: "10 Mars" },
                  { description: "Audit Sécurité", amount: "$15,000", date: "5 Mars" },
                ].map((expense, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">{expense.description}</div>
                      <div className="text-gray-400 text-xs">{expense.date}</div>
                    </div>
                    <div className="text-white font-mono text-sm">{expense.amount}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="mt-4 md:mt-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg md:text-xl">Membres de la DAO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 md:py-12">
                <Users className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} mx-auto text-gray-500 mb-4`} />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Communauté DAO</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Explorez les membres actifs et leurs contributions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
