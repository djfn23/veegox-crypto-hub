
import { useState } from "react";
import { AccountsOverview } from "./AccountsOverview";
import { TransactionsHistory } from "./TransactionsHistory";
import { SmartSavingsModule } from "./SmartSavingsModule";
import { PaymentQRModule } from "./PaymentQRModule";
import { EnhancedBankingAnalytics } from "./EnhancedBankingAnalytics";
import { Wallet, Send, Target, QrCode, BarChart3, ArrowLeft, Shield, Plus } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface MobileBankingView {
  id: string;
  title: string;
  icon: any;
  component: any;
  description: string;
}

export const MobileCryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const { isSupported: isBiometricSupported, isEnrolled: isBiometricEnrolled, enrollBiometric } = useBiometricAuth();
  const [activeView, setActiveView] = useState<string | null>(null);
  const { toast } = useToast();

  const bankingViews: MobileBankingView[] = [
    {
      id: "accounts",
      title: "Mes Comptes",
      icon: Wallet,
      component: AccountsOverview,
      description: "Gérez vos comptes crypto"
    },
    {
      id: "transactions",
      title: "Transactions",
      icon: Send,
      component: TransactionsHistory,
      description: "Historique et virements"
    },
    {
      id: "smart-savings",
      title: "Épargne IA",
      icon: Target,
      component: SmartSavingsModule,
      description: "Objectifs d'épargne intelligents"
    },
    {
      id: "qr-payments",
      title: "Paiements QR",
      icon: QrCode,
      component: PaymentQRModule,
      description: "Payez et recevez instantanément"
    },
    {
      id: "analytics",
      title: "Analytics IA",
      icon: BarChart3,
      component: EnhancedBankingAnalytics,
      description: "Insights financiers avancés"
    }
  ];

  const handleEnableBiometric = async () => {
    if (!user) return;
    
    const result = await enrollBiometric(user.id);
    if (result.success) {
      toast({
        title: "Authentification biométrique activée",
        description: "Votre empreinte digitale a été enregistrée avec succès",
      });
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible d'activer l'authentification biométrique",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-white mb-2">
            Connexion Requise
          </h3>
          <p className="text-gray-400 mb-6">
            Connectez-vous pour accéder à vos services bancaires crypto
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full touch-target-lg">
            Se Connecter
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show specific view if selected
  if (activeView) {
    const view = bankingViews.find(v => v.id === activeView);
    if (view) {
      const ViewComponent = view.component;
      return (
        <div className="space-y-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setActiveView(null)}
              className="touch-target-lg text-white p-2"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
            {isBiometricSupported && !isBiometricEnrolled && (
              <Button
                onClick={handleEnableBiometric}
                size="sm"
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white touch-target"
              >
                <Shield className="h-4 w-4 mr-1" />
                Sécuriser
              </Button>
            )}
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white">{view.title}</h1>
            <p className="text-gray-400">{view.description}</p>
          </div>

          <ViewComponent userId={user.id} userAccounts={[]} />
        </div>
      );
    }
  }

  // Main dashboard view
  return (
    <div className="space-y-6">
      {/* Header with security status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Banque Crypto</h1>
            <p className="text-gray-400 text-sm">Services bancaires intelligents</p>
          </div>
          
          {/* Security Badge */}
          {isBiometricEnrolled ? (
            <Badge className="bg-green-500 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Sécurisé
            </Badge>
          ) : isBiometricSupported ? (
            <Button
              onClick={handleEnableBiometric}
              size="sm"
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white touch-target"
            >
              <Shield className="h-4 w-4 mr-1" />
              Sécuriser
            </Button>
          ) : null}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 touch-target-lg p-4 h-auto flex-col">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Virement</span>
          </Button>
          <Button variant="outline" className="border-slate-600 text-white touch-target-lg p-4 h-auto flex-col">
            <QrCode className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">QR Code</span>
          </Button>
        </div>
      </div>

      {/* Banking Services Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Services</h2>
        <div className="space-y-3">
          {bankingViews.map((view) => {
            const Icon = view.icon;
            return (
              <Card
                key={view.id}
                className="bg-slate-900/50 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer active:scale-[0.98]"
                onClick={() => setActiveView(view.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-base">{view.title}</h3>
                      <p className="text-sm text-gray-400 truncate">{view.description}</p>
                    </div>
                    <div className="text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
