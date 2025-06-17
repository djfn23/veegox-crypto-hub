
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  ArrowLeftRight, 
  Store,
  CreditCard,
  Heart,
  Bot,
  Users,
  BarChart3,
  Zap,
  ArrowUpRight,
  Plus,
  Sparkles
} from "lucide-react";
import { useThemeResponsive } from "@/hooks/useThemeResponsive";

const ComprehensiveDashboard: React.FC = () => {
  console.log('ComprehensiveDashboard: Rendering component');
  const { isMobile, isTablet } = useThemeResponsive();

  const quickAccessItems = [
    { name: "Trading", icon: TrendingUp, color: "from-green-500 to-emerald-600", href: "/trading" },
    { name: "Staking", icon: Coins, color: "from-blue-500 to-cyan-600", href: "/staking" },
    { name: "Exchange", icon: ArrowLeftRight, color: "from-purple-500 to-violet-600", href: "/bridge" },
    { name: "NFT", icon: Store, color: "from-pink-500 to-rose-600", href: "/marketplace" },
    { name: "Crédit", icon: CreditCard, color: "from-orange-500 to-amber-600", href: "/credit" },
    { name: "Crowdfunding", icon: Heart, color: "from-red-500 to-pink-600", href: "/crowdfunding" }
  ];

  const statsCards = [
    {
      title: "Volume 24h",
      value: "$2.4M",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "from-green-500/10 to-emerald-500/5"
    },
    {
      title: "Utilisateurs Actifs",
      value: "12.5K",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-400",
      bgColor: "from-blue-500/10 to-cyan-500/5"
    },
    {
      title: "TVL Total",
      value: "$45.2M",
      change: "+15.7%",
      icon: Coins,
      color: "text-purple-400",
      bgColor: "from-purple-500/10 to-violet-500/5"
    },
    {
      title: "Récompenses APY",
      value: "8.5%",
      change: "+2.1%",
      icon: Zap,
      color: "text-amber-400",
      bgColor: "from-amber-500/10 to-yellow-500/5"
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`
          glass-adaptive rounded-3xl p-8
          ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-12'}
          bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10
          border border-border/50
        `}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  Bêta v2.0
                </Badge>
              </div>
            </div>
            
            <h1 className={`
              font-heading font-bold text-foreground mb-4
              ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl'}
            `}>
              Bienvenue sur Veegox
            </h1>
            
            <p className={`
              text-muted-foreground mb-8 max-w-2xl
              ${isMobile ? 'text-base' : 'text-lg'}
            `}>
              Votre plateforme DeFi complète pour trading, staking, NFT et bien plus. 
              Connectez votre wallet pour commencer.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size={isMobile ? "default" : "lg"} className="bg-primary hover:bg-primary/90 group">
                <Wallet className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Connecter Wallet
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="group">
                <BarChart3 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Explorer
              </Button>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-2xl opacity-40"></div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Accès Rapide
          </h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Voir tout
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className={`
          grid gap-4
          ${isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-6'}
        `}>
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.name} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-border/50 hover:border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className={`
                    bg-gradient-to-r ${item.color} rounded-2xl 
                    flex items-center justify-center mx-auto mb-3 shadow-lg
                    group-hover:scale-110 transition-transform duration-300
                    ${isMobile ? 'w-12 h-12' : 'w-14 h-14'}
                  `}>
                    <Icon className="text-white h-6 w-6" />
                  </div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Statistiques de la Plateforme
        </h2>
        
        <div className={`
          grid gap-6
          ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}
        `}>
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`
                      bg-gradient-to-r ${stat.bgColor} rounded-xl p-3
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {stat.change}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                    <p className="text-foreground font-bold text-2xl">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* AI Assistant Promotion */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 shadow-lg">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  Assistant IA Veegox
                </h3>
                <p className="text-muted-foreground">
                  Obtenez des conseils personnalisés et des analyses de marché en temps réel
                </p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 group">
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
              Essayer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveDashboard;
