
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CreditCard, Mail, CheckCircle, XCircle } from 'lucide-react';

export const RecentActivityWidget = () => {
  const activities = [
    {
      id: 1,
      type: 'payment',
      description: 'Test de paiement Stripe',
      status: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
      icon: <CreditCard className="h-4 w-4 text-green-400" />
    },
    {
      id: 2,
      type: 'email',
      description: 'Notification email envoyée',
      status: 'success',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
      icon: <Mail className="h-4 w-4 text-blue-400" />
    },
    {
      id: 3,
      type: 'system',
      description: 'APIs initialisées',
      status: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
      icon: <CheckCircle className="h-4 w-4 text-purple-400" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">Réussi</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      case 'pending':
        return <Badge variant="secondary">En cours</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Activité Récente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {activity.icon}
              <div>
                <p className="text-white text-sm font-medium">
                  {activity.description}
                </p>
                <p className="text-gray-400 text-xs">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
            {getStatusBadge(activity.status)}
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Aucune activité récente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
