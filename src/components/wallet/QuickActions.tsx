
import React from 'react';
import { MobileWalletCard } from '@/components/ui/mobile-wallet-card';
import { QuickActionButton } from '@/components/ui/mobile-touch-button';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
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
  const { isMobile, getColumns } = useResponsiveLayout();
  
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

  // Responsive grid: 2 columns on small mobile, 3 on mobile, 6 on desktop
  const columns = getColumns(2, 3, 6);
  const gridClass = `grid grid-cols-${columns} gap-${isMobile ? '3' : '4'}`;

  return (
    <MobileWalletCard variant="default" padding="default">
      <div className={gridClass}>
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
            className={action.color}
          />
        ))}
      </div>
    </MobileWalletCard>
  );
};
