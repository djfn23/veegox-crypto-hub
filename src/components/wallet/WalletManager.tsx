import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { Wallet, Plus, Star, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WalletData {
  id: string;
  address: string;
  nickname?: string;
  is_primary: boolean;
  chain_type: string;
  chain_id: number;
}

export const WalletManager = () => {
  const { user } = useUnifiedAuth();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [newWalletNickname, setNewWalletNickname] = useState('');

  const { data: wallets, isLoading } = useQuery({
    queryKey: ['user-wallets'],
    queryFn: async (): Promise<WalletData[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const addWalletMutation = useMutation({
    mutationFn: async ({ address, nickname }: { address: string; nickname?: string }) => {
      if (!user) throw new Error('Non authentifié');

      const { data, error } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          address: address.toLowerCase(),
          nickname,
          chain_type: 'polygon',
          chain_id: 137,
          is_primary: (wallets?.length || 0) === 0, // First wallet is primary
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallets'] });
      toast.success('Wallet ajouté avec succès !');
      setNewWalletAddress('');
      setNewWalletNickname('');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de l\'ajout du wallet');
    },
  });

  const setPrimaryMutation = useMutation({
    mutationFn: async (walletId: string) => {
      if (!user) throw new Error('Non authentifié');

      // First, set all wallets to non-primary
      await supabase
        .from('wallets')
        .update({ is_primary: false })
        .eq('user_id', user.id);

      // Then set the selected wallet as primary
      const { error } = await supabase
        .from('wallets')
        .update({ is_primary: true })
        .eq('id', walletId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallets'] });
      toast.success('Wallet principal mis à jour !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    },
  });

  const deleteWalletMutation = useMutation({
    mutationFn: async (walletId: string) => {
      const { error } = await supabase
        .from('wallets')
        .delete()
        .eq('id', walletId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallets'] });
      toast.success('Wallet supprimé !');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });

  const handleAddWallet = () => {
    if (!newWalletAddress.trim()) {
      toast.error('Veuillez entrer une adresse de wallet');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(newWalletAddress)) {
      toast.error('Format d\'adresse invalide');
      return;
    }

    addWalletMutation.mutate({
      address: newWalletAddress,
      nickname: newWalletNickname || undefined,
    });
  };

  if (!user) {
    return (
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-gray-400">
            Connectez-vous pour gérer vos wallets
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
            <Wallet className="h-4 w-4 md:h-5 md:w-5" />
            Ajouter un Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wallet-address" className="text-white text-sm">
              Adresse du Wallet
            </Label>
            <Input
              id="wallet-address"
              placeholder="0x..."
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet-nickname" className="text-white text-sm">
              Surnom (optionnel)
            </Label>
            <Input
              id="wallet-nickname"
              placeholder="Mon wallet principal"
              value={newWalletNickname}
              onChange={(e) => setNewWalletNickname(e.target.value)}
              className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
            />
          </div>
          <Button 
            onClick={handleAddWallet}
            disabled={addWalletMutation.isPending}
            className={`w-full bg-blue-600 hover:bg-blue-700 ${isMobile ? 'h-12 text-base' : ''}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter le Wallet
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-lg md:text-xl">
            Mes Wallets ({wallets?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-400">Chargement...</p>
          ) : wallets?.length === 0 ? (
            <p className="text-gray-400 text-center py-6">
              Aucun wallet ajouté
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {wallets?.map((wallet) => (
                <div
                  key={wallet.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border border-white/10 rounded-lg space-y-3 sm:space-y-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-white">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </span>
                      {wallet.is_primary && (
                        <Badge variant="default" className="text-xs bg-blue-600">
                          <Star className="h-3 w-3 mr-1" />
                          Principal
                        </Badge>
                      )}
                    </div>
                    {wallet.nickname && (
                      <p className="text-sm text-gray-400 mt-1">{wallet.nickname}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    {!wallet.is_primary && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPrimaryMutation.mutate(wallet.id)}
                        disabled={setPrimaryMutation.isPending}
                        className={`text-white border-white/20 hover:bg-white/10 ${isMobile ? 'w-full h-10' : ''}`}
                      >
                        Définir principal
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteWalletMutation.mutate(wallet.id)}
                      disabled={deleteWalletMutation.isPending}
                      className={`text-red-400 border-red-400/20 hover:bg-red-400/10 ${isMobile ? 'w-full h-10' : ''}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
