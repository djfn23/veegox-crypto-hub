
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Mic, Paperclip } from "lucide-react";

const AIAssistant = () => {
  return (
    <PageLayout
      title="Assistant IA"
      subtitle="Votre assistant intelligent pour la DeFi"
      icon={<Bot className="h-6 w-6" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-slate-900/50 border-slate-700 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-400" />
              Assistant IA DeFi
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-lg max-w-xs">
                  <p className="text-white">Bonjour ! Je suis votre assistant IA pour la DeFi. Comment puis-je vous aider aujourd'hui ?</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-purple-600 p-3 rounded-lg max-w-xs">
                  <p className="text-white">Peux-tu m'expliquer le yield farming ?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-lg max-w-xs">
                  <p className="text-white">Le yield farming est une stratégie DeFi qui consiste à prêter ou à staker des cryptomonnaies pour générer des rendements...</p>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Tapez votre message..."
                className="flex-1 bg-slate-800 border-slate-600 text-white"
              />
              <Button size="sm" variant="outline" className="text-white border-white/20">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Analyser mon portfolio",
                "Stratégies de staking recommandées",
                "Opportunités de yield farming",
                "Risques des protocoles DeFi"
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10 text-left justify-start"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
