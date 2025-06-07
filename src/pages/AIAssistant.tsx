import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react";

const recommendations = [
  {
    id: 1,
    type: "opportunity",
    title: "Opportunité Yield Farming",
    description: "Nouveau pool MATIC/USDC avec 15.2% APY détecté",
    confidence: 85,
    category: "DeFi",
    priority: "high"
  },
  {
    id: 2,
    type: "risk",
    title: "Alerte de Risque",
    description: "Votre exposition ETH dépasse 60% du portfolio",
    confidence: 92,
    category: "Risk Management",
    priority: "medium"
  },
  {
    id: 3,
    type: "insight",
    title: "Analyse de Marché",
    description: "Tendance haussière détectée sur les tokens DeFi",
    confidence: 78,
    category: "Market Analysis",
    priority: "low"
  }
];

export default function AIAssistant() {
  return (
    <PageLayout
      title="Assistant IA"
      subtitle="Recommandations intelligentes et analyses automatisées"
    >
      <div className="space-y-6">
        {/* AI Chat Interface */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-400" />
              Chat avec l'Assistant IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 min-h-[300px] flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-700 rounded-lg p-3 max-w-md">
                    <p className="text-white">
                      Bonjour ! Je suis votre assistant IA pour l'analyse DeFi. 
                      Comment puis-je vous aider aujourd'hui ?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4 border-t border-slate-600">
                <Input 
                  placeholder="Posez votre question..." 
                  className="bg-slate-800 border-slate-600 text-white"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-400" />
              Recommandations IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      rec.type === 'opportunity' ? 'bg-green-600' :
                      rec.type === 'risk' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {rec.type === 'opportunity' ? <TrendingUp className="h-4 w-4" /> :
                       rec.type === 'risk' ? <AlertTriangle className="h-4 w-4" /> :
                       <Lightbulb className="h-4 w-4" />}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{rec.title}</h3>
                        <Badge variant="outline" className={`text-xs ${
                          rec.priority === 'high' ? 'border-red-400 text-red-400' :
                          rec.priority === 'medium' ? 'border-yellow-400 text-yellow-400' :
                          'border-blue-400 text-blue-400'
                        }`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300">{rec.description}</p>
                      
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{rec.category}</Badge>
                        <span className="text-sm text-gray-400">
                          Confiance: {rec.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    Voir Détails
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Analyse Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Score de Diversification</span>
                <Badge variant="outline" className="text-green-400">Bon (7.5/10)</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Exposition au Risque</span>
                <Badge variant="outline" className="text-yellow-400">Moyen</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Optimisation Yield</span>
                <Badge variant="outline" className="text-blue-400">Améliorable</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Prédictions Marché</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">ETH (24h)</span>
                <Badge variant="outline" className="text-green-400">↗ Haussier</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">DeFi Tokens</span>
                <Badge variant="outline" className="text-green-400">↗ Positif</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Volatilité</span>
                <Badge variant="outline" className="text-yellow-400">Modérée</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
