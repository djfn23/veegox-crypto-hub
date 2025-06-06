
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Rocket, Award, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Alexandre Martin",
      role: "CEO & Co-Founder",
      bio: "Ex-Goldman Sachs, spécialisé en DeFi depuis 2019",
      avatar: "AM",
      linkedin: "https://linkedin.com/in/alexandre-martin"
    },
    {
      name: "Sophie Chen",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google, experte en blockchain et IA",
      avatar: "SC",
      linkedin: "https://linkedin.com/in/sophie-chen"
    },
    {
      name: "Thomas Dubois",
      role: "Head of Product",
      bio: "Ex-Coinbase, product leader pour les applications crypto",
      avatar: "TD",
      linkedin: "https://linkedin.com/in/thomas-dubois"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Security",
      bio: "Ex-Binance, spécialiste en sécurité blockchain",
      avatar: "MR",
      linkedin: "https://linkedin.com/in/maria-rodriguez"
    }
  ];

  const investors = [
    { name: "Andreessen Horowitz", type: "Lead Investor", amount: "$12M" },
    { name: "Coinbase Ventures", type: "Strategic", amount: "$5M" },
    { name: "Binance Labs", type: "Strategic", amount: "$3M" },
    { name: "1kx", type: "DeFi Specialist", amount: "$2M" }
  ];

  const milestones = [
    { date: "Q1 2024", title: "Lancement Mainnet", status: "completed" },
    { date: "Q2 2024", title: "Module Crédit IA", status: "completed" },
    { date: "Q3 2024", title: "Support Multi-Chain", status: "completed" },
    { date: "Q4 2024", title: "Mobile App", status: "in-progress" },
    { date: "Q1 2025", title: "Governance Token", status: "planned" },
    { date: "Q2 2025", title: "Expansion Globale", status: "planned" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <h1 className="text-4xl font-bold text-white">À Propos de Veegox</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            La première plateforme DeFi tout-en-un avec intelligence artificielle, 
            révolutionnant l'accès aux services financiers décentralisés.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-400" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Démocratiser l'accès à la finance décentralisée en créant une plateforme unifiée 
                qui combine la puissance de l'IA avec la simplicité d'utilisation. Nous croyons 
                que chacun devrait avoir accès aux outils financiers du futur.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Rocket className="h-6 w-6 mr-2 text-blue-400" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Devenir le standard de l'écosystème DeFi en 2025, en proposant une expérience 
                utilisateur inégalée et des innovations technologiques qui façonnent l'avenir 
                de la finance décentralisée.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-white mb-2">$2.4M</div>
              <div className="text-gray-400 text-sm">TVL Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-white mb-2">15,000+</div>
              <div className="text-gray-400 text-sm">Utilisateurs Actifs</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-gray-400 text-sm">Blockchains</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-white mb-2">$22M</div>
              <div className="text-gray-400 text-sm">Levée de Fonds</div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-6 w-6 mr-2 text-green-400" />
              Notre Équipe
            </CardTitle>
            <CardDescription className="text-gray-300">
              Une équipe d'experts passionnés par l'innovation DeFi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-xs mb-3">{member.bio}</p>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-400/20">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investors */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-400" />
              Nos Investisseurs
            </CardTitle>
            <CardDescription className="text-gray-300">
              Soutenus par les meilleurs VCs de l'écosystème crypto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {investors.map((investor, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div>
                    <h4 className="text-white font-semibold">{investor.name}</h4>
                    <p className="text-gray-400 text-sm">{investor.type}</p>
                  </div>
                  <div className="text-green-400 font-semibold">{investor.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white">Roadmap 2024-2025</CardTitle>
            <CardDescription className="text-gray-300">
              Nos prochaines étapes pour révolutionner la DeFi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={
                        milestone.status === 'completed' ? 'default' : 
                        milestone.status === 'in-progress' ? 'secondary' : 'outline'
                      }
                      className={
                        milestone.status === 'completed' ? 'bg-green-500' : 
                        milestone.status === 'in-progress' ? 'bg-yellow-500 text-black' : ''
                      }
                    >
                      {milestone.status === 'completed' ? '✓' : 
                       milestone.status === 'in-progress' ? '🔄' : '📅'}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">{milestone.title}</h4>
                      <span className="text-gray-400 text-sm">{milestone.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Nous Contacter</CardTitle>
            <CardDescription className="text-gray-300">
              Connectez-vous avec l'équipe Veegox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Business</h4>
                <p className="text-gray-400 text-sm mb-3">business@veegox.com</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Presse</h4>
                <p className="text-gray-400 text-sm mb-3">press@veegox.com</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Carrières</h4>
                <p className="text-gray-400 text-sm mb-3">careers@veegox.com</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Voir Offres
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-400/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-400/20">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-400/20">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
