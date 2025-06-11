
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react";
import { cryptoBankService } from "@/services/cryptoBankService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface BankingAnalyticsProps {
  userId: string;
}

export const BankingAnalytics = ({ userId }: BankingAnalyticsProps) => {
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['banking-analytics', userId],
    queryFn: () => cryptoBankService.getAccountAnalytics(userId)
  });

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
          <p className="text-red-400">Erreur lors du chargement des analyses</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analyses Bancaires</h2>
        <p className="text-gray-400">Aperçu de vos finances crypto</p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border-blue-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-300 flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4" />
              Solde Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics?.totalBalance?.toFixed(4) || "0.0000"} MATIC
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-300 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Revenus Mensuels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics?.monthlyIncome?.toFixed(4) || "0.0000"} MATIC
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-900/50 to-red-800/50 border-red-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-300 flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4" />
              Dépenses Mensuelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics?.monthlyExpenses?.toFixed(4) || "0.0000"} MATIC
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-300 flex items-center gap-2 text-sm">
              <PiggyBank className="h-4 w-4" />
              Taux d'Épargne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {analytics?.savingsRate?.toFixed(1) || "0.0"}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Évolution des Soldes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Graphique à venir
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Répartition des Dépenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Graphique à venir
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Résumé des comptes */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Résumé des Comptes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {analytics?.accountsCount || 0}
              </div>
              <div className="text-gray-400">Comptes Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                +{analytics?.monthlyIncome?.toFixed(2) || "0.00"}
              </div>
              <div className="text-gray-400">Revenus ce mois</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">
                -{analytics?.monthlyExpenses?.toFixed(2) || "0.00"}
              </div>
              <div className="text-gray-400">Dépenses ce mois</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
