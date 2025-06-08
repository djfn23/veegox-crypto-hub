
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Star, ExternalLink } from "lucide-react";

interface TokenCardProps {
  token: {
    name: string;
    symbol: string;
    price: string;
    change: string;
    volume: string;
    holders: number;
    category: string;
    isVerified: boolean;
    logo: string;
  };
}

export default function TokenCard({ token }: TokenCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
              {token.logo}
            </div>
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                {token.name}
                {token.isVerified && (
                  <Badge className="bg-blue-600 text-white text-xs">
                    Vérifié
                  </Badge>
                )}
              </CardTitle>
              <p className="text-white/60 text-sm">{token.symbol}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-white/60 text-xs">Prix</Label>
            <p className="text-white font-bold text-lg">{token.price}</p>
          </div>
          <div>
            <Label className="text-white/60 text-xs">24h</Label>
            <Badge className={`${
              token.change.startsWith('+') ? 'bg-green-600' : 'bg-red-600'
            } text-white`}>
              {token.change}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Volume 24h:</span>
            <span className="text-white">{token.volume}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Détenteurs:</span>
            <span className="text-white">{token.holders}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Catégorie:</span>
            <Badge variant="secondary" className="bg-white/10 text-white text-xs">
              {token.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Trader
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
