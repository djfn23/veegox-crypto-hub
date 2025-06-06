
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  DollarSign, 
  Gift,
  Lock,
  Unlock,
  AlertCircle
} from "lucide-react";

const StakingModule = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: pools } = useQuery({
    queryKey: ['staking-pools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staking_pools')
        .select('*')
        .eq('is_active', true)
        .order('apy_rate', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: userStakes } = useQuery({
    queryKey: ['user-stakes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_stakes')
        .select(`
          *,
          staking_pools (*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
  });

  const stakeMutation = useMutation({
    mutationFn: async ({ poolId, amount }: { poolId: string; amount: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const pool = pools?.find(p => p.id === poolId);
      if (!pool) throw new Error("Pool introuvable");

      const stakeAmount = parseFloat(amount);
      if (pool.min_stake_amount && stakeAmount < pool.min_stake_amount) {
        throw new Error(`Montant minimum: ${pool.min_stake_amount}`);
      }

      const unlockDate = pool.lock_period_days 
        ? new Date(Date.now() + pool.lock_period_days * 24 * 60 * 60 * 1000)
        : null;

      const { data, error } = await supabase
        .from('user_stakes')
        .insert({
          user_id: user.id,
          pool_id: poolId,
          amount: stakeAmount,
          unlock_at: unlockDate?.toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
      queryClient.invalidateQueries({ queryKey: ['staking-pools'] });
      toast.success("Staking effectué avec succès !");
      setStakeAmount("");
      setSelectedPool(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du staking");
    },
  });

  const unstakeMutation = useMutation({
    mutationFn: async (stakeId: string) => {
      const { error } = await supabase
        .from('user_stakes')
        .update({ is_active: false })
        .eq('id', stakeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
      toast.success("Unstaking effectué avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de l'unstaking");
    },
  });

  const claimRewardsMutation = useMutation({
    mutationFn: async (stakeId: string) => {
      // Simulation du claim de rewards
      const { error } = await supabase
        .from('user_stakes')
        .update({ 
          last_reward_claim: new Date().toISOString(),
          rewards_earned: 0 
        })
        .eq('id', stakeId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-stakes'] });
      toast.success("Rewards réclamés avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors du claim");
    },
  });

  const calculateRewards = (stake: any) => {
    if (!stake.staked_at || !stake.staking_pools) return 0;
    
    const now = new Date();
    const stakedAt = new Date(stake.staked_at);
    const daysDiff = (now.getTime() - stakedAt.getTime()) / (1000 * 3600 * 24);
    const yearlyRewards = (stake.amount * stake.staking_pools.apy_rate) / 100;
    
    return (yearlyRewards * daysDiff) / 365;
  };

  const getPoolRiskLevel = (apy: number) => {
    if (apy > 50) return { level: "Haut", color: "bg-red-500" };
    if (apy > 20) return { level: "Moyen", color: "bg-yellow-500" };
    return { level: "Faible", color: "bg-green-500" };
  };

  const isUnlocked = (unlockDate: string | null) => {
    if (!unlockDate) return true;
    return new Date() > new Date(unlockDate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Staking</h2>
        <p className="text-gray-400">Gagnez des récompenses en stakant vos tokens</p>
      </div>

      {/* Portfolio Summary */}
      {userStakes && userStakes.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Staké</p>
                  <p className="text-2xl font-bold text-white">
                    ${userStakes.reduce((acc, stake) => acc + Number(stake.amount), 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Rewards Non Réclamés</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${userStakes.reduce((acc, stake) => acc + calculateRewards(stake), 0).toFixed(2)}
                  </p>
                </div>
                <Gift className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">APY Moyen</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {userStakes.length > 0 
                      ? (userStakes.reduce((acc, stake) => acc + stake.staking_pools.apy_rate, 0) / userStakes.length).toFixed(1)
                      : 0}%
                  </p>
                </div>
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Available Pools */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Pools de Staking Disponibles</CardTitle>
            <CardDescription className="text-gray-400">
              Sélectionnez un pool pour commencer à staker
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pools && pools.length > 0 ? (
              pools.map((pool) => {
                const risk = getPoolRiskLevel(pool.apy_rate);
                const utilizationRate = pool.max_capacity 
                  ? ((pool.total_staked || 0) / pool.max_capacity) * 100 
                  : 0;

                return (
                  <Card 
                    key={pool.id} 
                    className={`cursor-pointer transition-all ${
                      selectedPool === pool.id 
                        ? "bg-purple-500/20 border-purple-500" 
                        : "bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
                    }`}
                    onClick={() => setSelectedPool(pool.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{pool.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${risk.color} text-white`}>
                            {risk.level}
                          </Badge>
                          <span className="text-2xl font-bold text-green-500">
                            {pool.apy_rate}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>TVL:</span>
                          <span className="text-white">
                            ${Number(pool.total_staked || 0).toLocaleString()}
                          </span>
                        </div>
                        {pool.min_stake_amount && (
                          <div className="flex justify-between text-gray-400">
                            <span>Minimum:</span>
                            <span className="text-white">
                              {Number(pool.min_stake_amount)} tokens
                            </span>
                          </div>
                        )}
                        {pool.lock_period_days && (
                          <div className="flex justify-between text-gray-400">
                            <span>Période de lock:</span>
                            <span className="text-white">
                              {pool.lock_period_days} jours
                            </span>
                          </div>
                        )}
                        {pool.max_capacity && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-gray-400">
                              <span>Utilisation:</span>
                              <span className="text-white">{utilizationRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={utilizationRate} className="h-1" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Aucun pool disponible pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stake Form */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Staker des Tokens</CardTitle>
            <CardDescription className="text-gray-400">
              {selectedPool ? "Entrez le montant à staker" : "Sélectionnez d'abord un pool"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPool ? (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Montant à Staker</Label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>

                {stakeAmount && (
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Montant à staker:</span>
                          <span className="text-white">{stakeAmount} tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">APY:</span>
                          <span className="text-green-500">
                            {pools?.find(p => p.id === selectedPool)?.apy_rate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rewards estimés (30j):</span>
                          <span className="text-white">
                            {(parseFloat(stakeAmount || "0") * 
                              (pools?.find(p => p.id === selectedPool)?.apy_rate || 0) / 100 * 30 / 365
                            ).toFixed(2)} tokens
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={() => stakeMutation.mutate({ poolId: selectedPool, amount: stakeAmount })}
                  disabled={!stakeAmount || stakeMutation.isPending}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {stakeMutation.isPending ? "Staking..." : "Staker"}
                </Button>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">Sélectionnez un pool pour continuer</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Stakes */}
      {userStakes && userStakes.length > 0 && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Mes Stakes Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userStakes.map((stake) => {
                const rewards = calculateRewards(stake);
                const unlocked = isUnlocked(stake.unlock_at);

                return (
                  <Card key={stake.id} className="bg-slate-800/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium">
                            {stake.staking_pools.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Staké le {new Date(stake.staked_at || '').toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {Number(stake.amount)} tokens
                          </div>
                          <div className="text-sm text-green-500">
                            {stake.staking_pools.apy_rate}% APY
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-400">Rewards Gagnés</div>
                          <div className="text-green-500 font-medium">
                            {rewards.toFixed(4)} tokens
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Statut</div>
                          <div className="flex items-center space-x-1">
                            {unlocked ? (
                              <Unlock className="h-3 w-3 text-green-500" />
                            ) : (
                              <Lock className="h-3 w-3 text-orange-500" />
                            )}
                            <span className={unlocked ? "text-green-500" : "text-orange-500"}>
                              {unlocked ? "Débloqué" : "Verrouillé"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Unlock Date</div>
                          <div className="text-white">
                            {stake.unlock_at 
                              ? new Date(stake.unlock_at).toLocaleDateString()
                              : "Aucune"
                            }
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => claimRewardsMutation.mutate(stake.id)}
                          disabled={rewards < 0.001 || claimRewardsMutation.isPending}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Réclamer Rewards
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => unstakeMutation.mutate(stake.id)}
                          disabled={!unlocked || unstakeMutation.isPending}
                          className="border-slate-600 text-white hover:bg-slate-700"
                        >
                          {unlocked ? "Unstake" : "Locked"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StakingModule;
