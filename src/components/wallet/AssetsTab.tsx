
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Coins, Image } from "lucide-react";
import { TokenGrid } from "./TokenGrid";
import { NFTGrid } from "./NFTGrid";
import { useWalletAssets, useTokenPrices } from "@/hooks/useTokenData";

interface WalletData {
  id: string;
  name: string;
  address: string;
  connected: boolean;
  icon: string;
  chainId: number;
}

interface AssetsTabProps {
  wallets: WalletData[];
}

const AssetsTab = ({ wallets }: AssetsTabProps) => {
  const primaryWallet = wallets.find(w => w.connected);
  const { data: walletAssets, isLoading } = useWalletAssets(
    primaryWallet?.address || null,
    primaryWallet?.chainId || 1
  );

  const assets = walletAssets || { tokens: [], nfts: [], ethBalance: 0 };
  const tokenAddresses = assets.tokens.map((token: any) => token.address);
  const { data: pricesData } = useTokenPrices(tokenAddresses, primaryWallet?.chainId || 1);

  // Enrichir les tokens avec les prix
  const enrichedTokens = assets.tokens.map((token: any) => {
    const priceInfo = pricesData?.result?.find((p: any) => p.address === token.address);
    return {
      ...token,
      price: priceInfo?.price || 0,
      change24h: priceInfo?.change24h || 0,
      value: priceInfo?.price ? parseFloat(token.balance) * priceInfo.price : 0,
    };
  });

  if (!primaryWallet) {
    return (
      <GlassCard className="p-6">
        <div className="text-center py-10">
          <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Connectez un wallet pour voir vos actifs</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Mes Actifs</h3>
        <div className="flex space-x-2">
          <GradientButton variant="ghost" size="sm">
            <Upload className="h-4 w-4" />
            Déposer
          </GradientButton>
          <GradientButton variant="ghost" size="sm">
            <Download className="h-4 w-4" />
            Retirer
          </GradientButton>
        </div>
      </div>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          <TabsTrigger value="tokens" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Coins className="h-4 w-4 mr-2" />
            Tokens ({enrichedTokens.length + (assets.ethBalance > 0 ? 1 : 0)})
          </TabsTrigger>
          <TabsTrigger value="nfts" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Image className="h-4 w-4 mr-2" />
            NFTs ({assets.nfts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="mt-6">
          <TokenGrid 
            tokens={[
              // ETH balance
              ...(assets.ethBalance > 0 ? [{
                address: 'native',
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
                balance: assets.ethBalance.toString(),
                price: pricesData?.result?.find((p: any) => p.symbol === 'ETH')?.price || 2500,
                change24h: pricesData?.result?.find((p: any) => p.symbol === 'ETH')?.change24h || 0,
                value: assets.ethBalance * (pricesData?.result?.find((p: any) => p.symbol === 'ETH')?.price || 2500),
              }] : []),
              ...enrichedTokens
            ]}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          <NFTGrid nfts={assets.nfts} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
};

export { AssetsTab };
