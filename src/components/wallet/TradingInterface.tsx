
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  change24h: number;
}

interface TradingInterfaceProps {
  tokens: Token[];
  onSwap: (fromToken: string, toToken: string, amount: string) => void;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({ tokens, onSwap }) => {
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !amount) return;
    
    setIsSwapping(true);
    try {
      await onSwap(fromToken, toToken, amount);
    } finally {
      setIsSwapping(false);
    }
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const selectedFromToken = tokens.find(t => t.symbol === fromToken);
  const selectedToToken = tokens.find(t => t.symbol === toToken);

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-blue-400" />
          Trading Rapide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Depuis</Label>
          <div className="flex gap-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner token" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol} className="text-white">
                    <div className="flex items-center justify-between w-full">
                      <span>{token.symbol}</span>
                      <span className="text-gray-400 text-sm">{token.balance}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>
          {selectedFromToken && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Prix: ${selectedFromToken.price.toFixed(4)}</span>
              <span className={`flex items-center gap-1 ${
                selectedFromToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedFromToken.change24h >= 0 ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                {Math.abs(selectedFromToken.change24h).toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={swapTokens}
            className="h-8 w-8 p-0 rounded-full bg-slate-800 hover:bg-slate-700"
          >
            <ArrowUpDown className="h-4 w-4 text-blue-400" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Vers</Label>
          <Select value={toToken} onValueChange={setToToken}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Sélectionner token" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {tokens.filter(t => t.symbol !== fromToken).map((token) => (
                <SelectItem key={token.symbol} value={token.symbol} className="text-white">
                  <div className="flex items-center justify-between w-full">
                    <span>{token.symbol}</span>
                    <span className="text-gray-400 text-sm">{token.balance}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedToToken && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Prix: ${selectedToToken.price.toFixed(4)}</span>
              <span className={`flex items-center gap-1 ${
                selectedToToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedToToken.change24h >= 0 ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                {Math.abs(selectedToToken.change24h).toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {amount && fromToken && toToken && (
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimation</span>
              <span className="text-white">
                ~{(parseFloat(amount) * (selectedFromToken?.price || 0) / (selectedToToken?.price || 1)).toFixed(6)} {toToken}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Frais de réseau</span>
              <span className="text-white">~$0.50</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !amount || isSwapping}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isSwapping ? 'Échange en cours...' : 'Échanger'}
        </Button>
      </CardContent>
    </Card>
  );
};
