import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";
import { StatsCard } from "@/components/ui/stats-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { PageHeader } from "@/components/layout/PageHeader";
import { Users, Target, Rocket, Award, Github, Linkedin, Twitter, ExternalLink, Star, Globe, TrendingUp } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Alexandre Martin",
      role: "CEO & Co-Founder",
      bio: "Ex-Goldman Sachs, spécialisé en DeFi depuis 2019",
      avatar: "AM",
      linkedin: "https://linkedin.com/in/alexandre-martin",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Sophie Chen",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google, experte en blockchain et IA",
      avatar: "SC",
      linkedin: "https://linkedin.com/in/sophie-chen",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Thomas Dubois",
      role: "Head of Product",
      bio: "Ex-Coinbase, product leader pour les applications crypto",
      avatar: "TD",
      linkedin: "https://linkedin.com/in/thomas-dubois",
      gradient: "from-green-500 to-blue-500"
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Security",
      bio: "Ex-Binance, spécialiste en sécurité blockchain",
      avatar: "MR",
      linkedin: "https://linkedin.com/in/maria-rodriguez",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const investors = [
    { name: "Andreessen Horowitz", type: "Lead Investor", amount: 12000000, logo: "🚀" },
    { name: "Coinbase Ventures", type: "Strategic", amount: 5000000, logo: "🔷" },
    { name: "Binance Labs", type: "Strategic", amount: 3000000, logo: "⚡" },
    { name: "1kx", type: "DeFi Specialist", amount: 2000000, logo: "💎" }
  ];

  const milestones = [
    { date: "Q1 2024", title: "Lancement Mainnet", status: "completed", icon: "🚀" },
    { date: "Q2 2024", title: "Module Crédit IA", status: "completed", icon: "🤖" },
    { date: "Q3 2024", title: "Support Multi-Chain", status: "completed", icon: "⛓️" },
    { date: "Q4 2024", title: "Mobile App", status: "in-progress", icon: "📱" },
    { date: "Q1 2025", title: "Governance Token", status: "planned", icon: "🏛️" },
    { date: "Q2 2025", title: "Expansion Globale", status: "planned", icon: "🌍" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="À Propos de Veegox"
        subtitle="La première plateforme DeFi tout-en-un avec intelligence artificielle"
        icon={
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
        }
        actions={
          <div className="flex space-x-3">
            <GradientButton variant="outline" size="sm">
              <Github className="h-4 w-4" />
              GitHub
            </GradientButton>
            <GradientButton variant="primary" size="sm">
              <ExternalLink className="h-4 w-4" />
              Rejoindre
            </GradientButton>
          </div>
        }
      />

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <GlassCard variant="primary" className="p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 mr-4">
              <Target className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Notre Mission</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Démocratiser l'accès à la finance décentralisée en créant une plateforme unifiée 
            qui combine la puissance de l'IA avec la simplicité d'utilisation. Nous croyons 
            que chacun devrait avoir accès aux outils financiers du futur.
          </p>
        </GlassCard>

        <GlassCard variant="secondary" className="p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-4">
              <Rocket className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Notre Vision</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Devenir le standard de l'écosystème DeFi en 2025, en proposant une expérience 
            utilisateur inégalée et des innovations technologiques qui façonnent l'avenir 
            de la finance décentralisée.
          </p>
        </GlassCard>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="TVL Total"
          value={<AnimatedNumber value={2400000} prefix="$" suffix="" className="text-3xl font-bold text-white" />}
          icon={<TrendingUp className="h-6 w-6 text-green-400" />}
          variant="accent"
        />
        <StatsCard
          title="Utilisateurs"
          value={<AnimatedNumber value={15000} suffix="+" className="text-3xl font-bold text-white" />}
          icon={<Users className="h-6 w-6 text-blue-400" />}
          variant="primary"
        />
        <StatsCard
          title="Blockchains"
          value={4}
          icon={<Globe className="h-6 w-6 text-purple-400" />}
          variant="secondary"
        />
        <StatsCard
          title="Levée de Fonds"
          value={<AnimatedNumber value={22000000} prefix="$" suffix="" className="text-3xl font-bold text-white" />}
          icon={<Star className="h-6 w-6 text-yellow-400" />}
        />
      </div>

      {/* Team */}
      <GlassCard className="p-8 mb-12">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 mr-4">
            <Users className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Notre Équipe</h3>
            <p className="text-gray-400">Une équipe d'experts passionnés par l'innovation DeFi</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <GlassCard key={index} className="p-6 text-center hover:scale-105 transition-all duration-300">
              <div className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-white font-bold text-xl">{member.avatar}</span>
              </div>
              <h4 className="text-white font-semibold text-lg mb-1">{member.name}</h4>
              <p className="text-purple-400 text-sm mb-3 font-medium">{member.role}</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">{member.bio}</p>
              <GradientButton size="sm" variant="ghost" className="w-full">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </GradientButton>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      {/* Investors */}
      <GlassCard className="p-8 mb-12">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 mr-4">
            <Award className="h-8 w-8 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Nos Investisseurs</h3>
            <p className="text-gray-400">Soutenus par les meilleurs VCs de l'écosystème crypto</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {investors.map((investor, index) => (
            <GlassCard key={index} className="p-6 hover:scale-[1.02] transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">{investor.logo}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{investor.name}</h4>
                    <p className="text-gray-400 text-sm">{investor.type}</p>
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xl">
                  <AnimatedNumber value={investor.amount} prefix="$" suffix="M" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      {/* Roadmap */}
      <GlassCard className="p-8 mb-12">
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 mr-4">
            <Rocket className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Roadmap 2024-2025</h3>
            <p className="text-gray-400">Nos prochaines étapes pour révolutionner la DeFi</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <GlassCard key={index} className="p-6 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center space-x-6">
                <div className="text-3xl">{milestone.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">{milestone.title}</h4>
                    <span className="text-gray-400 text-sm font-medium">{milestone.date}</span>
                  </div>
                </div>
                <Badge 
                  variant={
                    milestone.status === 'completed' ? 'default' : 
                    milestone.status === 'in-progress' ? 'secondary' : 'outline'
                  }
                  className={
                    milestone.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                    milestone.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                    'border-gray-500/30 text-gray-400'
                  }
                >
                  {milestone.status === 'completed' ? '✓ Terminé' : 
                   milestone.status === 'in-progress' ? '🔄 En cours' : '📅 Planifié'}
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      {/* Contact */}
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Nous Contacter</h3>
          <p className="text-gray-400">Connectez-vous avec l'équipe Veegox</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GlassCard className="p-6 text-center hover:scale-105 transition-all duration-300">
            <h4 className="text-white font-semibold mb-2">Business</h4>
            <p className="text-gray-400 text-sm mb-4">business@veegox.com</p>
            <GradientButton variant="primary" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4" />
              Contacter
            </GradientButton>
          </GlassCard>
          
          <GlassCard className="p-6 text-center hover:scale-105 transition-all duration-300">
            <h4 className="text-white font-semibold mb-2">Presse</h4>
            <p className="text-gray-400 text-sm mb-4">press@veegox.com</p>
            <GradientButton variant="secondary" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4" />
              Contacter
            </GradientButton>
          </GlassCard>
          
          <GlassCard className="p-6 text-center hover:scale-105 transition-all duration-300">
            <h4 className="text-white font-semibold mb-2">Carrières</h4>
            <p className="text-gray-400 text-sm mb-4">careers@veegox.com</p>
            <GradientButton variant="success" size="sm" className="w-full">
              <ExternalLink className="h-4 w-4" />
              Voir Offres
            </GradientButton>
          </GlassCard>
        </div>
        
        <div className="flex justify-center space-x-4">
          <GradientButton variant="ghost" size="sm" className="rounded-full w-12 h-12">
            <Twitter className="h-5 w-5" />
          </GradientButton>
          <GradientButton variant="ghost" size="sm" className="rounded-full w-12 h-12">
            <Linkedin className="h-5 w-5" />
          </GradientButton>
          <GradientButton variant="ghost" size="sm" className="rounded-full w-12 h-12">
            <Github className="h-5 w-5" />
          </GradientButton>
        </div>
      </GlassCard>
    </div>
  );
};

export default About;
