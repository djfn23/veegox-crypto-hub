
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { Loan } from "./types";
import { statusColors, statusLabels } from "./utils";

interface LoansListProps {
  loans: Loan[] | undefined;
}

const LoansList = ({ loans }: LoansListProps) => {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Mes Prêts</CardTitle>
      </CardHeader>
      <CardContent>
        {loans && loans.length > 0 ? (
          <div className="space-y-4">
            {loans.map((loan) => (
              <Card key={loan.id} className="bg-slate-800/50 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${statusColors[loan.status as keyof typeof statusColors]} text-white`}>
                        {statusLabels[loan.status as keyof typeof statusLabels]}
                      </Badge>
                      <span className="text-white font-medium">
                        {Number(loan.loan_amount)} USDC
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{loan.interest_rate}% APR</div>
                      <div className="text-xs text-gray-400">
                        LTV: {loan.ltv_ratio}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Garantie</div>
                      <div className="text-white">{Number(loan.collateral_amount)} ETH</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Échéance</div>
                      <div className="text-white">
                        {loan.due_date ? new Date(loan.due_date).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Remboursé</div>
                      <div className="text-white">
                        {Number(loan.repaid_amount || 0)} / {Number(loan.loan_amount)}
                      </div>
                    </div>
                  </div>

                  {loan.status === 'active' && (
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Rembourser
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                        Ajouter Garantie
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-white mb-2">Aucun prêt actif</h3>
            <p className="text-gray-400">Commencez par simuler votre premier prêt</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoansList;
