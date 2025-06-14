
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
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const ComprehensiveDashboard = () => {
  const [isClient, setIsClient] = useState(false);
  
  // TOUJOURS appeler les hooks - pas conditionnellement
  const { connectedWallet } = useWeb3Wallet();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { isTablet, deviceType, getColumns, getSpacing } = useResponsiveLayout();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const { data: balanceData, refetch: refetchBalance } = useWalletBalance(connectedWallet?.address || '');

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Chargement du tableau de bord...</div>
      </div>
    );
  }

  const containerPadding = getSpacing("p-4", "p-6", "p-6");
  const sectionSpacing = getSpacing("space-y-4", "space-y-6", "space-y-6");
  const quickLinksColumns = getColumns(2, 3, 6);

  return (
    <div className={`${containerPadding} ${sectionSpacing} max-w-7xl mx-auto`}>
      {/* Header */}
      <div className={`
        flex flex-col gap-4
        ${isTablet ? 'lg:flex-row lg:items-center lg:justify-between' : 'lg:flex-row lg:items-center lg:justify-between'}
      `}>
        <div>
          <h1 className={`
            font-bold text-white
            ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-3xl'}
          `}>
            Tableau de Bord
          </h1>
          <p className={`
            text-gray-400
            ${isMobile ? 'text-sm' : 'text-base'}
          `}>
            Bienvenue sur votre plateforme DeFi complète
          </p>
        </div>
        
        {/* Section Toggle */}
        <div className="flex gap-2">
          <Button 
            variant={activeSection === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveSection('overview')}
            className={`text-sm ${isMobile ? 'px-3 py-2' : ''}`}
          >
            Vue d'ensemble
          </Button>
          <Button 
            variant={activeSection === 'exchange' ? 'default' : 'outline'}
            onClick={() => setActiveSection('exchange')}
            className={`text-sm ${isMobile ? 'px-3 py-2' : ''}`}
          >
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Exchange
          </Button>
        </div>
      </div>

      {activeSection === 'overview' && (
        <div className={sectionSpacing}>
          {/* Real-time Market Overview */}
          <div>
            <h2 className={`
              font-bold text-white mb-4
              ${isMobile ? 'text-xl' : 'text-2xl'}
            `}>
              Aperçu du Marché
            </h2>
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
              <CardContent className={`text-center ${isMobile ? 'p-6' : 'p-8'}`}>
                <h3 className={`
                  font-medium text-white mb-2
                  ${isMobile ? 'text-base' : 'text-lg'}
                `}>
                  Connectez votre Wallet
                </h3>
                <p className={`
                  text-gray-400 mb-6
                  ${isMobile ? 'text-sm' : 'text-base'}
                `}>
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
            <h2 className={`
              font-bold text-white mb-4
              ${isMobile ? 'text-xl' : 'text-2xl'}
            `}>
              Accès Rapide
            </h2>
            <div className={`
              grid gap-4
              ${isMobile 
                ? 'grid-cols-2' 
                : isTablet 
                  ? 'grid-cols-3' 
                  : 'grid-cols-6'
              }
            `}>
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.name} to={link.href}>
                    <Card className="bg-slate-900/50 border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <CardContent className={`text-center ${isMobile ? 'p-3' : 'p-4'}`}>
                        <div className={`
                          ${link.color} rounded-lg flex items-center justify-center mx-auto mb-2
                          ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}
                        `}>
                          <Icon className={`text-white ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                        <p className={`
                          text-white font-medium
                          ${isMobile ? 'text-xs' : 'text-sm'}
                        `}>
                          {link.name}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className={`
            grid gap-4
            ${isMobile 
              ? 'grid-cols-1' 
              : isTablet 
                ? 'grid-cols-2' 
                : 'grid-cols-4'
            }
          `}>
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Volume 24h</p>
                    <p className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>$2.4M</p>
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
                    <p className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>12.5K</p>
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
                    <p className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>$45.2M</p>
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
                    <p className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>8.5%</p>
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
