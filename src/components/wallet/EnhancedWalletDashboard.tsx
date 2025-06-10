
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingUp, 
  Send, 
  ArrowDownLeft, 
  Plus, 
  Star,
  PieChart,
  Activity,
  Coins,
  Zap
} from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { tokenEcosystemService, TokenBalance, EcosystemStats } from "@/services/tokenEcosystemService";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { GlassCard } from "@/components/ui/glass-card";

const EnhancedWalletDashboard = () => {
  const { user } = useUnifiedAuth();
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [ecosystemStats, setEcosystemStats] = useState<EcosystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (user?.walletAddress) {
      loadWalletData();
    }
  }, [user]);

  const loadWalletData = async () => {
    if (!user?.walletAddress) return;
    
    setLoading(true);
    try {
      const [balances, stats] = await Promise.all([
        tokenEcosystemService.getWalletTokenBalances(user.walletAddress),
        tokenEcosystemService.getEcosystemStats()
      ]);

      setTokenBalances(balances);
      setEcosystemStats(stats);
      setTotalValue(balances.reduce((sum, balance) => sum + balance.balanceUSD, 0));
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTokenLogo = (token: TokenBalance['token']) => {
    if (token.logo) {
      return <img src={token.logo} alt={token.symbol} className="w-8 h-8 rounded-full" />;
    }
    
    // Logo par défaut basé sur le symbol
    const colors = [
      'from-purple-500 to-blue-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-purple-500',
      'from-blue-500 to-indigo-500'
    ];
    const colorIndex = token.symbol.charCodeAt(0) % colors.length;
    
    return (
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors[colorIndex]} flex items-center justify-center`}>
        <span className="text-white font-bold text-sm">{token.symbol.slice(0, 2)}</span>
      </div>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec logo Veegox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Veegox Wallet</h1>
            <p className="text-gray-400">Écosystème Token Intégré</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Recevoir
          </Button>
        </div>
      </div>

      {/* Vue d'ensemble du portefeuille */}
      <GlassCard className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-400" />
            Valeur Totale du Portefeuille
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-4">
            <AnimatedNumber value={totalValue} prefix="$" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-400">Tokens</div>
              <div className="text-lg font-semibold text-white">{tokenBalances.length}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">24h Change</div>
              <div className="text-lg font-semibold text-green-400">+5.2%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Staking</div>
              <div className="text-lg font-semibold text-blue-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400">Récompenses</div>
              <div className="text-lg font-semibold text-yellow-400">$125.50</div>
            </div>
          </div>
        </CardContent>
      </GlassCard>

      {/* Statistiques de l'écosystème */}
      {ecosystemStats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard>
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{ecosystemStats.totalTokens}</div>
              <div className="text-sm text-gray-400">Tokens Écosystème</div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-white">
                {formatCurrency(ecosystemStats.totalMarketCap)}
              </div>
              <div className="text-sm text-gray-400">Market Cap Total</div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">{ecosystemStats.activeUsers}</div>
              <div className="text-sm text-gray-400">Utilisateurs Actifs</div>
            </CardContent>
          </GlassCard>
          
          <GlassCard>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">
                {formatCurrency(ecosystemStats.stakingRewards)}
              </div>
              <div className="text-sm text-gray-400">Récompenses Staking</div>
            </CardContent>
          </GlassCard>
        </div>
      )}

      {/* Liste des tokens */}
      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="tokens" className="data-[state=active]:bg-purple-600">
            Mes Tokens
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-purple-600">
            Activités
          </TabsTrigger>
          <TabsTrigger value="staking" className="data-[state=active]:bg-purple-600">
            Staking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-4">
          {tokenBalances.map((balance, index) => (
            <GlassCard key={balance.tokenAddress} className="hover:bg-white/10 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTokenLogo(balance.token)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{balance.token.name}</span>
                        {balance.token.symbol === 'VGX' && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                        {balance.token.isActive && (
                          <Badge variant="secondary" className="bg-green-600/20 text-green-400 text-xs">
                            Actif
                          </Badge>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {parseFloat(balance.balance).toFixed(4)} {balance.token.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {formatCurrency(balance.balanceUSD)}
                    </div>
                    <div className="text-sm text-gray-400">
                      ${balance.token.price?.toFixed(6) || '0.000000'}
                    </div>
                  </div>
                </div>
                
                {/* Actions rapides */}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trade
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                    <Plus className="h-3 w-3 mr-1" />
                    Stake
                  </Button>
                </div>
              </CardContent>
            </GlassCard>
          ))}
        </TabsContent>

        <TabsContent value="activities">
          <GlassCard>
            <CardContent className="p-6 text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-medium text-white mb-2">Activités Récentes</h3>
              <p className="text-gray-400">
                Vos transactions et interactions avec l'écosystème apparaîtront ici
              </p>
            </CardContent>
          </GlassCard>
        </TabsContent>

        <TabsContent value="staking">
          <GlassCard>
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-lg font-medium text-white mb-2">Staking Disponible</h3>
              <p className="text-gray-400 mb-4">
                Stakez vos tokens pour gagner des récompenses
              </p>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Explorer le Staking
              </Button>
            </CardContent>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedWalletDashboard;
