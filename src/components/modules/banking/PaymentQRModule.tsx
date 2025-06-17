
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Scan, Send, ArrowDownToLine, Copy, Share } from "lucide-react";
import { MobileQRScanner } from "@/components/ui/mobile-qr-scanner";
import { MobileKeypad } from "@/components/ui/mobile-keypad";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { useToast } from "@/hooks/use-toast";

interface PaymentQRModuleProps {
  userId: string;
  userAccounts: Array<{ id: string; account_name: string; balance: number }>;
}

export const PaymentQRModule = ({ userId, userAccounts }: PaymentQRModuleProps) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const { isMobile } = useResponsiveLayout();
  const { toast } = useToast();

  const handleGenerateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez saisir un montant valide",
        variant: "destructive",
      });
      return;
    }

    const qrData = {
      type: 'payment_request',
      amount: parseFloat(amount),
      currency: 'MATIC',
      recipient: userId,
      description: description || 'Demande de paiement',
      timestamp: Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24h expiration
    };

    setGeneratedQR(JSON.stringify(qrData));
    toast({
      title: "QR Code généré",
      description: "Partagez ce code pour recevoir le paiement",
    });
  };

  const handleQRScan = (data: string) => {
    try {
      const paymentData = JSON.parse(data);
      
      if (paymentData.type === 'payment_request') {
        setAmount(paymentData.amount.toString());
        setDescription(paymentData.description);
        setShowScanner(false);
        
        toast({
          title: "QR Code scanné",
          description: `Demande de paiement: ${paymentData.amount} ${paymentData.currency}`,
        });
      } else {
        throw new Error('QR Code invalide');
      }
    } catch (error) {
      toast({
        title: "QR Code invalide",
        description: "Ce QR code ne contient pas de données de paiement valides",
        variant: "destructive",
      });
    }
  };

  const handleCopyQR = () => {
    if (generatedQR) {
      navigator.clipboard.writeText(generatedQR);
      toast({
        title: "Copié",
        description: "Données QR copiées dans le presse-papiers",
      });
    }
  };

  const handleShareQR = async () => {
    if (generatedQR && navigator.share) {
      try {
        await navigator.share({
          title: 'Demande de paiement Veegox',
          text: `Paiement de ${amount} MATIC - ${description}`,
          url: `data:text/plain,${encodeURIComponent(generatedQR)}`
        });
      } catch (error) {
        handleCopyQR(); // Fallback to copy
      }
    } else {
      handleCopyQR(); // Fallback to copy
    }
  };

  const handleNumberPress = (number: string) => {
    if (number === '.') {
      if (amount.includes('.')) return; // Prevent multiple decimals
      setAmount(amount + number);
    } else {
      setAmount(amount + number);
    }
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const CardComponent = isMobile ? MobileCard : Card;
  const CardContentComponent = isMobile ? MobileCardContent : CardContent;
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader;
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <CardComponent>
          <CardHeaderComponent>
            <CardTitleComponent className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-purple-400" />
              Paiements QR Code
            </CardTitleComponent>
            <p className="text-gray-400 text-sm">
              Générez ou scannez des QR codes pour les paiements instantanés
            </p>
          </CardHeaderComponent>
        </CardComponent>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardComponent>
            <CardHeaderComponent>
              <CardTitleComponent className="text-base flex items-center gap-2">
                <ArrowDownToLine className="h-4 w-4 text-green-400" />
                Recevoir un Paiement
              </CardTitleComponent>
            </CardHeaderComponent>
            <CardContentComponent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="amount" className="text-white">Montant (MATIC)</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-slate-800 border-slate-600 text-white text-right pr-12"
                      readOnly={isMobile}
                      onClick={() => isMobile && setShowKeypad(true)}
                    />
                    {isMobile && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowKeypad(true)}
                      >
                        123
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">Description (optionelle)</Label>
                  <Input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Pour quoi?"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerateQR}
                className="w-full bg-green-600 hover:bg-green-700"
                size={isMobile ? "lg" : "default"}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Générer QR Code
              </Button>
            </CardContentComponent>
          </CardComponent>

          <CardComponent>
            <CardHeaderComponent>
              <CardTitleComponent className="text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-blue-400" />
                Envoyer un Paiement
              </CardTitleComponent>
            </CardHeaderComponent>
            <CardContentComponent className="space-y-4">
              <p className="text-gray-400 text-sm">
                Scannez un QR code pour effectuer un paiement instantané
              </p>

              <Button
                onClick={() => setShowScanner(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size={isMobile ? "lg" : "default"}
              >
                <Scan className="h-4 w-4 mr-2" />
                Scanner QR Code
              </Button>

              {amount && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>Paiement détecté:</strong><br />
                    {amount} MATIC - {description}
                  </p>
                  <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                    Confirmer le Paiement
                  </Button>
                </div>
              )}
            </CardContentComponent>
          </CardComponent>
        </div>

        {/* Generated QR Code */}
        {generatedQR && (
          <CardComponent>
            <CardHeaderComponent>
              <CardTitleComponent>QR Code Généré</CardTitleComponent>
            </CardHeaderComponent>
            <CardContentComponent className="text-center space-y-4">
              {/* QR Code Placeholder */}
              <div className="mx-auto w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                <div className="text-center text-black">
                  <QrCode className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-xs">QR Code</p>
                  <p className="text-xs font-bold">{amount} MATIC</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-white font-medium">
                  Montant: {amount} MATIC
                </p>
                {description && (
                  <p className="text-gray-400 text-sm">
                    {description}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Expire dans 24 heures
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCopyQR}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300"
                  size={isMobile ? "lg" : "default"}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copier
                </Button>
                <Button
                  onClick={handleShareQR}
                  variant="outline"
                  className="flex-1 border-purple-600 text-purple-400"
                  size={isMobile ? "lg" : "default"}
                >
                  <Share className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardContentComponent>
          </CardComponent>
        )}
      </div>

      {/* QR Scanner Modal */}
      <MobileQRScanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleQRScan}
        title="Scanner QR Code de Paiement"
      />

      {/* Mobile Keypad Modal */}
      {showKeypad && isMobile && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-slate-900 rounded-t-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Saisir le montant</h3>
              <Button
                onClick={() => setShowKeypad(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400"
              >
                Fermer
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="text-center text-2xl font-bold text-white mb-2">
                {amount || "0"} MATIC
              </div>
            </div>

            <MobileKeypad
              onNumberPress={handleNumberPress}
              onBackspace={handleBackspace}
              showDecimal={true}
            />
          </div>
        </div>
      )}
    </>
  );
};
