
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { LoanData, CreditScore } from "./types";
import { calculateLTV } from "./utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader className={isMobile ? 'pb-4' : ''}>
        <CardTitle className={`text-white flex items-center ${isMobile ? 'text-lg' : ''}`}>
          <Calculator className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
          {isMobile ? 'Simulateur' : 'Simulateur de Prêt'}
        </CardTitle>
        {!isMobile && (
          <CardDescription className="text-gray-400">
            Calculez vos conditions de prêt en temps réel
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? 'px-4' : ''}`}>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-4'}`}>
          <div className="space-y-2">
            <Label className={`text-white ${isMobile ? 'text-sm' : ''}`}>Token de Garantie</Label>
            <Select 
              value={loanData.collateral_token_address} 
              onValueChange={handleCollateralTokenChange}
            >
              <SelectTrigger className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}>
                <SelectValue placeholder={isMobile ? "Sélectionner..." : "Sélectionner token"} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="0x...eth" className="text-white hover:bg-slate-700">
                  {isMobile ? 'ETH' : 'ETH - Ethereum'}
                </SelectItem>
                <SelectItem value="0x...btc" className="text-white hover:bg-slate-700">
                  {isMobile ? 'WBTC' : 'WBTC - Bitcoin'}
                </SelectItem>
                <SelectItem value="0x...matic" className="text-white hover:bg-slate-700">
                  {isMobile ? 'MATIC' : 'MATIC - Polygon'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={`text-white ${isMobile ? 'text-sm' : ''}`}>Montant de Garantie</Label>
            <Input
              type="number"
              placeholder="0.5"
              value={loanData.collateral_amount}
              onChange={handleCollateralAmountChange}
              className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
            />
          </div>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-4'}`}>
          <div className="space-y-2">
            <Label className={`text-white ${isMobile ? 'text-sm' : ''}`}>Token de Prêt</Label>
            <Select 
              value={loanData.loan_token_address} 
              onValueChange={handleLoanTokenChange}
            >
              <SelectTrigger className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12' : ''}`}>
                <SelectValue placeholder={isMobile ? "Sélectionner..." : "Sélectionner token"} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="0x...usdc" className="text-white hover:bg-slate-700">
                  {isMobile ? 'USDC' : 'USDC - USD Coin'}
                </SelectItem>
                <SelectItem value="0x...usdt" className="text-white hover:bg-slate-700">
                  {isMobile ? 'USDT' : 'USDT - Tether'}
                </SelectItem>
                <SelectItem value="0x...dai" className="text-white hover:bg-slate-700">
                  {isMobile ? 'DAI' : 'DAI - MakerDAO'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={`text-white ${isMobile ? 'text-sm' : ''}`}>Montant à Emprunter</Label>
            <Input
              type="number"
              placeholder="500"
              value={loanData.loan_amount}
              onChange={handleLoanAmountChange}
              className={`bg-slate-800 border-slate-600 text-white ${isMobile ? 'h-12 text-base' : ''}`}
            />
          </div>
        </div>

        {loanData.collateral_amount && loanData.loan_amount && (
          <Card className="bg-slate-800/50 border-slate-600">
            <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'} text-center`}>
                <div className={isMobile ? 'flex justify-between items-center' : ''}>
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                    {ltv.toFixed(1)}%
                  </div>
                  <div className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-400`}>
                    LTV Ratio
                  </div>
                </div>
                <div className={isMobile ? 'flex justify-between items-center' : ''}>
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                    {creditScore?.score ? Math.max(5, 15 - (creditScore.score / 100)).toFixed(1) : "12.0"}%
                  </div>
                  <div className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-400`}>
                    Taux d'Intérêt
                  </div>
                </div>
                <div className={isMobile ? 'flex justify-between items-center' : ''}>
                  <div className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>75%</div>
                  <div className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-400`}>
                    Seuil de Liquidation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={onSubmitLoan}
          disabled={!loanData.collateral_amount || !loanData.loan_amount || isSubmitting}
          className={`w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 ${isMobile ? 'h-12 text-base' : ''}`}
        >
          {isSubmitting ? "Soumission..." : (isMobile ? "Demander" : "Demander le Prêt")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
