
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { LoginModal } from '@/components/auth/LoginModal';
import { 
  User, 
  LogOut, 
  Wallet, 
  Shield, 
  ChevronDown,
  Zap,
  Users,
  Brain,
  Monitor
} from 'lucide-react';

export const UserMenu = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, signOut, isAuthenticated } = useUnifiedAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Button
          onClick={() => setShowLoginModal(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
          size="sm"
        >
          <User className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Se connecter</span>
          <span className="sm:hidden">Connexion</span>
        </Button>
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }

  const getProviderIcon = () => {
    if (user?.provider === 'alchemy') {
      if (user.isSmartAccount) return <Brain className="h-4 w-4" />;
      return <Wallet className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const getProviderBadge = () => {
    if (user?.provider === 'alchemy') {
      if (user.isSmartAccount) {
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Brain className="h-3 w-3 mr-1" />
            Smart Account
          </Badge>
        );
      }
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <Wallet className="h-3 w-3 mr-1" />
          Wallet
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        <User className="h-3 w-3 mr-1" />
        Email
      </Badge>
    );
  };

  const displayName = user?.name || user?.email || (user?.walletAddress ? 
    `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}` : 
    'Utilisateur');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-600 text-white hover:bg-slate-700 max-w-[200px]"
        >
          <div className="flex items-center space-x-2 min-w-0">
            {getProviderIcon()}
            <span className="truncate text-xs sm:text-sm">{displayName}</span>
            <ChevronDown className="h-3 w-3 flex-shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-slate-900 border-slate-700" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {getProviderIcon()}
              <span className="text-white font-medium truncate">{displayName}</span>
            </div>
            {getProviderBadge()}
            
            {user?.provider === 'alchemy' && user.walletAddress && (
              <div className="bg-slate-800 rounded-lg p-3 space-y-2">
                <div className="text-xs text-gray-400">Adresse Wallet</div>
                <div className="text-white font-mono text-sm break-all">
                  {user.walletAddress}
                </div>
                {user.isSmartAccount && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Transactions gratuites
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Récupération sociale
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {user?.email && (
              <div className="text-sm text-gray-400">
                {user.email}
              </div>
            )}
          </div>

          <div className="border-t border-slate-700 pt-2">
            <Button
              onClick={signOut}
              variant="ghost"
              size="sm"
              className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
