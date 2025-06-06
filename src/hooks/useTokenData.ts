
import { useQuery } from "@tanstack/react-query";
import { Web3Service } from "@/services/web3Service";

export const useTokenBalances = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['token-balances', address, chainId],
    queryFn: () => Web3Service.getTokenBalances(address!, chainId),
    enabled: !!address,
    refetchInterval: 30000,
  });
};

export const useTokenMetadata = (tokenAddress: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['token-metadata', tokenAddress, chainId],
    queryFn: () => Web3Service.getTokenInfo(tokenAddress!, chainId),
    enabled: !!tokenAddress,
    staleTime: 300000, // 5 minutes - metadata doesn't change often
  });
};

export const useNFTCollection = (address: string | null, chainId: number = 1) => {
  return useQuery({
    queryKey: ['nft-collection', address, chainId],
    queryFn: () => Web3Service.getNFTsForWallet(address!, chainId),
    enabled: !!address,
    refetchInterval: 60000, // 1 minute
  });
};

export const useTokenPrices = (tokenAddresses: string[], chainId: number = 1) => {
  return useQuery({
    queryKey: ['token-prices', tokenAddresses, chainId],
    queryFn: () => Web3Service.getTokenPrices(tokenAddresses, chainId),
    enabled: tokenAddresses.length > 0,
    refetchInterval: 30000,
  });
};

export const useWalletAssets = (address: string | null, chainId: number = 1) => {
  const { data: balanceData, isLoading: isLoadingBalance } = useTokenBalances(address, chainId);
  const { data: nftData, isLoading: isLoadingNFTs } = useNFTCollection(address, chainId);
  const { data: ethBalance } = useQuery({
    queryKey: ['eth-balance', address, chainId],
    queryFn: () => Web3Service.getWalletBalance(address!, chainId),
    enabled: !!address,
  });

  return {
    assets: {
      tokens: balanceData?.result || [],
      nfts: nftData?.result || [],
      ethBalance: ethBalance?.result?.balance || 0,
    },
    isLoading: isLoadingBalance || isLoadingNFTs,
  };
};
