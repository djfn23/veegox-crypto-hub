
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Settings, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { useEnhancedWallet } from '@/hooks/useEnhancedWallet';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { TradingInterface } from './TradingInterface';
import { QuickActions } from './QuickActions';
import { EnhancedTokenList } from './EnhancedTokenList';
import { NotificationCenter } from './NotificationCenter';
import { MobileWalletCard, MobileWalletCardHeader, MobileWalletCardContent } from '@/components/ui/mobile-wallet-card';
import { MobileTouchButton } from '@/components/ui/mobile-touch-button';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  balanceUSD: number;
  price: number;
  change24h: number;
  priceData: Array<{ timestamp: string; price: number; }>;
  isFavorite?: boolean;
  isHidden?: boolean;
}

const EnhancedWalletDashboard = () => {
  const { connectedWallets } = useEnhancedWallet();
  const { isMobile, isTablet, getFontSize, getDynamicSpacing } = useResponsiveLayout();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hideSmallBalances, setHideSmallBalances] = useState(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);

  // Données mockées pour la démo
  useEffect(() => {
    const mockTokens: Token[] = [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: '2.456',
        balanceUSD: 4920.50,
        price: 2003.45,
        change24h: 5.67,
        priceData: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
          price: 2000 + Math.random() * 100 - 50
        })),
        isFavorite: true
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: '1,250.00',
        balanceUSD: 1250.00,
        price: 1.00,
        change24h: 0.02,
        pr20iceData: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
          price: 1.00 + (Math.random() - 0.5) * 0.01
        }))
      },
      {
        symbol: 'MATIC',
        name: 'Polygon',
        balance: '850.25',
        balanceUSD: 680.20,
        price: 0.80,
        change24h: -2.34,
        priceData: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
          price: 0.80 + (Math.random() - 0.5) * 0.1
        }))
      }
    ];
    
    setTokens(mockTokens);
    const total = mockTokens.reduce((sum, token) => sum + token.balanceUSD, 0);
    setPortfolioValue(total);
    setPortfolioChange(3.45);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast.success('Portfolio mis à jour');
  };

  const handleSwap = async (fromToken: string, toToken: string, amount: string) => {
    toast.success(`Échange de ${amount} ${fromToken} vers ${toToken} initié`);
  };

  const handleTokenSelect = (token: Token) => {
    toast.info(`Token sélectionné: ${token.name}`);
  };

  const handleToggleFavorite = (symbol: string) => {
    setTokens(prev => 
      prev.map(token => 
        token.symbol === symbol 
          ? { ...token, isFavorite: !token.isFavorite }
          : token
      )
    );
    toast.success('Favoris mis à jour');
  };

  const handleToggleHidden = (symbol: string) => {
    setTokens(prev => 
      prev.map(token => 
        token.symbol === symbol 
          ? { ...token, isHidden: !token.isHidden }
          : token
      )
    );
  };

  const handleQuickSwap = (fromToken: string) => {
    toast.info(`Échange rapide pour ${fromToken}`);
  };

  const visibleTokens = hideSmallBalances 
    ? tokens.filter(token => token.balanceUSD >= 1)
    : tokens;

  return (
    <div className={`space-y-${isMobile ? '4' : '6'}`}>
      {/* Portfolio Overview - Mobile Optimized */}
      <MobileWalletCard variant="featured" padding={isMobile ? "default" : "lg"}>
        <MobileWalletCardHeader>
          <div className="flex items-center gap-3">
            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center`}>
              <Wallet className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-white`} />
            </div>
            <div>
              <h2 className={cn("text-white font-bold", getFontSize(isMobile ? 'lg' : 'xl'))}>
                Portfolio Total
              </h2>
              <p className={cn("text-purple-300", getFontSize('sm'))}>
                {connectedWallets.length} wallet{connectedWallets.length > 1 ? 's' : ''} connecté{connectedWallets.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MobileTouchButton
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(true)}
              className="text-gray-400 hover:text-white relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </MobileTouchButton>
            <MobileTouchButton
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-gray-400 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </MobileTouchButton>
            <MobileTouchButton
              variant="ghost"
              size="sm"
              onClick={() => setHideSmallBalances(!hideSmallBalances)}
              className="text-gray-400 hover:text-white"
            >
              {hideSmallBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </MobileTouchButton>
          </div>
        </MobileWalletCardHeader>
        
        <MobileWalletCardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className={cn("font-bold text-white mb-2", getFontSize(isMobile ? '3xl' : '4xl'))}>
                ${portfolioValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <Badge
                variant={portfolioChange >= 0 ? 'default' : 'destructive'}
                className={cn(
                  "text-center",
                  portfolioChange >= 0 
                    ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                    : 'bg-red-600/20 text-red-400 border-red-500/30'
                )}
              >
                <span className="flex items-center gap-1">
                  {portfolioChange >= 0 ? 
                    <TrendingUp className="h-3 w-3" /> : 
                    <TrendingDown className="h-3 w-3" />
                  }
                  {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}% (24h)
                </span>
              </Badge>
            </div>
          </div>
        </MobileWalletCardContent>
      </MobileWalletCard>

      {/* Quick Actions - Mobile Optimized */}
      <QuickActions
        onSend={() => toast.info('Envoyer des tokens')}
        onReceive={() => toast.info('Recevoir des tokens')}
        onSwap={() => toast.info('Échanger des tokens')}
        onBuy={() => toast.info('Acheter des tokens')}
        onScanQR={() => toast.info('Scanner QR Code')}
        onStake={() => toast.info('Staking')}
      />

      {/* Main Content Tabs - Mobile Optimized */}
      <Tabs defaultValue="tokens" className={`space-y-${isMobile ? '4' : '6'}`}>
        <TabsList className={cn(
          "grid w-full grid-cols-3 bg-slate-800/50",
          isMobile ? "h-12" : "h-10"
        )}>
          <TabsTrigger value="tokens" className={cn(
            "data-[state=active]:bg-slate-700",
            getFontSize('sm')
          )}>
            Tokens
          </TabsTrigger>
          <TabsTrigger value="trading" className={cn(
            "data-[state=active]:bg-slate-700",
            getFontSize('sm')
          )}>
            Trading
          </TabsTrigger>
          <TabsTrigger value="history" className={cn(
            "data-[state=active]:bg-slate-700",
            getFontSize('sm')
          )}>
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className={`space-y-${isMobile ? '4' : '6'}`}>
          <EnhancedTokenList
            tokens={visibleTokens}
            onTokenSelect={handleTokenSelect}
            onToggleFavorite={handleToggleFavorite}
            onToggleHidden={handleToggleHidden}
            onQuickSwap={handleQuickSwap}
          />
        </TabsContent>

        <TabsContent value="trading" className={`space-y-${isMobile ? '4' : '6'}`}>
          <TradingInterface
            tokens={tokens}
            onSwap={handleSwap}
          />
        </TabsContent>

        <TabsContent value="history" className={`space-y-${isMobile ? '4' : '6'}`}>
          <MobileWalletCard>
            <MobileWalletCardHeader 
              title="Historique des Transactions"
            />
            <MobileWalletCardContent>
              <div className="text-center py-8 text-gray-400">
                <p className={getFontSize('base')}>
                  Fonctionnalité d'historique en cours de développement
                </p>
              </div>
            </MobileWalletCardContent>
          </MobileWalletCard>
        </TabsContent>
      </Tabs>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
};

export default EnhancedWalletDashboard;

// Add missing import
import { cn } from '@/lib/utils';
