
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Shield, Clock } from "lucide-react";

const CreditScore = () => {
  return (
    <PageLayout
      title="Score de Crédit Détaillé"
      subtitle="Analyse complète de votre solvabilité blockchain"
      icon={<Star className="h-6 w-6 text-yellow-400" />}
    >
      <div className="space-y-6">
        {/* Credit Score Overview */}
        <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">Score de Crédit</h3>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-yellow-400">850</span>
                  <Badge className="bg-green-600">Excellent</Badge>
                </div>
                <p className="text-gray-300 text-sm mt-2">Évolution: +25 points ce mois</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-4 border-yellow-400 flex items-center justify-center mb-2">
                  <span className="text-yellow-400 text-lg font-bold">85%</span>
                </div>
                <p className="text-gray-300 text-sm">Percentile</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Facteurs de Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Historique de Paiement</span>
                    <span className="text-white font-bold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <p className="text-gray-400 text-xs mt-1">Impact: Très Important</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Ancienneté du Compte</span>
                    <span className="text-white font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-gray-400 text-xs mt-1">Impact: Important</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Diversité des Actifs</span>
                    <span className="text-white font-bold">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  <p className="text-gray-400 text-xs mt-1">Impact: Modéré</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Volume de Transactions</span>
                    <span className="text-white font-bold">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                  <p className="text-gray-400 text-xs mt-1">Impact: Modéré</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Améliorer votre Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="text-green-300 font-medium">Maintenez un historique parfait</h4>
                    <p className="text-gray-400 text-sm">Continuez à rembourser vos prêts à temps</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="text-blue-300 font-medium">Diversifiez vos actifs</h4>
                    <p className="text-gray-400 text-sm">Détenez différents types de cryptomonnaies</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-900/20 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-purple-300 font-medium">Augmentez votre ancienneté</h4>
                    <p className="text-gray-400 text-sm">Le temps améliore naturellement votre score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Score History */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Évolution du Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Graphique d'Évolution</h3>
                <p className="text-gray-400">Le graphique détaillé sera disponible prochainement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CreditScore;
