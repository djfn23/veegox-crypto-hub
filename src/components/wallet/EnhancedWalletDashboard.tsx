
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
  const { isMobile } = useResponsiveLayout();
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
        priceData: Array.from({ length: 24 }, (_, i) => ({
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
    setPortfolioChange(3.45); // Mock change
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simuler le refresh des données
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
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card className="bg-gradient-to-r from-slate-900/80 to-purple-900/40 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white">Portfolio Total</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="text-gray-400 hover:text-white relative"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHideSmallBalances(!hideSmallBalances)}
                className="text-gray-400 hover:text-white"
              >
                {hideSmallBalances ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-white mb-2">
                ${portfolioValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={portfolioChange >= 0 ? 'default' : 'destructive'}
                  className={`${
                    portfolioChange >= 0 
                      ? 'bg-green-600/20 text-green-400 border-green-500/30' 
                      : 'bg-red-600/20 text-red-400 border-red-500/30'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {portfolioChange >= 0 ? 
                      <TrendingUp className="h-3 w-3" /> : 
                      <TrendingDown className="h-3 w-3" />
                    }
                    {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                  </span>
                </Badge>
                <span className="text-gray-400 text-sm">24h</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-sm">Wallets connectés</div>
              <div className="text-white font-medium">{connectedWallets.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActions
        onSend={() => toast.info('Envoyer des tokens')}
        onReceive={() => toast.info('Recevoir des tokens')}
        onSwap={() => toast.info('Échanger des tokens')}
        onBuy={() => toast.info('Acheter des tokens')}
        onScanQR={() => toast.info('Scanner QR Code')}
        onStake={() => toast.info('Staking')}
      />

      {/* Main Content Tabs */}
      <Tabs defaultValue="tokens" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="tokens" className="data-[state=active]:bg-slate-700">
            Tokens
          </TabsTrigger>
          <TabsTrigger value="trading" className="data-[state=active]:bg-slate-700">
            Trading
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-6">
          <EnhancedTokenList
            tokens={visibleTokens}
            onTokenSelect={handleTokenSelect}
            onToggleFavorite={handleToggleFavorite}
            onToggleHidden={handleToggleHidden}
            onQuickSwap={handleQuickSwap}
          />
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <TradingInterface
            tokens={tokens}
            onSwap={handleSwap}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Historique des Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-400">
                Fonctionnalité d'historique en cours de développement
              </div>
            </CardContent>
          </Card>
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
