
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Coins, ExternalLink, Copy, Code } from "lucide-react";

const TokenManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    token_type: "ERC20" as const,
    total_supply: "",
    decimals: "18",
    description: "",
    chain_type: "ethereum" as const,
    chain_id: 1
  });

  const queryClient = useQueryClient();

  const { data: tokens, isLoading } = useQuery({
    queryKey: ['user-tokens'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createTokenMutation = useMutation({
    mutationFn: async (tokenData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase
        .from('tokens')
        .insert({
          ...tokenData,
          creator_id: user.id,
          total_supply: parseFloat(tokenData.total_supply) || null,
          decimals: parseInt(tokenData.decimals)
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-tokens'] });
      toast.success("Token créé avec succès !");
      setShowCreateForm(false);
      setTokenData({
        name: "",
        symbol: "",
        token_type: "ERC20",
        total_supply: "",
        decimals: "18",
        description: "",
        chain_type: "ethereum",
        chain_id: 1
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la création du token");
    },
  });

  const handleCreateToken = () => {
    if (!tokenData.name || !tokenData.symbol) {
      toast.error("Nom et symbole requis");
      return;
    }
    createTokenMutation.mutate(tokenData);
  };

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

  const typeColors = {
    ERC20: "bg-blue-500",
    ERC721: "bg-purple-500",
    ERC1155: "bg-green-500"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Token Manager</h2>
          <p className="text-gray-400">Créez et gérez vos tokens personnalisés</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer un Token
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Créer un Nouveau Token</CardTitle>
            <CardDescription className="text-gray-400">
              Remplissez les informations pour créer votre token personnalisé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nom du Token</Label>
                <Input
                  id="name"
                  placeholder="Mon Super Token"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-white">Symbole</Label>
                <Input
                  id="symbol"
                  placeholder="MST"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData({...tokenData, symbol: e.target.value.toUpperCase()})}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Type de Token</Label>
                <Select 
                  value={tokenData.token_type} 
                  onValueChange={(value: any) => setTokenData({...tokenData, token_type: value})}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ERC20">ERC-20 (Fungible)</SelectItem>
                    <SelectItem value="ERC721">ERC-721 (NFT)</SelectItem>
                    <SelectItem value="ERC1155">ERC-1155 (Multi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Blockchain</Label>
                <Select 
                  value={tokenData.chain_type} 
                  onValueChange={(value: any) => {
                    const chainIds = { ethereum: 1, polygon: 137, base: 8453, arbitrum: 42161 };
                    setTokenData({
                      ...tokenData, 
                      chain_type: value, 
                      chain_id: chainIds[value as keyof typeof chainIds]
                    });
                  }}
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
              {tokenData.token_type === "ERC20" && (
                <div className="space-y-2">
                  <Label htmlFor="total_supply" className="text-white">Supply Total</Label>
                  <Input
                    id="total_supply"
                    type="number"
                    placeholder="1000000"
                    value={tokenData.total_supply}
                    onChange={(e) => setTokenData({...tokenData, total_supply: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre token et son utilité..."
                value={tokenData.description}
                onChange={(e) => setTokenData({...tokenData, description: e.target.value})}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreateToken}
                disabled={createTokenMutation.isPending}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {createTokenMutation.isPending ? "Création..." : "Créer le Token"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="text-white">Chargement...</div>
        ) : tokens && tokens.length > 0 ? (
          tokens.map((token) => (
            <Card key={token.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{token.name}</CardTitle>
                  <Badge className={`${typeColors[token.token_type as keyof typeof typeColors]} text-white`}>
                    {token.token_type}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  {token.symbol} • {chainNames[token.chain_type as keyof typeof chainNames]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {token.description && (
                  <p className="text-sm text-gray-300">{token.description}</p>
                )}
                
                <div className="space-y-2">
                  {token.total_supply && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Supply Total:</span>
                      <span className="text-white">{Number(token.total_supply).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Déployé:</span>
                    <span className={token.is_deployed ? "text-green-500" : "text-orange-500"}>
                      {token.is_deployed ? "Oui" : "En attente"}
                    </span>
                  </div>
                </div>

                {token.contract_address && (
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-xs">Adresse du contrat:</Label>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs text-white bg-slate-800 p-1 rounded flex-1 truncate">
                        {token.contract_address}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(token.contract_address!)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {!token.is_deployed ? (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    >
                      <Code className="h-3 w-3 mr-1" />
                      Déployer
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Explorer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Coins className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-white mb-2">Aucun token créé</h3>
              <p className="text-gray-400 mb-4">Commencez par créer votre premier token personnalisé</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer mon premier token
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TokenManager;
