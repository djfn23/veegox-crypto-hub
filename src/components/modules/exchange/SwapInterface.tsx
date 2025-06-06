
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { LiquidityPool, Wallet } from "../credit/types";
import { supabase } from "@/integrations/supabase/client";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import ExchangeRateDisplay from "./ExchangeRateDisplay";
import SwapButton from "./SwapButton";

interface SwapInterfaceProps {
  pools: LiquidityPool[];
  userWallet: Wallet | null;
}

type SwapFormData = {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
};

export default function SwapInterface({ pools, userWallet }: SwapInterfaceProps) {
  const [amountOut, setAmountOut] = useState<number | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SwapFormData>();
  const queryClient = useQueryClient();

  const tokenIn = watch('tokenIn');
  const tokenOut = watch('tokenOut');
  const amountIn = watch('amountIn');

  // Récupérer tous les tokens uniques disponibles dans les pools
  const availableTokens = Array.from(
    new Set(
      pools.flatMap(pool => [pool.token_a_address, pool.token_b_address])
    )
  );

  // Filtrer les tokens de sortie disponibles en fonction du token d'entrée sélectionné
  const availableOutputTokens = tokenIn 
    ? Array.from(
        new Set(
          pools
            .filter(pool => pool.token_a_address === tokenIn || pool.token_b_address === tokenIn)
            .map(pool => pool.token_a_address === tokenIn ? pool.token_b_address : pool.token_a_address)
        )
      )
    : [];

  // Calculer le montant de sortie estimé
  const calculateOutputAmount = (poolId: string, amountIn: number) => {
    const pool = pools.find(p => p.id === poolId);
    if (!pool) return 0;

    // Logique simplifiée pour le calcul du taux d'échange (dans un vrai DEX, cela serait plus complexe)
    const isAtoB = pool.token_a_address === tokenIn;
    const reserveIn = isAtoB ? pool.token_a_amount : pool.token_b_amount;
    const reserveOut = isAtoB ? pool.token_b_amount : pool.token_a_amount;
    
    if (reserveIn === 0) return 0;
    
    // Formule x * y = k avec frais de 0.3%
    const amountInWithFee = amountIn * 0.997; // 0.3% de frais
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn + amountInWithFee;
    
    return numerator / denominator;
  };

  // Trouver le meilleur pool pour l'échange
  const findBestPool = (): string | null => {
    if (!tokenIn || !tokenOut || !amountIn) return null;
    
    const eligiblePools = pools.filter(
      pool => 
        (pool.token_a_address === tokenIn && pool.token_b_address === tokenOut) || 
        (pool.token_a_address === tokenOut && pool.token_b_address === tokenIn)
    );
    
    if (eligiblePools.length === 0) return null;
    
    // Trouver le pool qui donne le meilleur taux d'échange
    let bestPool = eligiblePools[0];
    let bestAmount = calculateOutputAmount(bestPool.id, parseFloat(amountIn));
    
    eligiblePools.forEach(pool => {
      const amount = calculateOutputAmount(pool.id, parseFloat(amountIn));
      if (amount > bestAmount) {
        bestAmount = amount;
        bestPool = pool;
      }
    });
    
    setAmountOut(bestAmount);
    return bestPool.id;
  };

  // Mise à jour automatique de l'estimation
  useEffect(() => {
    if (tokenIn && tokenOut && amountIn && parseFloat(amountIn) > 0) {
      findBestPool();
    } else {
      setAmountOut(null);
    }
  }, [tokenIn, tokenOut, amountIn]);

  // Mutation pour effectuer l'échange
  const swapMutation = useMutation({
    mutationFn: async (data: SwapFormData) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Vous devez être connecté pour effectuer un échange");
      
      const poolId = findBestPool();
      if (!poolId) throw new Error("Aucun pool disponible pour cet échange");
      
      const calculatedAmountOut = amountOut || 0;
      
      // Dans une vraie application, il y aurait ici une intégration avec un wallet
      // pour signer et soumettre la transaction à la blockchain
      
      // Enregistrer la transaction dans la base de données
      const { data: transaction, error } = await supabase
        .from("exchange_transactions")
        .insert({
          user_id: userData.user.id,
          pool_id: poolId,
          token_in_address: data.tokenIn,
          token_out_address: data.tokenOut,
          amount_in: parseFloat(data.amountIn),
          amount_out: calculatedAmountOut,
          status: "completed" // Dans une vraie application, ce serait d'abord "pending"
        })
        .select()
        .single();
        
      if (error) throw error;
      return transaction;
    },
    onSuccess: () => {
      toast.success("Échange effectué avec succès!");
      queryClient.invalidateQueries({ queryKey: ["liquidity-pools"] });
      queryClient.invalidateQueries({ queryKey: ["exchange-transactions"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de l'échange");
    },
  });

  const onSubmit = (data: SwapFormData) => {
    swapMutation.mutate(data);
  };

  const handleReverseTokens = () => {
    const current = { in: tokenIn, out: tokenOut };
    setValue('tokenIn', current.out);
    setValue('tokenOut', current.in);
  };

  return (
    <Card className="max-w-md mx-auto border-muted">
      <CardHeader>
        <CardTitle>Échange de tokens</CardTitle>
        <CardDescription>Échangez des tokens instantanément avec le meilleur taux</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="tokenIn" className="text-sm font-medium">De</label>
              {userWallet && (
                <span className="text-xs text-muted-foreground">
                  Adresse: {userWallet.address.substring(0, 6)}...{userWallet.address.substring(userWallet.address.length - 4)}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <TokenSelector
                tokens={availableTokens}
                placeholder="Token"
                onValueChange={(value) => setValue('tokenIn', value)}
                className="w-1/3"
              />
              
              <AmountInput
                placeholder="0.0"
                register={register("amountIn", { 
                  required: "Montant requis",
                  min: { value: 0.000001, message: "Montant trop petit" },
                  valueAsNumber: true,
                })}
                error={errors.amountIn}
                className="w-2/3"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={handleReverseTokens}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tokenOut" className="text-sm font-medium">Vers</label>
            <div className="flex space-x-2">
              <TokenSelector
                tokens={availableOutputTokens}
                placeholder="Token"
                disabled={!tokenIn}
                onValueChange={(value) => setValue('tokenOut', value)}
                className="w-1/3"
              />
              
              <AmountInput
                placeholder="0.0"
                disabled
                value={amountOut !== null ? amountOut.toFixed(6) : ''}
                className="w-2/3"
              />
            </div>
          </div>
          
          <ExchangeRateDisplay
            amountOut={amountOut}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            amountIn={amountIn}
          />
        </form>
      </CardContent>
      <CardFooter>
        <SwapButton
          userWallet={userWallet}
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          amountIn={amountIn}
          isPending={swapMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        />
      </CardFooter>
    </Card>
  );
}
