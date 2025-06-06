
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, Trophy, DollarSign, TrendingUp, Coins } from "lucide-react";
import { ERC20StakingPool } from "./staking/ERC20StakingPool";

const StakingModule = () => {
  // Données simulées pour les pools génériques
  const genericPools = [
    {
      id: 1,
      name: "ETH Pool",
      token: "ETH",
      apy: 8.5,
      tvl: 45000000,
      minStake: 0.1,
      lockPeriod: 0,
      icon: "⟠"
    },
    {
      id: 2,
      name: "MATIC Pool",
      token: "MATIC",
      apy: 15.2,
      tvl: 12000000,
      minStake: 100,
      lockPeriod: 30,
      icon: "⬟"
    },
    {
      id: 3,
      name: "USDC Pool",
      token: "USDC",
      apy: 6.8,
      tvl: 78000000,
      minStake: 100,
      lockPeriod: 0,
      icon: "💲"
    }
  ];

  const myStakes = [
    { pool: "ETH Pool", amount: 2.5, value: 6250, apy: 8.5, rewards: 0.125 },
    { pool: "MATIC Pool", amount: 5000, value: 4500, apy: 15.2, rewards: 187.5 }
  ];

  const totalStakedValue = myStakes.reduce((sum, stake) => sum + stake.value, 0);
  const totalRewards = myStakes.reduce((sum, stake) => sum + stake.rewards, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Staking</h2>
        <p className="text-gray-400">Stakez vos tokens et gagnez des récompenses passives</p>
        <div className="mt-2 text-sm text-purple-400">
          💎 Incluant notre token ERC20Template avec des APY préférentiels
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Staké</p>
              <p className="text-white font-bold">${totalStakedValue.toLocaleString()}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Récompenses</p>
              <p className="text-white font-bold">${totalRewards.toFixed(2)}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">APY Moyen</p>
              <p className="text-white font-bold">12.8%</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Lock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pools Actifs</p>
              <p className="text-white font-bold">{myStakes.length}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <Tabs defaultValue="erc20-staking" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          <TabsTrigger value="erc20-staking" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Coins className="h-4 w-4 mr-2" />
            Notre Token
          </TabsTrigger>
          <TabsTrigger value="pools" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Lock className="h-4 w-4 mr-2" />
            Pools Génériques
          </TabsTrigger>
          <TabsTrigger value="my-stakes" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Trophy className="h-4 w-4 mr-2" />
            Mes Stakes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="erc20-staking" className="mt-6">
          <ERC20StakingPool />
        </TabsContent>

        <TabsContent value="pools" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genericPools.map((pool) => (
              <GlassCard key={pool.id} className="p-6 hover:scale-[1.02] transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                        {pool.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{pool.name}</h3>
                        <p className="text-gray-400 text-sm">{pool.token}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {pool.apy}% APY
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">TVL</span>
                      <span className="text-white">${(pool.tvl / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Min Stake</span>
                      <span className="text-white">{pool.minStake} {pool.token}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lock Period</span>
                      <span className="text-white">{pool.lockPeriod === 0 ? 'Flexible' : `${pool.lockPeriod} jours`}</span>
                    </div>
                  </div>

                  <GradientButton className="w-full" variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Staker {pool.token}
                  </GradientButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-stakes" className="mt-6">
          <div className="space-y-4">
            {myStakes.map((stake, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{stake.pool}</h3>
                      <p className="text-gray-400">{stake.amount} tokens • ${stake.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">+${stake.rewards}</p>
                    <p className="text-gray-400 text-sm">{stake.apy}% APY</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <GradientButton variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Restaker
                  </GradientButton>
                  <GradientButton variant="outline" size="sm">
                    <Unlock className="h-4 w-4 mr-2" />
                    Unstaker
                  </GradientButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StakingModule;
