
import { useState } from "react";
import { AccountsOverview } from "./AccountsOverview";
import { TransactionsHistory } from "./TransactionsHistory";
import { SmartSavingsModule } from "./SmartSavingsModule";
import { PaymentQRModule } from "./PaymentQRModule";
import { EnhancedBankingAnalytics } from "./EnhancedBankingAnalytics";
import { MobileCryptoBankHeader } from "./MobileCryptoBankHeader";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { Wallet, Send, Target, QrCode, BarChart3 } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { Button } from "@/components/ui/button";

interface MobileBankingView {
  id: string;
  title: string;
  icon: any;
  component: any;
  description: string;
  color: string;
}

export const MobileCryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const [activeView, setActiveView] = useState<string | null>(null);

  const bankingViews: MobileBankingView[] = [
    {
      id: "accounts",
      title: "Mes Comptes",
      icon: Wallet,
      component: AccountsOverview,
      description: "Gérez vos comptes crypto",
      color: "purple"
    },
    {
      id: "transactions",
      title: "Transactions",
      icon: Send,
      component: TransactionsHistory,
      description: "Historique et virements",
      color: "blue"
    },
    {
      id: "smart-savings",
      title: "Épargne IA",
      icon: Target,
      component: SmartSavingsModule,
      description: "Objectifs d'épargne intelligents",
      color: "green"
    },
    {
      id: "qr-payments",
      title: "Paiements QR",
      icon: QrCode,
      component: PaymentQRModule,
      description: "Payez et recevez instantanément",
      color: "orange"
    },
    {
      id: "analytics",
      title: "Analytics IA",
      icon: BarChart3,
      component: EnhancedBankingAnalytics,
      description: "Insights financiers avancés",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      green: "bg-green-500/20 text-green-400 border-green-500/30",
      orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      pink: "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <MobileCard variant="elevated" className="max-w-md mx-auto">
          <MobileCardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-6 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white mb-3">
              Connexion Requise
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Connectez-vous pour accéder à vos services bancaires crypto sécurisés
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full touch-target-lg font-semibold shadow-lg">
              Se Connecter
            </Button>
          </MobileCardContent>
        </MobileCard>
      </div>
    );
  }

  // Show specific view if selected
  if (activeView) {
    const view = bankingViews.find(v => v.id === activeView);
    if (view) {
      const ViewComponent = view.component;
      return (
        <div className="space-y-6 animate-fade-in">
          <MobileCryptoBankHeader
            activeView={activeView}
            onBackClick={() => setActiveView(null)}
            showQuickActions={false}
          />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">{view.title}</h1>
            <p className="text-gray-400 leading-relaxed">{view.description}</p>
          </div>

          <ViewComponent userId={user.id} userAccounts={[]} />
        </div>
      );
    }
  }

  // Main dashboard view
  return (
    <div className="space-y-6 animate-fade-in">
      <MobileCryptoBankHeader
        activeView={activeView}
        onBackClick={() => setActiveView(null)}
        showQuickActions={true}
      />

      {/* Banking Services Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Services Bancaires</h2>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {bankingViews.map((view) => {
            const Icon = view.icon;
            return (
              <MobileCard
                key={view.id}
                variant="interactive"
                onClick={() => setActiveView(view.id)}
                className="shadow-lg hover:shadow-xl"
              >
                <MobileCardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${getColorClasses(view.color)} border transition-all duration-200`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-base mb-1">{view.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{view.description}</p>
                    </div>
                    <div className="text-gray-400 flex-shrink-0">
                      <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </MobileCardContent>
              </MobileCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};
