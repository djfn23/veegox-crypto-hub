
import { TabsContent } from "@/components/ui/tabs";
import { ERC20StakingPool } from "./staking/ERC20StakingPool";
import { StakingHeader } from "./staking/StakingHeader";
import { StakingStats } from "./staking/StakingStats";
import { StakingTabs } from "./staking/StakingTabs";
import { GenericPoolCard } from "./staking/GenericPoolCard";
import { MyStakeCard } from "./staking/MyStakeCard";

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
    <div className="space-y-4 md:space-y-6 px-4 lg:px-0">
      <StakingHeader />

      <StakingStats 
        totalStakedValue={totalStakedValue}
        totalRewards={totalRewards}
        activeStakes={myStakes.length}
      />

      <StakingTabs defaultValue="erc20-staking">
        <TabsContent value="erc20-staking" className="mt-4 md:mt-6">
          <ERC20StakingPool />
        </TabsContent>

        <TabsContent value="pools" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {genericPools.map((pool) => (
              <GenericPoolCard key={pool.id} pool={pool} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-stakes" className="mt-4 md:mt-6">
          <div className="space-y-4">
            {myStakes.map((stake, index) => (
              <MyStakeCard key={index} stake={stake} />
            ))}
          </div>
        </TabsContent>
      </StakingTabs>
    </div>
  );
};

export default StakingModule;
