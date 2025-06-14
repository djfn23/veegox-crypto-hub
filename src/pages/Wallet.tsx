
import { PageLayout } from "@/components/layout/PageLayout";
import { Wallet } from "lucide-react";
import EnhancedWalletDashboard from "@/components/wallet/EnhancedWalletDashboard";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VeegoxLogo from "@/components/ui/veegox-logo";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";

const WalletPage = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const { isMobile } = useResponsiveLayout();

  if (!isAuthenticated || !user) {
    const CardComponent = isMobile ? MobileCard : Card;
    const CardContentComponent = isMobile ? MobileCardContent : CardContent;
    
    return (
      <PageLayout
        title="Portefeuille Veegox"
        subtitle="Connectez-vous pour accéder à votre portefeuille"
        icon={<VeegoxLogo size="md" />}
      >
        <CardComponent className={`${isMobile ? '' : 'bg-slate-900/50 border-slate-700'} max-w-md mx-auto`}>
          <CardContentComponent className="p-8 text-center">
            <VeegoxLogo size="xl" className="mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Connexion Requise
            </h3>
            <p className="text-gray-400 mb-6">
              Connectez votre wallet pour accéder à l'écosystème Veegox complet
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">
              Se Connecter
            </Button>
          </CardContentComponent>
        </CardComponent>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Portefeuille Veegox"
      subtitle="Gérez vos tokens et actifs de l'écosystème"
      icon={<VeegoxLogo size="md" />}
    >
      <EnhancedWalletDashboard />
    </PageLayout>
  );
};

export default WalletPage;
