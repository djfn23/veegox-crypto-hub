
import React, { Component, ErrorInfo, ReactNode } from "react"
import { GlassCard } from "./glass-card"
import { GradientButton } from "./gradient-button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-6">
          <GlassCard className="p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-500/20">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Oops! Une erreur s'est produite
            </h2>
            <p className="text-gray-400 mb-6">
              Nous rencontrons des difficultés techniques. Veuillez réessayer.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-gray-500 cursor-pointer mb-2">
                  Détails de l'erreur
                </summary>
                <pre className="text-xs bg-black/20 p-3 rounded overflow-auto text-gray-400">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <GradientButton 
              onClick={this.handleReset} 
              className="w-full"
              variant="primary"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </GradientButton>
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
