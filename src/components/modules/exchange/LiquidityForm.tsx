
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet } from "../credit/types";
import { supabase } from "@/integrations/supabase/client";

interface LiquidityFormProps {
  userWallet: Wallet;
}

type LiquidityFormData = {
  tokenA: string;
  amountA: string;
  tokenB: string;
  amountB: string;
};

export default function LiquidityForm({ userWallet }: LiquidityFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LiquidityFormData>();
  const queryClient = useQueryClient();
  
  const addLiquidityMutation = useMutation({
    mutationFn: async (data: LiquidityFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour fournir de la liquidité");
      
      // Dans une vraie application, il y aurait ici une intégration avec un wallet
      // pour signer et soumettre la transaction à la blockchain
      
      const { data: pool, error } = await supabase
        .from("liquidity_pools")
        .insert({
          token_a_address: data.tokenA,
          token_b_address: data.tokenB,
          token_a_amount: parseFloat(data.amountA),
          token_b_amount: parseFloat(data.amountB),
          creator_id: userData.user.id,
          fee_percentage: 0.3 // Frais par défaut de 0.3%
        })
        .select()
        .single();
        
      if (error) throw error;
      return pool;
    },
    onSuccess: () => {
      toast.success("Liquidité ajoutée avec succès!");
      queryClient.invalidateQueries({ queryKey: ["liquidity-pools"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de l'ajout de liquidité");
    },
  });
  
  const onSubmit = (data: LiquidityFormData) => {
    addLiquidityMutation.mutate(data);
  };
  
  return (
    <Card className="max-w-md mx-auto border-muted">
      <CardHeader>
        <CardTitle>Fournir de la liquidité</CardTitle>
        <CardDescription>Ajoutez de la liquidité et gagnez des frais sur les échanges</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="tokenA" className="text-sm font-medium">Premier token</label>
              <span className="text-xs text-muted-foreground">
                Wallet: {userWallet.address.substring(0, 6)}...{userWallet.address.substring(userWallet.address.length - 4)}
              </span>
            </div>
            
            <div className="space-y-2">
              <Input
                id="tokenA"
                placeholder="Adresse du token (ex: ETH)"
                {...register("tokenA", { required: "Adresse du token requise" })}
              />
              {errors.tokenA && <p className="text-xs text-red-500">{errors.tokenA.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amountA" className="text-sm font-medium">Montant</label>
              <Input
                id="amountA"
                placeholder="0.0"
                type="number"
                step="0.000001"
                {...register("amountA", { 
                  required: "Montant requis",
                  min: { value: 0.000001, message: "Montant trop petit" },
                  valueAsNumber: true,
                })}
              />
              {errors.amountA && <p className="text-xs text-red-500">{errors.amountA.message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tokenB" className="text-sm font-medium">Deuxième token</label>
            <div className="space-y-2">
              <Input
                id="tokenB"
                placeholder="Adresse du token (ex: USDC)"
                {...register("tokenB", { required: "Adresse du token requise" })}
              />
              {errors.tokenB && <p className="text-xs text-red-500">{errors.tokenB.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amountB" className="text-sm font-medium">Montant</label>
              <Input
                id="amountB"
                placeholder="0.0"
                type="number"
                step="0.000001"
                {...register("amountB", { 
                  required: "Montant requis",
                  min: { value: 0.000001, message: "Montant trop petit" },
                  valueAsNumber: true,
                })}
              />
              {errors.amountB && <p className="text-xs text-red-500">{errors.amountB.message}</p>}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Frais de la pool: 0.3%</p>
            <p className="mt-1">
              En fournissant de la liquidité, vous recevrez des tokens LP qui représentent
              votre part dans la pool. Vous gagnerez des frais proportionnellement à votre part.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit(onSubmit)}
          disabled={addLiquidityMutation.isPending}
        >
          {addLiquidityMutation.isPending ? "Traitement..." : "Fournir de la liquidité"}
        </Button>
      </CardFooter>
    </Card>
  );
}
