
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Shield, Brain, TrendingUp } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreditScore, Wallet } from "./types";
import { getScoreColor, getScoreLabel } from "./utils";
import { useCreditScoreData } from "@/hooks/useWalletData";

interface CreditScoreCardProps {
  creditScore: CreditScore | null;
  userWallet: Wallet | null;
  isLoadingScore: boolean;
}

const CreditScoreCard = ({ creditScore, userWallet, isLoadingScore }: CreditScoreCardProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isRecalculating, setIsRecalculating] = useState(false);
  const queryClient = useQueryClient();

  // Utiliser les vraies données Alchemy pour le calcul du score
  const { data: walletData } = useCreditScoreData(
    userWallet?.address || null,
    userWallet ? 1 : undefined
  );

  const calculateScoreMutation = useMutation({
    mutationFn: async (address: string) => {
      setIsRecalculating(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Utilisateur non connecté");

        // Utiliser les vraies données blockchain via Alchemy
        const response = await supabase.functions.invoke('web3Integration', {
          body: {
            action: "getCreditScoreData",
            params: [address, 1]
          }
        });

        if (response.error) {
          throw new Error(response.error.message || "Erreur lors de la récupération des données blockchain");
        }

        const calculateResponse = await supabase.functions.invoke('calculateCreditScore', {
          body: {
            user_id: user.id,
            wallet_address: address,
            blockchain_data: response.data.result
          }
        });

        if (calculateResponse.error) {
          throw new Error(calculateResponse.error.message || "Erreur lors du calcul du score");
        }

        return calculateResponse.data.result;
      } finally {
        setIsRecalculating(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-score'] });
      toast.success("Score de crédit calculé avec succès avec les données blockchain réelles!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du calcul du score");
    }
  });

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <div className="flex items-center mr-2">
            <Shield className="h-5 w-5 mr-1" />
            <Brain className="h-4 w-4 text-purple-400" />
          </div>
          Score de Crédit IA
        </CardTitle>
        <div className="text-xs text-purple-400 flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          Avantage concurrentiel vs scoring traditionnel
        </div>
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
              <div className="text-xs text-purple-400 mt-1">
                🤖 Optimisé par IA vs méthodes traditionnelles
              </div>
            </div>
            <Progress 
              value={(creditScore.score || 0) / 10} 
              className="h-2"
            />
            <div className="text-xs text-gray-400 mt-2">
              Dernière mise à jour: {new Date(creditScore.last_calculated || '').toLocaleDateString()}
            </div>

            {walletData?.result && (
              <div className="mt-4 space-y-3">
                <div className="text-sm font-medium text-white flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-400" />
                  Analyse IA Avancée (Données Alchemy)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Solde ETH:</span>
                    <span className="text-white">{walletData.result.balance?.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Âge (jours):</span>
                    <span className="text-white">{walletData.result.walletAgeDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transactions:</span>
                    <span className="text-white">{walletData.result.transactionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contacts uniques:</span>
                    <span className="text-white">{walletData.result.uniqueContacts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume total:</span>
                    <span className="text-white">{walletData.result.totalValue?.toFixed(2)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Activité 30j:</span>
                    <span className="text-white">{walletData.result.lastMonthActivityCount}</span>
                  </div>
                </div>
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
                {isRecalculating ? "Calcul IA en cours..." : "Recalculer avec données Alchemy"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-gray-400" />
                <Brain className="h-6 w-6 text-purple-400 absolute -top-1 -right-1" />
              </div>
            </div>
            <p className="text-gray-400 mb-2">Score IA non calculé</p>
            <p className="text-xs text-purple-400 mb-4">
              🚀 Technologie exclusive : Scoring par IA vs concurrents traditionnels
            </p>
            
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
                  {isRecalculating ? "Analyse IA..." : "Lancer l'analyse IA avec Alchemy"}
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
                    {isRecalculating ? "IA..." : "Analyser"}
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
