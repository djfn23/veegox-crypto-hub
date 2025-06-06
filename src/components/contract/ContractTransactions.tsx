
import { useState } from 'react';
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractTransfer, useContractApprove, useContractBurn } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Send, CheckCircle, Flame, Wallet } from "lucide-react";
import { toast } from "sonner";

export const ContractTransactions = () => {
  const { connectedWallet, connectMetaMask, isConnecting } = useWeb3Wallet();
  const [transferData, setTransferData] = useState({ to: '', amount: '' });
  const [approveData, setApproveData] = useState({ spender: '', amount: '' });
  const [burnAmount, setBurnAmount] = useState('');

  const transferMutation = useContractTransfer();
  const approveMutation = useContractApprove();
  const burnMutation = useContractBurn();

  if (!connectedWallet) {
    return (
      <GlassCard className="p-6 text-center">
        <div className="space-y-4">
          <Wallet className="h-12 w-12 text-purple-400 mx-auto" />
          <h3 className="text-xl font-semibold text-white">Connecter un Wallet</h3>
          <p className="text-gray-400">
            Connectez votre wallet MetaMask pour interagir avec le contrat
          </p>
          <GradientButton 
            onClick={connectMetaMask}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? "Connexion..." : "Connecter MetaMask"}
          </GradientButton>
        </div>
      </GlassCard>
    );
  }

  const handleTransfer = async () => {
    if (!transferData.to || !transferData.amount) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    transferMutation.mutate(transferData);
  };

  const handleApprove = async () => {
    if (!approveData.spender || !approveData.amount) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    approveMutation.mutate(approveData);
  };

  const handleBurn = async () => {
    if (!burnAmount) {
      toast.error('Veuillez entrer un montant');
      return;
    }
    burnMutation.mutate({ amount: burnAmount });
  };

  return (
    <div className="space-y-6">
      {/* Wallet connecté */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🦊</span>
            <div>
              <p className="text-white font-semibold">Wallet connecté</p>
              <p className="text-gray-400 text-sm font-mono">
                {connectedWallet.address.substring(0, 6)}...{connectedWallet.address.substring(connectedWallet.address.length - 4)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-400 text-sm">✓ Polygon</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Transfer */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Transfer</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Destinataire</Label>
                <Input
                  placeholder="0x..."
                  value={transferData.to}
                  onChange={(e) => setTransferData({...transferData, to: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Montant</Label>
                <Input
                  placeholder="100"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <GradientButton 
                onClick={handleTransfer}
                disabled={transferMutation.isPending}
                className="w-full"
              >
                {transferMutation.isPending ? "Envoi..." : "Envoyer"}
              </GradientButton>
            </div>
          </div>
        </GlassCard>

        {/* Approve */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Approve</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Spender</Label>
                <Input
                  placeholder="0x..."
                  value={approveData.spender}
                  onChange={(e) => setApproveData({...approveData, spender: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Montant</Label>
                <Input
                  placeholder="100"
                  value={approveData.amount}
                  onChange={(e) => setApproveData({...approveData, amount: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <GradientButton 
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                className="w-full"
                variant="outline"
              >
                {approveMutation.isPending ? "Approbation..." : "Approuver"}
              </GradientButton>
            </div>
          </div>
        </GlassCard>

        {/* Burn */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Burn</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Montant à brûler</Label>
                <Input
                  placeholder="100"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <GradientButton 
                onClick={handleBurn}
                disabled={burnMutation.isPending}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                {burnMutation.isPending ? "Burning..." : "Burn Tokens"}
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
