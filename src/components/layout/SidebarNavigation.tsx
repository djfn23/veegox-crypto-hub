import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Coins, 
  TrendingUp, 
  Store, 
  Users, 
  Briefcase,
  CreditCard,
  Heart,
  Settings,
  Bot,
  Wallet,
  Vote,
  MessageCircle,
  Bell,
  FileText,
  Target,
  Zap,
  ArrowLeftRight,
  Layers,
  Cpu,
  Plus,
  Image,
  HelpCircle,
  Shield,
  User,
  Info,
  Home,
  Sprout
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", href: "/", icon: Home },
  { name: "Portefeuille", href: "/wallet", icon: Wallet },
  { name: "Analytiques", href: "/analytics", icon: BarChart3 },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Banque Crypto", href: "/crypto-bank", icon: Wallet },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Yield Farming", href: "/yield-farming", icon: Sprout },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Heart },
  { name: "NFT Marketplace", href: "/marketplace", icon: Store },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Gouvernance", href: "/governance", icon: Vote },
  { name: "Communauté", href: "/community", icon: Users },
  { name: "Forum Social", href: "/social", icon: MessageCircle },
  { name: "Smart Contracts", href: "/contract", icon: FileText },
  { name: "Prêts DeFi", href: "/lending", icon: CreditCard },
  { name: "Bridge", href: "/bridge", icon: ArrowLeftRight },
  { name: "Liquidité", href: "/liquidity", icon: Layers },
  { name: "Automation", href: "/automation", icon: Zap },
  { name: "Blockchain", href: "/blockchain", icon: Cpu },
  { name: "IA Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Collections", href: "/collections", icon: Store },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

const additionalLinks = [
  { name: "Profil", href: "/profile", icon: User },
  { name: "Sécurité", href: "/security", icon: Shield },
  { name: "Aide", href: "/help", icon: HelpCircle },
  { name: "À propos", href: "/about", icon: Info },
];

export const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-3">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href || 
          (item.href !== "/" && location.pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
              isActive
                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-l-2 border-primary shadow-lg scale-105"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-4 w-4 flex-shrink-0 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
              )}
            />
            <span className="truncate">{item.name}</span>
            {isActive && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            )}
          </Link>
        );
      })}
      
      <div className="border-t border-border/50 my-4 mx-3"></div>
      
      {additionalLinks.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
              isActive
                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-l-2 border-primary shadow-lg scale-105"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-4 w-4 flex-shrink-0 transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
              )}
            />
            <span className="truncate">{item.name}</span>
            {isActive && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
