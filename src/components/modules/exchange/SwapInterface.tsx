
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSwapInterface } from '@/components/trading/EnhancedSwapInterface';
import { RealTimePriceChart } from '@/components/trading/RealTimePriceChart';
import { LiquidityPool } from '../credit/types';

interface SwapInterfaceProps {
  pools: LiquidityPool[];
  userWallet: {
    address: string;
    chain_id: number;
    chain_type: "ethereum" | "polygon" | "base" | "arbitrum";
    created_at: string;
    id: string;
    is_primary: boolean;
    nickname: string;
    user_id: string;
  } | null;
}

export const SwapInterface = ({ pools, userWallet }: SwapInterfaceProps) => {
  const [selectedToken, setSelectedToken] = useState('ethereum');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <EnhancedSwapInterface />
        
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Informations du Swap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Avantages 1inch</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Meilleur taux sur 100+ DEX</li>
                <li>• Gas optimisé automatiquement</li>
                <li>• Protection MEV intégrée</li>
                <li>• Swaps partiels intelligents</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Protocoles supportés:</span>
              <span className="text-white">100+</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Volume 24h:</span>
              <span className="text-green-400">$50M+</span>
            </div>

            {userWallet && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Wallet connecté:</span>
                <span className="text-blue-400">{userWallet.address.slice(0, 6)}...{userWallet.address.slice(-4)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Pools disponibles:</span>
              <span className="text-white">{pools.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <RealTimePriceChart 
          tokenId={selectedToken}
          symbol="ETH"
          days={7}
        />
      </div>
    </div>
  );
};
