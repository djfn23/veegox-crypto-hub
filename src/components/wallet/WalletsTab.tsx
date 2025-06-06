
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Plus } from "lucide-react";

interface WalletData {
  id: string;
  name: string;
  balance: string;
  usdValue: number;
  connected: boolean;
  icon: string;
}

interface WalletsTabProps {
  wallets: WalletData[];
}

const WalletsTab = ({ wallets }: WalletsTabProps) => {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Gestion des Portefeuilles</h3>
        <GradientButton variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Nouveau Wallet
        </GradientButton>
      </div>
      
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <GlassCard key={wallet.id} className="p-4 hover:scale-[1.01] transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">{wallet.icon}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{wallet.name}</div>
                  <div className="text-gray-400 text-sm">{wallet.balance}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white font-semibold">
                    <AnimatedNumber value={wallet.usdValue} prefix="$" />
                  </div>
                  <Badge 
                    variant={wallet.connected ? "default" : "secondary"}
                    className={wallet.connected ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                  >
                    {wallet.connected ? "Connecté" : "Déconnecté"}
                  </Badge>
                </div>
                <GradientButton 
                  variant={wallet.connected ? "outline" : "primary"}
                  size="sm"
                >
                  {wallet.connected ? "Déconnecter" : "Connecter"}
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </GlassCard>
  );
};

export { WalletsTab };
