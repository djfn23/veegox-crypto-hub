
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  showCard?: boolean;
  className?: string;
  type?: 'error' | 'network' | 'empty';
}

export const ErrorState = ({
  title = "Une erreur s'est produite",
  message = "Impossible de charger les données",
  onRetry,
  retryLabel = "Réessayer",
  showCard = true,
  className = "",
  type = 'error'
}: ErrorStateProps) => {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="h-12 w-12 text-red-400 mx-auto mb-4" />;
      case 'empty':
        return <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center mx-auto mb-4 text-gray-400">?</div>;
      default:
        return <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4" />;
    }
  };

  const content = (
    <div className={`text-center space-y-4 ${className}`}>
      {getIcon()}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="text-white border-white/20 hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          {retryLabel}
        </Button>
      )}
    </div>
  );

  if (!showCard) return content;

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardContent className="pt-6">
        {content}
      </CardContent>
    </Card>
  );
};

export const NetworkError = ({ onRetry }: { onRetry?: () => void }) => (
  <ErrorState
    title="Connexion perdue"
    message="Vérifiez votre connexion Internet et réessayez"
    onRetry={onRetry}
    type="network"
  />
);

export const EmptyState = ({ 
  title = "Aucune donnée", 
  message = "Il n'y a rien à afficher pour le moment",
  actionLabel,
  onAction
}: { 
  title?: string; 
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <ErrorState
    title={title}
    message={message}
    onRetry={onAction}
    retryLabel={actionLabel}
    type="empty"
  />
);
