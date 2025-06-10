
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
  Vote
} from "lucide-react";

const navigationItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Yield Farming", href: "/yield-farming", icon: Sprout },
  { name: "NFT Marketplace", href: "/marketplace", icon: Store },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Tokens", href: "/tokens", icon: Coins },
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
              className={`w-full justify-start ${
                isActive 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "text-gray-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
