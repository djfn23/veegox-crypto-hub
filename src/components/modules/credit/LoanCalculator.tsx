
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { LoanData, CreditScore } from "./types";
import { calculateLTV } from "./utils";

interface LoanCalculatorProps {
  loanData: LoanData;
  setLoanData: (data: LoanData) => void;
  creditScore: CreditScore | null;
  onSubmitLoan: () => void;
  isSubmitting: boolean;
}

const LoanCalculator = ({ 
  loanData, 
  setLoanData, 
  creditScore, 
  onSubmitLoan, 
  isSubmitting 
}: LoanCalculatorProps) => {
  const handleCollateralTokenChange = (value: string) => {
    setLoanData({...loanData, collateral_token_address: value});
  };

  const handleCollateralAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanData({...loanData, collateral_amount: e.target.value});
  };

  const handleLoanTokenChange = (value: string) => {
    setLoanData({...loanData, loan_token_address: value});
  };
  
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanData({...loanData, loan_amount: e.target.value});
  };

  const ltv = calculateLTV(loanData.collateral_amount, loanData.loan_amount);

  return (
    <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Simulateur de Prêt
        </CardTitle>
        <CardDescription className="text-gray-400">
          Calculez vos conditions de prêt en temps réel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Token de Garantie</Label>
            <Select 
              value={loanData.collateral_token_address} 
              onValueChange={handleCollateralTokenChange}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0x...eth">ETH - Ethereum</SelectItem>
                <SelectItem value="0x...btc">WBTC - Bitcoin</SelectItem>
                <SelectItem value="0x...matic">MATIC - Polygon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Montant de Garantie</Label>
            <Input
              type="number"
              placeholder="0.5"
              value={loanData.collateral_amount}
              onChange={handleCollateralAmountChange}
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Token de Prêt</Label>
            <Select 
              value={loanData.loan_token_address} 
              onValueChange={handleLoanTokenChange}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0x...usdc">USDC - USD Coin</SelectItem>
                <SelectItem value="0x...usdt">USDT - Tether</SelectItem>
                <SelectItem value="0x...dai">DAI - MakerDAO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Montant à Emprunter</Label>
            <Input
              type="number"
              placeholder="500"
              value={loanData.loan_amount}
              onChange={handleLoanAmountChange}
              className="bg-slate-800 border-slate-600 text-white"
            />
          </div>
        </div>

        {loanData.collateral_amount && loanData.loan_amount && (
          <Card className="bg-slate-800/50 border-slate-600">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{ltv.toFixed(1)}%</div>
                  <div className="text-xs text-gray-400">LTV Ratio</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {creditScore?.score ? Math.max(5, 15 - (creditScore.score / 100)).toFixed(1) : "12.0"}%
                  </div>
                  <div className="text-xs text-gray-400">Taux d'Intérêt</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">75%</div>
                  <div className="text-xs text-gray-400">Seuil de Liquidation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={onSubmitLoan}
          disabled={!loanData.collateral_amount || !loanData.loan_amount || isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
        >
          {isSubmitting ? "Soumission..." : "Demander le Prêt"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
