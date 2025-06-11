
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, Target, Plus, TrendingUp } from "lucide-react";
import { cryptoBankService } from "@/services/cryptoBankService";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface SavingsPlansProps {
  userId: string;
}

export const SavingsPlans = ({ userId }: SavingsPlansProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: savingsPlans, isLoading, error } = useQuery({
    queryKey: ['savings-plans', userId],
    queryFn: () => cryptoBankService.getUserSavingsPlans(userId)
  });

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
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
          <p className="text-red-400">Erreur lors du chargement des plans d'épargne</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Plans d'Épargne</h2>
          <p className="text-gray-400">Gérez vos objectifs d'épargne crypto</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsPlans?.map((plan) => (
          <Card key={plan.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-green-400" />
                  <CardTitle className="text-white text-base">{plan.plan_name}</CardTitle>
                </div>
                {plan.auto_deposit_enabled && (
                  <Badge className="bg-blue-500 text-white">Auto</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progression</span>
                  <span className="text-white">
                    {calculateProgress(plan.current_amount, plan.target_amount).toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={calculateProgress(plan.current_amount, plan.target_amount)} 
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Actuel</p>
                  <p className="text-white font-semibold">
                    {plan.current_amount.toFixed(4)} MATIC
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Objectif</p>
                  <p className="text-white font-semibold">
                    {plan.target_amount.toFixed(4)} MATIC
                  </p>
                </div>
              </div>

              {plan.apy_rate > 0 && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    {plan.apy_rate}% APY
                  </span>
                </div>
              )}

              {plan.target_date && (
                <div>
                  <p className="text-gray-400 text-sm">Date cible</p>
                  <p className="text-white text-sm">
                    {new Date(plan.target_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                  <Target className="h-3 w-3 mr-1" />
                  Déposer
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {savingsPlans?.length === 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
            <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Aucun plan d'épargne
            </h3>
            <p className="text-gray-400 mb-6">
              Créez votre premier plan d'épargne pour commencer à économiser
            </p>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer un plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
