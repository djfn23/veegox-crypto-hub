
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Coins, 
  Gamepad2, 
  Image, 
  Building, 
  Users, 
  Zap,
  Globe,
  Palette
} from "lucide-react";
import { Link } from "react-router-dom";

const CrowdfundingCategories = () => {
  const categories = [
    {
      name: "DeFi",
      count: 45,
      trending: true,
      icon: Coins,
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
      description: "Protocoles de finance décentralisée"
    },
    {
      name: "NFT",
      count: 32,
      trending: true,
      icon: Image,
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
      description: "Collections et marketplaces NFT"
    },
    {
      name: "Gaming",
      count: 28,
      trending: false,
      icon: Gamepad2,
      color: "from-green-500/20 to-green-600/20 border-green-500/30",
      description: "Jeux blockchain et métaverse"
    },
    {
      name: "Infrastructure",
      count: 19,
      trending: false,
      icon: Building,
      color: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
      description: "Outils et infrastructure Web3"
    },
    {
      name: "Social",
      count: 15,
      trending: true,
      icon: Users,
      color: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
      description: "Réseaux sociaux décentralisés"
    },
    {
      name: "Energy",
      count: 12,
      trending: false,
      icon: Zap,
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
      description: "Solutions énergétiques durables"
    },
    {
      name: "DAO",
      count: 10,
      trending: true,
      icon: Globe,
      color: "from-teal-500/20 to-teal-600/20 border-teal-500/30",
      description: "Organisations autonomes décentralisées"
    },
    {
      name: "Art",
      count: 8,
      trending: false,
      icon: Palette,
      color: "from-red-500/20 to-red-600/20 border-red-500/30",
      description: "Art numérique et créations"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Explorer par Catégorie</h2>
        <p className="text-gray-400">Découvrez des projets dans votre domaine d'intérêt</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.name} to={`/crowdfunding/categories?category=${category.name.toLowerCase()}`}>
              <Card className={`bg-gradient-to-br ${category.color} backdrop-blur-sm hover:scale-105 transition-all duration-200 cursor-pointer group`}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-white font-semibold">{category.name}</h3>
                      {category.trending && (
                        <Badge className="bg-orange-500 text-white text-xs px-1 py-0">
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 text-xs">{category.description}</p>
                    <div className="text-white text-sm font-medium">
                      {category.count} projets
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CrowdfundingCategories;
