
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Book, Video, MessageSquare, ExternalLink, ChevronRight } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "Démarrage",
      questions: [
        { q: "Comment créer mon premier token ?", a: "Rendez-vous dans le module Token Manager, cliquez sur 'Créer un Token', remplissez les informations requises et déployez sur la blockchain de votre choix." },
        { q: "Comment connecter mon portefeuille ?", a: "Cliquez sur 'Connecter Portefeuille' en haut à droite, sélectionnez votre portefeuille (MetaMask, Coinbase, WalletConnect) et autorisez la connexion." },
        { q: "Quelles blockchains sont supportées ?", a: "Veegox supporte Ethereum, Polygon, Base et Arbitrum pour une expérience multi-chaînes optimale." }
      ]
    },
    {
      category: "DeFi",
      questions: [
        { q: "Comment fonctionne le scoring crédit IA ?", a: "Notre IA analyse votre historique on-chain, vos actifs, transactions et comportement DeFi pour calculer un score de crédit décentralisé." },
        { q: "Quels sont les frais de staking ?", a: "Les frais varient selon le pool : généralement 2-5% de commission sur les récompenses. Consultez chaque pool pour les détails." },
        { q: "Comment voter dans une DAO ?", a: "Vous devez détenir les tokens de gouvernance de la DAO. Allez dans le module DAO, sélectionnez une proposition et votez avec vos tokens." }
      ]
    },
    {
      category: "Sécurité",
      questions: [
        { q: "Mes fonds sont-ils sécurisés ?", a: "Vos fonds restent dans vos portefeuilles. Veegox n'a jamais accès à vos clés privées. Nous utilisons des smart contracts audités." },
        { q: "Comment activer l'authentification 2FA ?", a: "Allez dans Profil > Sécurité > Authentification à deux facteurs et suivez les instructions pour configurer votre application authenticator." },
        { q: "Que faire si je détecte une activité suspecte ?", a: "Déconnectez immédiatement tous vos portefeuilles, changez vos mots de passe et contactez notre support via le chat." }
      ]
    }
  ];

  const tutorials = [
    { title: "Premiers pas avec Veegox", duration: "5 min", difficulty: "Débutant", type: "video" },
    { title: "Créer et déployer un token ERC-20", duration: "10 min", difficulty: "Intermédiaire", type: "guide" },
    { title: "Optimiser ses rendements de staking", duration: "8 min", difficulty: "Avancé", type: "video" },
    { title: "Guide complet du module crédit IA", duration: "15 min", difficulty: "Intermédiaire", type: "guide" },
    { title: "Participer à la gouvernance DAO", duration: "7 min", difficulty: "Débutant", type: "video" },
    { title: "Stratégies d'investissement DeFi", duration: "20 min", difficulty: "Avancé", type: "guide" }
  ];

  const quickLinks = [
    { title: "Status des Services", url: "https://status.veegox.com", external: true },
    { title: "Documentation API", url: "/api-docs", external: false },
    { title: "Communauté Discord", url: "https://discord.gg/veegox", external: true },
    { title: "Blog Veegox", url: "/blog", external: false },
    { title: "Rapports d'Audit", url: "/security", external: false },
    { title: "Roadmap Produit", url: "/roadmap", external: false }
  ];

  const filteredFAQ = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <HelpCircle className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Centre d'Aide</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher dans la documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="faq" className="text-white">FAQ</TabsTrigger>
            <TabsTrigger value="tutorials" className="text-white">Tutoriels</TabsTrigger>
            <TabsTrigger value="guides" className="text-white">Guides</TabsTrigger>
            <TabsTrigger value="contact" className="text-white">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-6">
            <div className="grid gap-6">
              {(searchQuery ? filteredFAQ : faqItems).map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((item, index) => (
                        <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                          <h4 className="text-white font-medium mb-2">{item.q}</h4>
                          <p className="text-gray-300 text-sm">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {searchQuery && filteredFAQ.length === 0 && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="text-center py-8">
                    <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Aucun résultat trouvé pour "{searchQuery}"</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                      Effacer la recherche
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="mt-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Tutoriels Vidéo et Guides</CardTitle>
                <CardDescription className="text-gray-300">
                  Apprenez à utiliser Veegox avec nos tutoriels détaillés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {tutorial.type === 'video' ? (
                            <Video className="h-4 w-4 text-red-400" />
                          ) : (
                            <Book className="h-4 w-4 text-blue-400" />
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <span className="text-gray-400 text-xs">{tutorial.duration}</span>
                      </div>
                      <h4 className="text-white font-medium mb-2">{tutorial.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm capitalize">{tutorial.type}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Liens Rapides</CardTitle>
                  <CardDescription className="text-gray-300">
                    Accès direct aux ressources importantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-white">{link.title}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Glossaire DeFi</CardTitle>
                  <CardDescription className="text-gray-300">
                    Termes et concepts essentiels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white/5">
                      <h4 className="text-white font-medium">TVL (Total Value Locked)</h4>
                      <p className="text-gray-400 text-sm">Valeur totale des actifs verrouillés dans un protocole DeFi</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <h4 className="text-white font-medium">Yield Farming</h4>
                      <p className="text-gray-400 text-sm">Stratégie pour maximiser les rendements en DeFi</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <h4 className="text-white font-medium">Liquidity Pool</h4>
                      <p className="text-gray-400 text-sm">Pool de tokens utilisé pour faciliter les échanges décentralisés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Support Direct</CardTitle>
                  <CardDescription className="text-gray-300">
                    Contactez notre équipe pour une aide personnalisée
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat en Direct
                      <Badge className="ml-auto bg-green-500">En ligne</Badge>
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Créer un Ticket
                    </Button>
                    <div className="text-center text-gray-400 text-sm">
                      Temps de réponse moyen: 15 minutes
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Communauté</CardTitle>
                  <CardDescription className="text-gray-300">
                    Rejoignez la communauté Veegox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Discord Veegox
                      <Badge className="ml-auto">12.5k membres</Badge>
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Telegram
                      <Badge className="ml-auto">8.2k membres</Badge>
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Forum Communautaire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;
