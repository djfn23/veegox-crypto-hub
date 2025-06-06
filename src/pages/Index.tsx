
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, TrendingUp, Shield, Vote, Coins, Zap, DollarSign, Brain, Users } from "lucide-react";
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
      color: "bg-blue-500",
      advantage: "Interface unifiée vs écosystème fragmenté"
    },
    {
      icon: TrendingUp,
      title: "Module Crédit IA",
      description: "Système de prêts décentralisés avec scoring de crédit on-chain basé sur l'IA",
      color: "bg-green-500",
      advantage: "IA intégrée vs Aave traditionnelle"
    },
    {
      icon: Zap,
      title: "Module Staking",
      description: "Pools de staking avec rendements optimisés et récompenses automatiques",
      color: "bg-purple-500",
      advantage: "Multi-chaînes vs Lido spécialisé"
    },
    {
      icon: Vote,
      title: "Module DAO",
      description: "Gouvernance décentralisée avec propositions et système de vote",
      color: "bg-orange-500",
      advantage: "Gouvernance intégrée vs solutions externes"
    }
  ];

  const stats = [
    { label: "Marché Web3 2025", value: "$6.15B", growth: "CAGR 38.9%", icon: DollarSign },
    { label: "Marché DeFi 2025", value: "$32.36B", growth: "CAGR 53.8%", icon: Wallet },
    { label: "TVL Veegox", value: "$2.4M", growth: "+147%", icon: TrendingUp },
    { label: "Utilisateurs Gen Z/Millennials", value: "70%", growth: "Segment cible", icon: Users }
  ];

  const competitors = [
    { name: "Aave", tvl: "$24.4B", limitation: "Prêts uniquement" },
    { name: "Uniswap", tvl: "$3.8B", limitation: "Échange uniquement" },
    { name: "Lido", tvl: "$22.6B", limitation: "Staking uniquement" },
    { name: "Veegox", tvl: "Tout-en-un", limitation: "Solution complète + IA" }
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
            La Seule Plateforme DeFi
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Tout-en-Un avec IA
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Pendant qu'Aave se limite aux prêts et Uniswap aux échanges, Veegox révolutionne la DeFi 
            avec une plateforme complète intégrant l'IA pour des recommandations d'investissement intelligentes.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Brain className="w-3 h-3 mr-1" />
              IA Scoring Crédit
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Marché $6.15B en croissance
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Interface Unifiée
            </Badge>
          </div>
          
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
              Voir l'Avantage Concurrentiel
            </Button>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xs text-green-400 mt-1">{stat.growth}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi Veegox surpasse la concurrence
            </h2>
            <p className="text-xl text-gray-300">
              Comparaison avec les leaders du marché DeFi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {competitors.map((competitor, index) => (
              <Card key={index} className={`${competitor.name === 'Veegox' ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30' : 'bg-white/5'} border-white/10 backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={competitor.name === 'Veegox' ? 'text-purple-400' : 'text-white'}>
                    {competitor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">{competitor.tvl}</div>
                  <p className={`text-sm ${competitor.name === 'Veegox' ? 'text-green-400' : 'text-gray-400'}`}>
                    {competitor.limitation}
                  </p>
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
              4 Modules, 1 Plateforme
            </h2>
            <p className="text-xl text-gray-300">
              Ce que les autres font séparément, nous l'unifions
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
                    <div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                      <div className="text-xs text-green-400 mt-1">{feature.advantage}</div>
                    </div>
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
                Technologies de Pointe pour un Marché en Croissance
              </CardTitle>
              <p className="text-gray-300">Capitalisant sur les 38.9% de croissance annuelle du Web3</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ai-advantage" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/10">
                  <TabsTrigger value="ai-advantage" className="text-white">Avantage IA</TabsTrigger>
                  <TabsTrigger value="multi-chain" className="text-white">Multi-Chain</TabsTrigger>
                  <TabsTrigger value="user-focus" className="text-white">UX Simplifiée</TabsTrigger>
                  <TabsTrigger value="market-opportunity" className="text-white">Opportunité</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ai-advantage" className="mt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Brain className="h-12 w-12 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Intelligence Artificielle Intégrée</h3>
                  <p className="text-gray-300 mb-4">
                    Scoring de crédit on-chain et recommandations d'investissement personnalisées - 
                    un avantage concurrentiel unique face aux solutions traditionnelles
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary">Scoring IA</Badge>
                    <Badge variant="secondary">Prédictions</Badge>
                    <Badge variant="secondary">Optimisation</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="multi-chain" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Support Multi-Blockchain</h3>
                  <p className="text-gray-300 mb-4">
                    Compatible avec Ethereum, Polygon, Base et Arbitrum pour maximiser les opportunités 
                    dans un écosystème en expansion rapide
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary">Ethereum</Badge>
                    <Badge variant="secondary">Polygon</Badge>
                    <Badge variant="secondary">Base</Badge>
                    <Badge variant="secondary">Arbitrum</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="user-focus" className="mt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Users className="h-12 w-12 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Conçu pour Gen Z & Millennials</h3>
                  <p className="text-gray-300">
                    Interface intuitive ciblant les 70% d'utilisateurs Web3 (25-40 ans) 
                    pour démocratiser l'accès aux services DeFi complexes
                  </p>
                </TabsContent>

                <TabsContent value="market-opportunity" className="mt-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Positionnement Stratégique</h3>
                  <p className="text-gray-300 mb-4">
                    Marché DeFi de $32.36B en 2025 avec 53.8% de croissance annuelle - 
                    Veegox capture cette opportunité avec une approche unifiée
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-500/20 p-4 rounded-lg">
                      <div className="text-green-400 font-bold">$6.15B</div>
                      <div className="text-sm text-gray-300">Marché Web3 2025</div>
                    </div>
                    <div className="bg-blue-500/20 p-4 rounded-lg">
                      <div className="text-blue-400 font-bold">53.8%</div>
                      <div className="text-sm text-gray-300">Croissance DeFi CAGR</div>
                    </div>
                  </div>
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
            Rejoignez la Révolution DeFi Unifiée
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Pendant que la concurrence reste fragmentée, devenez pionnier 
            de la première plateforme DeFi tout-en-un avec IA intégrée
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Accéder à l'Avantage Concurrentiel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Rejoignez les early adopters dans un marché de $32.36B en expansion
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Veegox. Révolutionnant la DeFi avec l'IA - Marché $6.15B en croissance de 38.9%
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
