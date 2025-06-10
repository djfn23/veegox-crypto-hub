
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Clock, Users, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedCampaigns = () => {
  const featuredCampaigns = [
    {
      id: 1,
      title: "DeFi Protocol Révolutionnaire",
      description: "Un nouveau protocole DeFi qui change la donne avec des rendements optimisés et une sécurité renforcée.",
      raised: 850000,
      goal: 1000000,
      backers: 234,
      daysLeft: 12,
      category: "DeFi",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "NFT Marketplace Next-Gen",
      description: "Marketplace NFT avec IA intégrée pour la découverte et l'évaluation automatique des œuvres.",
      raised: 420000,
      goal: 750000,
      backers: 156,
      daysLeft: 8,
      category: "NFT",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Gaming DAO Platform",
      description: "Plateforme de gouvernance décentralisée pour les communautés gaming avec système de récompenses.",
      raised: 320000,
      goal: 500000,
      backers: 89,
      daysLeft: 15,
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      featured: true
    }
  ];

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Campagnes en Vedette</h2>
          <p className="text-gray-400">Projets sélectionnés par notre équipe</p>
        </div>
        <Link to="/crowdfunding/featured">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
            Voir toutes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-600/90 text-white border-0">
                  <Star className="h-3 w-3 mr-1" />
                  Vedette
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-black/50 text-white border-white/20">
                  {campaign.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                {campaign.title}
              </CardTitle>
              <p className="text-gray-300 text-sm line-clamp-2">{campaign.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Collecté</span>
                  <span className="text-white font-semibold">
                    {formatAmount(campaign.raised)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={calculateProgress(campaign.raised, campaign.goal)} 
                    className="h-2 bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Objectif: {formatAmount(campaign.goal)}</span>
                    <span>{Math.round(calculateProgress(campaign.raised, campaign.goal))}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{campaign.backers} contributeurs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{campaign.daysLeft} jours restants</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <DollarSign className="h-4 w-4 mr-2" />
                Contribuer Maintenant
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCampaigns;
