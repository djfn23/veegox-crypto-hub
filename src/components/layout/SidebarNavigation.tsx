
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
  Bot
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", href: "/", icon: BarChart3 },
  { name: "Analytiques", href: "/analytics", icon: BarChart3 },
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "NFT Marketplace", href: "/marketplace", icon: Store },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Heart },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Communauté", href: "/community", icon: Users },
  { name: "IA Assistant", href: "/ai-assistant", icon: Bot },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
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
