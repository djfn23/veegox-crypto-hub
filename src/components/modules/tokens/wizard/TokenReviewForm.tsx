
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

interface TokenReviewFormProps {
  tokenData: any;
  selectedTemplate: string | null;
  templates: any[];
}

export default function TokenReviewForm({
  tokenData,
  selectedTemplate,
  templates
}: TokenReviewFormProps) {
  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
  
  const chainNames = {
    ethereum: "Ethereum Mainnet",
    polygon: "Polygon",
    base: "Base",
    arbitrum: "Arbitrum One"
  };

  const estimatedCosts = {
    ethereum: "~0.05 ETH",
    polygon: "~0.01 MATIC",
    base: "~0.001 ETH",
    arbitrum: "~0.002 ETH"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copié dans le presse-papier");
  };

  const enabledFeatures = [
    { key: "has_tax", label: "Système de Taxes", value: tokenData.has_tax },
    { key: "has_burn", label: "Fonction Burn", value: tokenData.has_burn },
    { key: "has_pause", label: "Contrôle Pause", value: tokenData.has_pause },
    { key: "has_mint", label: "Fonction Mint", value: tokenData.has_mint }
  ].filter(feature => feature.value);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Révision et Déploiement
        </h3>
        <p className="text-white/70">
          Vérifiez les paramètres avant le déploiement sur la blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations du Token */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Informations du Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Template:</span>
                <Badge className="bg-blue-600 text-white">
                  {selectedTemplateData?.name}
                </Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Nom:</span>
                <span className="text-white font-medium">{tokenData.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Symbole:</span>
                <span className="text-white font-medium">{tokenData.symbol}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Supply Total:</span>
                <span className="text-white font-medium">
                  {Number(tokenData.total_supply).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Blockchain:</span>
                <span className="text-white font-medium">
                  {chainNames[tokenData.chain_type as keyof typeof chainNames]}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Type:</span>
                <span className="text-white font-medium">{tokenData.token_type}</span>
              </div>
            </div>

            {tokenData.description && (
              <>
                <Separator className="bg-white/10" />
                <div>
                  <span className="text-white/70 text-sm">Description:</span>
                  <p className="text-white text-sm mt-1 line-clamp-3">
                    {tokenData.description}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Fonctionnalités et Coûts */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Fonctionnalités & Coûts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Fonctionnalités activées */}
            <div>
              <h4 className="text-white font-medium mb-2">Fonctionnalités activées:</h4>
              {enabledFeatures.length > 0 ? (
                <div className="space-y-1">
                  {enabledFeatures.map((feature) => (
                    <div key={feature.key} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-white text-sm">{feature.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-sm">Aucune fonctionnalité avancée</p>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Coûts estimés */}
            <div>
              <h4 className="text-white font-medium mb-2">Coût estimé du déploiement:</h4>
              <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Frais de gas:</span>
                  <span className="text-yellow-400 font-medium">
                    {estimatedCosts[tokenData.chain_type as keyof typeof estimatedCosts]}
                  </span>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  * Estimation basée sur le trafic réseau actuel
                </p>
              </div>
            </div>

            {/* Liens utiles */}
            <div className="space-y-2">
              <h4 className="text-white font-medium">Liens utiles:</h4>
              <div className="space-y-1">
                {tokenData.website_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-blue-400 hover:text-blue-300"
                    onClick={() => window.open(tokenData.website_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Site Web
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-white/70 hover:text-white"
                  onClick={() => copyToClipboard(JSON.stringify(tokenData, null, 2))}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copier la configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations importantes */}
      <Card className="bg-red-600/10 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            Informations Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-white/70">
            <p>• Le déploiement sur la blockchain est <strong>irréversible</strong></p>
            <p>• Assurez-vous d'avoir suffisamment de fonds pour les frais de gas</p>
            <p>• Les paramètres avancés ne pourront pas être modifiés après déploiement</p>
            <p>• Le contrat sera automatiquement vérifié sur l'explorateur de blocs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
