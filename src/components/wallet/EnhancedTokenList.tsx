
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Eye,
  EyeOff
} from 'lucide-react';
import { PriceChart } from './PriceChart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  balanceUSD: number;
  price: number;
  change24h: number;
  priceData: Array<{ timestamp: string; price: number; }>;
  isFavorite?: boolean;
  isHidden?: boolean;
}

interface EnhancedTokenListProps {
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  onToggleFavorite: (symbol: string) => void;
  onToggleHidden: (symbol: string) => void;
  onQuickSwap: (fromToken: string) => void;
}

export const EnhancedTokenList: React.FC<EnhancedTokenListProps> = ({
  tokens,
  onTokenSelect,
  onToggleFavorite,
  onToggleHidden,
  onQuickSwap
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [sortBy, setSortBy] = useState<'balance' | 'name' | 'change'>('balance');

  const filteredTokens = tokens
    .filter(token => {
      if (!showHidden && token.isHidden) return false;
      return token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'balance':
          return b.balanceUSD - a.balanceUSD;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'change':
          return b.change24h - a.change24h;
        default:
          return 0;
      }
    });

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Mes Tokens</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHidden(!showHidden)}
              className="text-gray-400 hover:text-white"
            >
              {showHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-600">
                <DropdownMenuItem onClick={() => setSortBy('balance')} className="text-white">
                  Par Balance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')} className="text-white">
                  Par Nom
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('change')} className="text-white">
                  Par Performance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white"
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {filteredTokens.map((token) => (
          <div
            key={token.symbol}
            className={`p-4 rounded-lg border transition-all cursor-pointer hover:bg-slate-800/50 ${
              token.isHidden 
                ? 'border-slate-600 opacity-50' 
                : 'border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => onTokenSelect(token)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {token.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{token.name}</h3>
                    <span className="text-gray-400 text-sm">{token.symbol}</span>
                    {token.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-300">{token.balance}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-white font-medium">
                      ${token.balanceUSD.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${token.price.toFixed(4)}
                  </div>
                  <Badge
                    variant={token.change24h >= 0 ? 'default' : 'destructive'}
                    className={`text-xs ${
                      token.change24h >= 0 
                        ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                        : 'bg-red-600/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {token.change24h >= 0 ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                      {Math.abs(token.change24h).toFixed(2)}%
                    </span>
                  </Badge>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickSwap(token.symbol);
                      }}
                      className="text-white"
                    >
                      Échanger
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(token.symbol);
                      }}
                      className="text-white"
                    >
                      {token.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleHidden(token.symbol);
                      }}
                      className="text-white"
                    >
                      {token.isHidden ? 'Afficher' : 'Masquer'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <PriceChart
              data={token.priceData}
              symbol={token.symbol}
              currentPrice={token.price}
              change24h={token.change24h}
              className="mt-3"
            />
            
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickSwap(token.symbol);
                }}
              >
                Échanger
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                Envoyer
              </Button>
            </div>
          </div>
        ))}
        
        {filteredTokens.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'Aucun token trouvé' : 'Aucun token dans votre portefeuille'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
