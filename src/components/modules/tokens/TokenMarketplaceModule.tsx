
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Star, 
  DollarSign, 
  Users, 
  Clock,
  Filter,
  ExternalLink
} from "lucide-react";

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
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Rechercher des tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                        {token.logo}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                          {token.name}
                          {token.isVerified && (
                            <Badge className="bg-blue-600 text-white text-xs">
                              Vérifié
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-white/60 text-sm">{token.symbol}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/60 text-xs">Prix</Label>
                      <p className="text-white font-bold text-lg">{token.price}</p>
                    </div>
                    <div>
                      <Label className="text-white/60 text-xs">24h</Label>
                      <Badge className={`${
                        token.change.startsWith('+') ? 'bg-green-600' : 'bg-red-600'
                      } text-white`}>
                        {token.change}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Volume 24h:</span>
                      <span className="text-white">{token.volume}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Détenteurs:</span>
                      <span className="text-white">{token.holders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Catégorie:</span>
                      <Badge variant="secondary" className="bg-white/10 text-white text-xs">
                        {token.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Trader
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{token.logo}</span>
                      <div>
                        <p className="text-white font-medium">{token.name}</p>
                        <p className="text-white/60 text-sm">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{token.price}</p>
                      <Badge className="bg-green-600 text-white text-xs">
                        {token.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.count} tokens</p>
                </CardContent>
              </Card>
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
