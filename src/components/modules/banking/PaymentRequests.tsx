
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Copy, Share2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cryptoBankService } from "@/services/cryptoBankService";

interface PaymentRequestsProps {
  userId: string;
}

export const PaymentRequests = ({ userId }: PaymentRequestsProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQR = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un montant valide",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const qrData = await cryptoBankService.createPaymentRequest(
        parseFloat(amount),
        "native", // MATIC native
        description,
        userId // Pass the userId as creatorId
      );

      setGeneratedQR(qrData);
      toast({
        title: "QR Code généré",
        description: "Votre demande de paiement a été créée avec succès"
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le QR code",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedQR) {
      navigator.clipboard.writeText(generatedQR);
      toast({
        title: "Copié",
        description: "Données QR copiées dans le presse-papier"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Demandes de Paiement</h2>
        <p className="text-gray-400">Créez des QR codes pour recevoir des paiements crypto</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Générateur de QR Code */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Générer un QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Montant (MATIC)</Label>
              <Input
                id="amount"
                type="number"
                step="0.0001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description (optionnel)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du paiement..."
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button
              onClick={handleGenerateQR}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? "Génération..." : "Générer QR Code"}
            </Button>
          </CardContent>
        </Card>

        {/* Aperçu du QR Code */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Aperçu du QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedQR ? (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg flex items-center justify-center">
                  <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-gray-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Données du QR Code:</p>
                  <div className="bg-gray-700 p-3 rounded text-xs text-white font-mono break-all">
                    {generatedQR}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copier
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Générez un QR code pour recevoir des paiements</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historique des demandes */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Historique des Demandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400">Aucune demande de paiement récente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
