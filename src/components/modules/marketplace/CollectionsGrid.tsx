
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TrendingUp, Users, Layers } from "lucide-react";

export const CollectionsGrid = () => {
  const { data: collections, isLoading } = useQuery({
    queryKey: ['nft-collections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nft_collections_metadata')
        .select('*')
        .order('total_volume', { ascending: false })
        .limit(12);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Collections populaires</h2>
        <p className="text-gray-400">Découvrez les collections NFT les plus populaires</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections?.map((collection) => (
          <Card key={collection.id} className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={collection.banner_url || collection.image_url || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                {collection.is_verified && (
                  <Badge className="absolute top-2 right-2 bg-blue-600">
                    Vérifié
                  </Badge>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={collection.image_url || "/placeholder.svg"}
                    alt={collection.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <h3 className="text-white font-semibold">{collection.name}</h3>
                </div>

                {collection.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-gray-400">Prix sol</span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {collection.floor_price} MATIC
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Layers className="h-3 w-3 text-blue-400" />
                      <span className="text-xs text-gray-400">Items</span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {collection.total_supply || 0}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-purple-400" />
                      <span className="text-xs text-gray-400">Owners</span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {collection.owners_count || 0}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
