
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAlchemyWallet } from '@/hooks/useAlchemyWallet';
import { type AlchemyWalletProvider } from '@/services/alchemyWalletService';
import { 
  Search, 
  Smartphone, 
  Monitor, 
  Shield, 
  Building, 
  Users, 
  Brain,
  Zap,
  Gift,
  Key,
  Layers
} from 'lucide-react';

interface AlchemyWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
}

export const AlchemyWalletModal = ({ isOpen, onClose, onConnect, isConnecting }: AlchemyWalletModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | AlchemyWalletProvider['category']>('all');
  
  const {
    getAllWallets,
    getWalletsByCategory,
    isWalletConnecting
  } = useAlchemyWallet();

  const allWallets = getAllWallets();

  const filteredWallets = allWallets.filter(wallet => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || wallet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const socialWallets = getWalletsByCategory('social');
  const smartWallets = getWalletsByCategory('smart');
  const traditionalWallets = getWalletsByCategory('traditional');

  const handleWalletConnect = async (walletId: string) => {
    try {
      await onConnect(walletId);
      onClose();
    } catch (error) {
      // Error handling is done in the useAlchemyWallet hook
    }
  };

  const getCategoryIcon = (category: AlchemyWalletProvider['category']) => {
    switch (category) {
      case 'social': return <Users className="h-4 w-4" />;
      case 'smart': return <Brain className="h-4 w-4" />;
      case 'traditional': return <Monitor className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: AlchemyWalletProvider['category']) => {
    switch (category) {
      case 'social': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'smart': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'traditional': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl bg-slate-900 border-slate-700 max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            Connecter avec Alchemy Account Kit
          </DialogTitle>
          <p className="text-gray-400">
            Connexion sociale, Smart Accounts avec Account Abstraction, et wallets traditionnels
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un wallet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white"
            />
          </div>

          {/* Features Banner */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Gift className="h-5 w-5 text-yellow-400" />
              Avantages Alchemy Account Kit
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Zap className="h-4 w-4 text-green-400" />
                Transactions gratuites
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Key className="h-4 w-4 text-blue-400" />
                Connexion sociale
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Layers className="h-4 w-4 text-purple-400" />
                Account Abstraction
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Shield className="h-4 w-4 text-orange-400" />
                Récupération de compte
              </div>
            </div>
          </div>

          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800">
              <TabsTrigger 
                value="social" 
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Users className="h-4 w-4 mr-1" />
                Social ({socialWallets.length})
              </TabsTrigger>
              <TabsTrigger 
                value="smart" 
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Brain className="h-4 w-4 mr-1" />
                Smart ({smartWallets.length})
              </TabsTrigger>
              <TabsTrigger 
                value="traditional" 
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Monitor className="h-4 w-4 mr-1" />
                Classique ({traditionalWallets.length})
              </TabsTrigger>
              <TabsTrigger 
                value="all" 
                className="text-white data-[state=active]:bg-slate-700"
              >
                Tous ({allWallets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="social" className="mt-4">
              <div className="mb-4 p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                <p className="text-pink-300 text-sm">
                  <Users className="h-4 w-4 inline mr-1" />
                  Connexion facile sans seed phrase. Récupération de compte sociale.
                </p>
              </div>
              <WalletGrid 
                wallets={socialWallets}
                onConnect={handleWalletConnect}
                isConnecting={isConnecting}
                isWalletConnecting={isWalletConnecting}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>

            <TabsContent value="smart" className="mt-4">
              <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-300 text-sm">
                  <Brain className="h-4 w-4 inline mr-1" />
                  Smart Contracts avec Account Abstraction. Transactions gratuites et fonctionnalités avancées.
                </p>
              </div>
              <WalletGrid 
                wallets={smartWallets}
                onConnect={handleWalletConnect}
                isConnecting={isConnecting}
                isWalletConnecting={isWalletConnecting}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>

            <TabsContent value="traditional" className="mt-4">
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  <Monitor className="h-4 w-4 inline mr-1" />
                  Wallets traditionnels optimisés par l'infrastructure Alchemy.
                </p>
              </div>
              <WalletGrid 
                wallets={traditionalWallets}
                onConnect={handleWalletConnect}
                isConnecting={isConnecting}
                isWalletConnecting={isWalletConnecting}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <WalletGrid 
                wallets={filteredWallets}
                onConnect={handleWalletConnect}
                isConnecting={isConnecting}
                isWalletConnecting={isWalletConnecting}
                getCategoryIcon={getCategoryIcon}
                getCategoryColor={getCategoryColor}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface WalletGridProps {
  wallets: AlchemyWalletProvider[];
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
  isWalletConnecting: (walletId: string) => boolean;
  getCategoryIcon: (category: AlchemyWalletProvider['category']) => JSX.Element;
  getCategoryColor: (category: AlchemyWalletProvider['category']) => string;
}

const WalletGrid = ({ 
  wallets, 
  onConnect, 
  isConnecting,
  isWalletConnecting,
  getCategoryIcon,
  getCategoryColor
}: WalletGridProps) => {
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            onConnect={onConnect}
            isConnecting={isConnecting}
            isWalletConnecting={isWalletConnecting}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

interface WalletCardProps {
  wallet: AlchemyWalletProvider;
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
  isWalletConnecting: (walletId: string) => boolean;
  getCategoryIcon: (category: AlchemyWalletProvider['category']) => JSX.Element;
  getCategoryColor: (category: AlchemyWalletProvider['category']) => string;
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

  const getSpecialFeatures = () => {
    const features = [];
    if (wallet.category === 'social') {
      features.push('Pas de seed phrase');
      features.push('Récupération sociale');
    }
    if (wallet.category === 'smart') {
      features.push('Transactions gratuites');
      features.push('Batch transactions');
      features.push('Session keys');
    }
    return features;
  };

  const specialFeatures = getSpecialFeatures();

  return (
    <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
            {wallet.icon}
          </div>
          <div>
            <h4 className="text-white font-medium text-lg">{wallet.name}</h4>
            <Badge className={`text-xs ${getCategoryColor(wallet.category)}`}>
              {getCategoryIcon(wallet.category)}
              <span className="ml-1 capitalize">{wallet.category}</span>
            </Badge>
          </div>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-3">{wallet.description}</p>
      
      {specialFeatures.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {specialFeatures.map((feature, index) => (
              <Badge 
                key={index}
                className="text-xs bg-green-500/20 text-green-400 border-green-500/30"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <Button
        onClick={() => onConnect(wallet.id)}
        disabled={isConnecting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        {isThisWalletConnecting ? 'Connexion...' : 'Connecter'}
      </Button>
    </div>
  );
};
