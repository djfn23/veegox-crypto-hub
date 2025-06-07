
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface CreateListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userAddress: string;
}

export const CreateListingModal = ({ open, onOpenChange, userAddress }: CreateListingModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    contractAddress: "",
    tokenId: "",
    price: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ici, on devrait d'abord vérifier que l'utilisateur possède bien le NFT
      // et récupérer ses métadonnées depuis la blockchain
      
      const { error } = await supabase
        .from('nft_listings')
        .insert({
          seller_id: userAddress,
          contract_address: formData.contractAddress,
          token_id: formData.tokenId,
          price: parseFloat(formData.price),
          currency_address: 'native',
          status: 'active',
          metadata: {
            description: formData.description
          }
        });

      if (error) throw error;

      toast({
        title: "Annonce créée",
        description: "Votre NFT est maintenant en vente sur la marketplace",
      });

      setFormData({ contractAddress: "", tokenId: "", price: "", description: "" });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Créer une annonce NFT</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="contractAddress" className="text-gray-300">
              Adresse du contrat
            </Label>
            <Input
              id="contractAddress"
              value={formData.contractAddress}
              onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
              placeholder="0x..."
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="tokenId" className="text-gray-300">
              Token ID
            </Label>
            <Input
              id="tokenId"
              value={formData.tokenId}
              onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
              placeholder="1"
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-gray-300">
              Prix (MATIC)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.001"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="1.0"
              className="bg-gray-800 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description (optionnelle)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez votre NFT..."
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-600 text-gray-300"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? <LoadingSpinner /> : "Créer l'annonce"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
