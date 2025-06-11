
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsOverview } from "./AccountsOverview";
import { TransactionsHistory } from "./TransactionsHistory";
import { SavingsPlans } from "./SavingsPlans";
import { VirtualCards } from "./VirtualCards";
import { PaymentRequests } from "./PaymentRequests";
import { BankingAnalytics } from "./BankingAnalytics";
import { Wallet, CreditCard, PiggyBank, QrCode, BarChart3, Send } from "lucide-react";
import { useUnifiedAuth } from "@/components/auth/UnifiedAuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CryptoBankModule = () => {
  const { user, isAuthenticated } = useUnifiedAuth();
  const [activeTab, setActiveTab] = useState("accounts");

  if (!isAuthenticated || !user) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <Wallet className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Connexion Requise
          </h3>
          <p className="text-gray-400 mb-6">
            Connectez-vous pour accéder à vos services bancaires crypto
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Se Connecter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Banque Crypto</h1>
          <p className="text-gray-400">Gérez vos comptes et transactions crypto</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Comptes
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="savings" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Épargne
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Cartes
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            Paiements
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analyses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <AccountsOverview userId={user.id} />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsHistory userId={user.id} />
        </TabsContent>

        <TabsContent value="savings">
          <SavingsPlans userId={user.id} />
        </TabsContent>

        <TabsContent value="cards">
          <VirtualCards userId={user.id} />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentRequests userId={user.id} />
        </TabsContent>

        <TabsContent value="analytics">
          <BankingAnalytics userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
