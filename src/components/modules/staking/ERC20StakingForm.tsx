
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock } from "lucide-react";

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

interface ERC20StakingFormProps {
  tokenSymbol?: string;
  currentStakes: Array<{
    amount: number;
    duration: number;
    apy: number;
    daysLeft: number;
    rewards: number;
  }>;
}

export const ERC20StakingForm = ({ tokenSymbol, currentStakes }: ERC20StakingFormProps) => {
  const [selectedOption, setSelectedOption] = useState<StakingOption>(stakingOptions[0]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const calculateRewards = () => {
    if (!stakeAmount || !selectedOption) return 0;
    const amount = parseFloat(stakeAmount);
    const dailyRate = selectedOption.apy / 365 / 100;
    return amount * dailyRate * selectedOption.duration;
  };

  return (
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
                      {option.duration} jours • Min: {option.minAmount} {tokenSymbol}
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
                  +{calculateRewards().toFixed(2)} {tokenSymbol}
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
              Staker {stakeAmount} {tokenSymbol}
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
                      {stake.amount} {tokenSymbol}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {stake.apy}% APY • {stake.daysLeft} jours restants
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">
                      +{stake.rewards} {tokenSymbol}
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
  );
};
