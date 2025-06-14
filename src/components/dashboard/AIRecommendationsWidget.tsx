
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { AnimatedCard, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animated-components';

interface AIRecommendation {
  id: string;
  type: 'portfolio' | 'trading' | 'defi' | 'risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  action: string;
}

export const AIRecommendationsWidget = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI recommendations
    setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          type: 'portfolio',
          title: 'Rééquilibrage Recommandé',
          description: 'Votre allocation ETH est trop élevée (35%). Considérez diversifier vers des stablecoins.',
          confidence: 85,
          impact: 'medium',
          action: 'Rééquilibrer',
        },
        {
          id: '2',
          type: 'defi',
          title: 'Opportunité Yield Farming',
          description: 'Le pool Curve 3Pool offre 15.7% APY avec un risque faible.',
          confidence: 92,
          impact: 'high',
          action: 'Explorer',
        },
        {
          id: '3',
          type: 'trading',
          title: 'Signal d\'Achat BTC',
          description: 'Analyse technique suggère une position longue sur BTC avec SL à 42k.',
          confidence: 78,
          impact: 'medium',
          action: 'Analyser',
        },
        {
          id: '4',
          type: 'risk',
          title: 'Alerte Risque',
          description: 'Votre exposition DeFi dépasse votre tolérance au risque configurée.',
          confidence: 90,
          impact: 'high',
          action: 'Réviser',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'portfolio': return <Target className="h-4 w-4" />;
      case 'trading': return <TrendingUp className="h-4 w-4" />;
      case 'defi': return <Zap className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'portfolio': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'trading': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'defi': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'risk': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'bg-gray-500/20 text-gray-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <AnimatedCard variant="glass" className="h-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
            Recommandations IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/5 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard variant="glass" className="h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Recommandations IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <StaggerContainer className="space-y-3">
          {recommendations.slice(0, 3).map((rec, index) => (
            <StaggerItem key={rec.id}>
              <FadeIn delay={index * 0.1}>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(rec.type)}>
                        {getTypeIcon(rec.type)}
                        {rec.type}
                      </Badge>
                      <Badge className={getImpactColor(rec.impact)}>
                        {rec.impact}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400">
                      {rec.confidence}% confiance
                    </div>
                  </div>
                  
                  <h4 className="text-white font-medium mb-1">{rec.title}</h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {rec.description}
                  </p>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30"
                  >
                    {rec.action}
                  </Button>
                </div>
              </FadeIn>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn delay={0.4}>
          <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Voir Toutes les Recommandations
          </Button>
        </FadeIn>
      </CardContent>
    </AnimatedCard>
  );
};
