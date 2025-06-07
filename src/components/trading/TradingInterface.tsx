
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSmartContract } from '@/hooks/useSmartContract';
import { ArrowUpDown, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { toast } from 'sonner';

const DEX_CONTRACT = {
  address: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', // SushiSwap sur Polygon
  abi: [
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)',
    'function getAmountsOut(uint amountIn, address[] calldata path) view returns (uint[] memory amounts)'
  ]
};

const TOKENS = [
  { symbol: 'USDC', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6 },
  { symbol: 'USDT', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6 },
  { symbol: 'DAI', address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18 },
  { symbol: 'WMATIC', address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', decimals: 18 },
  { symbol: 'WETH', address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', decimals: 18 }
];

export const TradingInterface = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isCalculating, setIsCalculating] = useState(false);

  const { executeContract, readContract, isExecuting } = useSmartContract();

  const calculateOutput = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    setIsCalculating(true);
    try {
      const amountIn = BigInt(parseFloat(fromAmount) * Math.pow(10, fromToken.decimals));
      const path = [fromToken.address, toToken.address];
      
      const amounts = await readContract(
        DEX_CONTRACT.address,
        DEX_CONTRACT.abi,
        'getAmountsOut',
        [amountIn, path]
      );

      const outputAmount = Number(amounts[1]) / Math.pow(10, toToken.decimals);
      setToAmount(outputAmount.toFixed(6));
    } catch (error) {
      console.error('Error calculating output:', error);
      toast.error('Erreur de calcul du prix');
    } finally {
      setIsCalculating(false);
    }
  };

  const executeSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error('Veuillez spécifier les montants');
      return;
    }

    try {
      const amountIn = BigInt(parseFloat(fromAmount) * Math.pow(10, fromToken.decimals));
      const amountOutMin = BigInt(
        parseFloat(toAmount) * (1 - parseFloat(slippage) / 100) * Math.pow(10, toToken.decimals)
      );
      const path = [fromToken.address, toToken.address];
      const deadline = Math.floor(Date.now() / 1000) + 300; // 5 minutes

      await executeContract(
        DEX_CONTRACT.address,
        DEX_CONTRACT.abi,
        'swapExactTokensForTokens',
        [amountIn, amountOutMin, path, deadline]
      );

      toast.success('Swap exécuté avec succès!');
      setFromAmount('');
      setToAmount('');
    } catch (error: any) {
      toast.error(`Erreur swap: ${error.message}`);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          Échange de Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">De</label>
          <div className="flex gap-3">
            <Select value={fromToken.symbol} onValueChange={(symbol) => {
              const token = TOKENS.find(t => t.symbol === symbol);
              if (token) setFromToken(token);
            }}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.filter(t => t.symbol !== toToken.symbol).map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              onBlur={calculateOutput}
              className="flex-1 bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={switchTokens}
            className="border-slate-600 text-slate-300 rounded-full"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Vers</label>
          <div className="flex gap-3">
            <Select value={toToken.symbol} onValueChange={(symbol) => {
              const token = TOKENS.find(t => t.symbol === symbol);
              if (token) setToToken(token);
            }}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TOKENS.filter(t => t.symbol !== fromToken.symbol).map(token => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="flex-1 bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Slippage */}
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Slippage Tolérance:</span>
          <div className="flex gap-2">
            {['0.1', '0.5', '1.0'].map(value => (
              <Button
                key={value}
                variant={slippage === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSlippage(value)}
                className="text-xs"
              >
                {value}%
              </Button>
            ))}
          </div>
        </div>

        {/* Price Impact */}
        {toAmount && (
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Prix d'impact:</span>
              <span className="text-green-400">~0.05%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Frais réseau:</span>
              <span className="text-white">~$0.02</span>
            </div>
          </div>
        )}

        {/* Execute Button */}
        <Button
          onClick={executeSwap}
          disabled={!fromAmount || !toAmount || isExecuting || isCalculating}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isExecuting ? 'Échange en cours...' : 
           isCalculating ? 'Calcul du prix...' : 
           'Échanger'}
        </Button>

        {/* Recent Trades */}
        <div className="pt-4 border-t border-slate-700">
          <h4 className="text-white font-medium mb-3">Échanges récents</h4>
          <div className="space-y-2">
            {[
              { from: 'USDC', to: 'WMATIC', amount: '100', time: '2min' },
              { from: 'WETH', to: 'USDT', amount: '0.5', time: '5min' },
              { from: 'DAI', to: 'USDC', amount: '250', time: '8min' }
            ].map((trade, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {trade.from} → {trade.to}
                  </Badge>
                  <span className="text-white text-sm">{trade.amount}</span>
                </div>
                <span className="text-gray-400 text-xs">{trade.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
