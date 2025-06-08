
import { Badge } from "@/components/ui/badge";

interface TrendingTokenProps {
  token: {
    name: string;
    symbol: string;
    price: string;
    change: string;
    volume: string;
    logo: string;
  };
}

export default function TrendingToken({ token }: TrendingTokenProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{token.logo}</span>
        <div>
          <p className="text-white font-medium">{token.name}</p>
          <p className="text-white/60 text-sm">{token.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-bold">{token.price}</p>
        <Badge className="bg-green-600 text-white text-xs">
          {token.change}
        </Badge>
      </div>
    </div>
  );
}
