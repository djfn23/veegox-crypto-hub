
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, Eye, EyeOff, Send, ArrowDownToLine } from "lucide-react";
import { cryptoBankService, BankAccount } from "@/services/cryptoBankService";
import { CreateAccountModal } from "./CreateAccountModal";
import { TransferModal } from "./TransferModal";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AccountsOverviewProps {
  userId: string;
}

export const AccountsOverview = ({ userId }: AccountsOverviewProps) => {
  const [showBalances, setShowBalances] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const { data: accounts, isLoading, error, refetch } = useQuery({
    queryKey: ['bank-accounts', userId],
    queryFn: () => cryptoBankService.getUserBankAccounts(userId)
  });

  const getAccountTypeLabel = (type: string) => {
    const labels = {
      'checking': 'Courant',
      'savings': 'Épargne',
      'term_deposit': 'Dépôt à terme',
      'business': 'Professionnel'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAccountTypeBadgeColor = (type: string) => {
    const colors = {
      'checking': 'bg-blue-500',
      'savings': 'bg-green-500',
      'term_deposit': 'bg-purple-500',
      'business': 'bg-orange-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
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
    return (
      <Card className="bg-red-900/20 border-red-900">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Erreur lors du chargement des comptes</p>
          <Button onClick={() => refetch()} className="mt-4">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Solde Total</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
              className="text-gray-300 hover:text-white"
            >
              {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-2">
            {formatBalance(totalBalance)} MATIC
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Compte
            </Button>
            <Button 
              onClick={() => setShowTransferModal(true)}
              variant="outline"
              className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Transférer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts?.map((account) => (
          <Card key={account.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
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
              <Badge className={`${getAccountTypeBadgeColor(account.account_type)} text-white w-fit`}>
                {getAccountTypeLabel(account.account_type)}
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
        ))}
      </div>

      {accounts?.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
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
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer un compte
            </Button>
          </CardContent>
        </Card>
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
  );
};
