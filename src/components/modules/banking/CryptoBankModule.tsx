
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
import { MobileCryptoBankModule } from "./MobileCryptoBankModule";
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/ui/mobile-tabs";
import { Wallet, CreditCard, PiggyBank, QrCode, BarChart3, Send, Shield, Zap, Target } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { useSecureToast } from "@/hooks/useSecureToast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VeegoxLogo from "@/components/ui/veegox-logo";

export const CryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const { isMobile } = useResponsiveLayout();
  const { isSupported: isBiometricSupported, isEnrolled: isBiometricEnrolled, enrollBiometric } = useBiometricAuth();
  const [activeTab, setActiveTab] = useState("accounts");
  const { success: toastSuccess, error: toastError } = useSecureToast();

  // Use mobile-optimized version on mobile devices
  if (isMobile) {
    return <MobileCryptoBankModule />;
  }

  const handleEnableBiometric = async () => {
    if (!user) return;
    
    try {
      const result = await enrollBiometric(user.id);
      if (result.success) {
        await toastSuccess("Authentification biométrique activée");
      } else {
        await toastError(result.error || "Impossible d'activer l'authentification biométrique");
      }
    } catch (error) {
      await toastError("Erreur lors de l'activation biométrique");
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 max-w-md mx-auto">
        <CardContent className="p-8 text-center">
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
        </CardContent>
      </Card>
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
              Activer Touch ID
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
        <MobileTabsList className="grid grid-cols-4 lg:grid-cols-8">
          {tabItems.map((item) => (
            <MobileTabsTrigger
              key={item.value}
              value={item.value}
              icon={<item.icon className="h-4 w-4" />}
            >
              {item.label}
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
