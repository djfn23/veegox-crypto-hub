
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  ArrowDownToLine, 
  ArrowUpDown, 
  QrCode, 
  CreditCard,
  Zap
} from 'lucide-react';

interface QuickActionsProps {
  onSend: () => void;
  onReceive: () => void;
  onSwap: () => void;
  onBuy: () => void;
  onScanQR: () => void;
  onStake: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSend,
  onReceive,
  onSwap,
  onBuy,
  onScanQR,
  onStake
}) => {
  const actions = [
    {
      icon: Send,
      label: 'Envoyer',
      onClick: onSend,
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      icon: ArrowDownToLine,
      label: 'Recevoir',
      onClick: onReceive,
      color: 'text-green-400 hover:text-green-300'
    },
    {
      icon: ArrowUpDown,
      label: 'Échanger',
      onClick: onSwap,
      color: 'text-purple-400 hover:text-purple-300'
    },
    {
      icon: CreditCard,
      label: 'Acheter',
      onClick: onBuy,
      color: 'text-orange-400 hover:text-orange-300'
    },
    {
      icon: QrCode,
      label: 'Scanner',
      onClick: onScanQR,
      color: 'text-yellow-400 hover:text-yellow-300'
    },
    {
      icon: Zap,
      label: 'Staking',
      onClick: onStake,
      color: 'text-pink-400 hover:text-pink-300'
    }
  ];

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={action.onClick}
              className={`flex flex-col items-center gap-2 h-auto py-4 ${action.color} hover:bg-slate-800/50`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
