
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';

const CreditModuleHeader = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();

  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Module Crédit</h2>
        <p className="text-gray-400">Prêts décentralisés avec scoring de crédit IA - Révolutionnant la DeFi traditionnelle</p>
        <div className="mt-2 text-sm text-blue-400">
          🚀 Alimenté par notre contrat Polygon : 0xF3E1...343E
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
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
