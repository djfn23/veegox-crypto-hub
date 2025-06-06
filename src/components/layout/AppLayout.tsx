
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
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
  X
} from "lucide-react"
import { useState } from "react"

interface AppLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Portefeuille", href: "/wallet", icon: Wallet },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Crédit", href: "/credit", icon: CreditCard },
  { name: "Staking", href: "/staking", icon: TrendingUp },
  { name: "DAO", href: "/dao", icon: Users },
  { name: "Exchange", href: "/exchange", icon: TrendingUp },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Users },
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
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <GlassCard className="h-full p-4 border-r border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-white font-bold text-xl">Veegox</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            <div className="pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Principal
              </p>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-white/20 text-white shadow-lg" 
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Autres
              </p>
              {secondaryNavigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-white/20 text-white shadow-lg" 
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
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
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-white font-bold">Veegox</span>
          </div>
          <div className="w-6 h-6" /> {/* Spacer */}
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export { AppLayout }
