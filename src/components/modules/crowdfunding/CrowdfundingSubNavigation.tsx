
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, List, Star, TrendingUp, User, Heart } from "lucide-react";

export const CrowdfundingSubNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { name: "Toutes", href: "/crowdfunding/campaigns", icon: List },
    { name: "Vedettes", href: "/crowdfunding/featured", icon: Star },
    { name: "Tendances", href: "/crowdfunding/trending", icon: TrendingUp },
    { name: "Mes Campagnes", href: "/crowdfunding/my-campaigns", icon: User },
    { name: "Mes Contributions", href: "/crowdfunding/my-contributions", icon: Heart },
    { name: "Créer", href: "/crowdfunding/create", icon: Plus }
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
