
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { TouchTarget } from "@/components/ui/mobile-touch-target"
import { MobileBadge, MobileHeading } from "@/components/ui/mobile-components"
import { 
  Home, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Coins, 
  BarChart3,
  MessageSquare,
  Vote,
  Brain,
  Search,
  Plus
} from "lucide-react"

const primaryNavigation = [
  { name: "Accueil", href: "/", icon: Home, badge: 0 },
  { name: "Portefeuille", href: "/wallet", icon: Wallet, badge: 0 },
  { name: "Tokens", href: "/tokens", icon: Coins, badge: 0 },
  { name: "Exchange", href: "/exchange", icon: TrendingUp, badge: 0 },
  { name: "Trading", href: "/trading", icon: BarChart3, badge: 0 },
]

const financialNavigation = [
  { name: "Crédit", href: "/credit", icon: CreditCard, badge: 2 },
  { name: "Staking", href: "/staking", icon: TrendingUp, badge: 0 },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Users, badge: 1 },
  { name: "Créer Campagne", href: "/create-campaign", icon: Plus, badge: 0 },
]

const advancedNavigation = [
  { name: "DAO", href: "/dao", icon: Users, badge: 0 },
  { name: "Gouvernance", href: "/governance", icon: Vote, badge: 3 },
  { name: "Analyse Marché", href: "/market-analysis", icon: Search, badge: 0 },
  { name: "Analytics", href: "/analytics", icon: BarChart3, badge: 0 },
  { name: "IA Recommandations", href: "/ai-recommendations", icon: Brain, badge: 1 },
  { name: "Social", href: "/social", icon: MessageSquare, badge: 5 },
]

interface SidebarNavigationProps {
  onItemClick?: () => void
  isMobile?: boolean
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  onItemClick,
  isMobile = false
}) => {
  const location = useLocation()

  const renderNavGroup = (items: typeof primaryNavigation, title: string) => (
    <div className="pb-4">
      <MobileHeading level={6} className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
        {title}
      </MobileHeading>
      {items.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <TouchTarget
            key={item.name}
            asChild
            size="lg"
            variant="none"
            className={cn(
              "w-full justify-start mobile-nav-item px-3 text-sm font-medium mb-1 transition-all duration-200",
              isActive 
                ? "mobile-nav-active bg-gradient-to-r from-primary/20 to-secondary/20 border-l-4 border-primary" 
                : "hover:bg-white/5 hover:border-l-4 hover:border-white/20"
            )}
          >
            <Link
              to={item.href}
              onClick={() => isMobile && onItemClick?.()}
              className="flex items-center space-x-3 w-full"
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-gray-300"
              )} />
              <span className={cn(
                "truncate transition-colors",
                isActive ? "text-white font-medium" : "text-gray-300"
              )}>
                {item.name}
              </span>
              {item.badge > 0 && (
                <MobileBadge
                  variant="primary"
                  size="sm"
                  className="ml-auto"
                >
                  {item.badge}
                </MobileBadge>
              )}
            </Link>
          </TouchTarget>
        )
      })}
    </div>
  )

  return (
    <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] pb-4">
      {renderNavGroup(primaryNavigation, "Principal")}
      
      <div className="border-t border-white/10 pt-4">
        {renderNavGroup(financialNavigation, "Finance")}
      </div>
      
      <div className="border-t border-white/10 pt-4">
        {renderNavGroup(advancedNavigation, "Avancé")}
      </div>
    </nav>
  )
}
