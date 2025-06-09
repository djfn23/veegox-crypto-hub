
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Coins, 
  TrendingUp, 
  Store, 
  Users, 
  Briefcase,
  CreditCard,
  Heart,
  Bot,
  User
} from "lucide-react";

const quickNavItems = [
  { name: "Analytics", href: "/analytics", icon: BarChart3, color: "bg-blue-500" },
  { name: "Trading", href: "/trading", icon: TrendingUp, color: "bg-green-500" },
  { name: "Staking", href: "/staking", icon: Coins, color: "bg-yellow-500" },
  { name: "NFT", href: "/marketplace", icon: Store, color: "bg-purple-500" },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase, color: "bg-indigo-500" },
  { name: "Crédit", href: "/credit", icon: CreditCard, color: "bg-red-500" },
  { name: "Crowdfunding", href: "/crowdfunding", icon: Heart, color: "bg-pink-500" },
  { name: "Communauté", href: "/community", icon: Users, color: "bg-orange-500" },
  { name: "IA Assistant", href: "/ai-assistant", icon: Bot, color: "bg-cyan-500" },
  { name: "Profil", href: "/profile", icon: User, color: "bg-slate-500" }
];

export const QuickNavigation = () => {
  const location = useLocation();

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Navigation Rapide</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant="outline"
                  className={`w-full h-auto p-4 flex flex-col gap-2 ${
                    isActive 
                      ? "bg-purple-600 border-purple-500 text-white" 
                      : "bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium">{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
