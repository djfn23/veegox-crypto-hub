
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUnifiedAuth } from './UnifiedAuthProvider';
import { useAlchemyWallet } from '@/hooks/useAlchemyWallet';
import { 
  Mail, 
  Lock, 
  User, 
  Zap, 
  Users, 
  Brain, 
  Monitor,
  Gift,
  Key,
  Layers,
  Shield
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');

  const { signInWithEmail, signUpWithEmail, signInWithWallet } = useUnifiedAuth();
  const { getAllWallets, getWalletsByCategory, isWalletConnecting } = useAlchemyWallet();

  const socialWallets = getWalletsByCategory('social');
  const smartWallets = getWalletsByCategory('smart');
  const traditionalWallets = getWalletsByCategory('traditional');

  const handleEmailAuth = async (isSignUp: boolean) => {
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async (walletId: string) => {
    setLoading(true);
    try {
      await signInWithWallet(walletId);
      onClose();
    } catch (error) {
      console.error('Wallet connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <Users className="h-4 w-4" />;
      case 'smart': return <Brain className="h-4 w-4" />;
      case 'traditional': return <Monitor className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'smart': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'traditional': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-900 border-slate-700 max-h-[90vh] w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            Se connecter à Veegox
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800">
            <TabsTrigger value="email" className="text-white data-[state=active]:bg-slate-700 text-xs md:text-sm">
              <Mail className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="text-white data-[state=active]:bg-slate-700 text-xs md:text-sm">
              <Users className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="smart" className="text-white data-[state=active]:bg-slate-700 text-xs md:text-sm">
              <Brain className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Smart</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="text-white data-[state=active]:bg-slate-700 text-xs md:text-sm">
              <Monitor className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Wallet</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-medium mb-2">Connexion Traditionnelle</h3>
              <p className="text-blue-200 text-sm">Utilisez votre email et mot de passe pour accéder à toutes les fonctionnalités.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleEmailAuth(false)}
                  disabled={loading || !email || !password}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
                <Button
                  onClick={() => handleEmailAuth(true)}
                  disabled={loading || !email || !password}
                  variant="outline"
                  className="flex-1 border-slate-600 text-white hover:bg-slate-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  S'inscrire
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
              <h3 className="text-pink-300 font-medium mb-2 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Connexion Sociale Web3
              </h3>
              <p className="text-pink-200 text-sm">Connectez-vous avec Google ou Apple. Pas de seed phrase, récupération sociale incluse.</p>
            </div>
            
            <ScrollArea className="h-64">
              <div className="grid grid-cols-1 gap-3">
                {socialWallets.map((wallet) => (
                  <WalletCard
                    key={wallet.id}
                    wallet={wallet}
                    onConnect={handleWalletConnect}
                    isConnecting={loading}
                    isWalletConnecting={isWalletConnecting}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="smart" className="space-y-4 mt-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-300 font-medium mb-2 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Smart Contract Accounts
              </h3>
              <p className="text-purple-200 text-sm">Account Abstraction avec transactions gratuites et fonctionnalités avancées.</p>
            </div>
            
            <ScrollArea className="h-64">
              <div className="grid grid-cols-1 gap-3">
                {smartWallets.map((wallet) => (
                  <WalletCard
                    key={wallet.id}
                    wallet={wallet}
                    onConnect={handleWalletConnect}
                    isConnecting={loading}
                    isWalletConnecting={isWalletConnecting}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-4 mt-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Wallets Traditionnels
              </h3>
              <p className="text-blue-200 text-sm">Connectez MetaMask et autres wallets traditionnels via l'infrastructure Alchemy.</p>
            </div>
            
            <ScrollArea className="h-64">
              <div className="grid grid-cols-1 gap-3">
                {traditionalWallets.map((wallet) => (
                  <WalletCard
                    key={wallet.id}
                    wallet={wallet}
                    onConnect={handleWalletConnect}
                    isConnecting={loading}
                    isWalletConnecting={isWalletConnecting}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface WalletCardProps {
  wallet: any;
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
  isWalletConnecting: (walletId: string) => boolean;
  getCategoryIcon: (category: string) => JSX.Element;
  getCategoryColor: (category: string) => string;
}

const WalletCard = ({ 
  wallet, 
  onConnect, 
  isConnecting,
  isWalletConnecting,
  getCategoryIcon,
  getCategoryColor
}: WalletCardProps) => {
  const isThisWalletConnecting = isWalletConnecting(wallet.id);

  return (
    <div className="p-3 md:p-4 border rounded-lg bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-lg md:text-xl flex-shrink-0">
            {wallet.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium text-sm md:text-base truncate">{wallet.name}</h4>
            <Badge className={`text-xs ${getCategoryColor(wallet.category)} mt-1`}>
              {getCategoryIcon(wallet.category)}
              <span className="ml-1 capitalize">{wallet.category}</span>
            </Badge>
            <p className="text-gray-400 text-xs mt-1 line-clamp-2">{wallet.description}</p>
          </div>
        </div>
        <Button
          onClick={() => onConnect(wallet.id)}
          disabled={isConnecting}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-shrink-0 ml-2"
        >
          {isThisWalletConnecting ? 'Connexion...' : 'Connecter'}
        </Button>
      </div>
    </div>
  );
};
