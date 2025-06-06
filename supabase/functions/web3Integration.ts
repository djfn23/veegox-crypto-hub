import "https://deno.land/x/xhr@0.3.0/mod.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const alchemyApiKey = Deno.env.get("ALCHEMY_API_KEY") ?? "";

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { action, params } = await req.json();

    // Fonctions pour obtenir des informations blockchain via Alchemy
    const functions = {
      // Obtenir le solde d'un portefeuille
      getWalletBalance: async (address, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [address, "latest"]
          })
        });

        const data = await response.json();
        return {
          balance: parseInt(data.result, 16) / 1e18, // Conversion du wei en ETH
          address,
          chainId
        };
      },

      // Obtenir l'historique des transactions d'un portefeuille
      getTransactionHistory: async (address, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;

        // Requête pour obtenir les transactions envoyées
        const sentResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0x0",
                toBlock: "latest",
                fromAddress: address,
                category: ["external", "internal", "erc20", "erc721", "erc1155"]
              }
            ]
          })
        });

        const sentData = await sentResponse.json();
        const sentTransfers = sentData.result?.transfers || [];

        // Requête pour obtenir les transactions reçues
        const receivedResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 2,
            method: "alchemy_getAssetTransfers",
            params: [
              {
                fromBlock: "0x0",
                toBlock: "latest",
                toAddress: address,
                category: ["external", "internal", "erc20", "erc721", "erc1155"]
              }
            ]
          })
        });

        const receivedData = await receivedResponse.json();
        const receivedTransfers = receivedData.result?.transfers || [];

        // Fusionner et trier les transactions par date
        const allTransfers = [...sentTransfers, ...receivedTransfers].sort((a, b) => {
          return b.metadata.blockTimestamp.localeCompare(a.metadata.blockTimestamp);
        });

        return allTransfers;
      },

      // Vérifier l'âge du portefeuille en trouvant sa première transaction
      getWalletAge: async (address, chainId) => {
        const transactions = await functions.getTransactionHistory(address, chainId);
        
        if (transactions.length === 0) {
          return { age: 0, firstTxDate: null };
        }
        
        // Trier par date ascendante pour trouver la plus ancienne
        const sortedByOldest = [...transactions].sort((a, b) => {
          return a.metadata.blockTimestamp.localeCompare(b.metadata.blockTimestamp);
        });
        
        const firstTx = sortedByOldest[0];
        const firstTxDate = new Date(firstTx.metadata.blockTimestamp);
        const now = new Date();
        
        // Calculer l'âge en jours
        const ageInMs = now.getTime() - firstTxDate.getTime();
        const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
        
        return {
          age: ageInDays,
          firstTxDate: firstTx.metadata.blockTimestamp
        };
      },

      // Obtenir des données pour calculer un score de crédit on-chain
      getCreditScoreData: async (address, chainId) => {
        try {
          // Obtenir le solde et l'historique des transactions
          const [balanceData, walletAge, transactionHistory] = await Promise.all([
            functions.getWalletBalance(address, chainId),
            functions.getWalletAge(address, chainId),
            functions.getTransactionHistory(address, chainId)
          ]);
          
          // Analyser les données de transaction pour le score de crédit
          const txCount = transactionHistory.length;
          const uniqueContacts = new Set();
          let totalValue = 0;
          let lastMonthTxCount = 0;
          
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          
          transactionHistory.forEach(tx => {
            // Compter les contacts uniques
            if (tx.from) uniqueContacts.add(tx.from);
            if (tx.to) uniqueContacts.add(tx.to);
            
            // Calculer la valeur totale des transactions
            const value = parseFloat(tx.value || 0);
            if (!isNaN(value)) totalValue += value;
            
            // Compter les transactions du dernier mois
            const txDate = new Date(tx.metadata.blockTimestamp);
            if (txDate > oneMonthAgo) lastMonthTxCount++;
          });
          
          // Données de scoring
          return {
            address,
            chainId,
            balance: balanceData.balance,
            walletAgeDays: walletAge.age,
            firstTransaction: walletAge.firstTxDate,
            transactionCount: txCount,
            uniqueContacts: uniqueContacts.size,
            totalValue,
            lastMonthActivityCount: lastMonthTxCount,
            // On pourrait ajouter d'autres métriques ici
          };
        } catch (error) {
          console.error("Error in getCreditScoreData:", error);
          throw error;
        }
      },

      // Récupérer des informations sur un contrat de token
      getTokenInfo: async (tokenAddress, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        // Obtenir le nom du token
        const nameResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: "0x06fdde03" // signature de la fonction name()
              },
              "latest"
            ]
          })
        });
        
        const nameData = await nameResponse.json();
        let name = "";
        
        if (nameData.result && nameData.result !== "0x") {
          // Décoder le résultat en UTF-8
          const hexString = nameData.result.substring(2); // Enlever le préfixe 0x
          const hexPairs = hexString.match(/.{1,2}/g) || [];
          const dynamicLength = parseInt(hexPairs[31], 16) * 2;
          const nameHex = hexString.substring(64, 64 + dynamicLength);
          name = hexToAscii(nameHex);
        }
        
        // Obtenir le symbole du token
        const symbolResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 2,
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: "0x95d89b41" // signature de la fonction symbol()
              },
              "latest"
            ]
          })
        });
        
        const symbolData = await symbolResponse.json();
        let symbol = "";
        
        if (symbolData.result && symbolData.result !== "0x") {
          // Décoder le résultat en UTF-8
          const hexString = symbolData.result.substring(2);
          const hexPairs = hexString.match(/.{1,2}/g) || [];
          const dynamicLength = parseInt(hexPairs[31], 16) * 2;
          const symbolHex = hexString.substring(64, 64 + dynamicLength);
          symbol = hexToAscii(symbolHex);
        }
        
        // Obtenir le nombre de décimales
        const decimalsResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 3,
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: "0x313ce567" // signature de la fonction decimals()
              },
              "latest"
            ]
          })
        });
        
        const decimalsData = await decimalsResponse.json();
        let decimals = 18; // valeur par défaut
        
        if (decimalsData.result && decimalsData.result !== "0x") {
          decimals = parseInt(decimalsData.result, 16);
        }
        
        return {
          address: tokenAddress,
          chainId,
          name,
          symbol,
          decimals
        };
      },

      // Obtenir les balances de tous les tokens ERC20 d'un wallet
      getTokenBalances: async (address, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getTokenBalances",
            params: [address, "erc20"]
          })
        });

        const data = await response.json();
        
        if (data.result?.tokenBalances) {
          // Filtrer les tokens avec un balance > 0 et obtenir leurs métadonnées
          const tokensWithBalance = data.result.tokenBalances.filter(
            token => token.tokenBalance !== "0x0"
          );
          
          // Obtenir les métadonnées pour chaque token
          const enrichedTokens = await Promise.all(
            tokensWithBalance.map(async token => {
              try {
                const metadata = await functions.getTokenInfo(token.contractAddress, chainId);
                return {
                  address: token.contractAddress,
                  balance: parseInt(token.tokenBalance, 16) / Math.pow(10, metadata.result?.decimals || 18),
                  ...metadata.result
                };
              } catch (error) {
                console.error(`Erreur lors de la récupération des métadonnées pour ${token.contractAddress}:`, error);
                return {
                  address: token.contractAddress,
                  balance: parseInt(token.tokenBalance, 16) / Math.pow(10, 18),
                  name: "Token inconnu",
                  symbol: "UNKNOWN",
                  decimals: 18
                };
              }
            })
          );
          
          return enrichedTokens;
        }
        
        return [];
      },

      // Obtenir les NFTs d'un wallet
      getNFTsForWallet: async (address, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getNFTs",
            params: [
              address,
              {
                pageSize: 100,
                withMetadata: true
              }
            ]
          })
        });

        const data = await response.json();
        
        if (data.result?.ownedNfts) {
          return data.result.ownedNfts.map(nft => ({
            tokenId: nft.id.tokenId,
            name: nft.metadata?.name || `Token #${nft.id.tokenId}`,
            description: nft.metadata?.description,
            image: nft.metadata?.image,
            collection: {
              name: nft.contract.name || "Collection inconnue",
              address: nft.contract.address
            },
            metadata: nft.metadata
          }));
        }
        
        return [];
      },

      // Obtenir les prix des tokens (simulation - dans une vraie app, utiliser CoinGecko ou similaire)
      getTokenPrices: async (tokenAddresses, chainId) => {
        // Pour la démo, on retourne des prix simulés
        // Dans une vraie application, intégrer CoinGecko API ou similaire
        const mockPrices = [
          { address: 'native', symbol: 'ETH', price: 2500, change24h: 3.2 },
          { address: '0xA0b86a33E6441949F9d7C8D4b33B03E2b31f2E3D', symbol: 'USDC', price: 1.00, change24h: 0.1 },
          { address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', symbol: 'UNI', price: 7.50, change24h: -2.1 },
        ];
        
        return tokenAddresses.map(address => {
          const mockPrice = mockPrices.find(p => p.address === address) || 
                           { address, symbol: 'UNKNOWN', price: 0, change24h: 0 };
          return mockPrice;
        });
      },

      // Obtenir le prix du gas actuel
      getGasPrice: async (chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_gasPrice",
            params: []
          })
        });

        const data = await response.json();
        return {
          gasPrice: parseInt(data.result, 16),
          gasPriceGwei: parseInt(data.result, 16) / 1e9
        };
      },

      // Obtenir le numéro de bloc actuel
      getBlockNumber: async (chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_blockNumber",
            params: []
          })
        });

        const data = await response.json();
        return {
          blockNumber: parseInt(data.result, 16)
        };
      },

      // Valider qu'une adresse est un contrat valide
      validateContract: async (address, chainId) => {
        const network = getNetworkFromChainId(chainId);
        const url = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getCode",
            params: [address, "latest"]
          })
        });

        const data = await response.json();
        const isContract = data.result && data.result !== "0x";
        
        return {
          isContract,
          address,
          chainId
        };
      }
    };

    // Exécuter l'action demandée
    if (action && typeof functions[action] === "function") {
      const result = await functions[action](...params);
      return new Response(JSON.stringify({ result }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      });
    } else {
      return new Response(JSON.stringify({ error: "Action non supportée" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400
      });
    }
  } catch (error) {
    console.error("Error in web3Integration function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});

// Fonctions utilitaires
function getNetworkFromChainId(chainId) {
  // Convertir le chainId en nombre si c'est une chaîne
  const id = typeof chainId === "string" ? parseInt(chainId, 10) : chainId;
  
  switch (id) {
    case 1: return "eth-mainnet";
    case 5: return "eth-goerli";
    case 11155111: return "eth-sepolia";
    case 137: return "polygon-mainnet";
    case 80001: return "polygon-mumbai";
    case 42161: return "arb-mainnet";
    case 421613: return "arb-goerli";
    case 10: return "opt-mainnet";
    case 420: return "opt-goerli";
    case 8453: return "base-mainnet";
    case 84531: return "base-goerli";
    default: return "eth-mainnet"; // Par défaut
  }
}

function hexToAscii(hexString) {
  let asciiString = "";
  for (let i = 0; i < hexString.length; i += 2) {
    const hex = hexString.substr(i, 2);
    const decimal = parseInt(hex, 16);
    if (decimal > 0) { // Ignorer les caractères nuls
      asciiString += String.fromCharCode(decimal);
    }
  }
  return asciiString;
}
