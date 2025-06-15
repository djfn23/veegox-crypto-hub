
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => (
  <AppLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="bg-yellow-900/20 border-yellow-500/30 w-full max-w-md">
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
    </div>
  </AppLayout>
);

export default PaymentCanceled;
