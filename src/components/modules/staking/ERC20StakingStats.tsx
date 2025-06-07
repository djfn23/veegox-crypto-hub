
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Lock, Trophy, Zap, Calendar } from "lucide-react";

interface ERC20StakingStatsProps {
  totalStaked: number;
  totalRewards: number;
  balance: string;
  tokenSymbol?: string;
}

export const ERC20StakingStats = ({ 
  totalStaked, 
  totalRewards, 
  balance, 
  tokenSymbol 
}: ERC20StakingStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <GlassCard className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Lock className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Staké</p>
            <p className="text-white font-bold">
              <AnimatedNumber value={totalStaked} /> {tokenSymbol}
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
              {totalRewards.toFixed(2)} {tokenSymbol}
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
              {balance} {tokenSymbol}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
