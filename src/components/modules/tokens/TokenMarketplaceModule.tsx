
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock } from "lucide-react";
import TokenCard from "./marketplace/TokenCard";
import TrendingToken from "./marketplace/TrendingToken";
import CategoryCard from "./marketplace/CategoryCard";
import MarketplaceSearch from "./marketplace/MarketplaceSearch";

export default function TokenMarketplaceModule() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock marketplace data
  const featuredTokens = [
    {
      name: "DeFi Protocol",
      symbol: "DFP",
      price: "$2.45",
      change: "+15.3%",
      volume: "$1.2M",
      holders: 1250,
      category: "DeFi",
      isVerified: true,
      logo: "🏦"
    },
    {
      name: "Gaming Token",
      symbol: "GAME",
      price: "$0.85",
      change: "-3.2%",
      volume: "$850K",
      holders: 890,
      category: "Gaming",
      isVerified: false,
      logo: "🎮"
    },
    {
      name: "Green Energy",
      symbol: "GREEN",
      price: "$1.20",
      change: "+8.7%",
      volume: "$650K",
      holders: 567,
      category: "Utility",
      isVerified: true,
      logo: "🌱"
    }
  ];

  const trendingTokens = [
    {
      name: "Meme Coin",
      symbol: "MEME",
      price: "$0.0025",
      change: "+125.5%",
      volume: "$2.1M",
      logo: "😂"
    },
    {
      name: "AI Assistant",
      symbol: "AI",
      price: "$5.67",
      change: "+45.2%",
      volume: "$890K",
      logo: "🤖"
    }
  ];

  const categories = [
    { name: "DeFi", count: 45, icon: "🏦" },
    { name: "Gaming", count: 32, icon: "🎮" },
    { name: "Utility", count: 28, icon: "⚡" },
    { name: "Meme", count: 67, icon: "😂" },
    { name: "AI", count: 23, icon: "🤖" }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <MarketplaceSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="featured" className="data-[state=active]:bg-blue-600">
            À la Une
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-blue-600">
            Tendances
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600">
            Catégories
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-blue-600">
            Nouveaux
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredTokens.map((token, index) => (
              <TokenCard key={index} token={token} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Tokens en Tendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTokens.map((token, index) => (
                  <TrendingToken key={index} token={token} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-medium text-white mb-2">Nouveaux Tokens</h3>
              <p className="text-white/60 mb-6">
                Découvrez les derniers tokens ajoutés à la plateforme
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Voir les Nouveautés
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
