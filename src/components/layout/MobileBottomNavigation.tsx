
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  ArrowRightLeft, 
  Store
} from "lucide-react"

const navigationItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Trading",
    href: "/trading",
    icon: TrendingUp,
  },
  {
    name: "Banque",
    href: "/crypto-bank",
    icon: Wallet,
  },
  {
    name: "Exchange",
    href: "/exchange",
    icon: ArrowRightLeft,
  },
  {
    name: "NFT",
    href: "/marketplace",
    icon: Store,
  },
]

export const MobileBottomNavigation = () => {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700">
      <div className="grid grid-cols-5 h-20 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-200 rounded-xl mx-1 my-2",
                "touch-target-xl text-xs font-medium relative",
                isActive 
                  ? "text-purple-400 bg-purple-500/20 shadow-lg" 
                  : "text-gray-400 hover:text-white active:bg-white/10 hover:bg-white/5"
              )}
            >
              <div className={cn(
                "relative",
                isActive && "scale-110 transform transition-transform"
              )}>
                <Icon className="h-6 w-6" />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                )}
              </div>
              <span className={cn(
                "leading-none text-[10px] font-medium",
                isActive ? "text-purple-300" : "text-gray-500"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
