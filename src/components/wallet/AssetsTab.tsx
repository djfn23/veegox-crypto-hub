
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Upload, Download } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  color: string;
}

interface AssetsTabProps {
  assets: Asset[];
}

const AssetsTab = ({ assets }: AssetsTabProps) => {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Mes Actifs</h3>
        <div className="flex space-x-2">
          <GradientButton variant="ghost" size="sm">
            <Upload className="h-4 w-4" />
            Déposer
          </GradientButton>
          <GradientButton variant="ghost" size="sm">
            <Download className="h-4 w-4" />
            Retirer
          </GradientButton>
        </div>
      </div>
      
      <div className="space-y-4">
        {assets.map((asset) => (
          <GlassCard key={asset.symbol} className="p-4 hover:scale-[1.01] transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${asset.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">{asset.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{asset.name}</div>
                  <div className="text-gray-400 text-sm">{asset.balance} {asset.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold text-lg">
                  <AnimatedNumber value={asset.value} prefix="$" />
                </div>
                <div className={`text-sm font-medium ${
                  asset.changeType === 'positive' ? 'text-green-400' : 
                  asset.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {asset.change}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassCard>
  );
};

export { AssetsTab };
