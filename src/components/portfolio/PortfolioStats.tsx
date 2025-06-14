
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, Eye } from "lucide-react";

export const PortfolioStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">Valeur Totale</p>
              <p className="text-2xl font-bold text-white">$12,450.32</p>
              <p className="text-green-400 text-sm">+5.2% (24h)</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">Profit/Perte</p>
              <p className="text-2xl font-bold text-white">+$2,450.32</p>
              <p className="text-blue-400 text-sm">+24.5% Total</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">Veegox Holdings</p>
              <p className="text-2xl font-bold text-white">125,000</p>
              <p className="text-purple-400 text-sm">45% du portfolio</p>
            </div>
            <Target className="h-8 w-8 text-purple-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm">Tokens Détenus</p>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-orange-400 text-sm">Diversifié</p>
            </div>
            <Eye className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
