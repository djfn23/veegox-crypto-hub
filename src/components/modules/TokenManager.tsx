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
import { useIsMobile } from "@/hooks/use-mobile";

const TokenManager = () => {
  const isMobile = useIsMobile();
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
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Token Manager</h2>
          <p className="text-gray-400 text-sm md:text-base px-2 md:px-0">
            Créez et gérez vos tokens personnalisés
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          size={isMobile ? "lg" : "default"}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-full md:w-auto min-h-[44px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer un Token
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg md:text-xl">Créer un Nouveau Token</CardTitle>
            <CardDescription className="text-gray-400 text-sm md:text-base">
              Remplissez les informations pour créer votre token personnalisé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-sm">Nom du Token</Label>
                <Input
                  id="name"
                  placeholder="Mon Super Token"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  className="bg-slate-800 border-slate-600 text-white min-h-[44px] text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-white text-sm">Symbole</Label>
                <Input
                  id="symbol"
                  placeholder="MST"
                  value={tokenData.symbol}
                  onChange={(e) => setTokenData({...tokenData, symbol: e.target.value.toUpperCase()})}
                  className="bg-slate-800 border-slate-600 text-white min-h-[44px] text-sm md:text-base"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                <div className="space-y-2">
                  <Label className="text-white text-sm">Type de Token</Label>
                  <Select 
                    value={tokenData.token_type} 
                    onValueChange={(value: any) => setTokenData({...tokenData, token_type: value})}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="ERC20">ERC-20 (Fungible)</SelectItem>
                      <SelectItem value="ERC721">ERC-721 (NFT)</SelectItem>
                      <SelectItem value="ERC1155">ERC-1155 (Multi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white text-sm">Blockchain</Label>
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
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {tokenData.token_type === "ERC20" && (
                <div className="space-y-2">
                  <Label htmlFor="total_supply" className="text-white text-sm">Supply Total</Label>
                  <Input
                    id="total_supply"
                    type="number"
                    placeholder="1000000"
                    value={tokenData.total_supply}
                    onChange={(e) => setTokenData({...tokenData, total_supply: e.target.value})}
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px] text-sm md:text-base"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white text-sm">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre token et son utilité..."
                value={tokenData.description}
                onChange={(e) => setTokenData({...tokenData, description: e.target.value})}
                className="bg-slate-800 border-slate-600 text-white min-h-[100px] text-sm md:text-base resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                size={isMobile ? "lg" : "default"}
                className="border-slate-600 text-white hover:bg-slate-800 w-full sm:w-auto min-h-[44px]"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleCreateToken}
                disabled={createTokenMutation.isPending}
                size={isMobile ? "lg" : "default"}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 w-full sm:w-auto min-h-[44px]"
              >
                {createTokenMutation.isPending ? "Création..." : "Créer le Token"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Responsive tokens grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {isLoading ? (
          <div className="text-white text-center p-4">Chargement...</div>
        ) : tokens && tokens.length > 0 ? (
          tokens.map((token) => (
            <Card key={token.id} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-white text-lg md:text-xl flex-1 min-w-0 pr-2">
                    <span className="truncate block">{token.name}</span>
                  </CardTitle>
                  <Badge className={`${typeColors[token.token_type as keyof typeof typeColors]} text-white text-xs flex-shrink-0`}>
                    {token.token_type}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400 text-sm">
                  {token.symbol} • {chainNames[token.chain_type as keyof typeof chainNames]}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {token.description && (
                  <p className="text-sm text-gray-300 line-clamp-2">{token.description}</p>
                )}
                
                <div className="space-y-2">
                  {token.total_supply && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Supply Total:</span>
                      <span className="text-white font-mono text-xs">
                        {Number(token.total_supply).toLocaleString()}
                      </span>
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
                      <code className="text-xs text-white bg-slate-800 p-2 rounded flex-1 truncate">
                        {token.contract_address}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(token.contract_address!)}
                        className="text-gray-400 hover:text-white flex-shrink-0 min-h-[32px] min-w-[32px] p-1"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  {!token.is_deployed ? (
                    <Button 
                      size={isMobile ? "lg" : "sm"}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 min-h-[44px]"
                    >
                      <Code className="h-3 w-3 mr-2" />
                      Déployer
                    </Button>
                  ) : (
                    <Button 
                      size={isMobile ? "lg" : "sm"}
                      variant="outline" 
                      className="w-full border-slate-600 text-white hover:bg-slate-800 min-h-[44px]"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Explorer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm md:col-span-2 xl:col-span-3">
            <CardContent className="p-8 text-center">
              <Coins className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-white mb-2">Aucun token créé</h3>
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                Commencez par créer votre premier token personnalisé
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                size={isMobile ? "lg" : "default"}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 min-h-[44px]"
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
