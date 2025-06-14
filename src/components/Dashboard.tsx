import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletBalance } from "@/hooks/useWalletData";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Wallet } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { RealTimeMarketOverview } from '@/components/dashboard/RealTimeMarketOverview';

const Dashboard = () => {
  const { connectedWallet } = useWeb3Wallet();
  const { user } = useUnifiedAuth();
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const { data: balanceData, refetch: refetchBalance } = useWalletBalance(connectedWallet?.address);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyAddress = () => {
    if (connectedWallet?.address) {
      navigator.clipboard.writeText(connectedWallet.address);
      setCopied(true);
      toast.success("Adresse copiée !");
    }
  };

  return (
    <div className="space-y-8">
      {/* Real-time Market Overview */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Aperçu du Marché</h2>
        <RealTimeMarketOverview />
      </div>

      {connectedWallet ? (
        <div className="space-y-4">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Mon Portefeuille
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-400">Adresse</p>
                <div className="flex items-center">
                  <p className="text-white font-semibold mr-2">
                    {isMobile ? shortenAddress(connectedWallet.address) : connectedWallet.address}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyAddress}
                    disabled={copied}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-400">Balance</p>
                <p className="text-green-500 font-semibold">
                  {balanceData?.result?.balance ? parseFloat(balanceData.result.balance).toFixed(4) : '0'} ETH
                </p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => refetchBalance()}>Refresh Balance</Button>
        </div>
      ) : (
        <Card className="bg-slate-900/50 border-slate-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-white mb-2">
              Connectez votre Wallet
            </h3>
            <p className="text-gray-400 mb-6">
              Connectez votre wallet pour voir votre balance et gérer vos actifs
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Connecter Wallet
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
