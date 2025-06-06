
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Shield } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreditScore, Wallet } from "./types";
import { getScoreColor, getScoreLabel } from "./utils";

interface CreditScoreCardProps {
  creditScore: CreditScore | null;
  userWallet: Wallet | null;
  isLoadingScore: boolean;
}

const CreditScoreCard = ({ creditScore, userWallet, isLoadingScore }: CreditScoreCardProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isRecalculating, setIsRecalculating] = useState(false);
  const queryClient = useQueryClient();

  const calculateScoreMutation = useMutation({
    mutationFn: async (address: string) => {
      setIsRecalculating(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Utilisateur non connecté");

        const response = await fetch("https://zjsfulbimcvoaqflfbir.supabase.co/functions/v1/web3Integration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            action: "getCreditScoreData",
            params: [address, 1]
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la récupération des données blockchain");
        }

        const calculateResponse = await fetch("https://zjsfulbimcvoaqflfbir.supabase.co/functions/v1/calculateCreditScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            user_id: user.id,
            wallet_address: address
          })
        });

        if (!calculateResponse.ok) {
          const errorData = await calculateResponse.json();
          throw new Error(errorData.error || "Erreur lors du calcul du score");
        }

        const scoreData = await calculateResponse.json();
        return scoreData.result;
      } finally {
        setIsRecalculating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-score'] });
      toast.success("Score de crédit calculé avec succès");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du calcul du score");
    }
  });

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Score de Crédit
        </CardTitle>
      </CardHeader>
      <CardContent>
        {creditScore ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(creditScore.score || 0)}`}>
                {creditScore.score}
              </div>
              <div className="text-gray-400 text-sm">
                {getScoreLabel(creditScore.score || 0)}
              </div>
            </div>
            <Progress 
              value={(creditScore.score || 0) / 10} 
              className="h-2"
            />
            <div className="text-xs text-gray-400 mt-2">
              Dernière mise à jour: {new Date(creditScore.last_calculated || '').toLocaleDateString()}
            </div>

            {creditScore.factors && (
              <div className="mt-4 space-y-3">
                <div className="text-sm font-medium text-white">Facteurs de score</div>
                {Object.entries(creditScore.factors as Record<string, any>).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {key === 'transaction_count' ? 'Transactions' : 
                       key === 'wallet_age_days' ? 'Âge du portefeuille (jours)' : 
                       key === 'balance_stability' ? 'Stabilité du solde' : 
                       key === 'defi_activity' ? 'Activité DeFi' : 
                       key === 'loan_history' ? 'Historique de prêt' : 
                       key}
                    </span>
                    <span className="text-xs text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <Button 
                size="sm" 
                variant="outline" 
                disabled={isRecalculating}
                onClick={() => userWallet && calculateScoreMutation.mutate(userWallet.address)}
                className="w-full border-slate-600 text-white hover:bg-slate-800"
              >
                {isRecalculating ? "Calcul en cours..." : "Recalculer mon score"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400 mb-4">Score non calculé</p>
            
            {userWallet ? (
              <div className="space-y-4">
                <div className="text-xs text-gray-400">
                  Votre portefeuille principal: 
                  <span className="text-white block mt-1 truncate">
                    {userWallet.address}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  disabled={isRecalculating}
                  onClick={() => calculateScoreMutation.mutate(userWallet.address)}
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  {isRecalculating ? "Calcul en cours..." : "Calculer mon score"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Adresse de portefeuille"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isRecalculating || !walletAddress.startsWith('0x')}
                    onClick={() => calculateScoreMutation.mutate(walletAddress)}
                    className="border-slate-600 text-white hover:bg-slate-800"
                  >
                    {isRecalculating ? "..." : "Calculer"}
                  </Button>
                </div>
                <div className="text-xs text-gray-400">
                  Connectez un portefeuille dans vos paramètres pour le définir comme principal
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditScoreCard;
