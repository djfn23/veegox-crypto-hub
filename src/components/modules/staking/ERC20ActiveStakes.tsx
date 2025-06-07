
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ActiveStake {
  amount: number;
  duration: number;
  apy: number;
  daysLeft: number;
  rewards: number;
}

interface ERC20ActiveStakesProps {
  stakes: ActiveStake[];
  tokenSymbol?: string;
}

export const ERC20ActiveStakes = ({ stakes, tokenSymbol }: ERC20ActiveStakesProps) => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Vos Stakes Actifs</h3>
      <div className="space-y-4">
        {stakes.map((stake, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">
                {stake.amount} {tokenSymbol}
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
                  +{stake.rewards} {tokenSymbol}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
