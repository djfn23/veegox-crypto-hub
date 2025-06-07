
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
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
  Info,
  Bell,
  MessageSquare,
  Users,
  Brain,
  Coins,
  CreditCard,
  Target,
  Image,
  Palette,
  Zap,
  TrendingDown,
  PiggyBank,
  Award
} from "lucide-react";

const navigationItems = [
  {
    title: "Principal",
    items: [
      { name: "Accueil", href: "/", icon: Home },
      { name: "Portefeuille", href: "/wallet", icon: Wallet },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Trading", href: "/trading", icon: TrendingUp },
      { name: "Staking", href: "/staking", icon: Coins },
      { name: "Crédit DeFi", href: "/credit", icon: CreditCard },
      { name: "Crowdfunding", href: "/crowdfunding", icon: Target },
      { name: "Portfolio", href: "/portfolio", icon: PiggyBank },
    ],
  },
  {
    title: "DeFi",
    items: [
      { name: "Bridge", href: "/bridge", icon: ArrowUpDown },
      { name: "Yield Farming", href: "/yield-farming", icon: Sprout },
      { name: "Prêt & Emprunt", href: "/lending", icon: Banknote },
      { name: "Liquidity", href: "/liquidity", icon: TrendingDown },
    ],
  },
  {
    title: "NFT & Marketplace",
    items: [
      { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
      { name: "Collections", href: "/collections", icon: Image },
      { name: "Créer NFT", href: "/create-nft", icon: Palette },
      { name: "Mes NFTs", href: "/my-nfts", icon: Award },
    ],
  },
  {
    title: "Social & DAO",
    items: [
      { name: "Forum", href: "/social", icon: MessageSquare },
      { name: "Gouvernance", href: "/governance", icon: Vote },
      { name: "Communauté", href: "/community", icon: Users },
    ],
  },
  {
    title: "Outils Avancés",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "AI Assistant", href: "/ai", icon: Brain },
      { name: "Contrats", href: "/contract", icon: Building2 },
      { name: "Automation", href: "/automation", icon: Zap },
    ],
  },
  {
    title: "Profil & Support",
    items: [
      { name: "Paramètres", href: "/settings", icon: Settings },
      { name: "Sécurité", href: "/security", icon: Shield },
      { name: "Aide", href: "/help", icon: HelpCircle },
      { name: "Légal", href: "/legal", icon: FileText },
      { name: "À propos", href: "/about", icon: Info },
    ],
  },
];

export const SidebarNavigation = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  return (
    <nav className="space-y-6">
      {/* Notifications Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2">
          Notifications
        </h3>
        <div className="space-y-1">
          <Link to="/notifications">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3 text-left font-normal transition-all duration-200",
                "hover:bg-white/10 hover:text-white relative",
                location.pathname === "/notifications"
                  ? "bg-purple-600/20 text-purple-300 border-r-2 border-purple-400"
                  : "text-gray-300"
              )}
            >
              <Bell className="mr-3 h-4 w-4 flex-shrink-0" />
              <span className="truncate">Notifications</span>
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-auto h-5 w-5 text-xs rounded-full p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Navigation Sections */}
      {navigationItems.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const isNew = ['Crédit DeFi', 'AI Assistant', 'Collections', 'Forum', 'Crowdfunding'].includes(item.name);
              const isBeta = ['Automation', 'Liquidity'].includes(item.name);
              
              return (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 px-3 text-left font-normal transition-all duration-200",
                      "hover:bg-white/10 hover:text-white relative",
                      isActive
                        ? "bg-purple-600/20 text-purple-300 border-r-2 border-purple-400"
                        : "text-gray-300"
                    )}
                  >
                    <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span className="truncate flex-1">{item.name}</span>
                    {isNew && (
                      <Badge variant="secondary" className="ml-1 text-xs px-1 py-0">
                        NEW
                      </Badge>
                    )}
                    {isBeta && (
                      <Badge variant="outline" className="ml-1 text-xs px-1 py-0">
                        BETA
                      </Badge>
                    )}
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
