
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Flame, 
  Play, 
  Pause, 
  Plus, 
  Settings, 
  Users, 
  ExternalLink,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

export default function TokenManagementModule() {
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [newOwner, setNewOwner] = useState("");

  // Mock deployed token data
  const deployedToken = {
    name: "Mon Token",
    symbol: "MT",
    address: "0x742d35Cc6634C0532925a3b8C17c77234567b9bc",
    totalSupply: "1000000",
    isPaused: false,
    owner: "0x123...abc",
    hasMinFunction: true,
    hasBurnFunction: true,
    hasPauseFunction: true
  };

  const handleMint = () => {
    if (!mintAmount) {
      toast.error("Veuillez entrer un montant");
      return;
    }
    toast.success(`${mintAmount} tokens créés avec succès`);
    setMintAmount("");
  };

  const handleBurn = () => {
    if (!burnAmount) {
      toast.error("Veuillez entrer un montant");
      return;
    }
    toast.success(`${burnAmount} tokens détruits avec succès`);
    setBurnAmount("");
  };

  const handlePause = () => {
    toast.success(deployedToken.isPaused ? "Token réactivé" : "Token mis en pause");
  };

  const handleTransferOwnership = () => {
    if (!newOwner) {
      toast.error("Veuillez entrer une adresse valide");
      return;
    }
    toast.success("Transfert de propriété initié");
    setNewOwner("");
  };

  return (
    <div className="space-y-6">
      {/* Token Overview */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            {deployedToken.name} ({deployedToken.symbol})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Adresse du contrat</Label>
              <div className="flex items-center gap-2">
                <code className="text-xs text-white bg-slate-800 p-2 rounded flex-1">
                  {deployedToken.address}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Supply Total</Label>
              <p className="text-white font-medium">
                {Number(deployedToken.totalSupply).toLocaleString()} {deployedToken.symbol}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/60 text-sm">Statut</Label>
              <div className="flex gap-2">
                <Badge className={deployedToken.isPaused ? "bg-red-600" : "bg-green-600"}>
                  {deployedToken.isPaused ? "En pause" : "Actif"}
                </Badge>
                <Badge className="bg-blue-600">Déployé</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Management Actions */}
      <Tabs defaultValue="functions" className="space-y-4">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="functions" className="data-[state=active]:bg-blue-600">
            Fonctions
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="functions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mint Function */}
            {deployedToken.hasMinFunction && (
              <Card className="bg-green-600/10 border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-400" />
                    Créer des Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mint-amount" className="text-white">
                      Montant à créer
                    </Label>
                    <Input
                      id="mint-amount"
                      type="number"
                      placeholder="1000"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleMint}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Mint Tokens
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Burn Function */}
            {deployedToken.hasBurnFunction && (
              <Card className="bg-red-600/10 border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-400" />
                    Détruire des Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="burn-amount" className="text-white">
                      Montant à détruire
                    </Label>
                    <Input
                      id="burn-amount"
                      type="number"
                      placeholder="1000"
                      value={burnAmount}
                      onChange={(e) => setBurnAmount(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleBurn}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Burn Tokens
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pause Function */}
            {deployedToken.hasPauseFunction && (
              <Card className="bg-yellow-600/10 border-yellow-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {deployedToken.isPaused ? (
                      <Play className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Pause className="h-5 w-5 text-yellow-400" />
                    )}
                    Contrôle des Transferts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/70 text-sm">
                    {deployedToken.isPaused 
                      ? "Les transferts sont actuellement suspendus"
                      : "Les transferts sont actuellement autorisés"
                    }
                  </p>
                  <Button
                    onClick={handlePause}
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                  >
                    {deployedToken.isPaused ? "Reprendre" : "Suspendre"} les Transferts
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            <Card className="bg-blue-600/10 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Détenteurs:</span>
                  <span className="text-white font-medium">847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Transferts 24h:</span>
                  <span className="text-white font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Volume 24h:</span>
                  <span className="text-white font-medium">$12,450</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-red-600/10 border-red-500/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Zone de Danger
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Transfert de Propriété</h4>
                  <p className="text-white/70 text-sm mb-3">
                    Transférer la propriété du contrat à une autre adresse. Cette action est irréversible.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="new-owner" className="text-white">
                      Nouvelle adresse propriétaire
                    </Label>
                    <Input
                      id="new-owner"
                      placeholder="0x..."
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleTransferOwnership}
                    className="mt-3 bg-red-600 hover:bg-red-700"
                  >
                    Transférer la Propriété
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-medium text-white mb-2">Analytics Avancées</h3>
              <p className="text-white/60 mb-6">
                Accédez aux analyses détaillées dans la section Analytics
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Voir les Analytics
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
