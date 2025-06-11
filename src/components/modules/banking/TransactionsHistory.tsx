
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";
import { cryptoBankService, BankTransaction } from "@/services/cryptoBankService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface TransactionsHistoryProps {
  userId: string;
}

export const TransactionsHistory = ({ userId }: TransactionsHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: transactions, isLoading, error } = useQuery({
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
          <p className="text-red-400">Erreur lors du chargement des transactions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Historique des Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {transactions?.map((transaction) => (
          <Card key={transaction.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction)}
                  <div>
                    <p className="text-white font-medium">
                      {transaction.description || `${transaction.transaction_type} - ${transaction.payment_method}`}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">
                    {transaction.amount.toFixed(4)} MATIC
                  </p>
                  <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {transactions?.length === 0 && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">Aucune transaction trouvée</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
