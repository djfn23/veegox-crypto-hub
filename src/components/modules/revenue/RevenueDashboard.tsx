
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Target,
  Euro,
  Activity
} from 'lucide-react';
import { useRevenue } from '@/hooks/useRevenue';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export const RevenueDashboard: React.FC = () => {
  const { revenueMetrics, revenueRecords, fees, isLoading } = useRevenue();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-slate-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métriques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Revenus Totaux</p>
                <p className="text-2xl font-bold text-white">
                  €{revenueMetrics?.totalRevenue?.toFixed(2) || '0.00'}
                </p>
                <p className="text-green-400 text-sm">30 derniers jours</p>
              </div>
              <Euro className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Transactions</p>
                <p className="text-2xl font-bold text-white">
                  {revenueRecords?.length || 0}
                </p>
                <p className="text-blue-400 text-sm">Ce mois</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Types de Revenus</p>
                <p className="text-2xl font-bold text-white">
                  {revenueMetrics?.topRevenueTypes?.length || 0}
                </p>
                <p className="text-purple-400 text-sm">Catégories actives</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/40 to-red-900/40 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm">Revenus Moyens</p>
                <p className="text-2xl font-bold text-white">
                  €{revenueRecords?.length ? (revenueMetrics?.totalRevenue / revenueRecords.length).toFixed(2) : '0.00'}
                </p>
                <p className="text-orange-400 text-sm">Par transaction</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des revenus dans le temps */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Évolution des Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueMetrics?.revenueByPeriod && revenueMetrics.revenueByPeriod.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueMetrics.revenueByPeriod}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `€${value.toFixed(0)}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }}
                    formatter={(value: number) => [`€${value.toFixed(2)}`, 'Revenus']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-400">
                Aucune donnée de revenus disponible
              </div>
            )}
          </CardContent>
        </Card>

        {/* Répartition par type */}
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Répartition des Revenus</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueMetrics?.topRevenueTypes && revenueMetrics.topRevenueTypes.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={revenueMetrics.topRevenueTypes.map((item, index) => ({
                        ...item,
                        color: COLORS[index % COLORS.length]
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="amount"
                    >
                      {revenueMetrics.topRevenueTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {revenueMetrics.topRevenueTypes.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-gray-300 text-sm">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-medium">€{item.amount.toFixed(2)}</span>
                        <span className="text-gray-400 text-xs ml-2">({item.percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-200 flex items-center justify-center text-gray-400">
                Aucune donnée de répartition disponible
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Configuration des frais */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Configuration des Frais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fees.map((fee) => (
              <div key={fee.id} className="bg-slate-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium capitalize">
                    {fee.transaction_type.replace('_', ' ')}
                  </h4>
                  <Badge className={fee.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                    {fee.is_active ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pourcentage</span>
                    <span className="text-white">{fee.fee_percentage}%</span>
                  </div>
                  {fee.minimum_fee && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Minimum</span>
                      <span className="text-white">€{fee.minimum_fee}</span>
                    </div>
                  )}
                  {fee.maximum_fee && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Maximum</span>
                      <span className="text-white">€{fee.maximum_fee}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions récentes */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Transactions Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {revenueRecords.slice(0, 10).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">
                      {record.revenue_type.replace('_', ' ')}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(record.timestamp).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">
                    +€{record.amount.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-sm">{record.currency}</p>
                </div>
              </div>
            ))}
            {revenueRecords.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                Aucune transaction de revenus trouvée
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
