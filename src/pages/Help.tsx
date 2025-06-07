
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Book, 
  Video,
  ExternalLink,
  ChevronRight,
  Star
} from "lucide-react";

const helpCategories = [
  {
    title: "Premiers Pas",
    icon: Book,
    articles: 8,
    color: "bg-blue-500",
    topics: ["Créer un compte", "Connecter un wallet", "Premier dépôt", "Interface utilisateur"]
  },
  {
    title: "Trading & DeFi",
    icon: TrendingUp,
    articles: 12,
    color: "bg-green-500", 
    topics: ["Swaps de tokens", "Pools de liquidité", "Yield farming", "Staking"]
  },
  {
    title: "NFTs",
    icon: Image,
    articles: 6,
    color: "bg-purple-500",
    topics: ["Acheter des NFTs", "Créer des NFTs", "Collections", "Marketplace"]
  },
  {
    title: "Sécurité",
    icon: Shield,
    articles: 10,
    color: "bg-red-500",
    topics: ["2FA", "Sécurité wallet", "Bonnes pratiques", "Récupération compte"]
  }
];

const popularArticles = [
  { title: "Comment connecter mon wallet MetaMask ?", views: "2.5k", rating: 4.8 },
  { title: "Guide du yield farming pour débutants", views: "1.8k", rating: 4.9 },
  { title: "Créer et vendre son premier NFT", views: "1.2k", rating: 4.7 },
  { title: "Comprendre les frais de gas", views: "980", rating: 4.6 },
  { title: "Sécuriser son portefeuille crypto", views: "750", rating: 4.9 }
];

const Help = () => {
  return (
    <PageLayout
      title="Centre d'Aide"
      subtitle="Trouvez des réponses à vos questions sur Veegox"
      icon={<HelpCircle className="h-6 w-6 text-blue-400" />}
    >
      <div className="space-y-8">
        {/* Search */}
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-white text-xl font-semibold mb-4 text-center">
                Comment pouvons-nous vous aider ?
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Rechercher dans la documentation..."
                  className="pl-10 bg-white/10 border-white/20 text-white text-lg h-12"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-slate-900/50 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Chat en Direct</h3>
              <p className="text-gray-400 text-sm mb-4">Parlez à notre équipe support</p>
              <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                En ligne
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Tutoriels Vidéo</h3>
              <p className="text-gray-400 text-sm mb-4">Guides visuels étape par étape</p>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                12 vidéos
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 hover:border-green-500/50 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Book className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Documentation</h3>
              <p className="text-gray-400 text-sm mb-4">Guide complet développeurs</p>
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-300">
                <ExternalLink className="h-3 w-3 mr-1" />
                Ouvrir
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Catégories d'Aide</h3>
            <div className="space-y-3">
              {helpCategories.map((category, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium">{category.title}</h4>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">{category.articles} articles disponibles</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {category.topics.slice(0, 2).map((topic, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-white/10">
                              {topic}
                            </Badge>
                          ))}
                          {category.topics.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-white/10">
                              +{category.topics.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Articles Populaires</h3>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-gray-600 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-2">{article.title}</h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-400">{article.views} vues</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400">{article.rating}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              Voir tous les articles
            </Button>
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white">Besoin d'Aide Supplémentaire ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-4">
                  Notre équipe support est disponible 24/7 pour vous aider avec vos questions.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">📧 support@veegox.com</p>
                  <p className="text-gray-400">💬 Chat en direct disponible</p>
                  <p className="text-gray-400">⏱️ Temps de réponse moyen : 2 heures</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter le Support
                </Button>
                <Button variant="outline" className="w-full">
                  <Book className="h-4 w-4 mr-2" />
                  Parcourir la FAQ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Help;
