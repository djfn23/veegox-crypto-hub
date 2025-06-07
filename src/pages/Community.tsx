
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Award,
  TrendingUp,
  Heart,
  Share2,
  ExternalLink,
  Crown,
  Star,
  Zap
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Veegox Community AMA",
    date: "2024-01-15",
    time: "20:00 UTC",
    type: "AMA",
    participants: 234,
    status: "upcoming"
  },
  {
    id: 2,
    title: "NFT Creation Workshop",
    date: "2024-01-20",
    time: "18:00 UTC",
    type: "Workshop",
    participants: 89,
    status: "upcoming"
  },
  {
    id: 3,
    title: "DeFi Strategy Session",
    date: "2024-01-10",
    time: "19:00 UTC",
    type: "Education",
    participants: 156,
    status: "completed"
  }
];

const topMembers = [
  {
    id: 1,
    name: "CryptoMaster",
    avatar: "/placeholder.svg",
    rank: 1,
    points: 12450,
    badges: ["Pioneer", "Helper"],
    veegoxHolding: "50,000"
  },
  {
    id: 2,
    name: "DefiQueen",
    avatar: "/placeholder.svg",
    rank: 2,
    points: 9875,
    badges: ["Educator", "Contributor"],
    veegoxHolding: "35,000"
  },
  {
    id: 3,
    name: "BlockchainBob",
    avatar: "/placeholder.svg",
    rank: 3,
    points: 7650,
    badges: ["Developer"],
    veegoxHolding: "28,000"
  }
];

const announcements = [
  {
    id: 1,
    title: "Nouveau système de récompenses communautaires",
    content: "Nous lançons un nouveau programme pour récompenser les membres actifs de la communauté...",
    author: "Veegox Team",
    date: "Il y a 2 heures",
    likes: 45,
    comments: 12,
    isPinned: true
  },
  {
    id: 2,
    title: "Mise à jour du token Veegox",
    content: "Importantes améliorations apportées au smart contract principal...",
    author: "Dev Team",
    date: "Il y a 1 jour",
    likes: 78,
    comments: 23,
    isPinned: false
  }
];

const Community = () => {
  return (
    <PageLayout
      title="Communauté"
      subtitle="Rejoignez la communauté Veegox et participez à l'écosystème"
      icon={<Users className="h-6 w-6 text-blue-400" />}
      actions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Événements
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Rejoindre Discord
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Membres Actifs</p>
                  <p className="text-2xl font-bold text-white">2,847</p>
                  <p className="text-blue-400 text-sm">+12% ce mois</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Holders Veegox</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-purple-400 text-sm">Token holders</p>
                </div>
                <Crown className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Événements</p>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-green-400 text-sm">Ce mois</p>
                </div>
                <Calendar className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm">Points Communauté</p>
                  <p className="text-2xl font-bold text-white">156K</p>
                  <p className="text-orange-400 text-sm">Total distribués</p>
                </div>
                <Award className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Announcements */}
          <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                Annonces de la Communauté
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {announcement.isPinned && (
                        <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300">
                          Épinglé
                        </Badge>
                      )}
                      <h4 className="text-white font-semibold">{announcement.title}</h4>
                    </div>
                    <span className="text-gray-400 text-sm">{announcement.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{announcement.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Heart className="h-3 w-3" />
                        {announcement.likes}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MessageSquare className="h-3 w-3" />
                        {announcement.comments}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Members */}
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-400" />
                Top Membres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      member.rank === 1 ? 'bg-yellow-500 text-black' :
                      member.rank === 2 ? 'bg-gray-400 text-black' :
                      'bg-orange-500 text-white'
                    }`}>
                      {member.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">{member.name}</p>
                      {member.rank === 1 && <Crown className="h-3 w-3 text-yellow-400" />}
                    </div>
                    <div className="flex gap-1 mb-1">
                      {member.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-purple-600/20 text-purple-300">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{member.points.toLocaleString()} pts</span>
                      <span>{member.veegoxHolding} VEEGOX</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Voir le classement complet
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-400" />
              Événements à Venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        event.type === 'AMA' ? 'bg-blue-600/20 text-blue-300' :
                        event.type === 'Workshop' ? 'bg-purple-600/20 text-purple-300' :
                        'bg-green-600/20 text-green-300'
                      }`}
                    >
                      {event.type}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={event.status === 'upcoming' ? 'border-green-500/30 text-green-300' : 'border-gray-500/30 text-gray-300'}
                    >
                      {event.status === 'upcoming' ? 'À venir' : 'Terminé'}
                    </Badge>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{event.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="h-3 w-3" />
                      {event.date} à {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="h-3 w-3" />
                      {event.participants} participants
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    {event.status === 'upcoming' ? 'Participer' : 'Voir le replay'}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Rewards */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Programme de Récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <h4 className="text-white font-semibold">Participation Active</h4>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Gagnez des points en participant aux discussions et événements
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Récompense</span>
                  <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-300">
                    100 pts/semaine
                  </Badge>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="h-6 w-6 text-purple-400" />
                  <h4 className="text-white font-semibold">Holding Veegox</h4>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Bonus mensuel basé sur vos holdings de tokens Veegox
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Récompense</span>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    0.1% APR
                  </Badge>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <h4 className="text-white font-semibold">Contributions</h4>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Récompenses spéciales pour les contributions exceptionnelles
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Récompense</span>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-300">
                    Variable
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Community;
