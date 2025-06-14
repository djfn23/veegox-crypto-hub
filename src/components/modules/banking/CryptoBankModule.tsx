
import { useState } from "react";
import { AccountsOverview } from "./AccountsOverview";
import { TransactionsHistory } from "./TransactionsHistory";
import { SavingsPlans } from "./SavingsPlans";
import { VirtualCards } from "./VirtualCards";
import { PaymentRequests } from "./PaymentRequests";
import { BankingAnalytics } from "./BankingAnalytics";
import { SmartSavingsModule } from "./SmartSavingsModule";
import { EnhancedBankingAnalytics } from "./EnhancedBankingAnalytics";
import { PaymentQRModule } from "./PaymentQRModule";
import { Wallet, CreditCard, PiggyBank, QrCode, BarChart3, Send, Shield, Zap, Target } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/ui/mobile-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VeegoxLogo from "@/components/ui/veegox-logo";
import { useToast } from "@/hooks/use-toast";

export const CryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const { isMobile } = useResponsiveLayout();
  const { isSupported: isBiometricSupported, isEnrolled: isBiometricEnrolled, enrollBiometric } = useBiometricAuth();
  const [activeTab, setActiveTab] = useState("accounts");
  const { toast } = useToast();

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
    const CardComponent = isMobile ? MobileCard : Card;
    const CardContentComponent = isMobile ? MobileCardContent : CardContent;
    
    return (
      <CardComponent className={`${isMobile ? '' : 'bg-slate-900/50 border-slate-700'} max-w-md mx-auto`}>
        <CardContentComponent className="p-8 text-center">
          <VeegoxLogo size="xl" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Connexion Requise
          </h3>
          <p className="text-gray-400 mb-6">
            Connectez-vous pour accéder à vos services bancaires crypto
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full">
            Se Connecter
          </Button>
        </CardContentComponent>
      </CardComponent>
    );
  }

  const tabItems = [
    { value: "accounts", label: "Comptes", icon: Wallet },
    { value: "transactions", label: "Transactions", icon: Send },
    { value: "savings", label: "Épargne", icon: PiggyBank },
    { value: "smart-savings", label: "Épargne IA", icon: Target },
    { value: "qr-payments", label: "QR Pay", icon: QrCode },
    { value: "cards", label: "Cartes", icon: CreditCard },
    { value: "analytics", label: "Analytics", icon: BarChart3 },
    { value: "ai-insights", label: "Insights IA", icon: Zap }
  ];

  // For mobile, show only 4 main tabs and group others
  const mobileTabItems = isMobile ? [
    { value: "accounts", label: "Comptes", icon: Wallet },
    { value: "transactions", label: "Historique", icon: Send },
    { value: "smart-savings", label: "Épargne IA", icon: Target },
    { value: "qr-payments", label: "QR Pay", icon: QrCode }
  ] : tabItems;

  return (
    <div className="space-y-6">
      {/* Header with security status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Banque Crypto</h1>
          <p className="text-gray-400 text-sm md:text-base">Gérez vos comptes et transactions crypto avec l'IA</p>
        </div>
        
        {/* Security Badge */}
        <div className="flex items-center gap-2">
          {isBiometricSupported && !isBiometricEnrolled && (
            <Button
              onClick={handleEnableBiometric}
              size="sm"
              variant="outline"
              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              {isMobile ? "Sécuriser" : "Activer Touch ID"}
            </Button>
          )}
          {isBiometricEnrolled && (
            <Badge className="bg-green-500 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Sécurisé
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <MobileTabs value={activeTab} onValueChange={setActiveTab}>
        <MobileTabsList 
          className={isMobile ? "grid grid-cols-2 gap-2 p-2" : "grid grid-cols-4 lg:grid-cols-8"}
          orientation="horizontal"
        >
          {mobileTabItems.map((item) => (
            <MobileTabsTrigger
              key={item.value}
              value={item.value}
              icon={<item.icon className="h-4 w-4" />}
              className={isMobile ? "flex-col py-3 px-2 text-xs" : ""}
            >
              <span className={isMobile ? "mt-1" : ""}>{item.label}</span>
            </MobileTabsTrigger>
          ))}
        </MobileTabsList>

        <MobileTabsContent value="accounts">
          <AccountsOverview userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="transactions">
          <TransactionsHistory userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="savings">
          <SavingsPlans userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="smart-savings">
          <SmartSavingsModule userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="qr-payments">
          <PaymentQRModule userId={user.id} userAccounts={[]} />
        </MobileTabsContent>

        <MobileTabsContent value="cards">
          <VirtualCards userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="analytics">
          <BankingAnalytics userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="ai-insights">
          <EnhancedBankingAnalytics userId={user.id} />
        </MobileTabsContent>
      </MobileTabs>
    </div>
  );
};
