
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NFTCard } from "./NFTCard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FiltersState {
  collection: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

interface NFTMarketGridProps {
  filters: FiltersState;
}

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

export const NFTMarketGrid = ({ filters }: NFTMarketGridProps) => {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['nft-listings', filters],
    queryFn: async () => {
      let query = supabase
        .from('nft_listings')
        .select(`
          *,
          nft_collections_metadata (
            name,
            image_url
          )
        `)
        .eq('status', filters.status === 'all' ? undefined : filters.status || 'active');

      if (filters.collection) {
        query = query.ilike('nft_collections_metadata.name', `%${filters.collection}%`);
      }

      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }

      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to ensure it matches our interface
      return (data || []).map(listing => ({
        ...listing,
        nft_collections_metadata: Array.isArray(listing.nft_collections_metadata) 
          ? listing.nft_collections_metadata[0] || null
          : listing.nft_collections_metadata
      })) as NFTListing[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="bg-red-900/20 border-red-900">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Erreur lors du chargement des NFTs: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Aucun NFT trouvé avec ces filtres</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <NFTCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};
