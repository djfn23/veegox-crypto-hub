
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTMarketGrid } from "./NFTMarketGrid";
import { NFTMarketplaceFilters } from "./NFTMarketplaceFilters";
import { CollectionsGrid } from "./CollectionsGrid";
import { MyListingsGrid } from "./MyListingsGrid";
import { TrendingIcon, Grid3X3, User, Plus } from "lucide-react";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Button } from "@/components/ui/button";

export const NFTMarketplaceModule = () => {
  const { connectedWallet } = useWeb3Wallet();
  const [activeTab, setActiveTab] = useState("marketplace");
  const [filters, setFilters] = useState({
    collection: "",
    minPrice: "",
    maxPrice: "",
    status: "active"
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">NFT Marketplace</h1>
          <p className="text-gray-400">Découvrez, achetez et vendez des NFTs uniques</p>
        </div>
        {connectedWallet && (
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setActiveTab("my-listings")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer une annonce
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="collections" className="flex items-center gap-2">
            <TrendingIcon className="h-4 w-4" />
            Collections
          </TabsTrigger>
          {connectedWallet && (
            <TabsTrigger value="my-listings" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mes annonces
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <NFTMarketplaceFilters filters={filters} onFiltersChange={setFilters} />
          <NFTMarketGrid filters={filters} />
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsGrid />
        </TabsContent>

        {connectedWallet && (
          <TabsContent value="my-listings">
            <MyListingsGrid userAddress={connectedWallet.address} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
