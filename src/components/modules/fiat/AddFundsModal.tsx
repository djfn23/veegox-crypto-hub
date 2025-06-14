
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Shield, AlertCircle } from 'lucide-react';
import { useFiatBalance } from '@/hooks/useFiatBalance';
import { supabase } from '@/integrations/supabase/client';

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

  const handleAddFunds = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    
    try {
      // Create Stripe payment intent
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: Math.round(numAmount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          description: `Ajout de fonds - ${numAmount} ${currency}`
        }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }

      // For demo purposes, we'll simulate the payment completion
      // In production, this would be handled by webhooks
      setTimeout(async () => {
        try {
          await addFunds.mutateAsync({
            amount: numAmount,
            stripePaymentIntentId: 'demo_payment_intent'
          });
          
          setAmount('');
          onClose();
        } catch (error) {
          console.error('Failed to add funds:', error);
        } finally {
          setIsProcessing(false);
        }
      }, 2000);

    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
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
          {/* Information */}
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
            />
            <div className="flex gap-2">
              {[10, 50, 100, 500].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className="border-slate-600 text-gray-400 hover:text-white"
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
                <span className="text-gray-400">Frais</span>
                <span className="text-white">0.00 {currency}</span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
