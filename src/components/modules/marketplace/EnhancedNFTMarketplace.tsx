
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NFTMarketGrid } from "./NFTMarketGrid";
import { NFTMarketplaceFilters } from "./NFTMarketplaceFilters";
import { CollectionsGrid } from "./CollectionsGrid";
import { MyListingsGrid } from "./MyListingsGrid";
import { TrendingUp, Grid3X3, User, Plus, Coins, DollarSign } from "lucide-react";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { tokenEcosystemService, CustomToken } from "@/services/tokenEcosystemService";
import VeegoxLogo from "@/components/ui/veegox-logo";

export const EnhancedNFTMarketplace = () => {
  const { connectedWallet } = useWeb3Wallet();
  const [activeTab, setActiveTab] = useState("marketplace");
  const [acceptedTokens, setAcceptedTokens] = useState<CustomToken[]>([]);
  const [selectedPaymentToken, setSelectedPaymentToken] = useState<string>('');
  const [filters, setFilters] = useState({
    collection: "",
    minPrice: "",
    maxPrice: "",
    status: "active",
    paymentToken: ""
  });

  useEffect(() => {
    loadAcceptedTokens();
  }, []);

  const loadAcceptedTokens = async () => {
    try {
      const tokens = await tokenEcosystemService.getTokensForModule('marketplace');
      setAcceptedTokens(tokens);
    } catch (error) {
      console.error('Error loading accepted tokens:', error);
    }
  };

  const enhancedFilters = {
    ...filters,
    paymentToken: selectedPaymentToken
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VeegoxLogo size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-white">NFT Marketplace</h1>
            <p className="text-gray-400">Payez avec vos tokens Veegox</p>
          </div>
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

      {/* Tokens de paiement acceptés */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            Tokens de Paiement Acceptés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedPaymentToken === '' ? "default" : "outline"}
              className={`cursor-pointer ${selectedPaymentToken === '' ? 'bg-purple-600' : 'border-white/20 hover:bg-white/10'}`}
              onClick={() => setSelectedPaymentToken('')}
            >
              <DollarSign className="h-3 w-3 mr-1" />
              Tous
            </Badge>
            <Badge 
              variant={selectedPaymentToken === 'veegox' ? "default" : "outline"}
              className={`cursor-pointer ${selectedPaymentToken === 'veegox' ? 'bg-purple-600' : 'border-white/20 hover:bg-white/10'}`}
              onClick={() => setSelectedPaymentToken('veegox')}
            >
              <VeegoxLogo size="sm" className="mr-1" />
              VGX
            </Badge>
            {acceptedTokens.map((token) => (
              <Badge 
                key={token.id}
                variant={selectedPaymentToken === token.address ? "default" : "outline"}
                className={`cursor-pointer ${selectedPaymentToken === token.address ? 'bg-purple-600' : 'border-white/20 hover:bg-white/10'}`}
                onClick={() => setSelectedPaymentToken(token.address)}
              >
                {token.logo ? (
                  <img src={token.logo} alt={token.symbol} className="w-3 h-3 mr-1 rounded-full" />
                ) : (
                  <span className="text-xs mr-1">{token.symbol.slice(0, 1)}</span>
                )}
                {token.symbol}
              </Badge>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-3">
            Achetez des NFT avec n'importe quel token de l'écosystème Veegox
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="collections" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
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
          <NFTMarketplaceFilters 
            filters={enhancedFilters} 
            onFiltersChange={setFilters}
            acceptedTokens={acceptedTokens}
          />
          <NFTMarketGrid filters={enhancedFilters} />
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
