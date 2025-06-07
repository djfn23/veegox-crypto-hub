
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Lock, TrendingUp, Unlock } from "lucide-react";
import { texts } from "@/lib/constants/texts";

interface Stake {
  pool: string;
  amount: number;
  value: number;
  apy: number;
  rewards: number;
}

interface MyStakeCardProps {
  stake: Stake;
}

export const MyStakeCard = ({ stake }: MyStakeCardProps) => {
  return (
    <GlassCard className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Lock className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm md:text-base">{stake.pool}</h3>
            <p className="text-gray-400 text-xs md:text-sm">{stake.amount} tokens • ${stake.value.toLocaleString()}</p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-green-400 font-semibold text-sm md:text-base">+${stake.rewards}</p>
          <p className="text-gray-400 text-xs md:text-sm">{stake.apy}% {texts.financial.apy}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <GradientButton variant="outline" size="sm" className="flex-1">
          <TrendingUp className="h-4 w-4 mr-2" />
          {texts.staking.actions.restake}
        </GradientButton>
        <GradientButton variant="outline" size="sm" className="flex-1">
          <Unlock className="h-4 w-4 mr-2" />
          {texts.staking.actions.unstake}
        </GradientButton>
      </div>
    </GlassCard>
  );
};
