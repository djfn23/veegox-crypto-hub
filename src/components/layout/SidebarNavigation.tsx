import { cn } from "@/lib/utils";
import { 
  Home, 
  Wallet, 
  TrendingUp, 
  Users, 
  Settings, 
  CreditCard,
  Coins,
  Vote,
  Target,
  Image, // Ajouté pour NFT Marketplace
  BarChart3,
  Bell,
  HelpCircle,
  Shield
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Portefeuille", href: "/wallet", icon: Wallet },
  { name: "Trading", href: "/trading", icon: TrendingUp },
  { name: "NFT Marketplace", href: "/marketplace", icon: Image }, // Nouvelle route
  { name: "Staking", href: "/staking", icon: Coins },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Target },
  { name: "Gouvernance", href: "/governance", icon: Vote },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Social", href: "/social", icon: Users },
];

const settingsNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Sécurité", href: "/security", icon: Shield },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

const helpNavigation = [
  { name: "Aide", href: "/help", icon: HelpCircle },
  { name: "À propos", href: "/about", icon: Users },
  { name: "Juridique", href: "/legal", icon: Shield },
];

export function SidebarNavigation() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex-1 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="px-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
          Paramètres
        </h2>
        {settingsNavigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="px-3 text-sm font-semibold text-gray-900 dark:text-gray-50">
          Aide
        </h2>
        {helpNavigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
