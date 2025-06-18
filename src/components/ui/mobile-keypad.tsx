
import React from 'react';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileKeypadProps {
  onNumberPress: (number: string) => void;
  onBackspace: () => void;
  onAction?: (action: string) => void;
  className?: string;
  showDecimal?: boolean;
  showActions?: boolean;
  actionButtons?: { label: string; action: string; variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }[];
}

export const MobileKeypad: React.FC<MobileKeypadProps> = ({
  onNumberPress,
  onBackspace,
  onAction,
  className = '',
  showDecimal = true,
  showActions = false,
  actionButtons = []
}) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className={cn(
      'grid grid-cols-3 gap-3 p-4 bg-card rounded-lg border',
      className
    )}>
      {/* Numbers 1-9 */}
      {numbers.slice(0, 9).map((num) => (
        <Button
          key={num}
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold touch-target-lg"
          onClick={() => onNumberPress(num)}
        >
          {num}
        </Button>
      ))}

      {/* Bottom row */}
      {showDecimal && (
        <Button
          variant="outline"
          size="lg"
          className="h-14 text-lg font-semibold touch-target-lg"
          onClick={() => onNumberPress('.')}
        >
          .
        </Button>
      )}

      {/* Zero */}
      <Button
        variant="outline"
        size="lg"
        className="h-14 text-lg font-semibold touch-target-lg"
        onClick={() => onNumberPress('0')}
      >
        0
      </Button>

      {/* Delete button (was Backspace) */}
      <Button
        variant="outline"
        size="lg"
        className="h-14 touch-target-lg"
        onClick={onBackspace}
      >
        <Delete className="h-6 w-6" />
      </Button>

      {/* Action buttons if enabled */}
      {showActions && actionButtons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant || 'default'}
          size="lg"
          className="h-14 text-lg font-semibold touch-target-lg col-span-3"
          onClick={() => onAction?.(button.action)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
