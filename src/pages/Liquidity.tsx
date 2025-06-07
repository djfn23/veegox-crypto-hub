
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Droplets, 
  Plus, 
  Minus, 
  TrendingUp, 
  DollarSign,
  Percent,
  Target,
  Zap
} from "lucide-react";

const liquidityPools = [
  {
    id: 1,
    pair: 'VEEGOX/USDC',
    apr: '45.2%',
    tvl: '$124,500',
    volume24h: '$45,200',
    myLiquidity: '$2,500',
    fees: '$12.50',
    tokens: ['VEEGOX', 'USDC'],
    status: 'Active'
  },
  {
    id: 2,
    pair: 'ETH/USDC',
    apr: '12.8%',
    tvl: '$2,450,000',
    volume24h: '$156,000',
    myLiquidity: '$0',
    fees: '$0',
    tokens: ['ETH', 'USDC'],
    status: 'Available'
  },
  {
    id: 3,
    pair: 'VEEGOX/ETH',
    apr: '67.5%',
    tvl: '$89,200',
    volume24h: '$23,100',
    myLiquidity: '$1,200',
    fees: '$8.20',
    tokens: ['VEEGOX', 'ETH'],
    status: 'Active'
  }
];

const Liquidity = () => {
  return (
    <PageLayout
      title="Liquidity Mining"
      subtitle="Fournissez de la liquidité et gagnez des récompenses"
      icon={<Droplets className="h-6 w-6 text-blue-400" />}
      actions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Calculateur APR
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Liquidité
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Liquidité</p>
                  <p className="text-2xl font-bold text-white">$3,700</p>
                  <p className="text-blue-400 text-sm">3 pools actives</p>
                </div>
                <Droplets className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Revenus Totaux</p>
                  <p className="text-2xl font-bold text-white">$20.70</p>
                  <p className="text-green-400 text-sm">Cette semaine</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">APR Moyen</p>
                  <p className="text-2xl font-bold text-white">51.2%</p>
                  <p className="text-purple-400 text-sm">Pools actives</p>
                </div>
                <Percent className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Volume 24h</p>
                  <p className="text-2xl font-bold text-white">$224K</p>
                  <p className="text-orange-400 text-sm">Toutes pools</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Liquidity Form */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-purple-400" />
              Ajouter de la Liquidité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Premier Token</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                      VEEGOX
                    </Button>
                    <Input 
                      placeholder="0.0" 
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Balance: 125,000 VEEGOX</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Deuxième Token</Label>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                      USDC
                    </Button>
                    <Input 
                      placeholder="0.0" 
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Balance: 1,867 USDC</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Prix par token</span>
                <span className="text-white">1 VEEGOX = 0.0045 USDC</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Part de pool</span>
                <span className="text-white">0.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">APR estimé</span>
                <span className="text-green-400 font-bold">45.2%</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Zap className="h-4 w-4 mr-2" />
              Ajouter Liquidité
            </Button>
          </CardContent>
        </Card>

        {/* Liquidity Pools */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pools de Liquidité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityPools.map((pool) => (
                <div key={pool.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {pool.tokens.map((token, index) => (
                          <div 
                            key={index}
                            className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${
                              token === 'VEEGOX' ? 'bg-purple-600' : 
                              token === 'USDC' ? 'bg-green-600' : 'bg-blue-600'
                            }`}
                          >
                            {token.slice(0, 2)}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{pool.pair}</h3>
                        <Badge 
                          variant="secondary" 
                          className={pool.status === 'Active' ? 'bg-green-600/20 text-green-300' : 'bg-gray-600/20 text-gray-300'}
                        >
                          {pool.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center lg:text-left">
                      <div>
                        <p className="text-gray-400 text-sm">APR</p>
                        <p className="text-green-400 font-bold text-lg">{pool.apr}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">TVL</p>
                        <p className="text-white font-medium">{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Volume 24h</p>
                        <p className="text-white font-medium">{pool.volume24h}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Ma Liquidité</p>
                        <p className="text-white font-medium">{pool.myLiquidity}</p>
                      </div>
                      <div className="flex gap-2">
                        {pool.status === 'Active' ? (
                          <>
                            <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                            <Plus className="h-3 w-3 mr-1" />
                            Ajouter
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Liquidity;
