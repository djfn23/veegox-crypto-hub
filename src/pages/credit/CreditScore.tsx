
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Award, AlertCircle } from "lucide-react";

const CreditScore = () => {
  const creditScore = 750;
  const scoreLevel = creditScore >= 700 ? "Excellent" : creditScore >= 600 ? "Bon" : "Moyen";
  const scoreColor = creditScore >= 700 ? "text-green-400" : creditScore >= 600 ? "text-blue-400" : "text-yellow-400";

  return (
    <PageLayout
      title="Score de Crédit"
      subtitle="Consultez et améliorez votre score de crédit DeFi"
      icon={<Award className="h-6 w-6" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Score principal */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Votre Score de Crédit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${scoreColor} mb-2`}>{creditScore}</div>
              <Badge className="bg-green-600">{scoreLevel}</Badge>
              <p className="text-gray-400 mt-2">Score basé sur vos activités DeFi</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progression</span>
                <span className="text-white">{creditScore}/850</span>
              </div>
              <Progress value={(creditScore / 850) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Facteurs du score */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Facteurs Positifs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { factor: "Historique de remboursement", impact: "Élevé", score: 95 },
                { factor: "Diversification du portefeuille", impact: "Moyen", score: 80 },
                { factor: "Ancienneté du compte", impact: "Moyen", score: 75 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.factor}</div>
                    <div className="text-gray-400 text-sm">Impact {item.impact}</div>
                  </div>
                  <div className="text-green-400 font-medium">{item.score}%</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Améliorations Possibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { suggestion: "Augmenter la fréquence des transactions", potential: "+15" },
                { suggestion: "Participer au staking", potential: "+10" },
                { suggestion: "Utiliser plus de protocoles DeFi", potential: "+20" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{item.suggestion}</div>
                    <div className="text-gray-400 text-sm">Recommandé</div>
                  </div>
                  <div className="text-blue-400 font-medium">{item.potential}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Historique */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution du Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Janvier 2024", score: 720, change: "+20" },
                { date: "Décembre 2023", score: 700, change: "+15" },
                { date: "Novembre 2023", score: 685, change: "+5" }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400">{entry.date}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-white">{entry.score}</span>
                    <span className="text-green-400 text-sm">{entry.change}</span>
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

export default CreditScore;
