
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const holdings = [
  { name: 'Veegox Token', symbol: 'VEEGOX', amount: '125,000', value: '$5,625.00', change: '+12.3%', color: 'purple' },
  { name: 'Ethereum', symbol: 'ETH', amount: '1.5', value: '$3,112.50', change: '+3.1%', color: 'blue' },
  { name: 'USD Coin', symbol: 'USDC', amount: '1,867', value: '$1,867.50', change: '0.0%', color: 'green' },
  { name: 'Bitcoin', symbol: 'BTC', amount: '0.025', value: '$1,245.00', change: '-1.2%', color: 'orange' }
];

export const TopHoldingsCard = () => {
  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Principales Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holdings.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-${token.color}-500 to-${token.color}-600 flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{token.name}</p>
                  <p className="text-gray-400 text-sm">{token.amount} {token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{token.value}</p>
                <p className={`text-sm ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                  {token.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
