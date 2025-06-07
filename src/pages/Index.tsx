
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
import { MobileContainer, MobileSection, MobileGrid, MobileCard, MobileHeading, MobileText } from "@/components/ui/mobile-components";
import { TouchTarget } from "@/components/ui/mobile-touch-target";

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
      {/* Navigation optimisée mobile */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-40">
        <MobileContainer size="default" centered>
          <div className="flex justify-between items-center py-3 md:py-4 min-h-[64px]">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0"></div>
              <span className="text-lg md:text-xl font-bold text-white truncate">Veegox</span>
              <Badge variant="secondary" className="ml-1 md:ml-2 text-xs px-2 py-0.5">Beta</Badge>
            </div>
            <div className="flex space-x-2 md:space-x-3 flex-shrink-0">
              <TouchTarget
                size="lg"
                variant="ghost"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                }}
                className="text-white hover:bg-white/10 px-3 md:px-4"
              >
                Connexion
              </TouchTarget>
              <TouchTarget
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-3 md:px-4"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
              >
                Commencer
                <ArrowRight className="ml-2 h-4 w-4" />
              </TouchTarget>
            </div>
          </div>
        </MobileContainer>
      </nav>

      {/* Hero Section optimisée mobile */}
      <MobileSection size="lg">
        <MobileContainer size="default" centered>
          <div className="text-center animate-mobile-fade-in">
            <MobileHeading 
              level={1}
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight"
            >
              La Plateforme DeFi
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                Tout-en-Un avec IA
              </span>
            </MobileHeading>
            
            <MobileText 
              variant="body" 
              className="text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Veegox révolutionne la DeFi avec une plateforme complète intégrant l'IA 
              pour des recommandations d'investissement intelligentes.
            </MobileText>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12">
              <TouchTarget
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 md:px-8 py-3 md:py-4"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
              >
                Lancer l'Application
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </TouchTarget>
            </div>

            {/* Stats Grid optimisée mobile */}
            <MobileGrid cols={2} gap="sm" className="mb-12 md:mb-16">
              {stats.map((stat, index) => (
                <MobileCard 
                  key={index} 
                  variant="glass" 
                  padding="sm"
                  interactive
                  className="text-center"
                >
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-purple-400" />
                  <div className="text-lg md:text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 mb-1 line-clamp-2">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.growth}</div>
                </MobileCard>
              ))}
            </MobileGrid>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* Features Section optimisée mobile */}
      <MobileSection size="lg">
        <MobileContainer size="default" centered>
          <div className="text-center mb-8 md:mb-16">
            <MobileHeading 
              level={2}
              className="text-white mb-4 md:mb-6"
            >
              4 Modules, 1 Plateforme
            </MobileHeading>
          </div>

          <MobileGrid cols={1} gap="default" className="lg:grid-cols-2">
            {features.map((feature, index) => (
              <MobileCard 
                key={index} 
                variant="glass" 
                interactive
                className="mobile-interactive"
              >
                <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                  <div className={`p-3 md:p-4 rounded-xl ${feature.color} flex-shrink-0`}>
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <MobileHeading level={3} className="text-white mb-2">
                      {feature.title}
                    </MobileHeading>
                    <MobileText className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </MobileText>
                  </div>
                </div>
              </MobileCard>
            ))}
          </MobileGrid>
        </MobileContainer>
      </MobileSection>

      {/* CTA Section optimisée mobile */}
      <MobileSection size="lg">
        <MobileContainer size="default" centered>
          <div className="text-center">
            <MobileHeading 
              level={2}
              className="text-white mb-6 md:mb-8"
            >
              Rejoignez la Révolution DeFi
            </MobileHeading>
            <MobileText 
              variant="body"
              className="text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Devenez pionnier de la première plateforme DeFi tout-en-un avec IA intégrée
            </MobileText>
            <TouchTarget
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 md:px-8 py-3 md:py-4 text-lg"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              Commencer Maintenant
              <ArrowRight className="ml-3 h-4 w-4 md:h-5 md:w-5" />
            </TouchTarget>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* Footer optimisé mobile */}
      <footer className="border-t border-white/10 py-6 md:py-8">
        <MobileContainer size="default" centered>
          <div className="text-center">
            <MobileText variant="caption" className="text-gray-400">
              © 2024 Veegox. Révolutionnant la DeFi avec l'IA
            </MobileText>
          </div>
        </MobileContainer>
      </footer>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </div>
  );
};

export default Index;
