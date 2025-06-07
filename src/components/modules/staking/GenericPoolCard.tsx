
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";
import { Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { texts } from "@/lib/constants/texts";

interface Pool {
  id: number;
  name: string;
  token: string;
  apy: number;
  tvl: number;
  minStake: number;
  lockPeriod: number;
  icon: string;
}

interface GenericPoolCardProps {
  pool: Pool;
}

export const GenericPoolCard = ({ pool }: GenericPoolCardProps) => {
  const isMobile = useIsMobile();

  return (
    <GlassCard className="p-4 md:p-6 hover:scale-[1.02] transition-all duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-lg md:text-2xl">
              {pool.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm md:text-base">{pool.name}</h3>
              <p className="text-gray-400 text-xs md:text-sm">{pool.token}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
            {pool.apy}% {texts.financial.apy}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-400">{texts.staking.info.tvl}</span>
            <span className="text-white">${(pool.tvl / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-400">{texts.staking.info.minStake}</span>
            <span className="text-white">{pool.minStake} {pool.token}</span>
          </div>
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-gray-400">{texts.staking.info.lockPeriod}</span>
            <span className="text-white">{pool.lockPeriod === 0 ? texts.staking.info.flexible : `${pool.lockPeriod} jours`}</span>
          </div>
        </div>

        <GradientButton className="w-full" variant="outline" size={isMobile ? "default" : "sm"}>
          <Lock className="h-4 w-4 mr-2" />
          {texts.staking.actions.stake} {pool.token}
        </GradientButton>
      </div>
    </GlassCard>
  );
};
