import React, { useState } from 'react';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { MobileWalletCard } from '@/components/ui/mobile-wallet-card';
import { MobileTouchButton } from '@/components/ui/mobile-touch-button';
import { QuickActions } from './QuickActions';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { MobilePriceChart } from './MobilePriceChart';

interface Token {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  value: number;
  price: number;
  change24h: number;
  priceData: { timestamp: string; price: number }[];
}

interface Transaction {
  id: string;
  type: 'in' | 'out';
  token: string;
  amount: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

const EnhancedWalletDashboard = () => {
  const { isMobile, isTablet, getFontSize } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data with corrected property name
  const mockTokens: Token[] = [
    {
      id: '1',
      symbol: 'VGX',
      name: 'Veegox Token',
      balance: 1250.5,
      value: 3125.25,
      price: 2.5,
      change24h: 5.2,
      priceData: [
        { timestamp: '2024-01-01', price: 2.3 },
        { timestamp: '2024-01-02', price: 2.4 },
        { timestamp: '2024-01-03', price: 2.5 },
      ]
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.75,
      value: 8250.00,
      price: 3000.00,
      change24h: -1.5,
      priceData: [
        { timestamp: '2024-01-01', price: 2950 },
        { timestamp: '2024-01-02', price: 3050 },
        { timestamp: '2024-01-03', price: 3000 },
      ]
    },
    {
      id: '3',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.1,
      value: 4500.00,
      price: 45000.00,
      change24h: 2.8,
      priceData: [
        { timestamp: '2024-01-01', price: 44000 },
        { timestamp: '2024-01-02', price: 46000 },
        { timestamp: '2024-01-03', price: 45000 },
      ]
    },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: 'tx-1',
      type: 'in',
      token: 'VGX',
      amount: 500,
      timestamp: '2024-01-03T10:30:00',
      status: 'completed',
    },
    {
      id: 'tx-2',
      type: 'out',
      token: 'ETH',
      amount: 0.5,
      timestamp: '2024-01-02T15:45:00',
      status: 'completed',
    },
    {
      id: 'tx-3',
      type: 'in',
      token: 'BTC',
      amount: 0.05,
      timestamp: '2024-01-01T08:00:00',
      status: 'pending',
    },
  ];

  const handleSend = () => {
    toast.success('Fonction Envoyer');
  };

  const handleReceive = () => {
    toast.success('Fonction Recevoir');
  };

  const handleSwap = () => {
    toast.success('Fonction Échanger');
  };

  const handleBuy = () => {
    toast.success('Fonction Acheter');
  };

  const handleScanQR = () => {
    toast.success('Scanner QR');
  };

  const handleStake = () => {
    toast.success('Fonction Staking');
  };

  const WalletHeader = () => (
    <MobileWalletCard variant="featured" className="mb-4">
      <div className="text-center space-y-2">
        <p className={cn("text-gray-300", getFontSize('sm'))}>Solde Total</p>
        <h1 className={cn("font-bold text-white", getFontSize('3xl'))}>
          $12,847.32
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
            +$284.12 (2.34%)
          </Badge>
          <span className={cn("text-gray-400", getFontSize('sm'))}>24h</span>
        </div>
      </div>
    </MobileWalletCard>
  );

  const TokenList = () => (
    <div className="space-y-3">
      {mockTokens.map((token) => (
        <MobileWalletCard key={token.id} interactive className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0"></div>
              <div>
                <h4 className={cn("font-medium text-white", getFontSize('base'))}>
                  {token.symbol}
                </h4>
                <p className={cn("text-gray-400", getFontSize('sm'))}>
                  {token.balance.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("font-medium text-white", getFontSize('base'))}>
                ${token.value.toFixed(2)}
              </p>
              <Badge
                variant={token.change24h >= 0 ? 'default' : 'destructive'}
                className={getFontSize('xs')}
              >
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </MobileWalletCard>
      ))}
    </div>
  );

