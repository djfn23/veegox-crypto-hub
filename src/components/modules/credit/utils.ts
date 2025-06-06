
export const calculateLTV = (collateralAmount: string, loanAmount: string): number => {
  const collateralValue = parseFloat(collateralAmount) * 2000; // Prix fictif ETH
  const loanValue = parseFloat(loanAmount) * 1; // Prix fictif USDC
  
  if (collateralValue && loanValue) {
    return (loanValue / collateralValue) * 100;
  }
  return 0;
};

export const getScoreColor = (score: number): string => {
  if (score >= 750) return "text-green-500";
  if (score >= 650) return "text-yellow-500";
  return "text-red-500";
};

export const getScoreLabel = (score: number): string => {
  if (score >= 750) return "Excellent";
  if (score >= 650) return "Bon";
  if (score >= 500) return "Moyen";
  return "Faible";
};

export const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  active: "bg-green-500",
  repaid: "bg-blue-500",
  defaulted: "bg-red-500"
};

export const statusLabels: Record<string, string> = {
  pending: "En attente",
  active: "Actif",
  repaid: "Remboursé",
  defaulted: "Défaut"
};
