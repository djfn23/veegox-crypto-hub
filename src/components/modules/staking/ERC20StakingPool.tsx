
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMainContractInfo, useUserContractBalance } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Lock, Unlock, Trophy, Zap, Calendar } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

interface StakingOption {
  duration: number;
  apy: number;
  minAmount: number;
  name: string;
  icon: string;
}

const stakingOptions: StakingOption[] = [
  { duration: 30, apy: 12, minAmount: 100, name: "Flexible", icon: "⚡" },
  { duration: 90, apy: 18, minAmount: 500, name: "Standard", icon: "🔒" },
  { duration: 180, apy: 25, minAmount: 1000, name: "Premium", icon: "💎" },
  { duration: 365, apy: 35, minAmount: 5000, name: "Elite", icon: "👑" }
];

export const ERC20StakingPool = () => {
  const { connectedWallet } = useWeb3Wallet();
  const { data: contractInfo } = useMainContractInfo();
  const { data: userBalance } = useUserContractBalance(connectedWallet?.address || null);
  const [selectedOption, setSelectedOption] = useState<StakingOption>(stakingOptions[0]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const tokenInfo = contractInfo?.result?.tokenInfo;
  const balance = userBalance?.result || "0";
  
  const formatBalance = (balance: string) => {
    if (!balance) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const calculateRewards = () => {
    if (!stakeAmount || !selectedOption) return 0;
    const amount = parseFloat(stakeAmount);
    const dailyRate = selectedOption.apy / 365 / 100;
    return amount * dailyRate * selectedOption.duration;
  };

  // Simulation de données de staking actuel
  const currentStakes = [
    { amount: 1000, duration: 90, apy: 18, daysLeft: 45, rewards: 22.5 },
    { amount: 2500, duration: 180, apy: 25, daysLeft: 120, rewards: 187.5 }
  ];

  const totalStaked = currentStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalRewards = currentStakes.reduce((sum, stake) => sum + stake.rewards, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Staking {tokenInfo?.symbol || "TOKEN"}
          </h2>
          <p className="text-gray-400">Stakez vos tokens et gagnez des récompenses</p>
        </div>
        <Badge variant="outline" className="text-purple-400 border-purple-400">
          <Zap className="h-3 w-3 mr-1" />
          Polygon Network
        </Badge>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Lock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Staké</p>
              <p className="text-white font-bold">
                <AnimatedNumber value={totalStaked} /> {tokenInfo?.symbol}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Récompenses</p>
              <p className="text-white font-bold">
                {totalRewards.toFixed(2)} {tokenInfo?.symbol}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">APY Max</p>
              <p className="text-white font-bold">35%</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Votre Balance</p>
              <p className="text-white font-bold">
                {formatBalance(balance)} {tokenInfo?.symbol}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Interface de staking */}
        <GlassCard className="p-6">
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('stake')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'stake' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Staker
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'unstake' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                Unstaker
              </button>
            </div>

            {activeTab === 'stake' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Sélectionner un pool
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {stakingOptions.map((option) => (
                      <button
                        key={option.duration}
                        onClick={() => setSelectedOption(option)}
                        className={`p-3 rounded-lg border text-left ${
                          selectedOption.duration === option.duration
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">
                            {option.icon} {option.name}
                          </span>
                          <span className="text-green-400 text-sm font-bold">
                            {option.apy}% APY
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs">
                          {option.duration} jours • Min: {option.minAmount} {tokenInfo?.symbol}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Montant à staker
                  </label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder={`Min: ${selectedOption.minAmount}`}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  />
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Récompenses estimées</span>
                    <span className="text-green-400 font-semibold">
                      +{calculateRewards().toFixed(2)} {tokenInfo?.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Durée</span>
                    <span className="text-white">{selectedOption.duration} jours</span>
                  </div>
                </div>

                <GradientButton 
                  className="w-full"
                  disabled={!stakeAmount || parseFloat(stakeAmount) < selectedOption.minAmount}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Staker {stakeAmount} {tokenInfo?.symbol}
                </GradientButton>
              </div>
            )}

            {activeTab === 'unstake' && (
              <div className="space-y-4">
                <p className="text-gray-400">Sélectionnez un stake à unstaker :</p>
                {currentStakes.map((stake, index) => (
                  <div key={index} className="border border-white/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-semibold">
                          {stake.amount} {tokenInfo?.symbol}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {stake.apy}% APY • {stake.daysLeft} jours restants
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">
                          +{stake.rewards} {tokenInfo?.symbol}
                        </p>
                        <p className="text-gray-400 text-sm">Récompenses</p>
                      </div>
                    </div>
                    <Progress 
                      value={(stake.duration - stake.daysLeft) / stake.duration * 100} 
                      className="mb-3"
                    />
                    <GradientButton 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Unlock className="h-4 w-4 mr-2" />
                      Unstaker {stake.daysLeft > 0 ? '(Pénalité)' : ''}
                    </GradientButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>

        {/* Historique et statistiques */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Vos Stakes Actifs</h3>
          <div className="space-y-4">
            {currentStakes.map((stake, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    {stake.amount} {tokenInfo?.symbol}
                  </span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {stake.apy}% APY
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progression</span>
                    <span className="text-white">
                      {((stake.duration - stake.daysLeft) / stake.duration * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={(stake.duration - stake.daysLeft) / stake.duration * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Jours restants</span>
                    <span className="text-white">{stake.daysLeft}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Récompenses actuelles</span>
                    <span className="text-green-400 font-semibold">
                      +{stake.rewards} {tokenInfo?.symbol}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
