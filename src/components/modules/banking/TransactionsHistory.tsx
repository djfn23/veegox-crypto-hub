
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, RefreshCw } from "lucide-react";
import { cryptoBankService, BankTransaction } from "@/services/cryptoBankService";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { MobileForm, MobileFormField, MobileInput } from "@/components/ui/mobile-form";
import { MobileTable } from "@/components/ui/mobile-table";
import { MobileSkeleton } from "@/components/ui/mobile-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TransactionsHistoryProps {
  userId: string;
}

export const TransactionsHistory = ({ userId }: TransactionsHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { isMobile } = useResponsiveLayout();

  const { data: transactions, isLoading, error, refetch } = useQuery({
    queryKey: ['bank-transactions', userId],
    queryFn: () => cryptoBankService.getUserTransactions(userId)
  });

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

  const tableColumns = [
    { key: 'icon', label: 'Type', width: '60px' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Montant', align: 'right' as const },
    { key: 'status', label: 'Statut' },
    { key: 'date', label: 'Date' }
  ];

  const tableData = filteredTransactions?.map(transaction => ({
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
        {transaction.status}
      </Badge>
    ),
    date: new Date(transaction.created_at).toLocaleDateString('fr-FR')
  })) || [];

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
              
              {!isMobile && (
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              )}
            </div>
          </MobileForm>
        </CardContentComponent>
      </CardComponent>

      <MobileTable
        columns={tableColumns}
        data={tableData}
        emptyMessage="Aucune transaction trouvée"
      />
    </div>
  );
};
