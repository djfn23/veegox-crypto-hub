
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Zap } from 'lucide-react';
import { useSwapQuote } from '@/hooks/useSwapQuote';
import { useWeb3Wallet } from '@/hooks/useWeb3Wallet';
import { oneInchService } from '@/services/oneInchService';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';

export const EnhancedSwapInterface = () => {
  const { connectedWallet } = useWeb3Wallet();
  const { quote, isLoading, getQuote, executeSwap } = useSwapQuote();
  const [tokens, setTokens] = useState<any>({});
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(1);

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenData = await oneInchService.getTokens();
      setTokens(tokenData);
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) {
      const debounce = setTimeout(() => {
        getQuote(fromToken, toToken, fromAmount);
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [fromToken, toToken, fromAmount, getQuote]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  };

  const handleExecuteSwap = async () => {
    if (!connectedWallet) {
      toast.error('Veuillez connecter votre wallet');
      return;
    }

    if (!quote) {
      toast.error('Aucun devis disponible');
      return;
    }

    await executeSwap(fromToken, toToken, fromAmount, connectedWallet.address, slippage);
  };

  const tokenOptions = Object.entries(tokens).map(([address, token]: [string, any]) => ({
    value: address,
    label: `${token.symbol} - ${token.name}`,
    token
  }));

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          Swap Optimisé 1inch
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Token Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">De</label>
          <div className="flex gap-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner un token" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {tokenOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapTokens}
            className="border-slate-600 text-gray-300 hover:bg-slate-700"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Vers</label>
          <div className="flex gap-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner un token" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {tokenOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.0"
              value={quote?.toTokenAmount || ''}
              readOnly
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Slippage Settings */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Slippage Tolérance (%)</label>
          <div className="flex gap-2">
            {[0.5, 1, 2, 5].map(value => (
              <Button
                key={value}
                variant={slippage === value ? "default" : "outline"}
                size="sm"
                onClick={() => setSlippage(value)}
                className={slippage === value ? "bg-blue-600" : "border-slate-600 text-gray-300"}
              >
                {value}%
              </Button>
            ))}
            <Input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(Number(e.target.value))}
              className="w-20 bg-slate-800 border-slate-600 text-white"
              min="0"
              max="50"
              step="0.1"
            />
          </div>
        </div>

        {/* Quote Information */}
        {quote && (
          <div className="bg-slate-800/50 p-3 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Taux de change:</span>
              <span className="text-white">
                1 {tokens[fromToken]?.symbol} = {
                  (Number(quote.toTokenAmount) / Number(quote.fromTokenAmount)).toFixed(6)
                } {tokens[toToken]?.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Gas estimé:</span>
              <span className="text-white">{quote.estimatedGas?.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleExecuteSwap}
          disabled={!connectedWallet || !quote || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Calcul...
            </>
          ) : !connectedWallet ? (
            'Connecter le Wallet'
          ) : !quote ? (
            'Entrer les montants'
          ) : (
            'Exécuter le Swap'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
