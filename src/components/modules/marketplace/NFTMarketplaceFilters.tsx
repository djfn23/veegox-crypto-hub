
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, DollarSign } from "lucide-react";
import { CustomToken } from "@/services/tokenEcosystemService";
import VeegoxLogo from "@/components/ui/veegox-logo";

interface FiltersState {
  collection: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  paymentToken: string;
}

interface NFTMarketplaceFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  acceptedTokens?: CustomToken[];
}

export const NFTMarketplaceFilters = ({ filters, onFiltersChange, acceptedTokens = [] }: NFTMarketplaceFiltersProps) => {
  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une collection..."
            value={filters.collection}
            onChange={(e) => updateFilter("collection", e.target.value)}
            className="pl-10 bg-gray-700/50 border-gray-600 text-white"
          />
        </div>

        <Input
          placeholder="Prix min (MATIC)"
          type="number"
          value={filters.minPrice}
          onChange={(e) => updateFilter("minPrice", e.target.value)}
          className="bg-gray-700/50 border-gray-600 text-white"
        />

        <Input
          placeholder="Prix max (MATIC)"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", e.target.value)}
          className="bg-gray-700/50 border-gray-600 text-white"
        />

        <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">En vente</SelectItem>
            <SelectItem value="sold">Vendus</SelectItem>
            <SelectItem value="all">Tous</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.paymentToken} onValueChange={(value) => updateFilter("paymentToken", value)}>
          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
            <SelectValue placeholder="Token de paiement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Tous les tokens
              </div>
            </SelectItem>
            <SelectItem value="veegox">
              <div className="flex items-center gap-2">
                <VeegoxLogo size="sm" />
                VGX
              </div>
            </SelectItem>
            {acceptedTokens.map((token) => (
              <SelectItem key={token.id} value={token.address}>
                <div className="flex items-center gap-2">
                  {token.logo ? (
                    <img src={token.logo} alt={token.symbol} className="w-4 h-4 rounded-full" />
                  ) : (
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs">
                      {token.symbol.slice(0, 1)}
                    </div>
                  )}
                  {token.symbol}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};
