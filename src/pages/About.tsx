
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Zap, 
  Globe, 
  Github, 
  Twitter, 
  MessageCircle,
  ExternalLink
} from "lucide-react";

const teamMembers = [
  {
    name: "Alexandre Dubois",
    role: "CEO & Fondateur", 
    avatar: "AD",
    description: "Ex-Goldman Sachs, expert en DeFi et blockchain"
  },
  {
    name: "Marie Chen",
    role: "CTO",
    avatar: "MC", 
    description: "Ancienne Lead Developer chez Uniswap"
  },
  {
    name: "Thomas Martin",
    role: "Head of Product",
    avatar: "TM",
    description: "Expert UX/UI, ex-Coinbase et Binance"
  },
  {
    name: "Sophie Laurent", 
    role: "Lead Security",
    avatar: "SL",
    description: "Spécialiste cybersécurité, audits smart contracts"
  }
];

const milestones = [
  { date: "Q1 2023", event: "Lancement de Veegox", status: "completed" },
  { date: "Q2 2023", event: "Marketplace NFT", status: "completed" },
  { date: "Q3 2023", event: "Yield Farming", status: "completed" },
  { date: "Q4 2023", event: "Gouvernance DAO", status: "completed" },
  { date: "Q1 2024", event: "Bridge Multi-chaînes", status: "current" },
  { date: "Q2 2024", event: "IA Assistant", status: "upcoming" },
  { date: "Q3 2024", event: "Mobile App", status: "upcoming" }
];

const About = () => {
  return (
    <PageLayout
      title="À Propos de Veegox"
      subtitle="Découvrez l'équipe et la vision derrière l'écosystème DeFi"
      icon={<Users className="h-6 w-6 text-purple-400" />}
    >
      <div className="space-y-8">
        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="leading-relaxed">
                Démocratiser l'accès à la finance décentralisée en créant une plateforme intuitive, 
                sécurisée et accessible à tous. Nous croyons en un avenir financier ouvert et transparent, 
                où chacun peut participer à l'économie numérique sans intermédiaires.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="leading-relaxed">
                Devenir la référence mondiale en matière de DeFi en proposant un écosystème complet 
                qui allie innovation technologique et expérience utilisateur exceptionnelle. Nous 
                visons à connecter des millions d'utilisateurs à la révolution financière décentralisée.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Veegox en Chiffres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">250K+</div>
                <p className="text-gray-400">Utilisateurs Actifs</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$2.3B</div>
                <p className="text-gray-400">TVL Total</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">12</div>
                <p className="text-gray-400">Blockchains</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">99.9%</div>
                <p className="text-gray-400">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Notre Équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 bg-purple-600/20 text-purple-300">
                    {member.role}
                  </Badge>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'current' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{milestone.event}</span>
                      <Badge 
                        variant="secondary" 
                        className={
                          milestone.status === 'completed' ? 'bg-green-600/20 text-green-300' :
                          milestone.status === 'current' ? 'bg-blue-600/20 text-blue-300' :
                          'bg-gray-600/20 text-gray-300'
                        }
                      >
                        {milestone.status === 'completed' ? 'Terminé' :
                         milestone.status === 'current' ? 'En cours' : 'À venir'}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Décentralisation</h3>
              <p className="text-gray-400 text-sm">
                Nous croyons en un système financier ouvert et décentralisé, sans contrôle centralisé.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Communauté</h3>
              <p className="text-gray-400 text-sm">
                Notre plateforme est construite par et pour la communauté, avec une gouvernance participative.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">
                Nous repoussons constamment les limites de la technologie blockchain et DeFi.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Social */}
        <Card className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Restez Connectés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Suivez-nous</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                    <Twitter className="h-4 w-4 mr-2" />
                    @VeegoxDeFi
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discord Community
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-500/30 text-gray-300 hover:bg-gray-500/10">
                    <Github className="h-4 w-4 mr-2" />
                    Open Source
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Contact</h4>
                <div className="space-y-2 text-gray-300">
                  <p>📧 contact@veegox.com</p>
                  <p>🌐 www.veegox.com</p>
                  <p>📍 Paris, France</p>
                  <p>🏢 Station F, 5 Parvis Alan Turing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default About;
