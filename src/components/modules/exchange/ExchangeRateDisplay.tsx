
interface ExchangeRateDisplayProps {
  amountOut: number | null;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
}

export default function ExchangeRateDisplay({ 
  amountOut, 
  tokenIn, 
  tokenOut, 
  amountIn 
}: ExchangeRateDisplayProps) {
  if (amountOut === null || !tokenIn || !tokenOut) {
    return null;
  }

  const exchangeRate = amountOut / parseFloat(amountIn || "1");

  return (
    <div className="text-xs text-muted-foreground">
      <div className="flex justify-between">
        <span>Taux d'échange:</span>
        <span>1 {tokenIn} ≈ {exchangeRate.toFixed(6)} {tokenOut}</span>
      </div>
      <div className="flex justify-between">
        <span>Frais:</span>
        <span>0.3%</span>
      </div>
    </div>
  );
}
