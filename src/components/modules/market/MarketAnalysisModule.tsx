
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MarketAnalysis } from "../credit/types";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function MarketAnalysisModule() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['market-analysis'],
    queryFn: async (): Promise<MarketAnalysis[]> => {
      const { data, error } = await supabase
        .from('market_analysis')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });
  
  if (isLoading) {
    return <div className="text-center py-10">Chargement des données...</div>;
  }
  
  const marketSizeData = marketData?.filter(item => item.metric_name.includes('Market Size')) || [];
  const tvlData = marketData?.filter(item => item.metric_name.includes('TVL')) || [];
  const demographicsData = marketData?.filter(item => item.metric_name.includes('Percentage')) || [];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analyse de Marché</h2>
        <p className="text-gray-400">Insights sur les tendances du marché Web3 et DeFi</p>
        <div className="mt-2 text-sm text-blue-400">
          📊 Données exclusives pour donner un avantage concurrentiel aux utilisateurs Veegox
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="defi">Marchés DeFi</TabsTrigger>
          <TabsTrigger value="demographics">Démographie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Taille du marché 2025 (projections)</CardTitle>
                <CardDescription>En milliards de dollars USD</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={marketSizeData.map(item => ({
                      name: item.category,
                      value: item.metric_value / 1000000000,
                      trend: item.trend_percentage
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(2)} Md USD`, 'Valeur']}
                      labelFormatter={(label) => `Marché ${label}`}
                    />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Taux de croissance</CardTitle>
                <CardDescription>Croissance annuelle prévue</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center space-y-6">
                  {marketSizeData.map((item) => (
                    <div key={item.id}>
                      <div className="text-sm text-muted-foreground">{item.category}</div>
                      <div className="text-3xl font-bold text-green-500">+{item.trend_percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Analyse de l'opportunité</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  L'analyse du marché montre que le secteur Web3 et DeFi est en forte croissance, avec des projections 
                  atteignant $6.15 milliards pour Web3 et $32.36 milliards pour DeFi d'ici 2025.
                </p>
                <p>
                  Avec des taux de croissance annuels de 38.9% et 53.8% respectivement, le secteur représente 
                  une opportunité substantielle pour Veegox qui pourrait capter une part significative de ce marché
                  en proposant une suite complète de services.
                </p>
                <p>
                  <strong>Avantage concurrentiel:</strong> L'intégration de l'IA dans l'évaluation du crédit 
                  et les recommandations d'investissement positionnent Veegox avec un différenciateur unique face 
                  aux acteurs traditionnels comme Aave, qui se concentrent uniquement sur des métriques financières 
                  on-chain.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="defi" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>TVL par protocole (en milliards USD)</CardTitle>
                <CardDescription>Valeur totale verrouillée</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={tvlData.map(item => ({
                      name: item.metric_name.replace('TVL ', '').replace(' (USD)', ''),
                      value: item.metric_value / 1000000000,
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip 
                      formatter={(value: any) => [`${value.toFixed(2)} Md USD`, 'TVL']}
                    />
                    <Bar dataKey="value" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Part de marché DeFi</CardTitle>
                <CardDescription>Basée sur la TVL</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tvlData.map(item => ({
                        name: item.metric_name.replace('TVL ', '').replace(' (USD)', ''),
                        value: item.metric_value,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {tvlData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${(value / 1000000000).toFixed(2)} Md USD`, 'TVL']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Opportunité concurrentielle</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  Le marché de la DeFi est actuellement dominé par des protocoles comme Aave ($24.4Md) et Lido ($22.6Md), 
                  qui se concentrent sur des services spécifiques comme les prêts ou le staking.
                </p>
                <p>
                  <strong>Opportunité pour Veegox:</strong> Une plateforme all-in-one intégrant staking, prêts, échange et 
                  crowdfunding peut attirer des utilisateurs cherchant une expérience unifiée plutôt que d'utiliser 
                  plusieurs protocoles distincts.
                </p>
                <p>
                  L'intégration de l'IA pour l'évaluation du crédit et les recommandations d'investissement positionne 
                  Veegox avec un avantage technologique significatif face aux protocoles existants qui n'utilisent que 
                  des algorithmes déterministes.
                </p>
                <p>
                  Même en captant une petite fraction du marché DeFi total (estimé à plus de $50Md), 
                  Veegox pourrait rapidement atteindre une TVL substantielle.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="demographics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Répartition démographique des utilisateurs</CardTitle>
                <CardDescription>Par génération</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        ...demographicsData.map(item => ({
                          name: item.metric_name.replace(' Users Percentage', ''),
                          value: item.metric_value,
                        })),
                        { name: 'Autres', value: 100 - demographicsData.reduce((sum, item) => sum + item.metric_value, 0) },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicsData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <Cell fill={COLORS[(demographicsData.length) % COLORS.length]} />
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Pourcentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Implications stratégiques</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <p>
                  Les données démographiques montrent que les Millennials (40%) et la Gen Z (30%) 
                  constituent 70% des utilisateurs de Web3/DeFi.
                </p>
                <p>
                  <strong>Pour Veegox:</strong> Une interface utilisateur moderne, mobile-first, avec des 
                  fonctionnalités sociales intégrées permet de cibler efficacement ces segments clés.
                </p>
                <p>
                  Les jeunes utilisateurs sont plus susceptibles d'adopter des solutions all-in-one qui 
                  simplifient leur expérience Web3, représentant une opportunité majeure pour Veegox.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
