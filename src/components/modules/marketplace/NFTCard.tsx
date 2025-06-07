
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { NFTDetailModal } from "./NFTDetailModal";

interface NFTListing {
  id: string;
  contract_address: string;
  token_id: string;
  price: number;
  currency_address: string;
  status: string;
  seller_id: string;
  created_at: string;
  metadata: any;
  nft_collections_metadata?: {
    name: string;
    image_url: string;
  } | null;
}

interface NFTCardProps {
  listing: NFTListing;
}

export const NFTCard = ({ listing }: NFTCardProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return `${price} MATIC`;
  };

  const getImageUrl = () => {
    if (listing.metadata?.image) return listing.metadata.image;
    if (listing.nft_collections_metadata?.image_url) return listing.nft_collections_metadata.image_url;
    return "/placeholder.svg";
  };

  const getName = () => {
    if (listing.metadata?.name) return listing.metadata.name;
    return `${listing.nft_collections_metadata?.name || "NFT"} #${listing.token_id}`;
  };

  return (
    <>
      <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-colors group cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={imageError ? "/placeholder.svg" : getImageUrl()}
              alt={getName()}
              onError={() => setImageError(true)}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge 
                variant={listing.status === 'active' ? 'default' : 'secondary'}
                className={listing.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}
              >
                {listing.status === 'active' ? 'En vente' : 'Vendu'}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowDetail(true)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-white font-semibold mb-1 truncate">{getName()}</h3>
            <p className="text-gray-400 text-sm mb-3">
              {listing.nft_collections_metadata?.name || "Collection inconnue"}
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">Prix</p>
                <p className="text-white font-bold">{formatPrice(listing.price)}</p>
              </div>
              {listing.status === 'active' && (
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Acheter
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <NFTDetailModal
        listing={listing}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
};
