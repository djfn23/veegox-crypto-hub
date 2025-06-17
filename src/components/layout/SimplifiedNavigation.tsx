
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home,
  BarChart3, 
  Coins, 
  TrendingUp, 
  Store, 
  Users, 
  Briefcase,
  CreditCard,
  Heart,
  Bot,
  User,
  Settings,
  HelpCircle,
  Shield,
  Sprout,
  ArrowLeftRight,
  Vote,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Yield Farming", href: "/yield-farming", icon: Sprout },
  { name: "NFT Marketplace", href: "/marketplace", icon: Store },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Banque Crypto", href: "/crypto-bank", icon: Wallet },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Heart },
  { name: "Bridge", href: "/bridge", icon: ArrowLeftRight },
  { name: "Gouvernance", href: "/governance", icon: Vote },
  { name: "Communauté", href: "/community", icon: Users },
  { name: "IA Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Profil", href: "/profile", icon: User },
  { name: "Sécurité", href: "/security", icon: Shield },
  { name: "Paramètres", href: "/settings", icon: Settings },
  { name: "Aide", href: "/help", icon: HelpCircle }
];

export const SimplifiedNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-3">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-11 px-3 transition-all duration-300 group",
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary hover:from-primary/30 hover:to-accent/30 shadow-lg scale-105 border-l-2 border-primary" 
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
              )}
            >
              <Icon className={cn(
                "mr-3 h-4 w-4 transition-all duration-300",
                isActive ? "text-primary scale-110" : "group-hover:scale-110"
              )} />
              <span className="truncate">{item.name}</span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              )}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
