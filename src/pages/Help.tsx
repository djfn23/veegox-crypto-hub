
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, MessageCircle, BookOpen, Phone, Mail } from "lucide-react";

const Help = () => {
  return (
    <PageLayout
      title="Centre d'Aide"
      subtitle="Trouvez des réponses à vos questions"
      icon={<HelpCircle className="h-6 w-6" />}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Barre de recherche */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher dans l'aide..."
                className="flex-1 bg-slate-800 border-slate-600 text-white"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Catégories d'aide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Guide de démarrage", desc: "Apprenez les bases de Veegox" },
            { icon: MessageCircle, title: "FAQ", desc: "Questions fréquemment posées" },
            { icon: Phone, title: "Support technique", desc: "Assistance pour les problèmes techniques" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon className="h-5 w-5 text-purple-400" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Contactez-nous</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-400" />
              <span className="text-white">support@veegox.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span className="text-white">Chat en direct (9h-18h)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Help;
