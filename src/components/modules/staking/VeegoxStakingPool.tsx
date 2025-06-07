
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useVeegoxTokenInfo, useVeegoxBalance } from "@/hooks/useVeegoxToken";
import { VeegoxTokenService } from "@/services/veegoxTokenService";
import { useSmartContract } from "@/hooks/useSmartContract";
import { Coins, Clock, TrendingUp, Zap } from "lucide-react";
import { toast } from "sonner";

export const VeegoxStakingPool = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeDuration, setStakeDuration] = useState('90');
  
  const { data: tokenInfo } = useVeegoxTokenInfo();
  const { data: balance } = useVeegoxBalance();
  const { executeContract, isExecuting } = useSmartContract();
  
  const stakingAPY = {
    '30': 12,
    '90': 18,
    '180': 25,
    '365': 35
  };

  const currentAPY = stakingAPY[stakeDuration as keyof typeof stakingAPY] || 18;
  const formattedBalance = tokenInfo ? VeegoxTokenService.formatVeegoxBalance(balance || '0', tokenInfo.decimals) : '0';

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Veuillez entrer un montant valide');
      return;
    }

    if (!tokenInfo) {
      toast.error('Informations du token non disponibles');
      return;
    }

    try {
      // Dans un vrai scénario, ceci appellerait le contrat de staking
      // Pour la démo, on simule juste l'opération
      toast.success(`Staking de ${stakeAmount} ${tokenInfo.symbol} initié`);
      setStakeAmount('');
    } catch (error) {
      toast.error('Erreur lors du staking');
    }
  };

  const setMaxAmount = () => {
    setStakeAmount(formattedBalance);
  };

  if (!tokenInfo) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Chargement du pool de staking Veegox...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            Pool de Staking Veegox
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
            Principal
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats du pool */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{currentAPY}%</div>
            <div className="text-gray-400 text-sm">APY</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Clock className="h-5 w-5 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stakeDuration}</div>
            <div className="text-gray-400 text-sm">Jours</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Zap className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">24.5K</div>
            <div className="text-gray-400 text-sm">Stakers</div>
          </div>
        </div>

        {/* Formulaire de staking */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">Montant à staker</label>
              <div className="text-sm text-gray-400">
                Balance: {formattedBalance} {tokenInfo.symbol}
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button variant="outline" onClick={setMaxAmount} className="border-purple-500/30">
                MAX
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Durée de staking</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(stakingAPY).map(([days, apy]) => (
                <Button
                  key={days}
                  variant={stakeDuration === days ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStakeDuration(days)}
                  className={stakeDuration === days 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "border-white/20 hover:border-purple-500/50"
                  }
                >
                  <div className="text-center">
                    <div>{days}j</div>
                    <div className="text-xs">{apy}%</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {stakeAmount && parseFloat(stakeAmount) > 0 && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-300 font-medium mb-2">Estimation des récompenses</h4>
              <div className="text-white">
                <div className="flex justify-between text-sm">
                  <span>Montant staké:</span>
                  <span>{stakeAmount} {tokenInfo.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Récompenses estimées:</span>
                  <span className="text-green-400">
                    {(parseFloat(stakeAmount) * currentAPY / 100 * parseInt(stakeDuration) / 365).toFixed(2)} {tokenInfo.symbol}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleStake}
            disabled={isExecuting || !stakeAmount || parseFloat(stakeAmount) <= 0}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isExecuting ? 'Staking en cours...' : `Staker ${tokenInfo.symbol}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
