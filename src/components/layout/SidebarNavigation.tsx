
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
  Bridge as BridgeIcon,
  Layers,
  Cpu,
  Plus,
  Image,
  HelpCircle,
  Shield,
  User,
  Info
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", href: "/", icon: BarChart3 },
  { name: "Portefeuille", href: "/wallet", icon: Wallet },
  { name: "Analytiques", href: "/analytics", icon: BarChart3 },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "Banque Crypto", href: "/crypto-bank", icon: Wallet },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Heart },
  { name: "NFT Marketplace", href: "/marketplace", icon: Store },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Gouvernance", href: "/governance", icon: Vote },
  { name: "Communauté", href: "/community", icon: Users },
  { name: "Forum Social", href: "/social", icon: MessageCircle },
  { name: "Smart Contracts", href: "/contract", icon: FileText },
  { name: "Yield Farming", href: "/yield-farming", icon: Target },
  { name: "Prêts DeFi", href: "/lending", icon: CreditCard },
  { name: "Bridge", href: "/bridge", icon: BridgeIcon },
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
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href || 
          (item.href !== "/" && location.pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-l-2 border-blue-400"
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                isActive ? "text-blue-400" : "text-gray-400 group-hover:text-gray-300"
              )}
            />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
      
      <div className="border-t border-slate-700 my-4"></div>
      
      {additionalLinks.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-l-2 border-blue-400"
                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0",
                isActive ? "text-blue-400" : "text-gray-400 group-hover:text-gray-300"
              )}
            />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
