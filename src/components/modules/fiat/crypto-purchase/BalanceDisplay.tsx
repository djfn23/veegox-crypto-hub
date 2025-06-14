
import React from 'react';

interface BalanceDisplayProps {
  availableBalance: number;
  currency: string;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  availableBalance,
  currency
}) => {
  return (
    <div className="bg-slate-800/50 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">Solde disponible</p>
      <p className="text-white font-semibold text-lg">
        {availableBalance.toFixed(2)} {currency}
      </p>
    </div>
  );
};
