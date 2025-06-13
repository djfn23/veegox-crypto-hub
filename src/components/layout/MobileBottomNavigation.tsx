
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  ArrowRightLeft, 
  User,
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
    name: "Exchange",
    href: "/exchange",
    icon: ArrowRightLeft,
  },
  {
    name: "Wallet",
    href: "/wallet",
    icon: Wallet,
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
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors duration-200",
                "touch-target-lg text-xs font-medium",
                isActive 
                  ? "text-purple-400 bg-purple-500/10" 
                  : "text-gray-400 hover:text-white active:bg-white/5"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="leading-none">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
