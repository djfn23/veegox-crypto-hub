
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CryptoSelector } from './CryptoSelector';
import { PurchaseSummary } from './PurchaseSummary';

interface CryptoPurchaseFormProps {
  availableBalance: number;
  currency: string;
  cryptoRates: Record<string, number>;
  onPurchase: (selectedCrypto: string, fiatAmount: number) => void;
  isPurchasing: boolean;
}

export const CryptoPurchaseForm: React.FC<CryptoPurchaseFormProps> = ({
  availableBalance,
  currency,
  cryptoRates,
  onPurchase,
  isPurchasing
}) => {
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

  const handlePurchase = () => {
    if (!selectedCrypto || !fiatAmount) return;
    
    const amount = parseFloat(fiatAmount);
    if (isNaN(amount) || amount <= 0) return;

    onPurchase(selectedCrypto, amount);
  };

  const amount = parseFloat(fiatAmount) || 0;
  const canPurchase = selectedCrypto && amount > 0 && amount <= availableBalance && !isPurchasing;

  return (
    <div className="space-y-6">
      <CryptoSelector
        selectedCrypto={selectedCrypto}
        onSelectCrypto={setSelectedCrypto}
        cryptoRates={cryptoRates}
        currency={currency}
      />

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

      {selectedCrypto && amount > 0 && (
        <PurchaseSummary
          amount={amount}
          fees={fees}
          cryptoAmount={cryptoAmount}
          selectedCrypto={selectedCrypto}
          currency={currency}
          availableBalance={availableBalance}
        />
      )}

      <div className="flex gap-3">
        <Button
          onClick={handlePurchase}
          disabled={!canPurchase}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isPurchasing ? 'Achat en cours...' : 'Acheter'}
        </Button>
      </div>
    </div>
  );
};
