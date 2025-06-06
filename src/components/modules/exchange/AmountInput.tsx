
import { Input } from "@/components/ui/input";
import { FieldError, UseFormRegister } from "react-hook-form";

interface AmountInputProps {
  placeholder: string;
  disabled?: boolean;
  value?: string;
  register?: ReturnType<UseFormRegister<any>>;
  error?: FieldError;
  className?: string;
}

export default function AmountInput({ 
  placeholder, 
  disabled = false, 
  value, 
  register,
  error,
  className 
}: AmountInputProps) {
  if (disabled && value !== undefined) {
    return (
      <Input
        placeholder={placeholder}
        type="number"
        className={className}
        value={value}
        disabled
      />
    );
  }

  return (
    <div className="space-y-1">
      <Input
        placeholder={placeholder}
        type="number"
        step="0.000001"
        className={className}
        {...register}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
