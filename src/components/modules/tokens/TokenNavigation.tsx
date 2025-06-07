
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Coins, 
  Plus, 
  Settings, 
  ShoppingBag,
  Zap
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TokenNavigation() {
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    {
      path: "/tokens",
      label: "Mes Tokens",
      icon: Coins,
      description: "Vue d'ensemble de mes tokens"
    },
    {
      path: "/tokens/create",
      label: "Créer",
      icon: Plus,
      description: "Créer un nouveau token",
      badge: "New"
    },
    {
      path: "/tokens/manage",
      label: "Gérer",
      icon: Settings,
      description: "Gérer mes tokens déployés"
    },
    {
      path: "/tokens/analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Statistiques et métriques"
    },
    {
      path: "/tokens/marketplace",
      label: "Marketplace",
      icon: ShoppingBag,
      description: "Découvrir et trader",
      badge: "Beta"
    }
  ];

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
          <Link to="/tokens/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Créer
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`w-full h-auto p-3 flex flex-col gap-1 ${
                    isActive 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Icon className="h-4 w-4" />
                    {item.badge && (
                      <Badge className="bg-green-500 text-white text-xs px-1 py-0">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          Token Studio
        </h2>
        <Link to="/tokens/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Créer
          </Button>
        </Link>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-green-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-75 mt-1">{item.description}</p>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
