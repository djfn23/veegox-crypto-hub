
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Star, Zap } from "lucide-react";
import EnhancedTokenCard from "./marketplace/EnhancedTokenCard";
import TrendingToken from "./marketplace/TrendingToken";
import CategoryCard from "./marketplace/CategoryCard";
import MarketplaceSearch from "./marketplace/MarketplaceSearch";
import { tokenEcosystemService, CustomToken } from "@/services/tokenEcosystemService";
import VeegoxLogo from "@/components/ui/veegox-logo";

export default function TokenMarketplaceModule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState<CustomToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    setLoading(true);
    try {
      const allTokens = await tokenEcosystemService.getAllTokens();
      const tokensWithPrices = await tokenEcosystemService.updateTokenPrices(allTokens);
      setTokens(tokensWithPrices);
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock marketplace data avec les vrais tokens
  const featuredTokens = tokens.slice(0, 6).map(token => ({
    ...token,
    change24h: Math.random() * 20 - 10, // -10% à +10%
    canStake: Math.random() > 0.5,
    canTrade: true,
    isInWallet: Math.random() > 0.7
  }));

  const trendingTokens = tokens.slice(0, 5).map(token => ({
    name: token.name,
    symbol: token.symbol,
    price: token.price ? `$${token.price.toFixed(4)}` : '$0.0000',
    change: `+${(Math.random() * 50 + 10).toFixed(1)}%`,
    volume: token.volume24h ? `$${(token.volume24h / 1000).toFixed(0)}K` : '$0K',
    logo: token.logo || '🪙'
  }));

  const categories = [
    { name: "DeFi", count: tokens.filter(t => t.name.toLowerCase().includes('defi')).length || 12, icon: "🏦" },
    { name: "Gaming", count: tokens.filter(t => t.name.toLowerCase().includes('game')).length || 8, icon: "🎮" },
    { name: "Utility", count: tokens.filter(t => t.name.toLowerCase().includes('util')).length || 15, icon: "⚡" },
    { name: "Meme", count: tokens.filter(t => t.name.toLowerCase().includes('meme')).length || 23, icon: "😂" },
    { name: "AI", count: tokens.filter(t => t.name.toLowerCase().includes('ai')).length || 6, icon: "🤖" }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête avec logo Veegox */}
      <div className="flex items-center gap-3">
        <VeegoxLogo size="lg" />
        <div>
          <h2 className="text-2xl font-bold text-white">Token Marketplace</h2>
          <p className="text-gray-400">Écosystème de tokens Veegox</p>
        </div>
      </div>

      {/* Search and Filters */}
      <MarketplaceSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="featured" className="data-[state=active]:bg-blue-600">
            <Star className="h-4 w-4 mr-2" />
            À la Une
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-blue-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tendances
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600">
            Catégories
          </TabsTrigger>
          <TabsTrigger value="ecosystem" className="data-[state=active]:bg-blue-600">
            <Zap className="h-4 w-4 mr-2" />
            Écosystème
          </TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredTokens.map((token, index) => (
                <EnhancedTokenCard key={token.id || index} token={token} />
              ))}
            </div>
          )}
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

        <TabsContent value="ecosystem" className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <VeegoxLogo size="md" />
                Écosystème Veegox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{tokens.length + 1}</div>
                  <div className="text-sm text-gray-400">Tokens Créés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$1.2M</div>
                  <div className="text-sm text-gray-400">Volume Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1,250</div>
                  <div className="text-sm text-gray-400">Utilisateurs Actifs</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Créer Mon Token
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
