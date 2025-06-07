
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
      description: "Créez et gérez vos tokens personnalisés avec déploiement automatique",
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Module Crédit IA",
      description: "Système de prêts décentralisés avec scoring de crédit basé sur l'IA",
      color: "bg-green-500",
    },
    {
      icon: Zap,
      title: "Module Staking",
      description: "Pools de staking avec rendements optimisés et récompenses automatiques",
      color: "bg-purple-500",
    },
    {
      icon: Vote,
      title: "Module DAO",
      description: "Gouvernance décentralisée avec propositions et système de vote",
      color: "bg-orange-500",
    }
  ];

  const stats = [
    { label: "Marché Web3 2025", value: "$6.15B", growth: "CAGR 38.9%", icon: DollarSign },
    { label: "Marché DeFi 2025", value: "$32.36B", growth: "CAGR 53.8%", icon: Wallet },
    { label: "TVL Veegox", value: "$2.4M", growth: "+147%", icon: TrendingUp },
    { label: "Utilisateurs Actifs", value: "15K+", growth: "Segment cible", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">Veegox</span>
              <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size={isMobile ? "lg" : "default"}
                className="text-white hover:bg-white/10 min-h-[44px] px-4"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
              >
                Connexion
              </Button>
              <Button
                size={isMobile ? "lg" : "default"}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-4 min-h-[44px]"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            La Plateforme DeFi
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
              Tout-en-Un avec IA
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Veegox révolutionne la DeFi avec une plateforme complète intégrant l'IA 
            pour des recommandations d'investissement intelligentes.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 min-h-[52px] px-8"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Lancer l'Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.growth}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              4 Modules, 1 Plateforme
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-4 rounded-xl ${feature.color} flex-shrink-0`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Rejoignez la Révolution DeFi
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            Devenez pionnier de la première plateforme DeFi tout-en-un avec IA intégrée
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 min-h-[56px] text-lg px-8"
            onClick={() => {
              setAuthMode("signup");
              setShowAuth(true);
            }}
          >
            Commencer Maintenant
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Veegox. Révolutionnant la DeFi avec l'IA
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
