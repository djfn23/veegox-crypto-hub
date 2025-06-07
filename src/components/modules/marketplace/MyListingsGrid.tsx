
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NFTCard } from "./NFTCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useState } from "react";
import { CreateListingModal } from "./CreateListingModal";

interface MyListingsGridProps {
  userAddress: string;
}

export const MyListingsGrid = ({ userAddress }: MyListingsGridProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: myListings, isLoading } = useQuery({
    queryKey: ['my-nft-listings', userAddress],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nft_listings')
        .select(`
          *,
          nft_collections_metadata (
            name,
            image_url
          )
        `)
        .eq('seller_id', userAddress)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!userAddress
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Mes annonces</h2>
          <p className="text-gray-400">Gérez vos NFTs mis en vente</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle annonce
        </Button>
      </div>

      {myListings && myListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myListings.map((listing) => (
            <NFTCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">Vous n'avez pas encore d'annonces</p>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer votre première annonce
          </Button>
        </div>
      )}

      <CreateListingModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        userAddress={userAddress}
      />
    </div>
  );
};
