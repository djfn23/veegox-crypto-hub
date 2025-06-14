
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, Settings, RefreshCw } from "lucide-react";
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { useWeb3Wallet } from '@/hooks/useWeb3Wallet';
import { toast } from 'sonner';

const WalletManager = () => {
  const { user } = useUnifiedAuth();
  const { connectedWallet, isConnecting, connectMetaMask, disconnectWallet } = useWeb3Wallet();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleConnectWallet = async () => {
    try {
      await connectMetaMask();
    } catch (error) {
      console.error('Erreur de connexion wallet:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Wallet rafraîchi');
    } catch (error) {
      toast.error('Erreur lors du rafraîchissement');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-slate-900/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Wallet className="h-12 w-12 text-gray-400 mx-auto" />
            <p className="text-gray-400">Connectez-vous pour gérer vos wallets</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Gestion des Wallets
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-slate-600"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {connectedWallet ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">{connectedWallet.icon}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{connectedWallet.name}</div>
                  <div className="text-gray-400 text-sm font-mono">
                    {connectedWallet.address.substring(0, 6)}...{connectedWallet.address.substring(connectedWallet.address.length - 4)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Connecté
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={disconnectWallet}
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  Déconnecter
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
              <Wallet className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Aucun wallet connecté</h3>
              <p className="text-gray-400 text-sm mb-4">
                Connectez votre wallet pour accéder aux fonctionnalités DeFi
              </p>
              <Button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connexion...' : 'Connecter Wallet'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { WalletManager };
