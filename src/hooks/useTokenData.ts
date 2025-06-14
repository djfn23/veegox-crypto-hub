
import { useQuery } from '@tanstack/react-query';
import { Web3Service } from '@/services/web3Service';

export const useTokenPrices = (tokenAddresses: string[], chainId: number = 137) => {
  return useQuery({
    queryKey: ['token-prices', tokenAddresses, chainId],
    queryFn: () => Web3Service.getTokenPrices(tokenAddresses, chainId),
    enabled: tokenAddresses.length > 0,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

export const useWalletAssets = (address: string | null, chainId: number = 137) => {
  return useQuery({
    queryKey: ['wallet-assets', address, chainId],
    queryFn: async () => {
      if (!address) return { tokens: [], nfts: [], ethBalance: 0 };
      
      // Mock wallet assets data
      return {
        tokens: [
          {
            address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            name: 'Wrapped Ethereum',
            symbol: 'WETH',
            decimals: 18,
            balance: '0.5'
          },
          {
            address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            balance: '1000'
          }
        ],
        nfts: [],
        ethBalance: Math.random() * 5
      };
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};
