
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"

interface MobileKeypadProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  allowDecimal?: boolean
  className?: string
}

export const MobileKeypad = React.forwardRef<HTMLDivElement, MobileKeypadProps>(
  ({ value, onChange, maxLength = 10, allowDecimal = true, className, ...props }, ref) => {
    const handleKeyPress = (key: string) => {
      if (key === 'backspace') {
        onChange(value.slice(0, -1))
        return
      }

      if (key === '.' && (!allowDecimal || value.includes('.'))) {
        return
      }

      if (value.length >= maxLength) {
        return
      }

      onChange(value + key)
    }

    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [allowDecimal ? '.' : '', '0', 'backspace']
    ]

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
                <Delete className="h-6 w-6" />
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
