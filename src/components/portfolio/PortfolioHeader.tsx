
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, PiggyBank } from "lucide-react";

export const PortfolioHeader = () => {
  return {
    title: "Portfolio",
    subtitle: "Vue d'ensemble de vos investissements et performances",
    icon: <PiggyBank className="h-6 w-6 text-purple-400" />,
    actions: (
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>
    )
  };
};
