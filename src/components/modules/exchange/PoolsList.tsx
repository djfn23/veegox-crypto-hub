
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LiquidityPool } from "../credit/types";

interface PoolsListProps {
  pools: LiquidityPool[];
  isLoading: boolean;
}

export default function PoolsList({ pools, isLoading }: PoolsListProps) {
  if (isLoading) {
    return <div className="text-center py-10">Chargement des pools...</div>;
  }
  
  if (pools.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucun pool de liquidité disponible.</p>
        <p className="text-muted-foreground mt-2">Créez le premier pool en fournissant de la liquidité.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Pools de liquidité disponibles</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pools.map(pool => (
          <Card key={pool.id} className="overflow-hidden hover:border-primary transition-all">
            <CardHeader className="bg-muted/40">
              <CardTitle className="text-lg">{pool.token_a_address} / {pool.token_b_address}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Token A</p>
                  <p className="font-medium">{pool.token_a_address}</p>
                  <p className="text-sm">{pool.token_a_amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Token B</p>
                  <p className="font-medium">{pool.token_b_address}</p>
                  <p className="text-sm">{pool.token_b_amount}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">Frais</p>
                <p>{pool.fee_percentage}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
