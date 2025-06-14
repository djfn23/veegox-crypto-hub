
import { useMainContractInfo, useUserContractBalance } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { ERC20StakingHeader } from "./ERC20StakingHeader";
import { ERC20StakingStats } from "./ERC20StakingStats";
import { ERC20StakingForm } from "./ERC20StakingForm";
import { ERC20ActiveStakes } from "./ERC20ActiveStakes";

export const ERC20StakingPool = () => {
  console.log('ERC20StakingPool: Component mounting');

  const { connectedWallet } = useWeb3Wallet();
  const { data: contractInfo, error: contractError } = useMainContractInfo();
  const { data: userBalance, error: balanceError } = useUserContractBalance(connectedWallet?.address || null);

  console.log('ERC20StakingPool: Contract data:', contractInfo);
  console.log('ERC20StakingPool: User balance data:', userBalance);

  if (contractError) {
    console.error('ERC20StakingPool: Contract error:', contractError);
  }

  if (balanceError) {
    console.error('ERC20StakingPool: Balance error:', balanceError);
  }

  // Accès sécurisé aux données via result
  const tokenInfo = contractInfo?.result?.tokenInfo;
  const balance = userBalance?.result || "0";
  
  const formatBalance = (balance: string) => {
    if (!balance) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  // Simulation de données de staking actuel
  const currentStakes = [
    { amount: 1000, duration: 90, apy: 18, daysLeft: 45, rewards: 22.5 },
    { amount: 2500, duration: 180, apy: 25, daysLeft: 120, rewards: 187.5 }
  ];

  const totalStaked = currentStakes.reduce((sum, stake) => sum + stake.amount, 0);
  const totalRewards = currentStakes.reduce((sum, stake) => sum + stake.rewards, 0);

  return (
    <div className="space-y-6">
      <ERC20StakingHeader tokenSymbol={tokenInfo?.symbol} />

      <ERC20StakingStats 
        totalStaked={totalStaked}
        totalRewards={totalRewards}
        balance={formatBalance(balance)}
        tokenSymbol={tokenInfo?.symbol}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <ERC20StakingForm 
          tokenSymbol={tokenInfo?.symbol}
          currentStakes={currentStakes}
        />

        <ERC20ActiveStakes 
          stakes={currentStakes}
          tokenSymbol={tokenInfo?.symbol}
        />
      </div>
    </div>
  );
};
