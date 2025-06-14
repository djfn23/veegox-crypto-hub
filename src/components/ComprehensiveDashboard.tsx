import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletBalance } from "@/hooks/useWalletData";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Wallet, TrendingUp, Coins, ArrowRightLeft, Store, Heart, CreditCard } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { RealTimeMarketOverview } from '@/components/dashboard/RealTimeMarketOverview';
import ExchangeModule from '@/components/modules/exchange/ExchangeModule';
import { Link } from "react-router-dom";

const ComprehensiveDashboard = () => {
  // Sécuriser le rendu côté client uniquement
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Appeler les hooks custom UNIQUEMENT lorsque isClient est true
  const { connectedWallet } = isClient ? useWeb3Wallet() : { connectedWallet: null };
  const { user } = isClient ? useAuth() : { user: null };
  const isMobile = isClient ? useIsMobile() : false;
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const { data: balanceData, refetch: refetchBalance } = isClient && connectedWallet
    ? useWalletBalance(connectedWallet?.address)
    : { data: null, refetch: () => {} };

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

  const quickLinks = [
    { name: "Trading", href: "/trading", icon: TrendingUp, color: "bg-green-500" },
    { name: "Staking", href: "/staking", icon: Coins, color: "bg-blue-500" },
    { name: "NFT Marketplace", href: "/marketplace", icon: Store, color: "bg-purple-500" },
    { name: "Crowdfunding", href: "/crowdfunding", icon: Heart, color: "bg-pink-500" },
    { name: "Crédit", href: "/credit", icon: CreditCard, color: "bg-orange-500" },
    { name: "Banque Crypto", href: "/crypto-bank", icon: Wallet, color: "bg-indigo-500" }
  ];

  if (!isClient) {
    // Optionnel: afficher un spinner de chargement pour éviter tout hydratation mismatch
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Chargement du tableau de bord...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de Bord</h1>
          <p className="text-gray-400">Bienvenue sur votre plateforme DeFi complète</p>
        </div>
        
        {/* Section Toggle */}
        <div className="flex gap-2">
          <Button 
            variant={activeSection === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveSection('overview')}
            className="text-sm"
          >
            Vue d'ensemble
          </Button>
          <Button 
            variant={activeSection === 'exchange' ? 'default' : 'outline'}
            onClick={() => setActiveSection('exchange')}
            className="text-sm"
          >
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Exchange
          </Button>
        </div>
      </div>

      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Real-time Market Overview */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Aperçu du Marché</h2>
            <RealTimeMarketOverview />
          </div>

          {/* Wallet Section */}
          {connectedWallet ? (
            <div className="space-y-4">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Wallet className="mr-2 h-5 w-5" />
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

              <Button onClick={() => refetchBalance()}>Actualiser Balance</Button>
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

          {/* Quick Access Links */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Accès Rapide</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.name} to={link.href}>
                    <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-white text-sm font-medium">{link.name}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Volume 24h</p>
                    <p className="text-white text-xl font-bold">$2.4M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Utilisateurs Actifs</p>
                    <p className="text-white text-xl font-bold">12.5K</p>
                  </div>
                  <Wallet className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">TVL Total</p>
                    <p className="text-white text-xl font-bold">$45.2M</p>
                  </div>
                  <Coins className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Récompenses</p>
                    <p className="text-white text-xl font-bold">8.5%</p>
                  </div>
                  <Heart className="h-8 w-8 text-pink-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeSection === 'exchange' && (
        <ExchangeModule />
      )}
    </div>
  );
};
export default ComprehensiveDashboard;
