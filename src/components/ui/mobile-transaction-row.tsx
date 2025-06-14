
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface MobileTransactionRowProps {
  id: string
  type: 'incoming' | 'outgoing'
  amount: number
  currency: string
  description?: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  date: string
  category?: string
  onClick?: () => void
  className?: string
}

export const MobileTransactionRow = React.forwardRef<HTMLDivElement, MobileTransactionRowProps>(
  ({ 
    id,
    type,
    amount,
    currency,
    description,
    status,
    date,
    category,
    onClick,
    className,
    ...props 
  }, ref) => {
    const getStatusIcon = () => {
      switch (status) {
        case 'completed':
          return <CheckCircle className="h-4 w-4 text-green-400" />
        case 'pending':
          return <Clock className="h-4 w-4 text-yellow-400" />
        case 'failed':
          return <XCircle className="h-4 w-4 text-red-400" />
        case 'cancelled':
          return <AlertCircle className="h-4 w-4 text-gray-400" />
      }
    }

    const getStatusColor = () => {
      switch (status) {
        case 'completed':
          return 'bg-green-500/20 text-green-400 border-green-500/30'
        case 'pending':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        case 'failed':
          return 'bg-red-500/20 text-red-400 border-red-500/30'
        case 'cancelled':
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      }
    }

    const formatAmount = (amount: number) => {
      const sign = type === 'incoming' ? '+' : '-'
      return `${sign}${new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(Math.abs(amount))}`
    }

    const formatDate = (dateString: string) => {
      return format(new Date(dateString), 'dd MMM, HH:mm', { locale: fr })
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex items-center gap-4 p-4 bg-slate-900/30 border border-slate-700/50 rounded-xl",
          "transition-all duration-200 hover:bg-slate-800/50 active:scale-[0.98]",
          onClick && "cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          type === 'incoming' ? 'bg-green-500/20' : 'bg-red-500/20'
        )}>
          {type === 'incoming' ? 
            <ArrowDownLeft className="h-5 w-5 text-green-400" /> :
            <ArrowUpRight className="h-5 w-5 text-red-400" />
          }
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <p className="font-medium text-white truncate pr-2">
              {description || `Transaction ${type === 'incoming' ? 'reçue' : 'envoyée'}`}
            </p>
            <div className="flex-shrink-0 text-right">
              <p className={cn(
                "font-bold text-sm",
                type === 'incoming' ? 'text-green-400' : 'text-red-400'
              )}>
                {formatAmount(amount)} {currency}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400">
                {formatDate(date)}
              </p>
              {category && (
                <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                  {category}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <Badge className={cn("text-xs border", getStatusColor())}>
                {status === 'completed' ? 'Terminé' :
                 status === 'pending' ? 'En cours' :
                 status === 'failed' ? 'Échoué' : 'Annulé'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
MobileTransactionRow.displayName = "MobileTransactionRow"
