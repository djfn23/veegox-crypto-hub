
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cryptoBankService } from "@/services/cryptoBankService";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export const CreateAccountModal = ({ isOpen, onClose, onSuccess, userId }: CreateAccountModalProps) => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [initialDeposit, setInitialDeposit] = useState("");
  const { toast } = useToast();

  const createAccountMutation = useMutation({
    mutationFn: (data: any) => cryptoBankService.createBankAccount(data),
    onSuccess: () => {
      toast({
        title: "Compte créé avec succès",
        description: `Le compte ${accountName} a été créé.`
      });
      onSuccess();
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Erreur lors de la création",
        description: error.message || "Une erreur est survenue",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setAccountName("");
    setAccountType("checking");
    setInitialDeposit("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createAccountMutation.mutate({
      user_id: userId,
      account_name: accountName,
      account_type: accountType,
      balance: parseFloat(initialDeposit) || 0,
      is_primary: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Créer un nouveau compte</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="accountName" className="text-white">Nom du compte</Label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Mon compte principal"
              className="bg-slate-800 border-slate-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-white">Type de compte</Label>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="checking">Compte Courant</SelectItem>
                <SelectItem value="savings">Compte Épargne</SelectItem>
                <SelectItem value="business">Compte Professionnel</SelectItem>
                <SelectItem value="term_deposit">Dépôt à terme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialDeposit" className="text-white">Dépôt initial (MATIC)</Label>
            <Input
              id="initialDeposit"
              type="number"
              step="0.0001"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              placeholder="0.0000"
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={createAccountMutation.isPending}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {createAccountMutation.isPending ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
