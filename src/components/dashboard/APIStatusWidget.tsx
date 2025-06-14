
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { useAPIIntegration } from '@/hooks/useAPIIntegration';

export const APIStatusWidget = () => {
  const { apiStatus, isAPIEnabled } = useAPIIntegration();

  const getStatusIcon = (enabled: boolean) => {
    if (enabled) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (enabled: boolean) => {
    return (
      <Badge variant={enabled ? "default" : "destructive"}>
        {enabled ? "Actif" : "Inactif"}
      </Badge>
    );
  };

  const apiLinks = {
    '1inch': 'https://1inch.io/',
    'coingecko': 'https://www.coingecko.com/',
    'stripe': 'https://stripe.com/',
    'alchemy': 'https://www.alchemy.com/',
    'resend': 'https://resend.com/',
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Statut des APIs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from(apiStatus.entries()).map(([key, config]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(config.enabled)}
              <div>
                <p className="text-white font-medium">{config.name}</p>
                {config.baseUrl && (
                  <p className="text-gray-400 text-sm">{config.baseUrl}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(config.enabled)}
              {apiLinks[key as keyof typeof apiLinks] && (
                <a
                  href={apiLinks[key as keyof typeof apiLinks]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            💡 <strong>Configuration requise:</strong>
          </p>
          <ul className="text-blue-200 text-xs mt-2 space-y-1">
            <li>• Stripe: Clé secrète dans les secrets Supabase</li>
            <li>• Resend: Clé API pour les notifications email</li>
            <li>• 1inch: Optionnel - améliore les limites de taux</li>
            <li>• Alchemy: Clé API pour les fonctionnalités wallet avancées</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
