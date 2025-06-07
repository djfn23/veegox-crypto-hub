
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Eye,
  Share2,
  MoreHorizontal,
  Heart,
  TrendingUp
} from "lucide-react";

const myNFTs = [
  {
    id: 1,
    name: "Veegox Genesis #001",
    collection: "Veegox Genesis",
    image: "/placeholder.svg",
    price: "2.5 VEEGOX",
    usdPrice: "$125.00",
    rarity: "Legendary",
    likes: 42,
    views: 156,
    status: "Listed"
  },
  {
    id: 2,
    name: "Digital Cosmos",
    collection: "Space Collection",
    image: "/placeholder.svg",
    price: "1.8 ETH",
    usdPrice: "$2,850.00",
    rarity: "Epic",
    likes: 28,
    views: 89,
    status: "Owned"
  },
  {
    id: 3,
    name: "Crypto Punk Remix",
    collection: "Punk Remix",
    image: "/placeholder.svg",
    price: "0.5 ETH",
    usdPrice: "$950.00",
    rarity: "Rare",
    likes: 15,
    views: 67,
    status: "Owned"
  },
  {
    id: 4,
    name: "Abstract Dreams",
    collection: "Dream Series",
    image: "/placeholder.svg",
    price: "1.2 VEEGOX",
    usdPrice: "$60.00",
    rarity: "Common",
    likes: 8,
    views: 34,
    status: "Listed"
  }
];

const MyNFTs = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const filteredNFTs = myNFTs.filter(nft => {
    if (filter === 'all') return true;
    if (filter === 'listed') return nft.status === 'Listed';
    if (filter === 'owned') return nft.status === 'Owned';
    return true;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'Epic': return 'bg-pink-600/20 text-pink-300 border-pink-500/30';
      case 'Rare': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <PageLayout
      title="Mes NFTs"
      subtitle="Votre collection personnelle de tokens non-fongibles"
      icon={<Award className="h-6 w-6 text-purple-400" />}
      actions={
        <div className="flex gap-3">
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-purple-600' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-purple-600' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Total NFTs</p>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-purple-400 text-sm">Collections: 4</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Valeur Totale</p>
                  <p className="text-2xl font-bold text-white">$3,985</p>
                  <p className="text-green-400 text-sm">+12.5% (7j)</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">En Vente</p>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-blue-400 text-sm">50% listés</p>
                </div>
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Likes Totaux</p>
                  <p className="text-2xl font-bold text-white">93</p>
                  <p className="text-orange-400 text-sm">+8 cette semaine</p>
                </div>
                <Heart className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher dans vos NFTs..."
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-purple-600' : ''}
                >
                  Tous ({myNFTs.length})
                </Button>
                <Button 
                  variant={filter === 'listed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('listed')}
                  className={filter === 'listed' ? 'bg-purple-600' : ''}
                >
                  En Vente ({myNFTs.filter(n => n.status === 'Listed').length})
                </Button>
                <Button 
                  variant={filter === 'owned' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('owned')}
                  className={filter === 'owned' ? 'bg-purple-600' : ''}
                >
                  Possédés ({myNFTs.filter(n => n.status === 'Owned').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NFTs Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <Card key={nft.id} className="bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-colors group">
                <div className="relative">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getRarityColor(nft.rarity)}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant="secondary" 
                      className={nft.status === 'Listed' ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}
                    >
                      {nft.status}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-1">{nft.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{nft.collection}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-white font-medium">{nft.price}</p>
                      <p className="text-gray-400 text-sm">{nft.usdPrice}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Heart className="h-3 w-3" />
                      {nft.likes}
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="h-3 w-3" />
                      {nft.views}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredNFTs.map((nft, index) => (
                  <div key={nft.id} className={`flex items-center p-4 ${index !== filteredNFTs.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{nft.name}</h3>
                        <Badge className={getRarityColor(nft.rarity)} variant="outline">
                          {nft.rarity}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className={nft.status === 'Listed' ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}
                        >
                          {nft.status}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{nft.collection}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-white font-medium">{nft.price}</p>
                      <p className="text-gray-400 text-sm">{nft.usdPrice}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mr-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {nft.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {nft.views}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default MyNFTs;
