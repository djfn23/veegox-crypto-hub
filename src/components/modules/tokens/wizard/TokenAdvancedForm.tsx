
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Flame, Lock } from "lucide-react";

interface TokenAdvancedFormProps {
  tokenData: any;
  setTokenData: (data: any) => void;
  selectedTemplate: string | null;
}

export default function TokenAdvancedForm({
  tokenData,
  setTokenData,
  selectedTemplate
}: TokenAdvancedFormProps) {
  const updateTokenData = (field: string, value: any) => {
    setTokenData({ ...tokenData, [field]: value });
  };

  const featureCards = [
    {
      id: "tax",
      title: "Système de Taxes",
      description: "Applique une taxe sur les transferts",
      icon: Shield,
      enabled: tokenData.has_tax,
      onToggle: (value: boolean) => updateTokenData("has_tax", value),
      badge: "DeFi",
      color: "blue"
    },
    {
      id: "burn",
      title: "Fonction Burn",
      description: "Permet de détruire des tokens",
      icon: Flame,
      enabled: tokenData.has_burn,
      onToggle: (value: boolean) => updateTokenData("has_burn", value),
      badge: "Déflationnaire",
      color: "red"
    },
    {
      id: "pause",
      title: "Contrôle Pause",
      description: "Pause/reprend les transferts",
      icon: Lock,
      enabled: tokenData.has_pause,
      onToggle: (value: boolean) => updateTokenData("has_pause", value),
      badge: "Sécurité",
      color: "yellow"
    },
    {
      id: "mint",
      title: "Fonction Mint",
      description: "Création de nouveaux tokens",
      icon: Zap,
      enabled: tokenData.has_mint,
      onToggle: (value: boolean) => updateTokenData("has_mint", value),
      badge: "Avancé",
      color: "green"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Fonctionnalités Avancées
        </h3>
        <p className="text-white/70">
          Activez les fonctionnalités spécialisées pour votre token
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          const colorClasses = {
            blue: "border-blue-500/50 bg-blue-600/10",
            red: "border-red-500/50 bg-red-600/10",
            yellow: "border-yellow-500/50 bg-yellow-600/10",
            green: "border-green-500/50 bg-green-600/10"
          };

          return (
            <Card
              key={feature.id}
              className={`transition-all duration-300 ${
                feature.enabled
                  ? `${colorClasses[feature.color as keyof typeof colorClasses]} border-2`
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      feature.enabled ? "bg-white/20" : "bg-white/10"
                    }`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        {feature.title}
                        <Badge className={`${
                          feature.color === 'blue' ? 'bg-blue-600' :
                          feature.color === 'red' ? 'bg-red-600' :
                          feature.color === 'yellow' ? 'bg-yellow-600' :
                          'bg-green-600'
                        } text-white text-xs`}>
                          {feature.badge}
                        </Badge>
                      </CardTitle>
                      <p className="text-white/70 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={feature.onToggle}
                  />
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Paramètres conditionnels */}
      {tokenData.has_tax && (
        <Card className="bg-blue-600/10 border-blue-500/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configuration des Taxes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tax_percentage" className="text-white">
                Pourcentage de Taxe (%)
              </Label>
              <Input
                id="tax_percentage"
                type="number"
                min="0"
                max="25"
                placeholder="2"
                value={tokenData.tax_percentage}
                onChange={(e) => updateTokenData("tax_percentage", parseFloat(e.target.value) || 0)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-white/60">
                Pourcentage appliqué sur chaque transfert (max 25%)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {tokenData.has_mint && (
        <Card className="bg-green-600/10 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Configuration du Mint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="max_supply" className="text-white">
                Supply Maximum (optionnel)
              </Label>
              <Input
                id="max_supply"
                type="number"
                placeholder="10000000"
                value={tokenData.max_supply}
                onChange={(e) => updateTokenData("max_supply", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-white/60">
                Limite maximale de tokens pouvant être créés
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
