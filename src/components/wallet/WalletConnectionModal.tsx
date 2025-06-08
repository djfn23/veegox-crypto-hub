
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { WalletProvider } from '@/services/walletService';
import { Search, Download, Smartphone, Monitor, Shield, Building, Users } from 'lucide-react';

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
}

export const WalletConnectionModal = ({ isOpen, onClose, onConnect, isConnecting }: WalletConnectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | WalletProvider['category']>('all');
  
  const {
    getAllWallets,
    getInstalledWallets,
    getWalletsByCategory,
    isWalletConnecting
  } = useWalletConnection();

  const allWallets = getAllWallets();
  const installedWallets = getInstalledWallets();

  const filteredWallets = allWallets.filter(wallet => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || wallet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWalletConnect = async (walletId: string) => {
    try {
      await onConnect(walletId);
      onClose();
    } catch (error) {
      // Error handling is done in the useWalletConnection hook
    }
  };

  const getCategoryIcon = (category: WalletProvider['category']) => {
    switch (category) {
      case 'browser': return <Monitor className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'hardware': return <Shield className="h-4 w-4" />;
      case 'institutional': return <Building className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: WalletProvider['category']) => {
    switch (category) {
      case 'browser': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'mobile': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'hardware': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'institutional': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'social': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-slate-900 border-slate-700 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Connecter un Wallet</DialogTitle>
          <p className="text-gray-400">Choisissez parmi plus de 300 wallets supportés</p>
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

          {/* Installed Wallets Section */}
          {installedWallets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Wallets Installés ({installedWallets.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                {installedWallets.map((wallet) => (
                  <WalletCard 
                    key={`installed-${wallet.id}`}
                    wallet={wallet}
                    onConnect={handleWalletConnect}
                    isConnecting={isConnecting}
                    isWalletConnecting={isWalletConnecting}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                    priority
                  />
                ))}
              </div>
            </div>
          )}

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-slate-800">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedCategory('all')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger 
                value="browser" 
                onClick={() => setSelectedCategory('browser')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Monitor className="h-4 w-4 mr-1" />
                Navigateur
              </TabsTrigger>
              <TabsTrigger 
                value="mobile" 
                onClick={() => setSelectedCategory('mobile')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Smartphone className="h-4 w-4 mr-1" />
                Mobile
              </TabsTrigger>
              <TabsTrigger 
                value="hardware" 
                onClick={() => setSelectedCategory('hardware')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Shield className="h-4 w-4 mr-1" />
                Hardware
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                onClick={() => setSelectedCategory('social')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Users className="h-4 w-4 mr-1" />
                Social
              </TabsTrigger>
              <TabsTrigger 
                value="institutional" 
                onClick={() => setSelectedCategory('institutional')}
                className="text-white data-[state=active]:bg-slate-700"
              >
                <Building className="h-4 w-4 mr-1" />
                Pro
              </TabsTrigger>
            </TabsList>

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
  wallets: WalletProvider[];
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
  isWalletConnecting: (walletId: string) => boolean;
  getCategoryIcon: (category: WalletProvider['category']) => JSX.Element;
  getCategoryColor: (category: WalletProvider['category']) => string;
  priority?: boolean;
}

const WalletGrid = ({ 
  wallets, 
  onConnect, 
  isConnecting,
  isWalletConnecting,
  getCategoryIcon,
  getCategoryColor,
  priority = false 
}: WalletGridProps) => {
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            onConnect={onConnect}
            isConnecting={isConnecting}
            isWalletConnecting={isWalletConnecting}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            priority={priority}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

interface WalletCardProps {
  wallet: WalletProvider;
  onConnect: (walletId: string) => void;
  isConnecting: boolean;
  isWalletConnecting: (walletId: string) => boolean;
  getCategoryIcon: (category: WalletProvider['category']) => JSX.Element;
  getCategoryColor: (category: WalletProvider['category']) => string;
  priority?: boolean;
}

const WalletCard = ({ 
  wallet, 
  onConnect, 
  isConnecting,
  isWalletConnecting,
  getCategoryIcon,
  getCategoryColor,
  priority = false 
}: WalletCardProps) => {
  const isThisWalletConnecting = isWalletConnecting(wallet.id);

  return (
    <div
      className={`p-4 border rounded-lg bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200 ${
        priority ? 'ring-2 ring-green-500/30' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xl">{wallet.icon}</span>
          </div>
          <div>
            <h4 className="text-white font-medium">{wallet.name}</h4>
            <Badge className={`text-xs ${getCategoryColor(wallet.category)}`}>
              {getCategoryIcon(wallet.category)}
              <span className="ml-1 capitalize">{wallet.category}</span>
            </Badge>
          </div>
        </div>
        {wallet.isInstalled && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Installé
          </Badge>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{wallet.description}</p>
      
      <div className="flex space-x-2">
        {wallet.isInstalled ? (
          <Button
            onClick={() => onConnect(wallet.id)}
            disabled={isConnecting}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isThisWalletConnecting ? 'Connexion...' : 'Connecter'}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => onConnect(wallet.id)}
              disabled={isConnecting}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-700"
            >
              Essayer
            </Button>
            {wallet.downloadUrl && (
              <Button
                onClick={() => window.open(wallet.downloadUrl, '_blank')}
                variant="outline"
                size="sm"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
