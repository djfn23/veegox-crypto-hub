
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  User, 
  Wallet, 
  Shield, 
  Settings, 
  Plus,
  ExternalLink,
  Copy,
  Trash2
} from "lucide-react";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    full_name: "",
    bio: "",
    website: "",
    twitter_handle: ""
  });

  const [walletData, setWalletData] = useState({
    address: "",
    chain_type: "ethereum" as const,
    nickname: ""
  });

  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ['profile-settings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfileData({
          username: data.username || "",
          full_name: data.full_name || "",
          bio: data.bio || "",
          website: data.website || "",
          twitter_handle: data.twitter_handle || ""
        });
      }

      return data;
    },
  });

  const { data: wallets } = useQuery({
    queryKey: ['user-wallets'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: userRole } = useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      return data?.role;
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-settings'] });
      toast.success("Profil mis à jour avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la mise à jour du profil");
    },
  });

  const addWalletMutation = useMutation({
    mutationFn: async (walletData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const chainIds = { ethereum: 1, polygon: 137, base: 8453, arbitrum: 42161 };

      const { data, error } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          address: walletData.address,
          chain_type: walletData.chain_type,
          chain_id: chainIds[walletData.chain_type as keyof typeof chainIds],
          nickname: walletData.nickname || null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-wallets'] });
      toast.success("Wallet ajouté avec succès !");
      setWalletData({
        address: "",
        chain_type: "ethereum",
        nickname: ""
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de l'ajout du wallet");
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
      toast.success("Wallet supprimé avec succès !");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la suppression du wallet");
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copié dans le presse-papier");
  };

  const chainNames = {
    ethereum: "Ethereum",
    polygon: "Polygon",
    base: "Base",
    arbitrum: "Arbitrum"
  };

  const roleColors = {
    admin: "bg-red-500",
    developer: "bg-blue-500",
    user: "bg-green-500"
  };

  const roleLabels = {
    admin: "Administrateur",
    developer: "Développeur",
    user: "Utilisateur"
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Paramètres du Profil</h2>
        <p className="text-gray-400">Gérez vos informations personnelles et vos wallets</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Informations Personnelles</CardTitle>
              <CardDescription className="text-gray-400">
                Personnalisez votre profil Veegox
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">Nom d'Utilisateur</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-white">Nom Complet</Label>
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Biographie</Label>
                <Textarea
                  id="bio"
                  placeholder="Parlez-nous de vous..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">Site Web</Label>
                  <Input
                    id="website"
                    placeholder="https://monsite.com"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-white">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="@handle"
                    value={profileData.twitter_handle}
                    onChange={(e) => setProfileData({...profileData, twitter_handle: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <Button 
                onClick={() => updateProfileMutation.mutate(profileData)}
                disabled={updateProfileMutation.isPending}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {updateProfileMutation.isPending ? "Mise à jour..." : "Enregistrer les Modifications"}
              </Button>
            </CardContent>
          </Card>

          {/* Wallet Management */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Gestion des Wallets</CardTitle>
              <CardDescription className="text-gray-400">
                Connectez vos wallets pour plus de fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Adresse du Wallet</Label>
                  <Input
                    id="address"
                    placeholder="0x..."
                    value={walletData.address}
                    onChange={(e) => setWalletData({...walletData, address: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Blockchain</Label>
                  <Select 
                    value={walletData.chain_type} 
                    onValueChange={(value: any) => setWalletData({...walletData, chain_type: value})}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-white">Surnom (optionnel)</Label>
                  <Input
                    id="nickname"
                    placeholder="Mon wallet principal"
                    value={walletData.nickname}
                    onChange={(e) => setWalletData({...walletData, nickname: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <Button 
                onClick={() => addWalletMutation.mutate(walletData)}
                disabled={!walletData.address || addWalletMutation.isPending}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                {addWalletMutation.isPending ? "Ajout..." : "Ajouter un Wallet"}
              </Button>

              <div className="space-y-2">
                <Label className="text-white">Wallets Connectés</Label>
                {wallets && wallets.length > 0 ? (
                  <div className="space-y-2">
                    {wallets.map(wallet => (
                      <Card key={wallet.id} className="bg-slate-800/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <div className="font-medium text-white">
                                  {wallet.nickname || "Wallet"}
                                </div>
                                {wallet.is_primary && (
                                  <Badge className="bg-green-500 text-white">Principal</Badge>
                                )}
                                <Badge variant="outline" className="border-slate-600 text-white">
                                  {chainNames[wallet.chain_type as keyof typeof chainNames]}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <code className="text-xs text-gray-400 truncate max-w-xs">
                                  {wallet.address}
                                </code>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => copyToClipboard(wallet.address)}
                                  className="p-0 h-auto text-gray-400 hover:text-white"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                                className="border-slate-600 text-white hover:bg-slate-700"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteWalletMutation.mutate(wallet.id)}
                                disabled={deleteWalletMutation.isPending}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <Wallet className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-400">Aucun wallet connecté</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Informations du Compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl text-white font-bold mb-1">
                  {profile?.full_name || "Utilisateur"}
                </h3>
                {profile?.username && (
                  <p className="text-gray-400">@{profile.username}</p>
                )}
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rôle</span>
                  <Badge className={`${roleColors[userRole as keyof typeof roleColors]} text-white`}>
                    {roleLabels[userRole as keyof typeof roleLabels]}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Wallets</span>
                  <span className="text-white">{wallets?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Inscription</span>
                  <span className="text-white">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Sécurité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                size="sm"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Shield className="h-4 w-4 mr-2" />
                Changer le Mot de Passe
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="w-full border-slate-600 text-white hover:bg-slate-800"
              >
                <Settings className="h-4 w-4 mr-2" />
                Paramètres Avancés
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
