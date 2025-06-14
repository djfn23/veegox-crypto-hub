
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => {
  return (
    <PageLayout 
      title="Paiement Annulé" 
      subtitle="Votre paiement a été annulé"
    >
      <Card className="bg-yellow-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Paiement Annulé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>
          
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => window.location.href = '/api-test'}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Réessayer le paiement
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default PaymentCanceled;
