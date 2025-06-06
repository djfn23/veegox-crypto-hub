
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TokenSelectorProps {
  tokens: string[];
  placeholder: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  className?: string;
}

export default function TokenSelector({ 
  tokens, 
  placeholder, 
  disabled = false, 
  onValueChange,
  className 
}: TokenSelectorProps) {
  return (
    <Select onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {tokens.map(token => (
          <SelectItem key={token} value={token}>
            {token}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
