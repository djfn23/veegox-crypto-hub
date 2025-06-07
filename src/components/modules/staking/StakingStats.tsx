
import { GlassCard } from "@/components/ui/glass-card";
import { DollarSign, Trophy, TrendingUp, Lock } from "lucide-react";
import { texts } from "@/lib/constants/texts";

interface StakingStatsProps {
  totalStakedValue: number;
  totalRewards: number;
  activeStakes: number;
}

export const StakingStats = ({ totalStakedValue, totalRewards, activeStakes }: StakingStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
      <GlassCard className="p-3 md:p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{texts.staking.stats.totalStaked}</p>
            <p className="text-white font-bold text-sm md:text-base">${totalStakedValue.toLocaleString()}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-3 md:p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Trophy className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{texts.staking.stats.rewards}</p>
            <p className="text-white font-bold text-sm md:text-base">${totalRewards.toFixed(2)}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-3 md:p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{texts.staking.stats.averageApy}</p>
            <p className="text-white font-bold text-sm md:text-base">12.8%</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-3 md:p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Lock className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs md:text-sm">{texts.staking.stats.activePools}</p>
            <p className="text-white font-bold text-sm md:text-base">{activeStakes}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