  const NFTList = () => (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((nft) => (
        <MobileWalletCard key={nft} interactive className="aspect-square">
          <div className="h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className={cn("text-white font-bold", getFontSize('lg'))}>
              NFT #{nft}
            </span>
          </div>
        </MobileWalletCard>
      ))}
    </div>
  );

  const TransactionHistory = () => (
    <div className="space-y-3">
      {mockTransactions.map((tx) => (
        <MobileWalletCard key={tx.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={cn("font-medium text-white", getFontSize('base'))}>
                Transaction #{tx.id}
              </h4>
              <p className={cn("text-gray-400", getFontSize('sm'))}>
                {new Date(tx.timestamp).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className={cn(
                "font-medium",
                tx.type === 'in' ? 'text-green-400' : 'text-red-400',
                getFontSize('base')
              )}>
                {tx.type === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
              </p>
              <Badge variant="outline" className={getFontSize('xs')}>
                {tx.status}
              </Badge>
            </div>
          </div>
        </MobileWalletCard>
      ))}
    </div>
  );

  return (
    <div className={cn(
      "min-h-screen space-y-4",
      isMobile ? "p-4" : isTablet ? "p-6 max-w-6xl mx-auto" : "p-6"
    )}>
      <WalletHeader />
      
      <QuickActions
        onSend={handleSend}
        onReceive={handleReceive}
        onSwap={handleSwap}
        onBuy={handleBuy}
        onScanQR={handleScanQR}
        onStake={handleStake}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full grid-cols-4 mb-4",
          isMobile ? "h-12" : "h-10"
        )}>
          <TabsTrigger value="overview" className={getFontSize('sm')}>
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="tokens" className={getFontSize('sm')}>
            Tokens
          </TabsTrigger>
          <TabsTrigger value="nfts" className={getFontSize('sm')}>
            NFTs
          </TabsTrigger>
          <TabsTrigger value="history" className={getFontSize('sm')}>
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Overview content */}
          <MobileWalletCard>
            <div className="space-y-4">
              <h3 className={cn("font-semibold text-white", getFontSize('lg'))}>
                Portefeuille Principal
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className={cn("text-gray-400", getFontSize('sm'))}>Tokens</p>
                  <p className={cn("font-bold text-white", getFontSize('xl'))}>8</p>
                </div>
                <div className="text-center">
                  <p className={cn("text-gray-400", getFontSize('sm'))}>NFTs</p>
                  <p className={cn("font-bold text-white", getFontSize('xl'))}>12</p>
                </div>
              </div>
            </div>
          </MobileWalletCard>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-3">
          {mockTokens.map((token) => (
            <MobileWalletCard key={token.id} interactive className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className={cn("font-medium text-white", getFontSize('base'))}>
                      {token.symbol}
                    </h4>
                    <p className={cn("text-gray-400", getFontSize('sm'))}>
                      {token.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-medium text-white", getFontSize('base'))}>
                    ${token.value.toFixed(2)}
                  </p>
                  <Badge
                    variant={token.change24h >= 0 ? 'default' : 'destructive'}
                    className={getFontSize('xs')}
                  >
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </MobileWalletCard>
          ))}
        </TabsContent>

        <TabsContent value="nfts" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((nft) => (
              <MobileWalletCard key={nft} interactive className="aspect-square">
                <div className="h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className={cn("text-white font-bold", getFontSize('lg'))}>
                    NFT #{nft}
                  </span>
                </div>
              </MobileWalletCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          {mockTransactions.map((tx) => (
            <MobileWalletCard key={tx.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={cn("font-medium text-white", getFontSize('base'))}>
                    Transaction #{tx.id}
                  </h4>
                  <p className={cn("text-gray-400", getFontSize('sm'))}>
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    tx.type === 'in' ? 'text-green-400' : 'text-red-400',
                    getFontSize('base')
                  )}>
                    {tx.type === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <Badge variant="outline" className={getFontSize('xs')}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            </MobileWalletCard>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedWalletDashboard;
