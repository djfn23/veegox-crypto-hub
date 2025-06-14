
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ResendEmailTest = () => {
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'swap_success' | 'price_alert' | 'transaction_complete' | 'security_alert'>('swap_success');
  const [customData, setCustomData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!email) {
      toast.error('Veuillez entrer une adresse email');
      return;
    }

    setIsLoading(true);
    try {
      let data;
      
      switch (type) {
        case 'swap_success':
          data = {
            fromAmount: '0.5',
            fromToken: 'ETH',
            toAmount: '1500',
            toToken: 'USDC',
            txHash: '0x123...abc'
          };
          break;
        case 'price_alert':
          data = {
            token: 'BTC',
            price: '65000',
            currency: 'USD',
            change: 5.2
          };
          break;
        case 'transaction_complete':
          data = {
            amount: '0.1',
            token: 'ETH'
          };
          break;
        case 'security_alert':
          data = {
            message: 'Nouvelle connexion détectée depuis un appareil non reconnu'
          };
          break;
      }

      // Fusionner avec les données personnalisées si fournies
      if (customData) {
        try {
          const parsedData = JSON.parse(customData);
          data = { ...data, ...parsedData };
        } catch (error) {
          console.warn('Données JSON invalides, utilisation des données par défaut');
        }
      }

      const { error } = await supabase.functions.invoke('send-notification', {
        body: {
          to: email,
          type,
          data
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Email envoyé avec succès!');
      setEmail('');
      setCustomData('');
    } catch (error: any) {
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-400" />
          Test Notification Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email destinataire</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="test@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-white">Type de notification</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
          >
            <option value="swap_success">Swap réussi</option>
            <option value="price_alert">Alerte prix</option>
            <option value="transaction_complete">Transaction complétée</option>
            <option value="security_alert">Alerte sécurité</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customData" className="text-white">Données personnalisées (JSON optionnel)</Label>
          <Textarea
            id="customData"
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder='{"amount": "1.5", "token": "BTC"}'
            rows={3}
          />
        </div>

        <Button
          onClick={handleSendEmail}
          disabled={isLoading || !email}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4 mr-2" />
          {isLoading ? 'Envoi...' : 'Envoyer Notification'}
        </Button>

        <div className="text-xs text-gray-400 mt-2">
          <p>💡 L'email sera envoyé depuis VeegoX via Resend</p>
        </div>
      </CardContent>
    </Card>
  );
};
