
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share, ExternalLink } from "lucide-react";
import { useState } from "react";

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

interface NFTDetailModalProps {
  listing: NFTListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NFTDetailModal = ({ listing, open, onOpenChange }: NFTDetailModalProps) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (listing.metadata?.image) return listing.metadata.image;
    if (listing.nft_collections_metadata?.image_url) return listing.nft_collections_metadata.image_url;
    return "/placeholder.svg";
  };

  const getName = () => {
    if (listing.metadata?.name) return listing.metadata.name;
    return `${listing.nft_collections_metadata?.name || "NFT"} #${listing.token_id}`;
  };

  const getAttributes = () => {
    return listing.metadata?.attributes || [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">{getName()}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="space-y-4">
            <img
              src={imageError ? "/placeholder.svg" : getImageUrl()}
              alt={getName()}
              onError={() => setImageError(true)}
              className="w-full rounded-lg"
            />
            
            {/* Attributes */}
            {getAttributes().length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-3">Attributs</h4>
                <div className="grid grid-cols-2 gap-2">
                  {getAttributes().map((attr: any, index: number) => (
                    <div key={index} className="bg-gray-800 p-2 rounded">
                      <p className="text-gray-400 text-xs">{attr.trait_type}</p>
                      <p className="text-white text-sm font-semibold">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  {listing.nft_collections_metadata?.name || "Collection"}
                </Badge>
                <Badge 
                  variant={listing.status === 'active' ? 'default' : 'secondary'}
                  className={listing.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}
                >
                  {listing.status === 'active' ? 'En vente' : 'Vendu'}
                </Badge>
              </div>
              
              {listing.metadata?.description && (
                <p className="text-gray-400">{listing.metadata.description}</p>
              )}
            </div>

            <Separator className="bg-gray-700" />

            {/* Price */}
            <div>
              <p className="text-gray-400 text-sm">Prix actuel</p>
              <p className="text-2xl font-bold text-white">{listing.price} MATIC</p>
            </div>

            {/* Actions */}
            {listing.status === 'active' && (
              <div className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Acheter maintenant
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    <Heart className="h-4 w-4 mr-2" />
                    Favoris
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    <Share className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            )}

            <Separator className="bg-gray-700" />

            {/* Contract info */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Contrat</span>
                <div className="flex items-center gap-1">
                  <span className="text-white text-sm font-mono">
                    {listing.contract_address.slice(0, 6)}...{listing.contract_address.slice(-4)}
                  </span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token ID</span>
                <span className="text-white">{listing.token_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Blockchain</span>
                <span className="text-white">Polygon</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
