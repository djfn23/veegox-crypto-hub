
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Target, TrendingUp, Calendar, Zap, Settings } from "lucide-react";
import { cryptoBankService } from "@/services/cryptoBankService";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { MobileGrid, MobileGridItem } from "@/components/ui/mobile-grid";
import { useToast } from "@/hooks/use-toast";

interface SmartSavingsModuleProps {
  userId: string;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  autoSave: boolean;
  weeklyContribution: number;
}

export const SmartSavingsModule = ({ userId }: SmartSavingsModuleProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { isMobile } = useResponsiveLayout();
  const { toast } = useToast();

  // Mock data for smart savings goals
  const mockGoals: SavingsGoal[] = [
    {
      id: "1",
      name: "Vacances d'été",
      targetAmount: 5000,
      currentAmount: 2750,
      targetDate: "2024-07-01",
      category: "Voyage",
      autoSave: true,
      weeklyContribution: 125
    },
    {
      id: "2", 
      name: "Fonds d'urgence",
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: "2024-12-31",
      category: "Sécurité",
      autoSave: true,
      weeklyContribution: 200
    },
    {
      id: "3",
      name: "Nouvel ordinateur",
      targetAmount: 2500,
      currentAmount: 800,
      targetDate: "2024-05-15",
      category: "Technologie",
      autoSave: false,
      weeklyContribution: 100
    }
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateWeeksToGoal = (current: number, target: number, weekly: number) => {
    if (weekly <= 0) return Infinity;
    return Math.ceil((target - current) / weekly);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Voyage': 'bg-blue-500',
      'Sécurité': 'bg-green-500',
      'Technologie': 'bg-purple-500',
      'Maison': 'bg-orange-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const handleCreateGoal = () => {
    toast({
      title: "Fonctionnalité bientôt disponible",
      description: "La création d'objectifs sera bientôt disponible",
    });
  };

  const handleEnableAutoSave = (goalId: string) => {
    toast({
      title: "Épargne automatique activée",
      description: "Les arrondis seront automatiquement ajoutés à cet objectif",
    });
  };

  const CardComponent = isMobile ? MobileCard : Card;
  const CardContentComponent = isMobile ? MobileCardContent : CardContent;
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader;
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle;

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardComponent>
        <CardHeaderComponent>
          <CardTitleComponent className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-purple-400" />
            Épargne Intelligente
          </CardTitleComponent>
          <p className="text-gray-400 text-sm">
            Atteignez vos objectifs avec l'épargne automatique et les conseils IA
          </p>
        </CardHeaderComponent>
        <CardContentComponent>
          <div className="flex gap-3">
            <Button 
              onClick={handleCreateGoal}
              className="bg-purple-600 hover:bg-purple-700 flex-1"
              size={isMobile ? "lg" : "default"}
            >
              <Target className="h-4 w-4 mr-2" />
              Nouvel Objectif
            </Button>
            <Button 
              variant="outline"
              className="border-gray-600 text-gray-300 flex-1"
              size={isMobile ? "lg" : "default"}
            >
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </CardContentComponent>
      </CardComponent>

      {/* AI Insights */}
      <CardComponent className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700/50">
        <CardHeaderComponent>
          <CardTitleComponent className="text-purple-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Conseils IA
          </CardTitleComponent>
        </CardHeaderComponent>
        <CardContentComponent>
          <div className="space-y-3">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <p className="text-purple-200 text-sm">
                💡 Basé sur vos habitudes, vous pourriez économiser 15% de plus en activant l'arrondi automatique
              </p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <p className="text-blue-200 text-sm">
                📈 Vos objectifs "Vacances" sont en avance! Vous pourriez augmenter votre objectif de 20%
              </p>
            </div>
          </div>
        </CardContentComponent>
      </CardComponent>

      {/* Savings Goals */}
      <MobileGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
        {mockGoals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const weeksLeft = calculateWeeksToGoal(goal.currentAmount, goal.targetAmount, goal.weeklyContribution);
          
          return (
            <MobileGridItem key={goal.id}>
              <CardComponent 
                className="h-full hover:border-purple-500/50 transition-colors cursor-pointer"
                onClick={() => setSelectedGoal(goal.id)}
              >
                <CardHeaderComponent>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitleComponent className="text-base text-white mb-1">
                        {goal.name}
                      </CardTitleComponent>
                      <Badge className={`${getCategoryColor(goal.category)} text-white text-xs`}>
                        {goal.category}
                      </Badge>
                    </div>
                    {goal.autoSave && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="h-3 w-3 mr-1" />
                        Auto
                      </Badge>
                    )}
                  </div>
                </CardHeaderComponent>
                <CardContentComponent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progression</span>
                      <span className="text-sm font-medium text-white">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-700" />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-white">
                        {formatCurrency(goal.currentAmount)} MATIC
                      </span>
                      <span className="text-sm text-gray-400">
                        / {formatCurrency(goal.targetAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {isFinite(weeksLeft) ? `${weeksLeft} semaines` : 'Date passée'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{formatCurrency(goal.weeklyContribution)}/sem</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      Contribuer
                    </Button>
                    {!goal.autoSave && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnableAutoSave(goal.id);
                        }}
                      >
                        <Zap className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContentComponent>
              </CardComponent>
            </MobileGridItem>
          );
        })}
      </MobileGrid>

      {/* Quick Stats */}
      <MobileGrid mobileColumns={2} tabletColumns={4} desktopColumns={4}>
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
              </div>
              <p className="text-xs text-gray-400">Épargne totale</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {formatCurrency(mockGoals.reduce((sum, goal) => sum + goal.weeklyContribution, 0))}
              </div>
              <p className="text-xs text-gray-400">Par semaine</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {mockGoals.length}
              </div>
              <p className="text-xs text-gray-400">Objectifs actifs</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {mockGoals.filter(g => g.autoSave).length}
              </div>
              <p className="text-xs text-gray-400">Auto-épargne</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
      </MobileGrid>
    </div>
  );
};
