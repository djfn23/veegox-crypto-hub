
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign } from 'lucide-react';
import { useAPIIntegration } from '@/hooks/useAPIIntegration';
import { toast } from 'sonner';

export const StripePaymentTest = () => {
  const [amount, setAmount] = useState('49.99');
  const [currency, setCurrency] = useState('usd');
  const { purchaseCrypto, isLoading } = useAPIIntegration();

  const handleCreatePayment = async () => {
    try {
      const result = await purchaseCrypto(parseFloat(amount), currency);
      
      if (result?.url) {
        // Ouvrir Stripe Checkout dans un nouvel onglet
        window.open(result.url, '_blank');
        toast.success('Redirection vers Stripe Checkout...');
      } else {
        toast.error('Erreur lors de la création du paiement');
      }
    } catch (error: any) {
      toast.error(`Erreur: ${error.message}`);
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-400" />
          Test Paiement Stripe
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white">Montant</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white"
              placeholder="49.99"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-white">Devise</Label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>

        <Button
          onClick={handleCreatePayment}
          disabled={isLoading || !amount}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'Création...' : `Payer ${amount} ${currency.toUpperCase()}`}
        </Button>

        <div className="text-xs text-gray-400 mt-2">
          <p>💡 Mode test Stripe - utilisez 4242 4242 4242 4242 pour les tests</p>
        </div>
      </CardContent>
    </Card>
  );
};
