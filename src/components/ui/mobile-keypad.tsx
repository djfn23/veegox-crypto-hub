
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

console.log('MobileKeypad: Component file loaded successfully');

interface MobileKeypadProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  allowDecimal?: boolean
  className?: string
}

export const MobileKeypad = React.forwardRef<HTMLDivElement, MobileKeypadProps>(
  ({ value, onChange, maxLength = 10, allowDecimal = true, className, ...props }, ref) => {
    console.log('MobileKeypad: Component rendering with value:', value);

    const handleKeyPress = (key: string) => {
      console.log('MobileKeypad: Key pressed:', key);
      
      if (key === 'backspace') {
        const newValue = value.slice(0, -1);
        console.log('MobileKeypad: Backspace - new value:', newValue);
        onChange(newValue);
        return
      }

      if (key === '.' && (!allowDecimal || value.includes('.'))) {
        console.log('MobileKeypad: Decimal not allowed or already present');
        return
      }

      if (value.length >= maxLength) {
        console.log('MobileKeypad: Max length reached');
        return
      }

      const newValue = value + key;
      console.log('MobileKeypad: Adding key - new value:', newValue);
      onChange(newValue);
    }

    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [allowDecimal ? '.' : '', '0', 'backspace']
    ]

    console.log('MobileKeypad: Rendering keypad with keys:', keys);

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-3 gap-3 p-4 bg-slate-900/50 rounded-xl", className)}
        {...props}
      >
        {keys.flat().map((key, index) => {
          if (!key) return <div key={index} />
          
          return (
            <Button
              key={key}
              variant="outline"
              size="lg"
              onClick={() => handleKeyPress(key)}
              className={cn(
                "h-14 text-xl font-semibold border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-white",
                "touch-target-lg active:scale-95 transition-transform"
              )}
            >
              {key === 'backspace' ? (
                <Trash2 className="h-6 w-6" />
              ) : (
                key
              )}
            </Button>
          )
        })}
      </div>
    )
  }
)
MobileKeypad.displayName = "MobileKeypad"
