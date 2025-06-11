
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cryptoBankService } from "@/services/cryptoBankService";
import { tokenEcosystemService } from "@/services/tokenEcosystemService";
import { useQuery } from "@tanstack/react-query";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export const CreateAccountModal = ({ isOpen, onClose, onSuccess, userId }: CreateAccountModalProps) => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<'checking' | 'savings' | 'term_deposit' | 'business'>('checking');
  const [selectedToken, setSelectedToken] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { data: tokens } = useQuery({
    queryKey: ['ecosystem-tokens'],
    queryFn: () => tokenEcosystemService.getAllTokens()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !selectedToken) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await cryptoBankService.createBankAccount({
        user_id: userId,
        account_name: accountName,
        account_type: accountType,
        token_address: selectedToken,
        balance: 0,
        interest_rate: interestRate,
        is_active: true,
        is_primary: false
      });

      toast({
        title: "Compte créé",
        description: "Votre nouveau compte bancaire a été créé avec succès"
      });

      setAccountName("");
      setAccountType('checking');
      setSelectedToken("");
      setInterestRate(0);
      onSuccess();
    } catch (error) {
      console.error('Error creating account:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le compte",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeDescription = (type: string) => {
    const descriptions = {
      'checking': 'Pour vos transactions quotidiennes',
      'savings': 'Pour épargner avec intérêts',
      'term_deposit': 'Dépôt bloqué avec taux garanti',
      'business': 'Pour vos activités professionnelles'
    };
    return descriptions[type as keyof typeof descriptions];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Créer un nouveau compte</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="accountName">Nom du compte</Label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Mon compte principal"
              className="bg-gray-800 border-gray-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Type de compte</Label>
            <Select value={accountType} onValueChange={(value: any) => setAccountType(value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">
                  <div>
                    <div className="font-medium">Compte Courant</div>
                    <div className="text-sm text-gray-400">Pour vos transactions quotidiennes</div>
                  </div>
                </SelectItem>
                <SelectItem value="savings">
                  <div>
                    <div className="font-medium">Compte Épargne</div>
                    <div className="text-sm text-gray-400">Pour épargner avec intérêts</div>
                  </div>
                </SelectItem>
                <SelectItem value="term_deposit">
                  <div>
                    <div className="font-medium">Dépôt à Terme</div>
                    <div className="text-sm text-gray-400">Dépôt bloqué avec taux garanti</div>
                  </div>
                </SelectItem>
                <SelectItem value="business">
                  <div>
                    <div className="font-medium">Compte Professionnel</div>
                    <div className="text-sm text-gray-400">Pour vos activités professionnelles</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="selectedToken">Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Sélectionner un token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">MATIC</div>
                      <div className="text-sm text-gray-400">Polygon Native</div>
                    </div>
                  </div>
                </SelectItem>
                {tokens?.map((token) => (
                  <SelectItem key={token.id} value={token.address}>
                    <div className="flex items-center gap-2">
                      {token.logo ? (
                        <img src={token.logo} alt={token.symbol} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      )}
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-sm text-gray-400">{token.name}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(accountType === 'savings' || accountType === 'term_deposit') && (
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taux d'intérêt annuel (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                placeholder="5.0"
                className="bg-gray-800 border-gray-600"
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Création..." : "Créer le compte"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
