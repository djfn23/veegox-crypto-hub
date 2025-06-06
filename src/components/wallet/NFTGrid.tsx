
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Image, ExternalLink } from "lucide-react";

interface NFT {
  tokenId: string;
  name: string;
  description?: string;
  image?: string;
  collection: {
    name: string;
    address: string;
  };
  metadata?: any;
}

interface NFTGridProps {
  nfts: NFT[];
  isLoading: boolean;
}

const NFTGrid = ({ nfts, isLoading }: NFTGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <GlassCard key={i} className="p-4">
            <Skeleton className="w-full h-48 bg-white/10" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-white/10" />
              <Skeleton className="h-3 w-1/2 bg-white/10" />
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Aucun NFT trouvé</p>
      </GlassCard>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft) => (
        <GlassCard key={`${nft.collection.address}-${nft.tokenId}`} className="p-4 hover:scale-[1.02] transition-all duration-200">
          <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
            {nft.image ? (
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className="hidden w-full h-full flex items-center justify-center">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium text-sm truncate">{nft.name}</h4>
            <p className="text-gray-400 text-xs truncate">{nft.collection.name}</p>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="text-xs">
                #{nft.tokenId}
              </Badge>
              <ExternalLink className="h-3 w-3 text-gray-400 cursor-pointer hover:text-white" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export { NFTGrid };
