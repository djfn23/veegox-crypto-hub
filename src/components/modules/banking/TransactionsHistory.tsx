
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, RefreshCw, SlidersHorizontal } from "lucide-react";
import { cryptoBankService, BankTransaction } from "@/services/cryptoBankService";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { MobileForm, MobileFormField, MobileInput } from "@/components/ui/mobile-form";
import { MobileTable } from "@/components/ui/mobile-table";
import { MobileSkeleton } from "@/components/ui/mobile-skeleton";
import { MobileTransactionRow } from "@/components/ui/mobile-transaction-row";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  MobileModal,
  MobileModalContent,
  MobileModalHeader,
  MobileModalTitle,
  MobileModalBody,
  MobileModalTrigger,
} from "@/components/ui/mobile-modal";

interface TransactionsHistoryProps {
  userId: string;
}

export const TransactionsHistory = ({ userId }: TransactionsHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { isMobile } = useResponsiveLayout();
  const { toast } = useToast();

  const { data: transactions, isLoading, error, refetch } = useQuery({
    queryKey: ['bank-transactions', userId],
    queryFn: () => cryptoBankService.getUserTransactions(userId)
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Transactions actualisées",
        description: "Votre historique a été mis à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les transactions",
        variant: "destructive",
      });
    }
  };

  const getTransactionIcon = (transaction: BankTransaction) => {
    if (transaction.from_account_id) {
      return <ArrowUpRight className="h-4 w-4 text-red-400" />;
    }
    return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-green-500',
      'pending': 'bg-yellow-500',
      'failed': 'bg-red-500',
      'cancelled': 'bg-gray-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch = !searchTerm || 
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.payment_method.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || transaction.transaction_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return <MobileSkeleton variant="table" count={3} />;
  }

  if (error) {
    const CardComponent = isMobile ? MobileCard : Card;
    const CardContentComponent = isMobile ? MobileCardContent : CardContent;
    
    return (
      <CardComponent className={`${isMobile ? 'variant="default"' : 'bg-red-900/20 border-red-900'}`}>
        <CardContentComponent className="p-6 text-center">
          <p className="text-red-400 mb-4">Erreur lors du chargement des transactions</p>
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
      <div className="space-y-4 md:space-y-6">
        <CardComponent>
          <CardHeaderComponent>
            <CardTitleComponent>Historique des Transactions</CardTitleComponent>
          </CardHeaderComponent>
          <CardContentComponent>
            <MobileForm spacing="tight">
              <div className={`${isMobile ? 'space-y-3' : 'flex gap-4'}`}>
                <MobileFormField className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <MobileInput
                      placeholder="Rechercher une transaction..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </MobileFormField>
                
                <MobileModal>
                  <MobileModalTrigger asChild>
                    <Button 
                      variant="outline" 
                      size={isMobile ? "lg" : "sm"} 
                      className="border-gray-600 text-gray-300"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtres
                    </Button>
                  </MobileModalTrigger>
                  <MobileModalContent variant="sheet">
                    <MobileModalHeader>
                      <MobileModalTitle>Filtres</MobileModalTitle>
                    </MobileModalHeader>
                    <MobileModalBody>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Type de transaction
                          </label>
                          <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white"
                          >
                            <option value="all">Toutes</option>
                            <option value="transfer">Transferts</option>
                            <option value="deposit">Dépôts</option>
                            <option value="withdrawal">Retraits</option>
                          </select>
                        </div>
                      </div>
                    </MobileModalBody>
                  </MobileModalContent>
                </MobileModal>
              </div>
            </MobileForm>
          </CardContentComponent>
        </CardComponent>

        {/* Transactions List */}
        {isMobile ? (
          <div className="space-y-3">
            {filteredTransactions?.length === 0 ? (
              <CardComponent>
                <CardContentComponent className="p-8 text-center">
                  <p className="text-gray-400">Aucune transaction trouvée</p>
                </CardContentComponent>
              </CardComponent>
            ) : (
              filteredTransactions?.map((transaction) => (
                <MobileTransactionRow
                  key={transaction.id}
                  id={transaction.id}
                  type={transaction.from_account_id ? 'outgoing' : 'incoming'}
                  amount={transaction.amount}
                  currency="MATIC"
                  description={transaction.description || `${transaction.transaction_type} - ${transaction.payment_method}`}
                  status={transaction.status as any}
                  date={transaction.created_at}
                  category={transaction.transaction_type}
                  onClick={() => {
                    // TODO: Open transaction details modal
                    toast({
                      title: "Détails de transaction",
                      description: "Fonction bientôt disponible",
                    });
                  }}
                />
              ))
            )}
          </div>
        ) : (
          <MobileTable
            columns={[
              { key: 'icon', label: 'Type', width: '60px' },
              { key: 'description', label: 'Description' },
              { key: 'amount', label: 'Montant', align: 'right' as const },
              { key: 'status', label: 'Statut' },
              { key: 'date', label: 'Date' }
            ]}
            data={filteredTransactions?.map(transaction => ({
              icon: getTransactionIcon(transaction),
              description: (
                <div>
                  <p className="font-medium text-white">
                    {transaction.description || `${transaction.transaction_type} - ${transaction.payment_method}`}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ),
              amount: (
                <span className="font-bold text-white">
                  {transaction.amount.toFixed(4)} MATIC
                </span>
              ),
              status: (
                <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                  {transaction.status === 'completed' ? 'Terminé' :
                   transaction.status === 'pending' ? 'En cours' :
                   transaction.status === 'failed' ? 'Échoué' : 'Annulé'}
                </Badge>
              ),
              date: new Date(transaction.created_at).toLocaleDateString('fr-FR')
            })) || []}
            emptyMessage="Aucune transaction trouvée"
          />
        )}
      </div>
    </PullToRefresh>
  );
};
