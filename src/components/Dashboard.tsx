
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
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
  Settings,
  Menu,
  Bell,
  ChevronRight
} from "lucide-react";
import TokenManager from "./modules/TokenManager";
import CreditModule from "./modules/CreditModule";
import StakingModule from "./modules/StakingModule";
import DAOModule from "./modules/DAOModule";
import ProfileSettings from "./modules/ProfileSettings";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
    { label: "Portfolio Total", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "from-green-500 to-emerald-700" },
    { label: "Tokens Créés", value: "3", change: "+1 ce mois", icon: Coins, color: "from-blue-500 to-indigo-700" },
    { label: "Prêts Actifs", value: "2", change: "Aucun risque", icon: Shield, color: "from-purple-500 to-violet-700" },
    { label: "Staking Rewards", value: "$245", change: "+8.2% APY", icon: TrendingUp, color: "from-orange-500 to-amber-700" }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-foreground"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center animate-pulse-soft">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-heading font-bold text-foreground hidden sm:block">Veegox</span>
                <Badge variant="outline" className="ml-2 border-primary/50 text-primary-foreground">Beta</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {profile?.full_name || "Utilisateur"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {profile?.username || "Non défini"}
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-sm bg-card shadow-xl animate-fade-in p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-heading font-bold">Veegox</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {[
                { id: "overview", label: "Vue d'ensemble", icon: Activity },
                { id: "tokens", label: "Tokens", icon: Coins },
                { id: "credit", label: "Crédit", icon: Shield },
                { id: "staking", label: "Staking", icon: TrendingUp },
                { id: "dao", label: "DAO", icon: Vote },
                { id: "profile", label: "Profil", icon: Settings }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="hidden md:grid w-full grid-cols-6 bg-card/50 backdrop-blur-sm rounded-xl p-1">
            <TabsTrigger value="overview" className="font-medium">
              <Activity className="h-4 w-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="tokens" className="font-medium">
              <Coins className="h-4 w-4 mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="credit" className="font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Crédit
            </TabsTrigger>
            <TabsTrigger value="staking" className="font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Staking
            </TabsTrigger>
            <TabsTrigger value="dao" className="font-medium">
              <Vote className="h-4 w-4 mr-2" />
              DAO
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-medium">
              <Settings className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-heading font-bold">Tableau de bord</h1>
                <div className="hidden sm:block">
                  <Button 
                    variant="outline" 
                    className="border-primary/25 hover:border-primary text-primary-foreground"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connecter un wallet
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="card-glass hover-glow group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold mt-1">{stat.value}</p>
                          <p className="text-sm text-emerald-500 mt-1">{stat.change}</p>
                        </div>
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="card-glass overflow-hidden">
                  <CardHeader className="bg-card/50 backdrop-blur-sm border-b border-white/5">
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-primary" />
                      Activité Récente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">Token VEX créé avec succès</p>
                            <span className="text-xs text-muted-foreground">Il y a 2h</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Votre token a été déployé sur Ethereum</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">Rewards de staking réclamés</p>
                            <span className="text-xs text-muted-foreground">Il y a 1j</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Vous avez réclamé 45 VEX tokens</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start space-x-4">
                        <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">Vote sur proposition DAO #12</p>
                            <span className="text-xs text-muted-foreground">Il y a 3j</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Votre vote a été compté avec succès</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-glass overflow-hidden">
                  <CardHeader className="bg-card/50 backdrop-blur-sm border-b border-white/5">
                    <CardTitle className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2 text-primary" />
                      Actions Rapides
                    </CardTitle>
                    <CardDescription>Gérez facilement vos actifs crypto</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Button 
                        className="w-full justify-between group hover-scale bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30"
                        onClick={() => setActiveTab("tokens")}
                      >
                        <div className="flex items-center">
                          <Coins className="h-5 w-5 mr-3 text-blue-500" />
                          Créer un nouveau token
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        className="w-full justify-between group hover-scale bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30"
                        onClick={() => setActiveTab("credit")}
                      >
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-green-500" />
                          Demander un prêt
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        className="w-full justify-between group hover-scale bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30"
                        onClick={() => setActiveTab("staking")}
                      >
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 mr-3 text-purple-500" />
                          Explorer le staking
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        className="w-full justify-between group hover-scale bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30"
                        onClick={() => setActiveTab("dao")}
                      >
                        <div className="flex items-center">
                          <Vote className="h-5 w-5 mr-3 text-orange-500" />
                          Participer au DAO
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
