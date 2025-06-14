
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, Eye, EyeOff, Send, ArrowDownToLine, RefreshCw } from "lucide-react";
import { cryptoBankService, BankAccount } from "@/services/cryptoBankService";
import { CreateAccountModal } from "./CreateAccountModal";
import { TransferModal } from "./TransferModal";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileBankingCard } from "@/components/ui/mobile-banking-card";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { MobileGrid, MobileGridItem } from "@/components/ui/mobile-grid";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useToast } from "@/hooks/use-toast";

interface AccountsOverviewProps {
  userId: string;
}

export const AccountsOverview = ({ userId }: AccountsOverviewProps) => {
  const [showBalances, setShowBalances] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const { isMobile } = useResponsiveLayout();
  const { toast } = useToast();

  const { data: accounts, isLoading, error, refetch } = useQuery({
    queryKey: ['bank-accounts', userId],
    queryFn: () => cryptoBankService.getUserBankAccounts(userId)
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Données actualisées",
        description: "Vos comptes ont été mis à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les données",
        variant: "destructive",
      });
    }
  };

  const formatBalance = (balance: number) => {
    return showBalances ? balance.toFixed(4) : '****';
  };

  const totalBalance = accounts?.reduce((sum, account) => sum + account.balance, 0) || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    const CardComponent = isMobile ? MobileCard : Card;
    const CardContentComponent = isMobile ? MobileCardContent : CardContent;
    
    return (
      <CardComponent className={`${isMobile ? '' : 'bg-red-900/20 border-red-900'}`}>
        <CardContentComponent className="p-6 text-center">
          <p className="text-red-400 mb-4">Erreur lors du chargement des comptes</p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </CardContentComponent>
      </CardComponent>
    );
  }

  const CardComponent = isMobile ? MobileCard : Card;
  const CardContentComponent = isMobile ? MobileCardContent : CardContent;
  const CardHeaderComponent = isMobile ? MobileCardHeader : CardHeader;
  const CardTitleComponent = isMobile ? MobileCardTitle : CardTitle;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="space-y-6">
        {/* Total Balance Card */}
        <CardComponent className={`${isMobile ? '' : 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700'}`}>
          <CardHeaderComponent>
            <div className="flex items-center justify-between">
              <CardTitleComponent className="text-white">Solde Total</CardTitleComponent>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
                className="text-gray-300 hover:text-white"
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeaderComponent>
          <CardContentComponent>
            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-4`}>
              {formatBalance(totalBalance)} MATIC
            </div>
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3`}>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700 flex-1"
                size={isMobile ? "lg" : "default"}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Compte
              </Button>
              <Button 
                onClick={() => setShowTransferModal(true)}
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white flex-1"
                size={isMobile ? "lg" : "default"}
              >
                <Send className="h-4 w-4 mr-2" />
                Transférer
              </Button>
            </div>
          </CardContentComponent>
        </CardComponent>

        {/* Accounts Grid */}
        {isMobile ? (
          <div className="space-y-4">
            {accounts?.map((account) => (
              <MobileBankingCard
                key={account.id}
                accountName={account.account_name}
                accountType={account.account_type}
                balance={account.balance}
                currency="MATIC"
                isHidden={!showBalances}
                onToggleVisibility={() => setShowBalances(!showBalances)}
                onSend={() => {
                  setSelectedAccount(account);
                  setShowTransferModal(true);
                }}
                onReceive={() => {
                  toast({
                    title: "Fonction bientôt disponible",
                    description: "La réception de fonds sera bientôt disponible",
                  });
                }}
                isPrimary={account.is_primary}
                interestRate={account.interest_rate}
              />
            ))}
          </div>
        ) : (
          <MobileGrid mobileColumns={1} tabletColumns={2} desktopColumns={3}>
            {accounts?.map((account) => (
              <MobileGridItem key={account.id}>
                <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-white text-base">{account.account_name}</CardTitle>
                      </div>
                      {account.is_primary && (
                        <Badge className="bg-yellow-500 text-yellow-900">Principal</Badge>
                      )}
                    </div>
                    <Badge className={`bg-${account.account_type === 'checking' ? 'blue' : account.account_type === 'savings' ? 'green' : account.account_type === 'term_deposit' ? 'purple' : 'orange'}-500 text-white w-fit`}>
                      {account.account_type === 'checking' ? 'Courant' : 
                       account.account_type === 'savings' ? 'Épargne' : 
                       account.account_type === 'term_deposit' ? 'Dépôt à terme' : 'Professionnel'}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Solde</p>
                        <p className="text-2xl font-bold text-white">
                          {formatBalance(account.balance)} MATIC
                        </p>
                      </div>
                      
                      {account.interest_rate > 0 && (
                        <div>
                          <p className="text-sm text-gray-400">Taux d'intérêt</p>
                          <p className="text-green-400 font-semibold">
                            {account.interest_rate}% APY
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                          onClick={() => {
                            setSelectedAccount(account);
                            setShowTransferModal(true);
                          }}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Envoyer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        >
                          <ArrowDownToLine className="h-3 w-3 mr-1" />
                          Recevoir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MobileGridItem>
            ))}
          </MobileGrid>
        )}

        {accounts?.length === 0 && (
          <CardComponent>
            <CardContentComponent className="p-12 text-center">
              <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                Aucun compte trouvé
              </h3>
              <p className="text-gray-400 mb-6">
                Créez votre premier compte bancaire crypto pour commencer
              </p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600 hover:bg-purple-700"
                size={isMobile ? "lg" : "default"}
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer un compte
              </Button>
            </CardContentComponent>
          </CardComponent>
        )}

        <CreateAccountModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            refetch();
          }}
          userId={userId}
        />

        <TransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          accounts={accounts || []}
          selectedAccount={selectedAccount}
          onSuccess={() => {
            setShowTransferModal(false);
            refetch();
          }}
        />
      </div>
    </PullToRefresh>
  );
};
