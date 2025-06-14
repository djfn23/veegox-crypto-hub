
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { useFiatBalance } from '@/hooks/useFiatBalance';

interface CryptoPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  currency: string;
  cryptoRates: Record<string, number>;
}

const CRYPTO_OPTIONS = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'USDC', name: 'USD Coin', icon: '$' },
  { symbol: 'USDT', name: 'Tether', icon: '₮' },
  { symbol: 'MATIC', name: 'Polygon', icon: '◊' },
  { symbol: 'BNB', name: 'Binance Coin', icon: 'B' }
];

export const CryptoPurchaseModal: React.FC<CryptoPurchaseModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  currency,
  cryptoRates
}) => {
  const { purchaseCrypto } = useFiatBalance();
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [fiatAmount, setFiatAmount] = useState<string>('');
  const [cryptoAmount, setCryptoAmount] = useState<number>(0);
  const [fees, setFees] = useState<number>(0);

  useEffect(() => {
    if (selectedCrypto && fiatAmount && cryptoRates[selectedCrypto]) {
      const amount = parseFloat(fiatAmount);
      if (!isNaN(amount) && amount > 0) {
        const calculatedFees = amount * 0.02; // 2% fees
        const netAmount = amount - calculatedFees;
        const crypto = netAmount / cryptoRates[selectedCrypto];
        
        setFees(calculatedFees);
        setCryptoAmount(crypto);
      } else {
        setFees(0);
        setCryptoAmount(0);
      }
    }
  }, [selectedCrypto, fiatAmount, cryptoRates]);

  const handlePurchase = async () => {
    if (!selectedCrypto || !fiatAmount) return;
    
    const amount = parseFloat(fiatAmount);
    if (isNaN(amount) || amount <= 0) return;

    try {
      await purchaseCrypto.mutateAsync({
        fiatAmount: amount,
        cryptoSymbol: selectedCrypto
      });
      
      // Reset form
      setSelectedCrypto('');
      setFiatAmount('');
      setCryptoAmount(0);
      setFees(0);
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const selectedCryptoData = CRYPTO_OPTIONS.find(c => c.symbol === selectedCrypto);
  const currentRate = selectedCrypto ? cryptoRates[selectedCrypto] : 0;
  const amount = parseFloat(fiatAmount) || 0;
  const canPurchase = selectedCrypto && amount > 0 && amount <= availableBalance && !purchaseCrypto.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Acheter des Cryptomonnaies</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Balance disponible */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Solde disponible</p>
            <p className="text-white font-semibold text-lg">
              {availableBalance.toFixed(2)} {currency}
            </p>
          </div>

          {/* Sélection crypto */}
          <div className="space-y-2">
            <Label className="text-white">Cryptomonnaie</Label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
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

          {/* Montant fiat */}
          <div className="space-y-2">
            <Label className="text-white">Montant en {currency}</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={fiatAmount}
              onChange={(e) => setFiatAmount(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
              min="0"
              max={availableBalance}
              step="0.01"
            />
            <div className="flex gap-2">
              {[10, 50, 100, 500].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setFiatAmount(preset.toString())}
                  disabled={preset > availableBalance}
                  className="border-slate-600 text-gray-400 hover:text-white"
                >
                  {preset} {currency}
                </Button>
              ))}
            </div>
          </div>

          {/* Résumé de l'achat */}
          {selectedCrypto && amount > 0 && (
            <div className="bg-slate-800/50 p-4 rounded-lg space-y-3">
              <h4 className="text-white font-medium">Résumé de l'achat</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Montant</span>
                  <span className="text-white">{amount.toFixed(2)} {currency}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Frais (2%)</span>
                  <span className="text-white">-{fees.toFixed(2)} {currency}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Montant net</span>
                  <span className="text-white">{(amount - fees).toFixed(2)} {currency}</span>
                </div>
                
                <hr className="border-slate-600" />
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Vous recevrez</span>
                  <span className="text-green-400 font-medium">
                    {cryptoAmount.toFixed(8)} {selectedCrypto}
                  </span>
                </div>
              </div>
              
              {amount > availableBalance && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Solde insuffisant</span>
                </div>
              )}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-slate-600 text-white hover:bg-slate-800"
            >
              Annuler
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={!canPurchase}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {purchaseCrypto.isPending ? 'Achat en cours...' : 'Acheter'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
