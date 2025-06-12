
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { EnhancedSwapInterface } from '@/components/trading/EnhancedSwapInterface';
import { RealTimePriceChart } from '@/components/trading/RealTimePriceChart';

export const SwapInterface = () => {
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
