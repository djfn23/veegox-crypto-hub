
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Send, ArrowDownToLine, MoreHorizontal } from "lucide-react"
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card"

interface MobileBankingCardProps {
  accountName: string
  accountType: string
  balance: number
  currency: string
  isHidden?: boolean
  onToggleVisibility?: () => void
  onSend?: () => void
  onReceive?: () => void
  onMore?: () => void
  isPrimary?: boolean
  interestRate?: number
  className?: string
}

export const MobileBankingCard = React.forwardRef<HTMLDivElement, MobileBankingCardProps>(
  ({ 
    accountName, 
    accountType, 
    balance, 
    currency,
    isHidden = false,
    onToggleVisibility,
    onSend,
    onReceive,
    onMore,
    isPrimary = false,
    interestRate,
    className,
    ...props 
  }, ref) => {
    const getAccountTypeColor = (type: string) => {
      const colors = {
        'checking': 'bg-blue-500',
        'savings': 'bg-green-500',
        'term_deposit': 'bg-purple-500',
        'business': 'bg-orange-500'
      };
      return colors[type as keyof typeof colors] || 'bg-gray-500';
    };

    const formatBalance = (amount: number) => {
      if (isHidden) return '••••';
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(amount);
    };

    return (
      <MobileCard
        ref={ref}
        variant="elevated"
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50",
          isPrimary && "ring-2 ring-purple-500/30",
          className
        )}
        {...props}
      >
        <MobileCardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-white text-lg">{accountName}</h3>
                {isPrimary && (
                  <Badge className="bg-yellow-500 text-yellow-900 text-xs">
                    Principal
                  </Badge>
                )}
              </div>
              <Badge className={`${getAccountTypeColor(accountType)} text-white text-xs`}>
                {accountType === 'checking' ? 'Courant' : 
                 accountType === 'savings' ? 'Épargne' : 
                 accountType === 'term_deposit' ? 'Dépôt à terme' : 'Professionnel'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleVisibility}
                className="text-gray-400 hover:text-white p-2 h-auto"
              >
                {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onMore}
                className="text-gray-400 hover:text-white p-2 h-auto"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Balance */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-1">Solde</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">
                {formatBalance(balance)}
              </span>
              <span className="text-lg text-gray-300">{currency}</span>
            </div>
            {interestRate && interestRate > 0 && (
              <p className="text-sm text-green-400 mt-1">
                +{interestRate}% APY
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onSend}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-12"
            >
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
            <Button
              onClick={onReceive}
              variant="outline"
              className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white h-12"
            >
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Recevoir
            </Button>
          </div>
        </MobileCardContent>

        {/* Gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />
      </MobileCard>
    )
  }
)
MobileBankingCard.displayName = "MobileBankingCard"
