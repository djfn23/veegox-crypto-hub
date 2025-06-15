
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react" // Only import Delete, not Backspace

interface MobileKeypadProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  allowDecimal?: boolean
  className?: string
}

export const MobileKeypad = React.forwardRef<HTMLDivElement, MobileKeypadProps>(
  ({ value, onChange, maxLength = 10, allowDecimal = true, className, ...props }, ref) => {
    const handleKeyPress = React.useCallback((key: string) => {
      if (key === 'delete') {
        const newValue = value.slice(0, -1);
        onChange(newValue);
        return;
      }

      if (key === '.' && (!allowDecimal || value.includes('.'))) {
        return;
      }

      if (value.length >= maxLength) {
        return;
      }

      const newValue = value + key;
      onChange(newValue);
    }, [value, onChange, maxLength, allowDecimal]);

    const keypadLayout = React.useMemo(() => [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [allowDecimal ? '.' : '', '0', 'delete']
    ], [allowDecimal]);

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-3 gap-3 p-4 bg-slate-900/50 rounded-xl", className)}
        {...props}
      >
        {keypadLayout.flat().map((key, index) => {
          if (!key) {
            return <div key={`empty-${index}`} className="h-14" />;
          }
          
          return (
            <Button
              key={key}
              variant="outline"
              size="lg"
              onClick={() => handleKeyPress(key)}
              className={cn(
                "h-14 text-xl font-semibold border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white",
                "touch-target-lg active:scale-95 transition-transform duration-150"
              )}
            >
              {key === 'delete' ? (
                <Delete className="h-6 w-6" aria-label="Delete" />
              ) : (
                key
              )}
            </Button>
          );
        })}
      </div>
    );
  }
);

MobileKeypad.displayName = "MobileKeypad";
