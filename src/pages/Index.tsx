
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, TrendingUp, Shield, Vote, Coins, Zap, DollarSign } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import Dashboard from "@/components/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  if (user) {
    return <Dashboard />;
  }

  const features = [
    {
      icon: Coins,
      title: "Token Manager",
      description: "Créez et gérez vos tokens personnalisés (ERC-20, NFT) avec déploiement automatique",
      color: "bg-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Module Crédit",
      description: "Système de prêts décentralisés avec scoring de crédit on-chain avancé",
      color: "bg-green-500"
    },
    {
      icon: Zap,
      title: "Module Staking",
      description: "Pools de staking avec rendements optimisés et récompenses automatiques",
      color: "bg-purple-500"
    },
    {
      icon: Vote,
      title: "Module DAO",
      description: "Gouvernance décentralisée avec propositions et système de vote",
      color: "bg-orange-500"
    }
  ];

  const stats = [
    { label: "TVL Total", value: "$2.4M", icon: DollarSign },
    { label: "Utilisateurs Actifs", value: "12.5K", icon: Wallet },
    { label: "Tokens Créés", value: "847", icon: Coins },
    { label: "Prêts Accordés", value: "1.2K", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
              <span className="text-2xl font-bold text-white">Veegox</span>
              <Badge variant="secondary" className="ml-2">Beta</Badge>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
              >
                Connexion
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
              >
                Commencer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            La Finance Décentralisée
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nouvelle Génération
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Veegox révolutionne la DeFi avec une plateforme tout-en-un pour créer des tokens, 
            obtenir des prêts, faire du staking et participer à la gouvernance décentralisée.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Lancer l'Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Modules Intégrés
            </h2>
            <p className="text-xl text-gray-300">
              Tout ce dont vous avez besoin pour naviguer dans l'écosystème DeFi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-4">
                Technologies de Pointe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="multi-chain" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/10">
                  <TabsTrigger value="multi-chain" className="text-white">Multi-Chain</TabsTrigger>
                  <TabsTrigger value="ai-scoring" className="text-white">IA Scoring</TabsTrigger>
                  <TabsTrigger value="defi-native" className="text-white">DeFi Native</TabsTrigger>
                  <TabsTrigger value="governance" className="text-white">Gouvernance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="multi-chain" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Support Multi-Blockchain</h3>
                  <p className="text-gray-300 mb-4">
                    Compatible avec Ethereum, Polygon, Base et Arbitrum pour une flexibilité maximale
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary">Ethereum</Badge>
                    <Badge variant="secondary">Polygon</Badge>
                    <Badge variant="secondary">Base</Badge>
                    <Badge variant="secondary">Arbitrum</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="ai-scoring" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Scoring de Crédit IA</h3>
                  <p className="text-gray-300">
                    Algorithme d'intelligence artificielle analysant l'historique on-chain pour 
                    déterminer la solvabilité et optimiser les conditions de prêt
                  </p>
                </TabsContent>

                <TabsContent value="defi-native" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">DeFi Native</h3>
                  <p className="text-gray-300">
                    Protocoles décentralisés avec smart contracts audités et liquidité 
                    distribuée pour une sécurité et une efficacité optimales
                  </p>
                </TabsContent>

                <TabsContent value="governance" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Gouvernance Décentralisée</h3>
                  <p className="text-gray-300">
                    Système de vote démocratique où chaque détenteur de token peut 
                    proposer et voter sur l'évolution de la plateforme
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Révolutionner Votre DeFi ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à Veegox pour 
            leurs besoins en finance décentralisée
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            onClick={() => {
              setAuthMode("signup");
              setShowAuth(true);
            }}
          >
            Commencer Maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Veegox. Construisant l'avenir de la finance décentralisée.
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
