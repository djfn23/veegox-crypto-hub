
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Home, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Coins, 
  Settings, 
  HelpCircle,
  Bell,
  Shield,
  Info,
  Scale,
  Menu,
  X,
  BarChart3,
  MessageSquare,
  Vote,
  Brain,
  Search,
  Plus
} from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface AppLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Portefeuille", href: "/wallet", icon: Wallet },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Staking", href: "/staking", icon: TrendingUp },
  { name: "Exchange", href: "/exchange", icon: TrendingUp },
  { name: "Trading", href: "/trading", icon: BarChart3 },
  { name: "DAO", href: "/dao", icon: Users },
  { name: "Gouvernance", href: "/governance", icon: Vote },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Users },
  { name: "Créer Campagne", href: "/create-campaign", icon: Plus },
  { name: "Analyse Marché", href: "/market-analysis", icon: Search },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "IA Recommandations", href: "/ai-recommendations", icon: Brain },
  { name: "Social", href: "/social", icon: MessageSquare },
]

const secondaryNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Sécurité", href: "/security", icon: Shield },
  { name: "À Propos", href: "/about", icon: Info },
  { name: "Aide", href: "/help", icon: HelpCircle },
  { name: "Légal", href: "/legal", icon: Scale },
  { name: "Profil", href: "/profile", icon: Settings },
]

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <GlassCard className="h-full p-4 md:p-4 border-r border-white/10">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl lg:text-xl">V</span>
              </div>
              <span className="text-white font-bold text-xl lg:text-xl">Veegox</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300 p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2 overflow-y-auto max-h-[calc(100vh-140px)] pb-4">
            <div className="pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Principal
              </p>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-4 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[52px] lg:min-h-[44px] touch-manipulation",
                      isActive 
                        ? "bg-white/20 text-white shadow-lg border border-white/10" 
                        : "text-gray-300 hover:bg-white/10 hover:text-white active:bg-white/15"
                    )}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Autres
              </p>
              {secondaryNavigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-4 lg:py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[52px] lg:min-h-[44px] touch-manipulation",
                      isActive 
                        ? "bg-white/20 text-white shadow-lg border border-white/10" 
                        : "text-gray-300 hover:bg-white/10 hover:text-white active:bg-white/15"
                    )}
                    onClick={() => isMobile && setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </GlassCard>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300 p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-white font-bold text-lg">Veegox</span>
          </div>
          <div className="w-12 h-12" /> {/* Spacer for centering */}
        </div>

        {/* Page content with improved spacing */}
        <main className="p-4 lg:p-6 xl:p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export { AppLayout }
