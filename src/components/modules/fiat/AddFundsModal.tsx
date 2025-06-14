
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useFiatBalance } from '@/hooks/useFiatBalance';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
}

export const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  const { addFunds } = useFiatBalance();
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleAddFunds = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    setPaymentStatus('processing');
    
    try {
      // Create Stripe payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: numAmount,
          currency: currency,
          description: `Ajout de fonds - ${numAmount} ${currency}`
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        const checkoutWindow = window.open(data.url, '_blank');
        
        // Monitor for payment completion
        const checkPayment = async () => {
          try {
            const { data: verifyData } = await supabase.functions.invoke('verify-payment', {
              body: { session_id: data.session_id }
            });
            
            if (verifyData?.status === 'paid') {
              setPaymentStatus('success');
              toast.success('Paiement réussi ! Vos fonds ont été ajoutés.');
              
              // Close checkout window if still open
              if (checkoutWindow && !checkoutWindow.closed) {
                checkoutWindow.close();
              }
              
              // Refresh data and close modal
              setTimeout(() => {
                window.location.reload();
                onClose();
              }, 2000);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
          }
        };

        // Check payment status periodically
        const intervalId = setInterval(checkPayment, 3000);
        
        // Stop checking after 10 minutes
        setTimeout(() => {
          clearInterval(intervalId);
          setIsProcessing(false);
          setPaymentStatus('idle');
        }, 600000);
      }

    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('Erreur lors du paiement');
      setIsProcessing(false);
      setPaymentStatus('idle');
    }
  };

  const numAmount = parseFloat(amount) || 0;
  const canProcess = numAmount > 0 && numAmount >= 5 && !isProcessing;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-400" />
            Ajouter des fonds
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {paymentStatus === 'success' ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <div>
                <h3 className="text-white font-semibold text-lg">Paiement réussi !</h3>
                <p className="text-gray-400">Vos fonds ont été ajoutés à votre compte.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Information de sécurité */}
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Paiement sécurisé</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Vos paiements sont traités de manière sécurisée via Stripe.
                  Aucune information de carte n'est stockée sur nos serveurs.
                </p>
              </div>

              {/* Montant */}
              <div className="space-y-2">
                <Label className="text-white">Montant en {currency}</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  min="5"
                  step="0.01"
                  disabled={isProcessing}
                />
                <div className="flex gap-2">
                  {[10, 50, 100, 500].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                      className="border-slate-600 text-gray-400 hover:text-white"
                      disabled={isProcessing}
                    >
                      {preset} {currency}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Validation */}
              {numAmount > 0 && numAmount < 5 && (
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Montant minimum : 5 {currency}</span>
                </div>
              )}

              {/* Résumé */}
              {numAmount >= 5 && (
                <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
                  <h4 className="text-white font-medium">Résumé</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Montant à ajouter</span>
                    <span className="text-white">{numAmount.toFixed(2)} {currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Frais de traitement</span>
                    <span className="text-white">Inclus</span>
                  </div>
                  <hr className="border-slate-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-green-400 font-medium">
                      {numAmount.toFixed(2)} {currency}
                    </span>
                  </div>
                </div>
              )}

              {/* Status de traitement */}
              {paymentStatus === 'processing' && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-center">
                  <div className="animate-spin h-6 w-6 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-blue-400 text-sm">
                    Traitement du paiement en cours...
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Une nouvelle fenêtre s'est ouverte pour finaliser le paiement
                  </p>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                  disabled={isProcessing}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddFunds}
                  disabled={!canProcess}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Traitement...' : `Ajouter ${numAmount.toFixed(2)} ${currency}`}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
