
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image, TrendingUp, Eye, Heart } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Crypto Punks Genesis",
    image: "/placeholder.svg",
    floorPrice: "2.5 ETH",
    volume24h: "125.4 ETH",
    owners: "2,847",
    items: "10,000",
    change: "+12.5%",
    verified: true
  },
  {
    id: 2,
    name: "DeFi Heroes",
    image: "/placeholder.svg",
    floorPrice: "0.8 ETH",
    volume24h: "45.2 ETH",
    owners: "1,234",
    items: "5,000",
    change: "-3.2%",
    verified: true
  },
  {
    id: 3,
    name: "Polygon Art",
    image: "/placeholder.svg",
    floorPrice: "150 MATIC",
    volume24h: "2,340 MATIC",
    owners: "567",
    items: "2,500",
    change: "+8.7%",
    verified: false
  }
];

export default function Collections() {
  return (
    <PageLayout
      title="Collections NFT"
      description="Découvrez et explorez les meilleures collections NFT"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Collections</p>
                  <p className="text-lg font-bold text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Volume 24h</p>
                  <p className="text-lg font-bold text-white">2,456 ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">NFTs Totaux</p>
                  <p className="text-lg font-bold text-white">125,847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">Mes Favoris</p>
                  <p className="text-lg font-bold text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="bg-slate-900/50 border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
              <div className="aspect-square bg-slate-800 relative">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute top-3 right-3"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">{collection.name}</h3>
                  {collection.verified && (
                    <Badge variant="secondary" className="bg-blue-600">
                      Vérifié
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Floor Price</p>
                    <p className="text-white font-medium">{collection.floorPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Volume 24h</p>
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium">{collection.volume24h}</p>
                      <Badge 
                        variant="outline" 
                        className={collection.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}
                      >
                        {collection.change}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400">Propriétaires</p>
                    <p className="text-white font-medium">{collection.owners}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Items</p>
                    <p className="text-white font-medium">{collection.items}</p>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explorer la Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-slate-600 text-white">
            Charger plus de collections
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
