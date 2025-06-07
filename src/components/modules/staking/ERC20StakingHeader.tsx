
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface ERC20StakingHeaderProps {
  tokenSymbol?: string;
}

export const ERC20StakingHeader = ({ tokenSymbol }: ERC20StakingHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Staking {tokenSymbol || "TOKEN"}
        </h2>
        <p className="text-gray-400">Stakez vos tokens et gagnez des récompenses</p>
      </div>
      <Badge variant="outline" className="text-purple-400 border-purple-400">
        <Zap className="h-3 w-3 mr-1" />
        Polygon Network
      </Badge>
    </div>
  );
};
