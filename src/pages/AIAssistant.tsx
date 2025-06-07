
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Sparkles, 
  TrendingUp, 
  MessageCircle,
  Lightbulb,
  Target,
  Zap
} from "lucide-react";
import { useState } from "react";

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  
  const quickActions = [
    { label: "Analyser mon portfolio", icon: TrendingUp, color: "bg-green-600" },
    { label: "Opportunités DeFi", icon: Target, color: "bg-blue-600" },
    { label: "Stratégie de yield", icon: Sparkles, color: "bg-purple-600" },
    { label: "Risques actuels", icon: Lightbulb, color: "bg-orange-600" }
  ];

  const chatHistory = [
    {
      type: "ai",
      message: "Bonjour ! Je suis votre assistant IA pour l'écosystème Veegox. Comment puis-je vous aider aujourd'hui ?",
      time: "Il y a 2 minutes"
    },
    {
      type: "user", 
      message: "Peux-tu analyser mes positions actuelles ?",
      time: "Il y a 2 minutes"
    },
    {
      type: "ai",
      message: "Bien sûr ! J'ai analysé votre portfolio. Vous avez actuellement :\n\n• 125,000 VEEGOX tokens stakés (APR: 45%)\n• $2,500 en pools de liquidité\n• $1,200 emprunté en ETH\n\nVotre ratio de santé est excellent à 2.8. Je recommande de diversifier davantage vos positions DeFi.",
      time: "Il y a 1 minute"
    }
  ];

  return (
    <PageLayout
      title="Assistant IA"
      subtitle="Votre conseiller intelligent pour l'écosystème DeFi"
      icon={<Bot className="h-6 w-6 text-purple-400" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/50 border-slate-700 h-96">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-80">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/10 text-gray-100'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{chat.message}</p>
                      <p className="text-xs opacity-70 mt-1">{chat.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Tapez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && setMessage("")}
                />
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white text-sm text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div className="space-y-6">
          {/* AI Status */}
          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">IA Veegox</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">En ligne</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Insights du Marché
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Opportunité</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Les pools VEEGOX/USDC offrent actuellement un APY exceptionnel de 125%.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Recommandation</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Considérez diversifier 20% de vos holdings en stablecoins.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-400 font-medium">Alerte</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Volatilité élevée prévue cette semaine. Surveillez vos positions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Fonctionnalités IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Analyse de Portfolio", status: "Actif", color: "text-green-400" },
                { name: "Prédictions de Prix", status: "Actif", color: "text-green-400" },
                { name: "Optimisation DeFi", status: "Actif", color: "text-green-400" },
                { name: "Alertes Risques", status: "Actif", color: "text-green-400" },
                { name: "Recommandations", status: "Beta", color: "text-yellow-400" }
              ].map((feature, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{feature.name}</span>
                  <Badge variant="secondary" className={`${feature.color} bg-white/10`}>
                    {feature.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Paramètres IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Mode Analyse Avancée
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Personnaliser les Alertes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="h-4 w-4 mr-2" />
                Historique des Conseils
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
