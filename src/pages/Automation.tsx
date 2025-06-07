
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Zap, 
  Bot, 
  TrendingUp, 
  DollarSign,
  Target,
  Play,
  Pause,
  Settings,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

const strategies = [
  {
    id: 1,
    name: "DCA Veegox",
    description: "Achat automatique de Veegox chaque semaine",
    type: "DCA",
    status: "active",
    totalInvested: "$1,250",
    profit: "+$185.50",
    profitPercent: "+14.8%",
    frequency: "Hebdomadaire",
    nextExecution: "Dans 2 jours"
  },
  {
    id: 2,
    name: "Stop Loss ETH",
    description: "Vendre ETH si le prix chute de 15%",
    type: "Stop Loss",
    status: "paused",
    totalInvested: "$2,000",
    profit: "-$50.00",
    profitPercent: "-2.5%",
    frequency: "Conditionnel",
    nextExecution: "En attente"
  },
  {
    id: 3,
    name: "Rebalancing Portfolio",
    description: "Rééquilibrage automatique du portfolio",
    type: "Rebalancing",
    status: "active",
    totalInvested: "$5,000",
    profit: "+$420.75",
    profitPercent: "+8.4%",
    frequency: "Mensuel",
    nextExecution: "Dans 12 jours"
  }
];

const Automation = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <PageLayout
      title="Automation de Trading"
      subtitle="Automatisez vos stratégies d'investissement avec des règles intelligentes"
      icon={<Zap className="h-6 w-6 text-yellow-400" />}
      actions={
        <div className="flex gap-3">
          <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">
            BETA
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-yellow-600 to-orange-600"
            onClick={() => setIsCreating(!isCreating)}
          >
            <Bot className="h-4 w-4 mr-2" />
            Nouvelle Stratégie
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Stratégies Actives</p>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-yellow-400 text-sm">sur 3 total</p>
                </div>
                <Bot className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Profit Total</p>
                  <p className="text-2xl font-bold text-white">+$606.25</p>
                  <p className="text-green-400 text-sm">+9.7% global</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Capital Automatisé</p>
                  <p className="text-2xl font-bold text-white">$8,250</p>
                  <p className="text-blue-400 text-sm">65% du portfolio</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Exécutions</p>
                  <p className="text-2xl font-bold text-white">47</p>
                  <p className="text-purple-400 text-sm">Ce mois</p>
                </div>
                <Activity className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Strategy Form */}
        {isCreating && (
          <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-yellow-400" />
                Créer une Nouvelle Stratégie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Type de Stratégie</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button variant="outline" className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10">
                        DCA
                      </Button>
                      <Button variant="outline" className="border-gray-500/30 text-gray-400">
                        Stop Loss
                      </Button>
                      <Button variant="outline" className="border-gray-500/30 text-gray-400">
                        Grid Trading
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">Token à Trader</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                        VEEGOX
                      </Button>
                      <Input 
                        placeholder="Montant"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">Fréquence</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                        Quotidien
                      </Button>
                      <Button variant="outline" className="border-gray-500/30 text-gray-400">
                        Hebdomadaire
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Montant par Exécution</Label>
                    <Input 
                      placeholder="100 USDC"
                      className="bg-white/5 border-white/10 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Budget Total</Label>
                    <Input 
                      placeholder="5000 USDC"
                      className="bg-white/5 border-white/10 text-white mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Démarrage Automatique</Label>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-yellow-400" />
                  <span className="text-white font-medium">Estimation</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Coût par exécution</span>
                    <p className="text-white font-medium">~$0.50</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Durée estimée</span>
                    <p className="text-white font-medium">50 semaines</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Tokens acquis</span>
                    <p className="text-white font-medium">~2,222,222 VEEGOX</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Créer Stratégie
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Strategies */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Mes Stratégies d'Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <div key={strategy.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        strategy.status === 'active' ? 'bg-green-600/20' : 'bg-gray-600/20'
                      }`}>
                        {strategy.status === 'active' ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <Pause className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold text-lg">{strategy.name}</h3>
                          <Badge 
                            variant="secondary" 
                            className={`${
                              strategy.type === 'DCA' ? 'bg-blue-600/20 text-blue-300' :
                              strategy.type === 'Stop Loss' ? 'bg-red-600/20 text-red-300' :
                              'bg-purple-600/20 text-purple-300'
                            }`}
                          >
                            {strategy.type}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={strategy.status === 'active' ? 'border-green-500/30 text-green-300' : 'border-gray-500/30 text-gray-300'}
                          >
                            {strategy.status === 'active' ? 'Actif' : 'En pause'}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{strategy.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center lg:text-left">
                      <div>
                        <p className="text-gray-400 text-sm">Investi</p>
                        <p className="text-white font-medium">{strategy.totalInvested}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Profit</p>
                        <p className={`font-medium ${strategy.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {strategy.profit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Rendement</p>
                        <p className={`font-medium ${strategy.profitPercent.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {strategy.profitPercent}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Prochaine Exéc.</p>
                        <p className="text-white font-medium text-sm">{strategy.nextExecution}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={strategy.status === 'active' ? 'border-red-500/30 text-red-300 hover:bg-red-500/10' : 'border-green-500/30 text-green-300 hover:bg-green-500/10'}
                        >
                          {strategy.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-500/30 text-gray-300 hover:bg-gray-500/10">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Warning Banner */}
        <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Fonctionnalité en Version Bêta</h4>
                <p className="text-gray-300 text-sm">
                  L'automation de trading est actuellement en phase de test. Utilisez cette fonctionnalité avec prudence et ne jamais investir plus que ce que vous pouvez vous permettre de perdre. Les performances passées ne garantissent pas les résultats futurs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Automation;
