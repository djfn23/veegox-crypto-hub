
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Sprout, 
  Plus, 
  Harvest, 
  TrendingUp, 
  DollarSign,
  Clock,
  Target,
  Zap
} from "lucide-react";

const farms = [
  {
    id: 1,
    pair: 'VEEGOX/USDC',
    apy: '125.4%',
    tvl: '$1,245,000',
    earned: '$24.50',
    staked: '$500.00',
    dailyRewards: '5.2 VEEGOX',
    endDate: '30 jours restants',
    status: 'Active'
  },
  {
    id: 2,
    pair: 'ETH/USDC',
    apy: '45.8%',
    tvl: '$5,670,000',
    earned: '$0.00',
    staked: '$0.00',
    dailyRewards: '0.15 ETH',
    endDate: '45 jours restants',
    status: 'Available'
  },
  {
    id: 3,
    pair: 'VEEGOX/ETH',
    apy: '89.2%',
    tvl: '$890,000',
    earned: '$12.30',
    staked: '$300.00',
    dailyRewards: '3.8 VEEGOX',
    endDate: '15 jours restants',
    status: 'Active'
  }
];

const YieldFarming = () => {
  return (
    <PageLayout
      title="Yield Farming"
      subtitle="Maximisez vos rendements avec nos pools de farming"
      icon={<Sprout className="h-6 w-6 text-green-400" />}
      actions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Harvest className="h-4 w-4 mr-2" />
            Récolter Tout
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Farm
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Staké</p>
                  <p className="text-2xl font-bold text-white">$800</p>
                  <p className="text-green-400 text-sm">2 farms actifs</p>
                </div>
                <Sprout className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Récompenses</p>
                  <p className="text-2xl font-bold text-white">$36.80</p>
                  <p className="text-yellow-400 text-sm">À récolter</p>
                </div>
                <Harvest className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">APY Moyen</p>
                  <p className="text-2xl font-bold text-white">107.3%</p>
                  <p className="text-purple-400 text-sm">Farms actifs</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Revenus Quotidiens</p>
                  <p className="text-2xl font-bold text-white">$2.35</p>
                  <p className="text-blue-400 text-sm">Estimation</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farm a New Pool */}
        <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-400" />
              Démarrer un Nouveau Farm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Pool de Liquidité</Label>
                <Button variant="outline" className="w-full mt-2 border-green-500/30 text-green-300 hover:bg-green-500/10">
                  Sélectionner une Pool
                </Button>
              </div>
              <div>
                <Label className="text-gray-300">Montant à Staker</Label>
                <Input 
                  placeholder="0.0" 
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Zap className="h-4 w-4 mr-2" />
              Démarrer le Farm
            </Button>
          </CardContent>
        </Card>

        {/* Active Farms */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pools de Farming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farms.map((farm) => (
                <div key={farm.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Sprout className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{farm.pair}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="secondary" 
                            className={farm.status === 'Active' ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}
                          >
                            {farm.status}
                          </Badge>
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                            <Clock className="h-3 w-3 mr-1" />
                            {farm.endDate}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center lg:text-left">
                      <div>
                        <p className="text-gray-400 text-sm">APY</p>
                        <p className="text-green-400 font-bold text-lg">{farm.apy}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">TVL</p>
                        <p className="text-white font-medium">{farm.tvl}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Mes Gains</p>
                        <p className="text-yellow-400 font-medium">{farm.earned}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Staké</p>
                        <p className="text-white font-medium">{farm.staked}</p>
                      </div>
                      <div className="flex gap-2">
                        {farm.status === 'Active' ? (
                          <>
                            <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10">
                              <Harvest className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                            <Plus className="h-3 w-3 mr-1" />
                            Farm
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {farm.status === 'Active' && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Récompenses Quotidiennes</p>
                          <p className="text-green-400 font-medium">{farm.dailyRewards}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Prochain Harvest</p>
                          <p className="text-white">Dans 2h 15m</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Auto-Compound</p>
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                            Activé
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-400">Boost Actif</p>
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                            1.5x
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default YieldFarming;
