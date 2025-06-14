
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Zap, Shield, Target } from 'lucide-react';
import { YieldFarmingService } from '@/services/yieldFarmingService';
import { useDeFiStore } from '@/store/modules/defiStore';
import { AnimatedCard, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animated-components';

export const YieldFarmingWidget = () => {
  const { yieldPools, setYieldPools, setLoading } = useDeFiStore();
  const [strategies, setStrategies] = useState<any[]>([]);

  useEffect(() => {
    loadYieldData();
  }, []);

  const loadYieldData = async () => {
    setLoading('pools', true);
    try {
      const [pools, strategies] = await Promise.all([
        YieldFarmingService.getYieldPools(),
        YieldFarmingService.getYieldStrategies(),
      ]);
      setYieldPools(pools);
      setStrategies(strategies);
    } catch (error) {
      console.error('Error loading yield data:', error);
    } finally {
      setLoading('pools', false);
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Shield className="h-4 w-4 text-green-400" />;
      case 'medium': return <Target className="h-4 w-4 text-yellow-400" />;
      case 'high': return <Zap className="h-4 w-4 text-red-400" />;
      default: return null;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  return (
    <AnimatedCard variant="glass" className="h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Yield Farming
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="pools" className="text-white">Pools</TabsTrigger>
            <TabsTrigger value="strategies" className="text-white">Stratégies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pools" className="space-y-4">
            <StaggerContainer className="space-y-3">
              {yieldPools.slice(0, 3).map((pool, index) => (
                <StaggerItem key={pool.id}>
                  <FadeIn delay={index * 0.1}>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{pool.name}</h4>
                          <p className="text-gray-400 text-sm">{pool.protocol}</p>
                        </div>
                        <Badge className={getRiskColor(pool.riskLevel)}>
                          {getRiskIcon(pool.riskLevel)}
                          {pool.riskLevel}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-green-400 font-bold">
                          {pool.apy.toFixed(1)}% APY
                        </div>
                        <div className="text-gray-400 text-sm">
                          TVL: ${(pool.tvl / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
              Voir Tous les Pools
            </Button>
          </TabsContent>
          
          <TabsContent value="strategies" className="space-y-4">
            <StaggerContainer className="space-y-3">
              {strategies.map((strategy, index) => (
                <StaggerItem key={strategy.id}>
                  <FadeIn delay={index * 0.1}>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{strategy.name}</h4>
                          <p className="text-gray-400 text-xs">{strategy.description}</p>
                        </div>
                        <Badge className={getRiskColor(strategy.risk)}>
                          {getRiskIcon(strategy.risk)}
                          {strategy.risk}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-green-400 font-bold">
                          {strategy.apy.toFixed(1)}% APY
                        </div>
                        <div className="text-gray-400 text-sm">
                          Min: ${strategy.minDeposit}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Optimiser Portefeuille
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </AnimatedCard>
  );
};
