
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAPIIntegration } from '@/hooks/useAPIIntegration';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { verifyPayment } = useAPIIntegration();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const checkPayment = async () => {
      if (!sessionId) {
        setError('ID de session manquant');
        setIsLoading(false);
        return;
      }

      try {
        const result = await verifyPayment(sessionId);
        setPaymentData(result);
        
        if (result.status === 'paid') {
          toast.success('Paiement confirmé avec succès!');
        } else {
          toast.warning(`Statut du paiement: ${result.status}`);
        }
      } catch (error: any) {
        setError(error.message);
        toast.error('Erreur lors de la vérification du paiement');
      } finally {
        setIsLoading(false);
      }
    };

    checkPayment();
  }, [sessionId, verifyPayment]);

  if (isLoading) {
    return (
      <PageLayout title="Vérification du paiement" subtitle="Validation en cours...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Erreur de paiement" subtitle="Une erreur s'est produite">
        <Card className="bg-red-900/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Erreur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-300">{error}</p>
            <Button
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-red-600 hover:bg-red-700"
            >
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  const isSuccess = paymentData?.status === 'paid';

  return (
    <PageLayout 
      title={isSuccess ? "Paiement réussi" : "Paiement en attente"} 
      subtitle="Détails de votre transaction"
    >
      <Card className={`${isSuccess ? 'bg-green-900/20 border-green-500/30' : 'bg-yellow-900/20 border-yellow-500/30'}`}>
        <CardHeader>
          <CardTitle className={`${isSuccess ? 'text-green-400' : 'text-yellow-400'} flex items-center gap-2`}>
            {isSuccess ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {isSuccess ? 'Paiement confirmé' : 'Paiement en attente'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentData && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Statut:</span>
                <span className={`font-medium ${isSuccess ? 'text-green-400' : 'text-yellow-400'}`}>
                  {paymentData.status}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Montant:</span>
                <span className="text-white font-medium">
                  {(paymentData.amount / 100).toFixed(2)} {paymentData.currency?.toUpperCase()}
                </span>
              </div>

              {paymentData.customer_email && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{paymentData.customer_email}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-400">ID Session:</span>
                <span className="text-gray-300 text-sm font-mono">
                  {sessionId?.substring(0, 20)}...
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Retour à l'accueil
            </Button>
            <Button
              onClick={() => window.location.href = '/api-test'}
              variant="outline"
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700"
            >
              Nouveau test
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default PaymentSuccess;
