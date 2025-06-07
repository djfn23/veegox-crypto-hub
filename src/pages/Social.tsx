
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share2, TrendingUp, Users, MessageCircle } from "lucide-react";

const forumPosts = [
  {
    id: 1,
    author: "CryptoTrader",
    title: "Nouvelle stratégie de yield farming sur Polygon",
    content: "J'ai découvert une combinaison intéressante avec les pools MATIC/USDC...",
    category: "DeFi",
    likes: 24,
    replies: 8,
    time: "2h",
    trending: true
  },
  {
    id: 2,
    author: "DeFiAnalyst",
    title: "Analyse: Impact des taux de la Fed sur DeFi",
    content: "Les récentes décisions de politique monétaire ont créé des opportunités...",
    category: "Analyse",
    likes: 45,
    replies: 15,
    time: "4h",
    trending: false
  },
  {
    id: 3,
    author: "NFTCollector",
    title: "Collection Genesis: Évaluation et perspectives",
    content: "La collection Genesis montre des signes de stabilisation après...",
    category: "NFT",
    likes: 12,
    replies: 3,
    time: "6h",
    trending: false
  }
];

export default function Social() {
  return (
    <PageLayout
      title="Forum Communautaire"
      subtitle="Discussions, analyses et partage d'expériences DeFi"
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Membres Actifs</p>
                  <p className="text-lg font-bold text-white">2,847</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Posts Aujourd'hui</p>
                  <p className="text-lg font-bold text-white">127</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Trending</p>
                  <p className="text-lg font-bold text-white">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-400">Mes Posts</p>
                  <p className="text-lg font-bold text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Post */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Créer un Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Titre de votre post" 
              className="bg-slate-800 border-slate-600 text-white"
            />
            <Textarea 
              placeholder="Partagez vos réflexions, analyses ou questions..." 
              className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Badge variant="outline">DeFi</Badge>
                <Badge variant="outline">NFT</Badge>
                <Badge variant="outline">Analyse</Badge>
                <Badge variant="outline">Question</Badge>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Publier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Forum Posts */}
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <Card key={post.id} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-slate-700 text-white">
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{post.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge variant="destructive" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <span className="text-gray-400 text-sm">{post.time}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-300">{post.content}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {post.replies}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Share2 className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-slate-600 text-white">
            Charger plus de posts
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
