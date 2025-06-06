
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";
import { useMainContractInfo, useUserContractBalance, useAddressStatus, useOwnerFunctions } from "@/hooks/useMainContract";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { ExternalLink, Activity, Coins, Shield, AlertTriangle, Users, Zap, Lock, Wallet, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ContractTransactions } from "./ContractTransactions";
import { ERC20CreditIntegration } from "../modules/credit/ERC20CreditIntegration";
import { ERC20StakingPool } from "../modules/staking/ERC20StakingPool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MainContractDashboard = () => {
  const { data: contractInfo, isLoading: isLoadingContract } = useMainContractInfo();
  const { connectedWallet, connectMetaMask, isConnecting } = useWeb3Wallet();
  const [adminAddress, setAdminAddress] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const { data: userBalance, isLoading: isLoadingBalance } = useUserContractBalance(
    connectedWallet?.address || null
  );
  
  const { data: addressStatus } = useAddressStatus(connectedWallet?.address || null);
  const { data: adminStatus } = useAddressStatus(adminAddress);
  const { setNotTaxable, setBlackList, releaseAirdropMode } = useOwnerFunctions();

  const contractAddress = "0xF3E1D80dA667D50641f0110F2Bb70882cd16343E";
  const tokenInfo = contractInfo?.result?.tokenInfo;

  if (isLoadingContract) {
    return (
      <GlassCard className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3 bg-white/10" />
          <Skeleton className="h-4 w-2/3 bg-white/10" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 bg-white/10" />
            <Skeleton className="h-20 bg-white/10" />
            <Skeleton className="h-20 bg-white/10" />
          </div>
        </div>
      </GlassCard>
    );
  }

  const formatBalance = (balance: string) => {
    if (!balance) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const balanceNum = parseInt(balance) / Math.pow(10, decimals);
    return balanceNum.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  const formatSupply = (supply: string) => {
    if (!supply) return "0";
    const decimals = tokenInfo?.decimals || 18;
    const supplyNum = parseInt(supply) / Math.pow(10, decimals);
    return supplyNum.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="space-y-6">
      {/* En-tête du contrat */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {tokenInfo?.name || "ERC20Template"} ({tokenInfo?.symbol || "TOKEN"})
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-mono text-sm">
                {contractAddress}
              </span>
              <ExternalLink 
                className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer"
                onClick={() => window.open(`https://polygonscan.com/address/${contractAddress}`, '_blank')}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              <Shield className="h-3 w-3 mr-1" />
              Polygon Mainnet
            </Badge>
            {tokenInfo?.isAirdrop && (
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                <Zap className="h-3 w-3 mr-1" />
                Mode Airdrop
              </Badge>
            )}
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Coins className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Mon Solde</span>
            </div>
            {isLoadingBalance ? (
              <Skeleton className="h-6 w-20 bg-white/10" />
            ) : (
              <p className="text-white text-xl font-bold">
                {formatBalance(userBalance?.result || "0")} {tokenInfo?.symbol}
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-medium">Supply Total</span>
            </div>
            <p className="text-white text-xl font-bold">
              {formatSupply(tokenInfo?.totalSupply || "0")}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-medium">Taxe</span>
            </div>
            <p className="text-white text-xl font-bold">
              {tokenInfo?.taxFee || 0}%
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Réseau</span>
            </div>
            <p className="text-white text-xl font-bold">Polygon</p>
          </div>
        </div>

        {/* Connection Wallet */}
        {!connectedWallet && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wallet className="h-6 w-6 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 font-medium">Connectez votre wallet</p>
                  <p className="text-gray-400 text-sm">
                    Pour interagir avec le contrat et effectuer des transactions
                  </p>
                </div>
              </div>
              <GradientButton 
                onClick={connectMetaMask}
                disabled={isConnecting}
              >
                {isConnecting ? "Connexion..." : "Connecter MetaMask"}
              </GradientButton>
            </div>
          </div>
        )}

        {/* Statut de l'utilisateur connecté */}
        {connectedWallet && addressStatus && (
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Statut de votre adresse</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${addressStatus.isBlacklisted ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {addressStatus.isBlacklisted ? 'Blacklisté' : 'Autorisé'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${addressStatus.isNotTaxable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {addressStatus.isNotTaxable ? 'Sans taxe' : 'Taxable'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${addressStatus.isAntibotExempt ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {addressStatus.isAntibotExempt ? 'Anti-bot exempt' : 'Anti-bot actif'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${addressStatus.isAntiwhaleExempt ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span className="text-sm text-gray-300">
                  {addressStatus.isAntiwhaleExempt ? 'Anti-whale exempt' : 'Anti-whale actif'}
                </span>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Onglets principales */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Coins className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="credit" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <TrendingUp className="h-4 w-4 mr-2" />
            Crédit
          </TabsTrigger>
          <TabsTrigger value="staking" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Lock className="h-4 w-4 mr-2" />
            Staking
          </TabsTrigger>
          <TabsTrigger value="admin" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-6">
          <ContractTransactions />
        </TabsContent>

        <TabsContent value="credit" className="mt-6">
          <ERC20CreditIntegration />
        </TabsContent>

        <TabsContent value="staking" className="mt-6">
          <ERC20StakingPool />
        </TabsContent>

        <TabsContent value="admin" className="mt-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Panel d'Administration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vérifier une adresse
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="0x..."
                    value={adminAddress}
                    onChange={(e) => setAdminAddress(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Button 
                    onClick={() => adminAddress && toast.info("Statut vérifié")}
                    disabled={!adminAddress}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Vérifier
                  </Button>
                </div>
              </div>

              {adminStatus && adminAddress && (
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Statut de {adminAddress.slice(0, 6)}...{adminAddress.slice(-4)}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        Blacklisté: <span className={adminStatus.isBlacklisted ? 'text-red-400' : 'text-green-400'}>
                          {adminStatus.isBlacklisted ? 'Oui' : 'Non'}
                        </span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Exempt de taxe: <span className={adminStatus.isNotTaxable ? 'text-green-400' : 'text-yellow-400'}>
                          {adminStatus.isNotTaxable ? 'Oui' : 'Non'}
                        </span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => setBlackList.mutate({ 
                          address: adminAddress, 
                          blacklisted: !adminStatus.isBlacklisted 
                        })}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        {adminStatus.isBlacklisted ? 'Débloquer' : 'Blacklister'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setNotTaxable.mutate({ 
                          address: adminAddress, 
                          taxable: !adminStatus.isNotTaxable 
                        })}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {adminStatus.isNotTaxable ? 'Rendre taxable' : 'Exempter taxe'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {tokenInfo?.isAirdrop && (
                <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
                  <h4 className="text-orange-400 font-medium mb-2">Mode Airdrop Actif</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Le mode airdrop est actuellement activé. Seules les adresses exemptées peuvent transférer.
                  </p>
                  <Button
                    onClick={() => releaseAirdropMode.mutate()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Désactiver le mode Airdrop
                  </Button>
                </div>
              )}
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
