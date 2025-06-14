
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Mail, Settings, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActionsWidget = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: 'Test Paiement',
      description: 'Tester Stripe',
      onClick: () => navigate('/api-test'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Test Email',
      description: 'Tester Resend',
      onClick: () => navigate('/api-test'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'APIs Status',
      description: 'Voir le statut',
      onClick: () => navigate('/api-test'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      icon: <Zap className="h-4 w-4" />,
      label: 'Trading',
      description: 'Échanger crypto',
      onClick: () => navigate('/trading'),
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              className={`${action.color} flex flex-col items-center gap-2 h-auto py-4`}
            >
              {action.icon}
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
