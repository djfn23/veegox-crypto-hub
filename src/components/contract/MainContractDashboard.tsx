import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Wallet } from "lucide-react";
import { useMainContractInfo, useUserContractBalance } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

const MainContractDashboard = () => {
  const { connectedWallet } = useWeb3Wallet();
  const { data: contractInfo, isLoading, error } = useMainContractInfo();
  const { data: userBalance } = useUserContractBalance(connectedWallet?.address || null);

  const tokenInfo = contractInfo?.result?.tokenInfo;
  const balance = userBalance?.result || "0";

  return (
    <div className="space-y-4">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Informations du Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Nom</p>
            <p className="text-white font-semibold">{tokenInfo?.name || 'N/A'}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Symbole</p>
            <p className="text-white font-semibold">{tokenInfo?.symbol || 'N/A'}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Decimals</p>
            <p className="text-white font-semibold">{tokenInfo?.decimals || 'N/A'}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Total Supply</p>
            <p className="text-white font-semibold">{tokenInfo?.totalSupply || 'N/A'}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Tax Fee</p>
            <p className="text-white font-semibold">{tokenInfo?.taxFee || 'N/A'}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">Is Airdrop</p>
            <Badge className={tokenInfo?.isAirdrop ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
              {tokenInfo?.isAirdrop ? 'Yes' : 'No'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Mon Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white font-semibold">
            {balance}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainContractDashboard;
