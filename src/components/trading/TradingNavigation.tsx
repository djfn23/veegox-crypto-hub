
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Options } from "lucide-react";

export const TradingNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { name: "Spot", href: "/trading/spot", icon: TrendingUp },
    { name: "Futures", href: "/trading/futures", icon: BarChart3 },
    { name: "Options", href: "/trading/options", icon: Options }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={`${
                isActive 
                  ? "bg-purple-600 text-white hover:bg-purple-700" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
