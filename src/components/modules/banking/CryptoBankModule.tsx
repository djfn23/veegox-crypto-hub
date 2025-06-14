
import { useState } from "react";
import { AccountsOverview } from "./AccountsOverview";
import { TransactionsHistory } from "./TransactionsHistory";
import { SavingsPlans } from "./SavingsPlans";
import { VirtualCards } from "./VirtualCards";
import { PaymentRequests } from "./PaymentRequests";
import { BankingAnalytics } from "./BankingAnalytics";
import { Wallet, CreditCard, PiggyBank, QrCode, BarChart3, Send } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card";
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from "@/components/ui/mobile-tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VeegoxLogo from "@/components/ui/veegox-logo";

export const CryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const { isMobile } = useResponsiveLayout();
  const [activeTab, setActiveTab] = useState("accounts");

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
    { value: "cards", label: "Cartes", icon: CreditCard },
    { value: "payments", label: "Paiements", icon: QrCode },
    { value: "analytics", label: "Analyses", icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Banque Crypto</h1>
          <p className="text-gray-400 text-sm md:text-base">Gérez vos comptes et transactions crypto</p>
        </div>
      </div>

      <MobileTabs value={activeTab} onValueChange={setActiveTab}>
        <MobileTabsList className={isMobile ? "flex-col space-y-1" : "grid grid-cols-6"}>
          {tabItems.map((item) => (
            <MobileTabsTrigger
              key={item.value}
              value={item.value}
              icon={<item.icon className="h-4 w-4" />}
              className={isMobile ? "w-full justify-start" : ""}
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

        <MobileTabsContent value="cards">
          <VirtualCards userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="payments">
          <PaymentRequests userId={user.id} />
        </MobileTabsContent>

        <MobileTabsContent value="analytics">
          <BankingAnalytics userId={user.id} />
        </MobileTabsContent>
      </MobileTabs>
    </div>
  );
};
