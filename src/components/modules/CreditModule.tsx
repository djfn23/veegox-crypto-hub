
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Calculator,
  Clock,
  CheckCircle,
  Wallet
} from "lucide-react";

const CreditModule = () => {
  const [loanData, setLoanData] = useState({
    collateral_token_address: "",
    collateral_amount: "",
    loan_token_address: "",
    loan_amount: "",
    duration: "30"
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [isRecalculating, setIsRecalculating] = useState(false);

  const queryClient = useQueryClient();

  // Obtenir le score de crédit actuel
  const { data: creditScore, isLoading: isLoadingScore } = useQuery({
    queryKey: ['credit-score'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      return data;
    },
  });

  // Obtenir les prêts de l'utilisateur
  const { data: loans } = useQuery({
    queryKey: ['user-loans'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('borrower_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Obtenir le portefeuille principal de l'utilisateur
  const { data: userWallet } = useQuery({
    queryKey: ['user-primary-wallet'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_primary', true)
        .maybeSingle();

      return data;
    },
  });

  // Mutation pour calculer/recalculer le score de crédit
  const calculateScoreMutation = useMutation({
    mutationFn: async (address) => {
      setIsRecalculating(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Utilisateur non connecté");

        // 1. Récupérer les données blockchain via notre Edge Function
        const response = await fetch("https://zjsfulbimcvoaqflfbir.supabase.co/functions/v1/web3Integration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            action: "getCreditScoreData",
            params: [address, 1] // Utiliser la chaîne Ethereum (chainId: 1) par défaut
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors de la récupération des données blockchain");
        }

        const blockchainData = await response.json();

        // 2. Calculer le score via l'Edge Function de calcul de score
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

  const calculateLTV = () => {
    const collateralValue = parseFloat(loanData.collateral_amount) * 2000; // Prix fictif ETH
    const loanValue = parseFloat(loanData.loan_amount) * 1; // Prix fictif USDC
    
    if (collateralValue && loanValue) {
      return (loanValue / collateralValue) * 100;
    }
    return 0;
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-500";
    if (score >= 650) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Bon";
    if (score >= 500) return "Moyen";
    return "Faible";
  };

  const loanMutation = useMutation({
    mutationFn: async (loanData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const ltv = calculateLTV();
      const interestRate = creditScore?.score ? Math.max(5, 15 - (creditScore.score / 100)) : 12;

      const { data, error } = await supabase
        .from('loans')
        .insert({
          borrower_id: user.id,
          collateral_token_address: loanData.collateral_token_address,
          collateral_amount: parseFloat(loanData.collateral_amount),
          loan_token_address: loanData.loan_token_address,
          loan_amount: parseFloat(loanData.loan_amount),
          interest_rate: interestRate,
          ltv_ratio: ltv,
          liquidation_threshold: 75,
          chain_id: 1,
          due_date: new Date(Date.now() + parseInt(loanData.duration) * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-loans'] });
      toast.success("Demande de prêt soumise avec succès !");
      setLoanData({
        collateral_token_address: "",
        collateral_amount: "",
        loan_token_address: "",
        loan_amount: "",
        duration: "30"
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la demande de prêt");
    },
  });

  const statusColors = {
    pending: "bg-yellow-500",
    active: "bg-green-500",
    repaid: "bg-blue-500",
    defaulted: "bg-red-500"
  };

  const statusLabels = {
    pending: "En attente",
    active: "Actif",
    repaid: "Remboursé",
    defaulted: "Défaut"
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Crédit</h2>
        <p className="text-gray-400">Prêts décentralisés avec scoring de crédit intelligent</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Credit Score */}
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

        {/* Loan Calculator */}
        <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Simulateur de Prêt
            </CardTitle>
            <CardDescription className="text-gray-400">
              Calculez vos conditions de prêt en temps réel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Token de Garantie</Label>
                <Select 
                  value={loanData.collateral_token_address} 
                  onValueChange={(value) => setLoanData({...loanData, collateral_token_address: value})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x...eth">ETH - Ethereum</SelectItem>
                    <SelectItem value="0x...btc">WBTC - Bitcoin</SelectItem>
                    <SelectItem value="0x...matic">MATIC - Polygon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Montant de Garantie</Label>
                <Input
                  type="number"
                  placeholder="0.5"
                  value={loanData.collateral_amount}
                  onChange={(e) => setLoanData({...loanData, collateral_amount: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Token de Prêt</Label>
                <Select 
                  value={loanData.loan_token_address} 
                  onValueChange={(value) => setLoanData({...loanData, loan_token_address: value})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x...usdc">USDC - USD Coin</SelectItem>
                    <SelectItem value="0x...usdt">USDT - Tether</SelectItem>
                    <SelectItem value="0x...dai">DAI - MakerDAO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Montant à Emprunter</Label>
                <Input
                  type="number"
                  placeholder="500"
                  value={loanData.loan_amount}
                  onChange={(e) => setLoanData({...loanData, loan_amount: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            {loanData.collateral_amount && loanData.loan_amount && (
              <Card className="bg-slate-800/50 border-slate-600">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{calculateLTV().toFixed(1)}%</div>
                      <div className="text-xs text-gray-400">LTV Ratio</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {creditScore?.score ? Math.max(5, 15 - (creditScore.score / 100)).toFixed(1) : "12.0"}%
                      </div>
                      <div className="text-xs text-gray-400">Taux d'Intérêt</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">75%</div>
                      <div className="text-xs text-gray-400">Seuil de Liquidation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => loanMutation.mutate(loanData)}
              disabled={!loanData.collateral_amount || !loanData.loan_amount || loanMutation.isPending}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            >
              {loanMutation.isPending ? "Soumission..." : "Demander le Prêt"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Mes Prêts</CardTitle>
        </CardHeader>
        <CardContent>
          {loans && loans.length > 0 ? (
            <div className="space-y-4">
              {loans.map((loan) => (
                <Card key={loan.id} className="bg-slate-800/50 border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={`${statusColors[loan.status as keyof typeof statusColors]} text-white`}>
                          {statusLabels[loan.status as keyof typeof statusLabels]}
                        </Badge>
                        <span className="text-white font-medium">
                          {Number(loan.loan_amount)} USDC
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{loan.interest_rate}% APR</div>
                        <div className="text-xs text-gray-400">
                          LTV: {loan.ltv_ratio}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Garantie</div>
                        <div className="text-white">{Number(loan.collateral_amount)} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Échéance</div>
                        <div className="text-white">
                          {loan.due_date ? new Date(loan.due_date).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400">Remboursé</div>
                        <div className="text-white">
                          {Number(loan.repaid_amount || 0)} / {Number(loan.loan_amount)}
                        </div>
                      </div>
                    </div>

                    {loan.status === 'active' && (
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Rembourser
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                          Ajouter Garantie
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-white mb-2">Aucun prêt actif</h3>
              <p className="text-gray-400">Commencez par simuler votre premier prêt</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditModule;
