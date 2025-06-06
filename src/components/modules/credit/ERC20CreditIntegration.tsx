
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { useMainContractInfo, useUserContractBalance } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Coins, TrendingUp, Shield, Zap } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

export const ERC20CreditIntegration = () => {
  const { connectedWallet } = useWeb3Wallet();
  const { data: contractInfo } = useMainContractInfo();
  const { data: userBalance } = useUserContractBalance(connectedWallet?.address || null);
  const [collateralAmount, setCollateralAmount] = useState('');

  const tokenInfo = contractInfo?.result?.tokenInfo;
  const balance = userBalance?.result || "0";
  
  const formatBalance = (balance: string) => {
    if (!balance) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const calculateLoanCapacity = () => {
    if (!collateralAmount || !tokenInfo) return 0;
    // LTV de 70% pour votre token personnalisé
    return parseFloat(collateralAmount) * 0.7;
  };

  return (
    <GlassCard className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {tokenInfo?.name || "ERC20Template"} Collateral
              </h3>
              <p className="text-gray-400">Utilisez vos tokens comme garantie</p>
            </div>
          </div>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Shield className="h-3 w-3 mr-1" />
            Polygon
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg text-center">
            <p className="text-blue-400 text-sm font-medium">Votre Balance</p>
            <p className="text-white text-lg font-bold">
              {formatBalance(balance)} {tokenInfo?.symbol}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg text-center">
            <p className="text-green-400 text-sm font-medium">LTV Ratio</p>
            <p className="text-white text-lg font-bold">70%</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg text-center">
            <p className="text-yellow-400 text-sm font-medium">Capacité d'emprunt</p>
            <p className="text-white text-lg font-bold">
              <AnimatedNumber value={calculateLoanCapacity()} /> USDC
            </p>
          </div>
        </div>

        {/* Interface de garantie */}
        {connectedWallet ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Montant en garantie ({tokenInfo?.symbol})
              </label>
              <input
                type="number"
                value={collateralAmount}
                onChange={(e) => setCollateralAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              />
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Montant empruntable</span>
                <span className="text-white font-semibold">
                  {calculateLoanCapacity().toFixed(2)} USDC
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Taux d'intérêt estimé</span>
                <span className="text-green-400 font-semibold">8.5% APR</span>
              </div>
            </div>

            <GradientButton 
              className="w-full"
              disabled={!collateralAmount || parseFloat(collateralAmount) <= 0}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Utiliser comme Collateral
            </GradientButton>
          </div>
        ) : (
          <div className="text-center py-6">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-400">Connectez votre wallet pour utiliser vos tokens</p>
          </div>
        )}

        {/* Avantages */}
        <div className="border-t border-white/10 pt-4">
          <h4 className="text-white font-medium mb-3">Avantages de votre token</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">LTV ratio préférentiel (70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">Taux d'intérêt réduit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">Liquidation à 85%</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
