import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, Shield, Star, AlertCircle } from "lucide-react";

export default function Credit() {
  return (
    <PageLayout
      title="Score de Crédit DeFi"
      subtitle="Votre réputation et score de crédit dans l'écosystème DeFi"
    >
      <div className="space-y-6">
        {/* Credit Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Score de Crédit DeFi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-white">750</div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    Excellent
                  </Badge>
                  <Progress value={75} className="w-full" />
                  <p className="text-gray-300 text-sm">
                    Votre score vous place dans le top 15% des utilisateurs DeFi
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Facteurs de Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Historique Transactions</span>
                <Badge variant="outline" className="text-green-400">+85</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Liquidations Évitées</span>
                <Badge variant="outline" className="text-green-400">+120</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Diversification</span>
                <Badge variant="outline" className="text-blue-400">+65</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Ancienneté</span>
                <Badge variant="outline" className="text-purple-400">+45</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-white font-semibold">Taux Préférentiels</h3>
                  <p className="text-gray-400 text-sm">Jusqu'à -2% sur les emprunts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-white font-semibold">Limites Augmentées</h3>
                  <p className="text-gray-400 text-sm">Crédit jusqu'à $50k</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-purple-400" />
                <div>
                  <h3 className="text-white font-semibold">Accès VIP</h3>
                  <p className="text-gray-400 text-sm">Produits exclusifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit History */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Historique de Crédit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2024-01-15", action: "Remboursement à temps", impact: "+10", type: "positive" },
                { date: "2024-01-10", action: "Diversification portfolio", impact: "+5", type: "positive" },
                { date: "2024-01-05", action: "Première transaction", impact: "+15", type: "positive" },
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${entry.type === 'positive' ? 'bg-green-400' : 'bg-red-400'}`} />
                    <div>
                      <p className="text-white">{entry.action}</p>
                      <p className="text-gray-400 text-sm">{entry.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={entry.type === 'positive' ? 'text-green-400' : 'text-red-400'}>
                    {entry.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recommandations pour Améliorer votre Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
              <h4 className="text-white font-medium mb-2">Augmentez votre activité</h4>
              <p className="text-gray-300 text-sm mb-3">
                Effectuez plus de transactions pour démontrer votre engagement dans l'écosystème DeFi
              </p>
              <Button size="sm" variant="outline">
                Voir les opportunités
              </Button>
            </div>
            
            <div className="p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
              <h4 className="text-white font-medium mb-2">Diversifiez votre portfolio</h4>
              <p className="text-gray-300 text-sm mb-3">
                Investissez dans différents protocoles pour réduire les risques
              </p>
              <Button size="sm" variant="outline">
                Explorer les options
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
