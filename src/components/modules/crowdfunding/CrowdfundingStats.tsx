
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Target, Clock, Star } from "lucide-react";

const CrowdfundingStats = () => {
  const stats = [
    {
      title: "Fonds Collectés",
      value: "$2.4M",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Campagnes Actives",
      value: "156",
      change: "+8",
      trend: "up",
      icon: Target,
      color: "text-blue-400"
    },
    {
      title: "Contributeurs",
      value: "12.8K",
      change: "+1.2K",
      trend: "up",
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Taux de Réussite",
      value: "87%",
      change: "+3%",
      trend: "up",
      icon: Star,
      color: "text-yellow-400"
    }
  ];

  const recentActivity = [
    {
      type: "contribution",
      user: "0x1234...5678",
      amount: "$1,500",
      campaign: "DeFi Protocol",
      time: "Il y a 2 min"
    },
    {
      type: "launch",
      user: "0xabcd...ef01",
      campaign: "NFT Marketplace",
      time: "Il y a 15 min"
    },
    {
      type: "milestone",
      campaign: "Gaming DAO",
      milestone: "75% atteint",
      time: "Il y a 1h"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activité récente */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex-1">
                {activity.type === 'contribution' && (
                  <div>
                    <p className="text-white text-sm">
                      <span className="text-blue-400">{activity.user}</span> a contribué{" "}
                      <span className="text-green-400 font-semibold">{activity.amount}</span> à{" "}
                      <span className="text-purple-400">{activity.campaign}</span>
                    </p>
                  </div>
                )}
                {activity.type === 'launch' && (
                  <div>
                    <p className="text-white text-sm">
                      <span className="text-blue-400">{activity.user}</span> a lancé{" "}
                      <span className="text-purple-400">{activity.campaign}</span>
                    </p>
                  </div>
                )}
                {activity.type === 'milestone' && (
                  <div>
                    <p className="text-white text-sm">
                      <span className="text-purple-400">{activity.campaign}</span> a atteint{" "}
                      <span className="text-yellow-400 font-semibold">{activity.milestone}</span>
                    </p>
                  </div>
                )}
              </div>
              <span className="text-gray-400 text-xs">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CrowdfundingStats;
