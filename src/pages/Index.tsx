import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, TrendingUp, Shield, Vote, Coins, Zap, DollarSign, Brain, Users } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import Dashboard from "@/components/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
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
      {/* Navigation - Improved touch targets */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
              <span className="text-xl md:text-2xl font-bold text-white">Veegox</span>
              <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
            </div>
            <div className="flex space-x-3 md:space-x-4">
              <Button
                variant="ghost"
                size={isMobile ? "lg" : "default"}
                className="text-white hover:bg-white/10 text-sm md:text-base min-h-[44px] px-4 md:px-6"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
              >
                Connexion
              </Button>
              <Button
                size={isMobile ? "lg" : "default"}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm md:text-base px-4 md:px-6 min-h-[44px]"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
              >
                <span className="hidden sm:inline">Commencer</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="ml-2 h-4 w-4 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Better spacing and typography */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
            La Seule Plateforme DeFi
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
              Tout-en-Un avec IA
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-6 max-w-4xl mx-auto leading-relaxed px-4">
            Pendant qu'Aave se limite aux prêts et Uniswap aux échanges, Veegox révolutionne la DeFi 
            avec une plateforme complète intégrant l'IA pour des recommandations d'investissement intelligentes.
          </p>
          <div className="mb-8 md:mb-10 flex flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base px-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 py-2 px-4">
              <Brain className="w-4 h-4 mr-2" />
              IA Scoring Crédit
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 py-2 px-4">
              Marché $6.15B
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 py-2 px-4">
              Interface Unifiée
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16 px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto min-h-[52px] text-base md:text-lg px-8"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Lancer l'Application
              <ArrowRight className="ml-2 h-5 w-5 md:h-5 md:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto min-h-[52px] text-base md:text-lg px-8"
            >
              <span className="hidden md:inline">Voir l'Avantage Concurrentiel</span>
              <span className="md:hidden">Avantages</span>
            </Button>
          </div>

          {/* Market Stats - Better responsive grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4 md:p-6 text-center">
                  <stat.icon className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-3 text-purple-400" />
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400 leading-tight mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.growth}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section - Enhanced spacing */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pourquoi Veegox surpasse la concurrence
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
              Comparaison avec les leaders du marché DeFi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {competitors.map((competitor, index) => (
              <Card key={index} className={`${competitor.name === 'Veegox' ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30 scale-105' : 'bg-white/5'} border-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className={`${competitor.name === 'Veegox' ? 'text-purple-400' : 'text-white'} text-xl md:text-2xl`}>
                    {competitor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-3">{competitor.tvl}</div>
                  <p className={`text-sm md:text-base ${competitor.name === 'Veegox' ? 'text-green-400' : 'text-gray-400'}`}>
                    {competitor.limitation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Improved card layout */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              4 Modules, 1 Plateforme
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
              Ce que les autres font séparément, nous l'unifions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-4 rounded-xl ${feature.color} flex-shrink-0`}>
                      <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-white text-xl md:text-2xl mb-2">{feature.title}</CardTitle>
                      <div className="text-sm text-green-400 mb-2">{feature.advantage}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl md:text-3xl text-white mb-6">
                Technologies de Pointe pour un Marché en Croissance
              </CardTitle>
              <p className="text-gray-300 text-lg">Capitalisant sur les 38.9% de croissance annuelle du Web3</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ai-advantage" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/10 text-sm md:text-base h-12 md:h-14">
                  <TabsTrigger value="ai-advantage" className="text-white data-[state=active]:bg-white/20">IA</TabsTrigger>
                  <TabsTrigger value="multi-chain" className="text-white data-[state=active]:bg-white/20">Multi-Chain</TabsTrigger>
                  <TabsTrigger value="user-focus" className="text-white data-[state=active]:bg-white/20">UX</TabsTrigger>
                  <TabsTrigger value="market-opportunity" className="text-white data-[state=active]:bg-white/20">Marché</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ai-advantage" className="mt-8 text-center">
                  <div className="flex justify-center mb-6">
                    <Brain className="h-16 w-16 md:h-20 md:w-20 text-purple-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Intelligence Artificielle Intégrée</h3>
                  <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Scoring de crédit on-chain et recommandations d'investissement personnalisées - 
                    un avantage concurrentiel unique face aux solutions traditionnelles
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="secondary" className="text-sm py-2 px-4">Scoring IA</Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">Prédictions</Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">Optimisation</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="multi-chain" className="mt-8 text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Support Multi-Blockchain</h3>
                  <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Compatible avec Ethereum, Polygon, Base et Arbitrum pour maximiser les opportunités 
                    dans un écosystème en expansion rapide
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="secondary" className="text-sm py-2 px-4">Ethereum</Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">Polygon</Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">Base</Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">Arbitrum</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="user-focus" className="mt-8 text-center">
                  <div className="flex justify-center mb-6">
                    <Users className="h-16 w-16 md:h-20 md:w-20 text-blue-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Conçu pour Gen Z & Millennials</h3>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Interface intuitive ciblant les 70% d'utilisateurs Web3 (25-40 ans) 
                    pour démocratiser l'accès aux services DeFi complexes
                  </p>
                </TabsContent>

                <TabsContent value="market-opportunity" className="mt-8 text-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">Positionnement Stratégique</h3>
                  <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                    Marché DeFi de $32.36B en 2025 avec 53.8% de croissance annuelle - 
                    Veegox capture cette opportunité avec une approche unifiée
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
                    <div className="bg-green-500/20 p-6 rounded-xl">
                      <div className="text-green-400 font-bold text-2xl md:text-3xl">$6.15B</div>
                      <div className="text-sm md:text-base text-gray-300 mt-2">Marché Web3 2025</div>
                    </div>
                    <div className="bg-blue-500/20 p-6 rounded-xl">
                      <div className="text-blue-400 font-bold text-2xl md:text-3xl">53.8%</div>
                      <div className="text-sm md:text-base text-gray-300 mt-2">Croissance DeFi CAGR</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Enhanced touch targets */}
      <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Rejoignez la Révolution DeFi Unifiée
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed">
            Pendant que la concurrence reste fragmentée, devenez pionnier 
            de la première plateforme DeFi tout-en-un avec IA intégrée
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto min-h-[56px] text-lg md:text-xl px-8"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              <span className="hidden md:inline">Accéder à l'Avantage Concurrentiel</span>
              <span className="md:hidden">Commencer Maintenant</span>
              <ArrowRight className="ml-3 h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>
          <p className="text-sm md:text-base text-gray-400">
            Rejoignez les early adopters dans un marché de $32.36B en expansion
          </p>
        </div>
      </section>

      {/* Footer - Better spacing */}
      <footer className="border-t border-white/10 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 Veegox. Révolutionnant la DeFi avec l'IA - Marché $6.15B en croissance de 38.9%
          </p>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </div>
  );
};

export default Index;
