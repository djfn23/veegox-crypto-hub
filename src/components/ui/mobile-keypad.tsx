
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

// Debug: Component file loading
console.log('MobileKeypad: File loaded at', new Date().toISOString());
console.log('MobileKeypad: Trash2 icon imported successfully');

interface MobileKeypadProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  allowDecimal?: boolean
  className?: string
}

export const MobileKeypad = React.forwardRef<HTMLDivElement, MobileKeypadProps>(
  ({ value, onChange, maxLength = 10, allowDecimal = true, className, ...props }, ref) => {
    console.log('MobileKeypad: Rendering component with props:', { 
      value, 
      maxLength, 
      allowDecimal,
      valueLength: value?.length || 0 
    });

    const handleKeyPress = React.useCallback((key: string) => {
      console.log('MobileKeypad: Key pressed:', key, 'Current value:', value);
      
      if (key === 'delete') {
        const newValue = value.slice(0, -1);
        console.log('MobileKeypad: Delete key - new value:', newValue);
        onChange(newValue);
        return;
      }

      if (key === '.' && (!allowDecimal || value.includes('.'))) {
        console.log('MobileKeypad: Decimal not allowed or already present');
        return;
      }

      if (value.length >= maxLength) {
        console.log('MobileKeypad: Max length reached:', maxLength);
        return;
      }

      const newValue = value + key;
      console.log('MobileKeypad: Adding key - new value:', newValue);
      onChange(newValue);
    }, [value, onChange, maxLength, allowDecimal]);

    const keypadLayout = React.useMemo(() => [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [allowDecimal ? '.' : '', '0', 'delete']
    ], [allowDecimal]);

    console.log('MobileKeypad: Keypad layout generated:', keypadLayout);

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-3 gap-3 p-4 bg-slate-900/50 rounded-xl", className)}
        {...props}
      >
        {keypadLayout.flat().map((key, index) => {
          if (!key) {
            console.log('MobileKeypad: Empty key slot at index:', index);
            return <div key={`empty-${index}`} className="h-14" />;
          }
          
          console.log('MobileKeypad: Rendering key button:', key);
          
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
                <Trash2 className="h-6 w-6" aria-label="Delete" />
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

console.log('MobileKeypad: Component definition complete');
