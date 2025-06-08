
import { VeegoxTokenCard } from "@/components/veegox/VeegoxTokenCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVeegoxTokenInfo, useSaveVeegoxMetrics } from "@/hooks/useVeegoxToken";
import { Coins, TrendingUp, RefreshCw } from "lucide-react";

export const VeegoxWalletSection = () => {
  const { data: tokenInfo } = useVeegoxTokenInfo();
  const { mutate: saveMetrics, isPending } = useSaveVeegoxMetrics();

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Coins className="h-5 w-5 text-purple-400" />
            Token Veegox
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <VeegoxTokenCard />
          
          <div className="flex gap-2">
            <Button
              onClick={() => saveMetrics()}
              disabled={isPending}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <TrendingUp className="h-4 w-4" />
              )}
              Sauvegarder Métriques
            </Button>
          </div>

          {tokenInfo && (
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="text-white font-medium mb-2">Informations du contrat</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Adresse: {tokenInfo.contractAddress}</p>
                <p>Réseau: Polygon (Chain ID: {tokenInfo.chainId})</p>
                <p>Décimales: {tokenInfo.decimals}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
