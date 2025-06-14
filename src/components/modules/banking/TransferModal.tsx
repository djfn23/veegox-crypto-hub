
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BankAccount, cryptoBankService } from "@/services/cryptoBankService";
import { useToast } from "@/hooks/use-toast";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  accounts: BankAccount[];
  selectedAccount?: BankAccount | null;
}

export const TransferModal = ({ isOpen, onClose, onSuccess, accounts, selectedAccount }: TransferModalProps) => {
  const [fromAccountId, setFromAccountId] = useState(selectedAccount?.id || "");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const transferMutation = useMutation({
    mutationFn: (data: any) => cryptoBankService.createTransaction(data),
    onSuccess: () => {
      toast({
        title: "Transfert réussi",
        description: `${amount} MATIC transférés avec succès.`
      });
      onSuccess();
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de transfert",
        description: error.message || "Une erreur est survenue",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFromAccountId("");
    setToAccountId("");
    setAmount("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fromAccountId === toAccountId) {
      toast({
        title: "Erreur",
        description: "Vous ne pouvez pas transférer vers le même compte",
        variant: "destructive"
      });
      return;
    }

    transferMutation.mutate({
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      amount: parseFloat(amount),
      transaction_type: "transfer",
      payment_method: "internal",
      description: description || "Transfert interne"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Effectuer un transfert</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount" className="text-white">Compte source</Label>
            <Select value={fromAccountId} onValueChange={setFromAccountId}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner le compte source" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name} ({account.balance.toFixed(4)} MATIC)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toAccount" className="text-white">Compte destination</Label>
            <Select value={toAccountId} onValueChange={setToAccountId}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner le compte destination" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {accounts.filter(acc => acc.id !== fromAccountId).map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name} ({account.balance.toFixed(4)} MATIC)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white">Montant (MATIC)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description (optionnel)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Note sur le transfert"
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={transferMutation.isPending || !fromAccountId || !toAccountId || !amount}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {transferMutation.isPending ? "Transfert..." : "Transférer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
