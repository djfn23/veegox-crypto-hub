
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

const CRYPTO_OPTIONS = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'USDC', name: 'USD Coin', icon: '$' },
  { symbol: 'USDT', name: 'Tether', icon: '₮' },
  { symbol: 'MATIC', name: 'Polygon', icon: '◊' },
  { symbol: 'BNB', name: 'Binance Coin', icon: 'B' }
];

interface CryptoSelectorProps {
  selectedCrypto: string;
  onSelectCrypto: (crypto: string) => void;
  cryptoRates: Record<string, number>;
  currency: string;
}

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  selectedCrypto,
  onSelectCrypto,
  cryptoRates,
  currency
}) => {
  const selectedCryptoData = CRYPTO_OPTIONS.find(c => c.symbol === selectedCrypto);
  const currentRate = selectedCrypto ? cryptoRates[selectedCrypto] : 0;

  return (
    <div className="space-y-2">
      <Label className="text-white">Cryptomonnaie</Label>
      <Select value={selectedCrypto} onValueChange={onSelectCrypto}>
        <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
          <SelectValue placeholder="Choisir une cryptomonnaie" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          {CRYPTO_OPTIONS.map((crypto) => (
            <SelectItem key={crypto.symbol} value={crypto.symbol} className="text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{crypto.icon}</span>
                  <div>
                    <span className="font-medium">{crypto.symbol}</span>
                    <span className="text-gray-400 ml-2">{crypto.name}</span>
                  </div>
                </div>
                {cryptoRates[crypto.symbol] && (
                  <span className="text-gray-400 text-sm">
                    {cryptoRates[crypto.symbol].toLocaleString()} {currency}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedCryptoData && currentRate > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span className="text-gray-400">
            1 {selectedCrypto} = {currentRate.toLocaleString()} {currency}
          </span>
        </div>
      )}
    </div>
  );
};
