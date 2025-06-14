
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface PurchaseSummaryProps {
  amount: number;
  fees: number;
  cryptoAmount: number;
  selectedCrypto: string;
  currency: string;
  availableBalance: number;
}

export const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  amount,
  fees,
  cryptoAmount,
  selectedCrypto,
  currency,
  availableBalance
}) => {
  return (
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
  );
};
