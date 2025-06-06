
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  LogOut, 
  User, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Vote, 
  Coins,
  DollarSign,
  Activity,
  Settings
} from "lucide-react";
import TokenManager from "./modules/TokenManager";
import CreditModule from "./modules/CreditModule";
import StakingModule from "./modules/StakingModule";
import DAOModule from "./modules/DAOModule";
import ProfileSettings from "./modules/ProfileSettings";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        return data;
      }
      return null;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
  };

  const stats = [
    { label: "Portfolio Total", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "text-green-500" },
    { label: "Tokens Créés", value: "3", change: "+1 ce mois", icon: Coins, color: "text-blue-500" },
    { label: "Prêts Actifs", value: "2", change: "Aucun risque", icon: Shield, color: "text-purple-500" },
    { label: "Staking Rewards", value: "$245", change: "+8.2% APY", icon: TrendingUp, color: "text-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
              <span className="text-2xl font-bold text-white">Veegox</span>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-medium">
                  {profile?.full_name || "Utilisateur"}
                </div>
                <div className="text-sm text-gray-400">
                  {profile?.username || "Non défini"}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="overview" className="text-white">
              <Activity className="h-4 w-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="tokens" className="text-white">
              <Coins className="h-4 w-4 mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="credit" className="text-white">
              <Shield className="h-4 w-4 mr-2" />
              Crédit
            </TabsTrigger>
            <TabsTrigger value="staking" className="text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Staking
            </TabsTrigger>
            <TabsTrigger value="dao" className="text-white">
              <Vote className="h-4 w-4 mr-2" />
              DAO
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-white">
              <Settings className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Token VEX créé avec succès</p>
                        <p className="text-gray-400 text-xs">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Rewards de staking réclamés</p>
                        <p className="text-gray-400 text-xs">Il y a 1 jour</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Vote sur proposition DAO #12</p>
                        <p className="text-gray-400 text-xs">Il y a 3 jours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={() => setActiveTab("tokens")}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Créer un nouveau token
                  </Button>
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    onClick={() => setActiveTab("credit")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Demander un prêt
                  </Button>
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => setActiveTab("staking")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Explorer le staking
                  </Button>
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => setActiveTab("dao")}
                  >
                    <Vote className="h-4 w-4 mr-2" />
                    Participer au DAO
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tokens">
            <TokenManager />
          </TabsContent>

          <TabsContent value="credit">
            <CreditModule />
          </TabsContent>

          <TabsContent value="staking">
            <StakingModule />
          </TabsContent>

          <TabsContent value="dao">
            <DAOModule />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
