
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { toast } from "sonner";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  public state: State = {
    hasError: false,
    retryCount: 0
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('EnhancedErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
    
    // Store error info for debugging
    this.setState({ errorInfo });
    
    // Show toast notification
    toast.error('Une erreur est survenue dans l\'application');
  }

  private handleReset = () => {
    const newRetryCount = this.state.retryCount + 1;
    
    if (newRetryCount > this.maxRetries) {
      toast.error('Trop de tentatives. Veuillez recharger la page.');
      return;
    }

    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      retryCount: newRetryCount
    });
    
    toast.success('Tentative de récupération...');
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.state.retryCount < this.maxRetries;

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">
          <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm max-w-2xl w-full">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-red-500/20">
                  <AlertTriangle className="h-12 w-12 text-red-400" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Oops! Une erreur s'est produite
              </h2>
              
              <p className="text-gray-400 mb-6">
                Nous rencontrons des difficultés techniques. 
                {canRetry ? ' Vous pouvez réessayer ou recharger la page.' : ' Veuillez recharger la page.'}
              </p>

              {this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-sm text-gray-500 cursor-pointer mb-2">
                    Détails de l'erreur (pour les développeurs)
                  </summary>
                  <div className="bg-black/20 p-4 rounded-lg overflow-auto">
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                      {this.state.error.message}
                    </pre>
                    {this.state.errorInfo && (
                      <pre className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-3 justify-center">
                {canRetry && (
                  <Button 
                    onClick={this.handleReset}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer ({this.maxRetries - this.state.retryCount} restants)
                  </Button>
                )}
                
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recharger la page
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Accueil
                </Button>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Tentative #{this.state.retryCount + 1}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export { EnhancedErrorBoundary };
