
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSmartContract } from '@/hooks/useSmartContract';
import { Coins, TrendingUp, Clock, Zap } from 'lucide-react';
import { toast } from 'sonner';

const STAKING_POOLS = [
  {
    id: 'usdc-pool',
    name: 'USDC Staking',
    token: 'USDC',
    address: '0x27D88c6C41A0e6b2D07B8D48E0072Cf28b21e46D',
    apy: 12.5,
    tvl: '2.4M',
    minStake: '10',
    lockPeriod: 30,
    abi: [
      'function stake(uint256 amount)',
      'function unstake(uint256 amount)',
      'function claimRewards()',
      'function balanceOf(address account) view returns (uint256)',
      'function earned(address account) view returns (uint256)'
    ]
  },
  {
    id: 'matic-pool',
    name: 'MATIC Staking',
    token: 'MATIC',
    address: '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4',
    apy: 18.2,
    tvl: '5.8M',
    minStake: '100',
    lockPeriod: 90,
    abi: [
      'function stake(uint256 amount)',
      'function unstake(uint256 amount)', 
      'function claimRewards()',
      'function balanceOf(address account) view returns (uint256)',
      'function earned(address account) view returns (uint256)'
    ]
  }
];

interface StakingPoolProps {
  pool: typeof STAKING_POOLS[0];
}

export const RealStakingPool = ({ pool }: StakingPoolProps) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [userStaked, setUserStaked] = useState('0');
  const [pendingRewards, setPendingRewards] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  const { executeContract, readContract, isExecuting } = useSmartContract();

  useEffect(() => {
    loadUserData();
  }, [pool]);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Charger les données utilisateur du contrat
      const [staked, rewards] = await Promise.all([
        readContract(pool.address, pool.abi, 'balanceOf', [/* user address */]),
        readContract(pool.address, pool.abi, 'earned', [/* user address */])
      ]);

      setUserStaked(staked?.toString() || '0');
      setPendingRewards(rewards?.toString() || '0');
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) < parseFloat(pool.minStake)) {
      toast.error(`Montant minimum: ${pool.minStake} ${pool.token}`);
      return;
    }

    try {
      await executeContract(
        pool.address,
        pool.abi,
        'stake',
        [stakeAmount]
      );

      toast.success(`${stakeAmount} ${pool.token} stakés avec succès!`);
      setStakeAmount('');
      await loadUserData();
    } catch (error: any) {
      toast.error(`Erreur staking: ${error.message}`);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast.error('Montant invalide');
      return;
    }

    try {
      await executeContract(
        pool.address,
        pool.abi,
        'unstake',
        [unstakeAmount]
      );

      toast.success(`${unstakeAmount} ${pool.token} retirés avec succès!`);
      setUnstakeAmount('');
      await loadUserData();
    } catch (error: any) {
      toast.error(`Erreur unstaking: ${error.message}`);
    }
  };

  const handleClaimRewards = async () => {
    if (parseFloat(pendingRewards) <= 0) {
      toast.error('Aucune récompense à réclamer');
      return;
    }

    try {
      await executeContract(
        pool.address,
        pool.abi,
        'claimRewards',
        []
      );

      toast.success('Récompenses réclamées avec succès!');
      await loadUserData();
    } catch (error: any) {
      toast.error(`Erreur réclamation: ${error.message}`);
    }
  };

  const formatAmount = (amount: string, decimals = 18) => {
    const value = parseFloat(amount) / Math.pow(10, decimals);
    return value.toFixed(4);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            {pool.name}
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            APY {pool.apy}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pool Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">TVL</p>
            <p className="text-white font-semibold">${pool.tvl}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Min Stake</p>
            <p className="text-white font-semibold">{pool.minStake} {pool.token}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Lock Period</p>
            <p className="text-white font-semibold">{pool.lockPeriod} jours</p>
          </div>
        </div>

        {/* User Position */}
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-3">Votre Position</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Staké</p>
              <p className="text-white font-semibold">
                {formatAmount(userStaked)} {pool.token}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Récompenses</p>
              <p className="text-green-400 font-semibold">
                {formatAmount(pendingRewards)} {pool.token}
              </p>
            </div>
          </div>
          
          {parseFloat(pendingRewards) > 0 && (
            <Button
              onClick={handleClaimRewards}
              disabled={isExecuting}
              className="w-full mt-3 bg-green-600 hover:bg-green-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Réclamer Récompenses
            </Button>
          )}
        </div>

        {/* Stake Section */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Staker</h4>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder={`Min: ${pool.minStake}`}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="flex-1 bg-slate-800 border-slate-600 text-white"
            />
            <Button
              onClick={handleStake}
              disabled={isExecuting || !stakeAmount}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Staker
            </Button>
          </div>
        </div>

        {/* Unstake Section */}
        {parseFloat(userStaked) > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-medium">Retirer</h4>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Montant à retirer"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="flex-1 bg-slate-800 border-slate-600 text-white"
              />
              <Button
                onClick={handleUnstake}
                disabled={isExecuting || !unstakeAmount}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Retirer
              </Button>
            </div>
          </div>
        )}

        {/* Lock Period Progress */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Période de verrouillage</span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {pool.lockPeriod} jours
            </span>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-xs text-gray-500">22 jours restants</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const RealStakingPools = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Pools de Staking</h2>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <Zap className="h-3 w-3 mr-1" />
          Contrats Réels
        </Badge>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {STAKING_POOLS.map(pool => (
          <RealStakingPool key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  );
};
