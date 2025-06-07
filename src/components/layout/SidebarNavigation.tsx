
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  TrendingUp,
  ShoppingBag,
  Wallet,
  Building2,
  Vote,
  BarChart3,
  ArrowUpDown,
  Sprout,
  Banknote,
  Settings,
  HelpCircle,
  Shield,
  FileText,
  Info
} from "lucide-react";

const navigationItems = [
  {
    title: "Principal",
    items: [
      { name: "Accueil", href: "/", icon: Home },
      { name: "Portefeuille", href: "/wallet", icon: Wallet },
      { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
      { name: "Trading", href: "/trading", icon: TrendingUp },
    ],
  },
  {
    title: "DeFi",
    items: [
      { name: "Bridge", href: "/bridge", icon: ArrowUpDown },
      { name: "Yield Farming", href: "/yield-farming", icon: Sprout },
      { name: "Prêt & Emprunt", href: "/lending", icon: Banknote },
    ],
  },
  {
    title: "Gouvernance",
    items: [
      { name: "DAO", href: "/governance", icon: Vote },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Contrats", href: "/contract", icon: Building2 },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Paramètres", href: "/settings", icon: Settings },
      { name: "Aide", href: "/help", icon: HelpCircle },
      { name: "Sécurité", href: "/security", icon: Shield },
      { name: "Légal", href: "/legal", icon: FileText },
      { name: "À propos", href: "/about", icon: Info },
    ],
  },
];

export const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <nav className="space-y-6">
      {navigationItems.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 px-3 text-left font-normal transition-all duration-200",
                      "hover:bg-white/10 hover:text-white",
                      isActive
                        ? "bg-purple-600/20 text-purple-300 border-r-2 border-purple-400"
                        : "text-gray-300"
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
};
