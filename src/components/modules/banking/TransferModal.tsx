
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cryptoBankService, BankAccount } from "@/services/cryptoBankService";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: BankAccount[];
  selectedAccount?: BankAccount | null;
  onSuccess: () => void;
}

export const TransferModal = ({ isOpen, onClose, accounts, selectedAccount, onSuccess }: TransferModalProps) => {
  const [fromAccountId, setFromAccountId] = useState(selectedAccount?.id || "");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccountId || !toAccountId || !amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    if (fromAccountId === toAccountId) {
      toast({
        title: "Erreur",
        description: "Les comptes source et destination doivent être différents",
        variant: "destructive"
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      toast({
        title: "Erreur",
        description: "Le montant doit être positif",
        variant: "destructive"
      });
      return;
    }

    const fromAccount = accounts.find(acc => acc.id === fromAccountId);
    if (fromAccount && fromAccount.balance < transferAmount) {
      toast({
        title: "Erreur",
        description: "Solde insuffisant",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await cryptoBankService.processTransfer(fromAccountId, toAccountId, transferAmount, description);

      toast({
        title: "Transfert réussi",
        description: `${transferAmount} MATIC transférés avec succès`
      });

      setFromAccountId("");
      setToAccountId("");
      setAmount("");
      setDescription("");
      onSuccess();
    } catch (error: any) {
      console.error('Error processing transfer:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'effectuer le transfert",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fromAccount = accounts.find(acc => acc.id === fromAccountId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Transférer des fonds</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">Compte source</Label>
            <Select value={fromAccountId} onValueChange={setFromAccountId}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Sélectionner le compte source" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-medium">{account.account_name}</div>
                        <div className="text-sm text-gray-400">
                          {account.balance.toFixed(4)} MATIC
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fromAccount && (
              <p className="text-sm text-gray-400">
                Solde disponible: {fromAccount.balance.toFixed(4)} MATIC
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="toAccount">Compte destination</Label>
            <Select value={toAccountId} onValueChange={setToAccountId}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue placeholder="Sélectionner le compte destination" />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  .filter(account => account.id !== fromAccountId)
                  .map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div>
                        <div className="font-medium">{account.account_name}</div>
                        <div className="text-sm text-gray-400">
                          {account.balance.toFixed(4)} MATIC
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant (MATIC)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              className="bg-gray-800 border-gray-600"
              required
            />
            {fromAccount && amount && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Montant à transférer:</span>
                <span className="text-white">{amount} MATIC</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Note sur cette transaction..."
              className="bg-gray-800 border-gray-600"
              rows={3}
            />
          </div>

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
              {isLoading ? "Transfert..." : "Transférer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
