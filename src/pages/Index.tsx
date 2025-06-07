
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
import { texts } from "@/lib/constants/texts";

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
      title: texts.home.features.items.tokens.title,
      description: texts.home.features.items.tokens.description,
      color: "bg-blue-500",
    },
    {
      icon: TrendingUp,
      title: texts.home.features.items.credit.title,
      description: texts.home.features.items.credit.description,
      color: "bg-green-500",
    },
    {
      icon: Zap,
      title: texts.home.features.items.staking.title,
      description: texts.home.features.items.staking.description,
      color: "bg-purple-500",
    },
    {
      icon: Vote,
      title: texts.home.features.items.dao.title,
      description: texts.home.features.items.dao.description,
      color: "bg-orange-500",
    }
  ];

  const stats = [
    { 
      label: texts.home.stats.web3Market.label, 
      value: texts.home.stats.web3Market.value, 
      growth: texts.home.stats.web3Market.growth, 
      icon: DollarSign 
    },
    { 
      label: texts.home.stats.defiMarket.label, 
      value: texts.home.stats.defiMarket.value, 
      growth: texts.home.stats.defiMarket.growth, 
      icon: Wallet 
    },
    { 
      label: texts.home.stats.tvl.label, 
      value: texts.home.stats.tvl.value, 
      growth: texts.home.stats.tvl.growth, 
      icon: TrendingUp 
    },
    { 
      label: texts.home.stats.users.label, 
      value: texts.home.stats.users.value, 
      growth: texts.home.stats.users.growth, 
      icon: Users 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Navigation optimisée mobile */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20 sticky top-0 z-40">
        <MobileContainer size="default" centered>
          <div className="flex justify-between items-center py-3 md:py-4 min-h-[64px]">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0"></div>
              <span className="text-lg md:text-xl font-bold text-white truncate">{texts.app.name}</span>
              <Badge variant="secondary" className="ml-1 md:ml-2 text-xs px-2 py-0.5">{texts.app.beta}</Badge>
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
                {texts.auth.modal.messages.connectionButtons.login}
              </TouchTarget>
              <TouchTarget
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-3 md:px-4"
                onClick={() => {
                  setAuthMode("signup");
                  setShowAuth(true);
                }}
              >
                {texts.auth.modal.messages.connectionButtons.start}
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
              {texts.home.hero.title}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                {texts.home.hero.subtitle}
              </span>
            </MobileHeading>
            
            <MobileText 
              variant="body" 
              className="text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {texts.home.hero.description}
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
                {texts.home.hero.cta.primary}
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
              {texts.home.features.title}
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
              {texts.home.cta.title}
            </MobileHeading>
            <MobileText 
              variant="body"
              className="text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              {texts.home.cta.description}
            </MobileText>
            <TouchTarget
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 md:px-8 py-3 md:py-4 text-lg"
              onClick={() => {
                setAuthMode("signup");
                setShowAuth(true);
              }}
            >
              {texts.home.cta.button}
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
              {texts.home.footer}
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
