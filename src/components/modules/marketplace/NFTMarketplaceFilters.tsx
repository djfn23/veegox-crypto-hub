
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface FiltersState {
  collection: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

interface NFTMarketplaceFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

export const NFTMarketplaceFilters = ({ filters, onFiltersChange }: NFTMarketplaceFiltersProps) => {
  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      </div>
    </Card>
  );
};
