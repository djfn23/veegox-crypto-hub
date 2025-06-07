
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TokenBasicFormProps {
  tokenData: any;
  setTokenData: (data: any) => void;
  selectedTemplate: string | null;
}

export default function TokenBasicForm({
  tokenData,
  setTokenData,
  selectedTemplate
}: TokenBasicFormProps) {
  const updateTokenData = (field: string, value: any) => {
    setTokenData({ ...tokenData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Configuration de Base
        </h3>
        <p className="text-white/70">
          Définissez les paramètres essentiels de votre token
        </p>
      </div>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Informations du Token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nom du Token *
              </Label>
              <Input
                id="name"
                placeholder="Mon Super Token"
                value={tokenData.name}
                onChange={(e) => updateTokenData("name", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-white/60">
                Le nom complet de votre token (ex: Bitcoin, Ethereum)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-white">
                Symbole *
              </Label>
              <Input
                id="symbol"
                placeholder="MST"
                value={tokenData.symbol}
                onChange={(e) => updateTokenData("symbol", e.target.value.toUpperCase())}
                className="bg-slate-800 border-slate-600 text-white"
                maxLength={10}
              />
              <p className="text-xs text-white/60">
                Symbole court (3-5 caractères recommandés)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="total_supply" className="text-white">
                Supply Total *
              </Label>
              <Input
                id="total_supply"
                type="number"
                placeholder="1000000"
                value={tokenData.total_supply}
                onChange={(e) => updateTokenData("total_supply", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-white/60">
                Nombre total de tokens à créer
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Blockchain</Label>
              <Select 
                value={tokenData.chain_type} 
                onValueChange={(value) => {
                  const chainIds = { ethereum: 1, polygon: 137, base: 8453, arbitrum: 42161 };
                  updateTokenData("chain_type", value);
                  updateTokenData("chain_id", chainIds[value as keyof typeof chainIds]);
                }}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="polygon">Polygon (Recommandé)</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white/60">
                Réseau de déploiement du token
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Décrivez l'utilité et l'objectif de votre token..."
              value={tokenData.description}
              onChange={(e) => updateTokenData("description", e.target.value)}
              className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
            />
            <p className="text-xs text-white/60">
              Description détaillée pour les utilisateurs et investisseurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website_url" className="text-white">
                Site Web (optionnel)
              </Label>
              <Input
                id="website_url"
                type="url"
                placeholder="https://montoken.com"
                value={tokenData.website_url}
                onChange={(e) => updateTokenData("website_url", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_url" className="text-white">
                Logo URL (optionnel)
              </Label>
              <Input
                id="logo_url"
                type="url"
                placeholder="https://exemple.com/logo.png"
                value={tokenData.logo_url}
                onChange={(e) => updateTokenData("logo_url", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
