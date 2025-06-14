import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useUnifiedAuth } from '@/components/auth/UnifiedAuthProvider';
import { User, LogOut } from 'lucide-react';

const CreditModuleHeader = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useUnifiedAuth();

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-0">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Module Crédit</h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Prêts décentralisés avec scoring de crédit IA - Révolutionnant la DeFi traditionnelle
        </p>
        <div className="mt-2 text-xs md:text-sm text-blue-400">
          🚀 Alimenté par notre contrat Polygon : 0xF3E1...343E
        </div>
      </div>
      
      <div className="flex items-center justify-end lg:justify-start gap-3 lg:flex-shrink-0">
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-white order-2 sm:order-1">
              <User className="h-4 w-4" />
              <span className="text-sm truncate max-w-[150px] md:max-w-none">{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="text-white border-white/20 hover:bg-white/10 w-full sm:w-auto order-1 sm:order-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="sm:hidden">Déconnexion</span>
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            size="sm"
          >
            Se connecter
          </Button>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default CreditModuleHeader;
