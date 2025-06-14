
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFiatBalance } from '@/hooks/useFiatBalance';
import { BalanceDisplay } from './crypto-purchase/BalanceDisplay';
import { CryptoPurchaseForm } from './crypto-purchase/CryptoPurchaseForm';

interface CryptoPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  currency: string;
  cryptoRates: Record<string, number>;
}

export const CryptoPurchaseModal: React.FC<CryptoPurchaseModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  currency,
  cryptoRates
}) => {
  const { purchaseCrypto } = useFiatBalance();

  const handlePurchase = async (selectedCrypto: string, fiatAmount: number) => {
    try {
      await purchaseCrypto.mutateAsync({
        fiatAmount,
        cryptoSymbol: selectedCrypto
      });
      
      onClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Acheter des Cryptomonnaies</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <BalanceDisplay 
            availableBalance={availableBalance}
            currency={currency}
          />

          <CryptoPurchaseForm
            availableBalance={availableBalance}
            currency={currency}
            cryptoRates={cryptoRates}
            onPurchase={handlePurchase}
            isPurchasing={purchaseCrypto.isPending}
          />

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-slate-600 text-white hover:bg-slate-800"
            >
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
