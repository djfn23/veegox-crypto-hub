
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function TokenAnalyticsModule() {
  // Mock data for demonstration
  const priceData = [
    { date: '2024-01', price: 1.0 },
    { date: '2024-02', price: 1.2 },
    { date: '2024-03', price: 1.8 },
    { date: '2024-04', price: 1.5 },
    { date: '2024-05', price: 2.1 },
    { date: '2024-06', price: 2.4 }
  ];

  const holdersData = [
    { month: 'Jan', holders: 120 },
    { month: 'Fév', holders: 250 },
    { month: 'Mar', holders: 380 },
    { month: 'Avr', holders: 520 },
    { month: 'Mai', holders: 680 },
    { month: 'Juin', holders: 840 }
  ];

  const stats = [
    {
      title: "Valeur Totale",
      value: "$2.4M",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Détenteurs",
      value: "840",
      change: "+12.5%",
      trend: "up",
      icon: Users
    },
    {
      title: "Volume 24h",
      value: "$156K",
      change: "-5.2%",
      trend: "down",
      icon: Activity
    },
    {
      title: "Market Cap",
      value: "$3.2M",
      change: "+8.7%",
      trend: "up",
      icon: Target
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-white/60" />
                  <Badge className={`${
                    isPositive ? "bg-green-600" : "bg-red-600"
                  } text-white text-xs`}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/60 text-sm">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Chart */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Évolution du Prix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Holders Chart */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Croissance des Détenteurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={holdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar 
                  dataKey="holders" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Token Performance Table */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Performance des Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-white/60 text-sm">Token</th>
                  <th className="text-left p-3 text-white/60 text-sm">Prix</th>
                  <th className="text-left p-3 text-white/60 text-sm">24h</th>
                  <th className="text-left p-3 text-white/60 text-sm">Volume</th>
                  <th className="text-left p-3 text-white/60 text-sm">Market Cap</th>
                  <th className="text-left p-3 text-white/60 text-sm">Détenteurs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">MT</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Mon Token</p>
                        <p className="text-white/60 text-sm">MT</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-white">$2.41</td>
                  <td className="p-3">
                    <Badge className="bg-green-600 text-white">+15.3%</Badge>
                  </td>
                  <td className="p-3 text-white">$156K</td>
                  <td className="p-3 text-white">$3.2M</td>
                  <td className="p-3 text-white">840</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
