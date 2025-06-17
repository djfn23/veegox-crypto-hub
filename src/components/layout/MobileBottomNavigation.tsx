
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  ArrowLeftRight, 
  Store
} from "lucide-react"
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout"

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
    name: "Portefeuille",
    href: "/wallet",
    icon: Wallet,
  },
  {
    name: "Bridge",
    href: "/bridge",
    icon: ArrowLeftRight,
  },
  {
    name: "NFT",
    href: "/marketplace",
    icon: Store,
  },
]

export const MobileBottomNavigation = () => {
  const location = useLocation()
  const { isLandscapePhone } = useResponsiveLayout()

  return (
    <nav className={`
      lg:hidden fixed bottom-0 left-0 right-0 z-30 
      glass-adaptive border-t border-border/50 shadow-2xl safe-bottom
      ${isLandscapePhone ? 'h-16' : 'h-20'}
    `}>
      <div className={`
        grid grid-cols-5 h-full
        ${isLandscapePhone ? 'px-4' : 'px-2'}
      `}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-all duration-300 rounded-2xl mx-1 my-2",
                "touch-target-lg text-xs font-semibold relative group",
                isActive 
                  ? "text-primary bg-primary/10 shadow-lg scale-105 border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground active:bg-muted/20 hover:bg-muted/10 hover:scale-105",
                isLandscapePhone ? "my-1 rounded-xl" : ""
              )}
            >
              <div className={cn(
                "relative transition-all duration-300",
                isActive && "transform scale-110"
              )}>
                <Icon className={`${isLandscapePhone ? 'h-5 w-5' : 'h-6 w-6'} transition-all duration-300`} />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg border border-primary/50" />
                )}
              </div>
              <span className={cn(
                "leading-none font-bold transition-all duration-300",
                isActive ? "text-primary scale-105" : "text-muted-foreground",
                isLandscapePhone ? "text-[9px]" : "text-[10px]"
              )}>
                {item.name}
              </span>
              
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
              
              {/* Hover indicator */}
              <div className={cn(
                "absolute inset-0 rounded-2xl border transition-all duration-300 opacity-0 group-hover:opacity-100",
                isActive ? "border-primary/30" : "border-border/30"
              )} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
