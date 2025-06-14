
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, PieChart, AlertTriangle, Target, Calendar } from "lucide-react";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { MobileGrid, MobileGridItem } from "@/components/ui/mobile-grid";
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface EnhancedBankingAnalyticsProps {
  userId: string;
}

export const EnhancedBankingAnalytics = ({ userId }: EnhancedBankingAnalyticsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const { isMobile } = useResponsiveLayout();

  // Mock analytics data
  const spendingData = [
    { month: 'Jan', revenus: 4500, depenses: 3200, epargne: 1300 },
    { month: 'Fév', revenus: 4800, depenses: 3500, epargne: 1300 },
    { month: 'Mar', revenus: 4600, depenses: 3800, epargne: 800 },
    { month: 'Avr', revenus: 5200, depenses: 3600, epargne: 1600 },
    { month: 'Mai', revenus: 4900, depenses: 3400, epargne: 1500 },
    { month: 'Juin', revenus: 5100, depenses: 3700, epargne: 1400 }
  ];

  const categoryData = [
    { name: 'Alimentation', value: 1200, color: '#8B5CF6' },
    { name: 'Transport', value: 800, color: '#06B6D4' },
    { name: 'Divertissement', value: 600, color: '#10B981' },
    { name: 'Factures', value: 900, color: '#F59E0B' },
    { name: 'Shopping', value: 500, color: '#EF4444' }
  ];

  const predictiveData = [
    { month: 'Juillet', predicted: 5000, trend: 'stable' },
    { month: 'Août', predicted: 5200, trend: 'hausse' },
    { month: 'Septembre', predicted: 4800, trend: 'baisse' },
    { month: 'Octobre', predicted: 5100, trend: 'hausse' }
  ];

  const budgetAlerts = [
    { category: 'Divertissement', spent: 580, budget: 600, severity: 'warning' },
    { category: 'Shopping', spent: 520, budget: 500, severity: 'danger' },
    { category: 'Transport', spent: 750, budget: 800, severity: 'info' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getAlertColor = (severity: string) => {
    const colors = {
      'info': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'warning': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'danger': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors[severity as keyof typeof colors];
  };

  const CardComponent = isMobile ? MobileCard : Card;
  const CardContentComponent = isMobile ? MobileCardContent : CardContent;
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader;
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle;

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardComponent variant={isMobile ? "elevated" : undefined}>
        <CardHeaderComponent>
          <CardTitleComponent className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            Analytics Avancées
          </CardTitleComponent>
          <p className="text-gray-400 text-sm">
            Analyses intelligentes et prédictions financières
          </p>
        </CardHeaderComponent>
        <CardContentComponent>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                className={selectedPeriod === period ? "bg-purple-600" : "border-gray-600"}
              >
                {period === 'week' ? 'Semaine' : period === 'month' ? 'Mois' : 'Année'}
              </Button>
            ))}
          </div>
        </CardContentComponent>
      </CardComponent>

      {/* Quick Stats */}
      <MobileGrid mobileColumns={2} tabletColumns={4} desktopColumns={4}>
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400 mb-1">+12%</div>
              <p className="text-xs text-gray-400">Épargne ce mois</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400 mb-1">2,1k</div>
              <p className="text-xs text-gray-400">Budget restant</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <PieChart className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400 mb-1">68%</div>
              <p className="text-xs text-gray-400">Objectifs atteints</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
        
        <MobileGridItem>
          <CardComponent className="text-center">
            <CardContentComponent className="p-4">
              <AlertTriangle className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400 mb-1">3</div>
              <p className="text-xs text-gray-400">Alertes budget</p>
            </CardContentComponent>
          </CardComponent>
        </MobileGridItem>
      </MobileGrid>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <CardComponent>
            <CardHeaderComponent>
              <CardTitleComponent>Revenus vs Dépenses vs Épargne</CardTitleComponent>
            </CardHeaderComponent>
            <CardContentComponent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenus" fill="#10B981" name="Revenus" />
                    <Bar dataKey="depenses" fill="#EF4444" name="Dépenses" />
                    <Bar dataKey="epargne" fill="#8B5CF6" name="Épargne" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContentComponent>
          </CardComponent>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <MobileGrid mobileColumns={1} tabletColumns={2} desktopColumns={2}>
            <MobileGridItem>
              <CardComponent>
                <CardHeaderComponent>
                  <CardTitleComponent>Répartition des Dépenses</CardTitleComponent>
                </CardHeaderComponent>
                <CardContentComponent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContentComponent>
              </CardComponent>
            </MobileGridItem>
            
            <MobileGridItem>
              <CardComponent>
                <CardHeaderComponent>
                  <CardTitleComponent>Alertes Budget</CardTitleComponent>
                </CardHeaderComponent>
                <CardContentComponent>
                  <div className="space-y-3">
                    {budgetAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-700">
                        <div>
                          <p className="font-medium text-white">{alert.category}</p>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(alert.spent)} / {formatCurrency(alert.budget)}
                          </p>
                        </div>
                        <Badge className={getAlertColor(alert.severity)}>
                          {Math.round((alert.spent / alert.budget) * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContentComponent>
              </CardComponent>
            </MobileGridItem>
          </MobileGrid>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <CardComponent>
            <CardHeaderComponent>
              <CardTitleComponent className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                Prédictions IA - Prochains Mois
              </CardTitleComponent>
            </CardHeaderComponent>
            <CardContentComponent>
              <div className="space-y-4">
                {predictiveData.map((prediction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{prediction.month}</p>
                      <p className="text-sm text-gray-400">Revenus prédits</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        {formatCurrency(prediction.predicted)} MATIC
                      </p>
                      <Badge className={
                        prediction.trend === 'hausse' ? 'bg-green-500/20 text-green-400' :
                        prediction.trend === 'baisse' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }>
                        {prediction.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">💡 Recommandations IA</h4>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• Augmentez votre épargne de 5% pour atteindre vos objectifs plus rapidement</li>
                  <li>• Réduisez les dépenses de divertissement de 10% ce mois-ci</li>
                  <li>• Profitez du surplus prédit en Août pour investir dans l'épargne</li>
                </ul>
              </div>
            </CardContentComponent>
          </CardComponent>
        </TabsContent>
      </Tabs>
    </div>
  );
};
