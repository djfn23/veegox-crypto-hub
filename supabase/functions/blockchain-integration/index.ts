
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Web3Request {
  action: string
  params: any[]
  chainId?: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { action, params, chainId = 137 } = await req.json() as Web3Request
    
    const ALCHEMY_API_KEY = Deno.env.get('ALCHEMY_API_KEY')
    if (!ALCHEMY_API_KEY) {
      throw new Error('ALCHEMY_API_KEY not configured')
    }

    const getAlchemyUrl = (chainId: number) => {
      const baseUrl = 'https://'
      const apiKey = ALCHEMY_API_KEY
      
      switch (chainId) {
        // Ethereum
        case 1: return `${baseUrl}eth-mainnet.g.alchemy.com/v2/${apiKey}`
        case 11155111: return `${baseUrl}eth-sepolia.g.alchemy.com/v2/${apiKey}`
        case 5: return `${baseUrl}eth-goerli.g.alchemy.com/v2/${apiKey}`
        
        // Polygon
        case 137: return `${baseUrl}polygon-mainnet.g.alchemy.com/v2/${apiKey}`
        case 80001: return `${baseUrl}polygon-mumbai.g.alchemy.com/v2/${apiKey}`
        
        // Arbitrum
        case 42161: return `${baseUrl}arb-mainnet.g.alchemy.com/v2/${apiKey}`
        case 421614: return `${baseUrl}arb-sepolia.g.alchemy.com/v2/${apiKey}`
        case 421613: return `${baseUrl}arb-goerli.g.alchemy.com/v2/${apiKey}`
        
        // Optimism
        case 10: return `${baseUrl}opt-mainnet.g.alchemy.com/v2/${apiKey}`
        case 11155420: return `${baseUrl}opt-sepolia.g.alchemy.com/v2/${apiKey}`
        case 420: return `${baseUrl}opt-goerli.g.alchemy.com/v2/${apiKey}`
        
        // Base
        case 8453: return `${baseUrl}base-mainnet.g.alchemy.com/v2/${apiKey}`
        case 84532: return `${baseUrl}base-sepolia.g.alchemy.com/v2/${apiKey}`
        case 84531: return `${baseUrl}base-goerli.g.alchemy.com/v2/${apiKey}`
        
        // Avalanche (via Alchemy when available)
        case 43114: return `${baseUrl}avax-mainnet.g.alchemy.com/v2/${apiKey}`
        case 43113: return `${baseUrl}avax-fuji.g.alchemy.com/v2/${apiKey}`
        
        // BNB Smart Chain (via Alchemy when available)
        case 56: return `${baseUrl}bnb-mainnet.g.alchemy.com/v2/${apiKey}`
        case 97: return `${baseUrl}bnb-testnet.g.alchemy.com/v2/${apiKey}`
        
        // Default to Polygon for unsupported networks
        default: return `${baseUrl}polygon-mainnet.g.alchemy.com/v2/${apiKey}`
      }
    }

    const alchemyUrl = getAlchemyUrl(chainId)

    const makeRPCCall = async (method: string, params: any[] = []) => {
      const response = await fetch(alchemyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params
        })
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error.message)
      return data.result
    }

    let result

    switch (action) {
      case 'getNetworkInfo':
        const networkInfo = {
          chainId,
          blockNumber: await makeRPCCall('eth_blockNumber'),
          gasPrice: await makeRPCCall('eth_gasPrice'),
          syncing: await makeRPCCall('eth_syncing')
        }
        result = {
          ...networkInfo,
          blockNumber: parseInt(networkInfo.blockNumber, 16),
          gasPrice: parseInt(networkInfo.gasPrice, 16) / Math.pow(10, 9), // Convert to Gwei
          isHealthy: true
        }
        break

      case 'getMultiChainBalances':
        const [address, targetChainIds] = params
        const balances = await Promise.all(
          targetChainIds.map(async (cId: number) => {
            try {
              const chainUrl = getAlchemyUrl(cId)
              const response = await fetch(chainUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: 1,
                  method: 'eth_getBalance',
                  params: [address, 'latest']
                })
              })
              const data = await response.json()
              return {
                chainId: cId,
                balance: parseInt(data.result, 16) / Math.pow(10, 18),
                raw: data.result
              }
            } catch (error) {
              return {
                chainId: cId,
                balance: 0,
                error: error.message
              }
            }
          })
        )
        result = balances
        break

      case 'getWalletBalance':
        const [address] = params
        const balance = await makeRPCCall('eth_getBalance', [address, 'latest'])
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18)
        result = { balance: balanceInEth, raw: balance }
        break

      case 'getTokenBalance':
        const [tokenAddress, userAddress] = params
        const balanceOfData = `0x70a08231000000000000000000000000${userAddress.slice(2).padStart(64, '0')}`
        const tokenBalance = await makeRPCCall('eth_call', [{
          to: tokenAddress,
          data: balanceOfData
        }, 'latest'])
        result = { balance: parseInt(tokenBalance, 16) }
        break

      case 'getTransactionHistory':
        const [walletAddress] = params
        const latestBlock = await makeRPCCall('eth_blockNumber')
        const fromBlock = `0x${(parseInt(latestBlock, 16) - 1000).toString(16)}`
        
        const logs = await makeRPCCall('eth_getLogs', [{
          fromBlock,
          toBlock: 'latest',
          address: walletAddress
        }])
        
        result = { transactions: logs.slice(0, 50) }
        break

      case 'getGasPrice':
        const gasPrice = await makeRPCCall('eth_gasPrice')
        const gasPriceGwei = parseInt(gasPrice, 16) / Math.pow(10, 9)
        result = { gasPrice: gasPriceGwei, raw: gasPrice }
        break

      case 'getBlockNumber':
        const blockNumber = await makeRPCCall('eth_blockNumber')
        result = { blockNumber: parseInt(blockNumber, 16) }
        break

      case 'callContractFunction':
        const [contractAddress, functionName, functionParams = [], targetChainId = chainId] = params
        
        // ERC20 function signatures
        const erc20Functions: Record<string, string> = {
          'name': '0x06fdde03',
          'symbol': '0x95d89b41',
          'decimals': '0x313ce567',
          'totalSupply': '0x18160ddd',
          'balanceOf': '0x70a08231',
          'transfer': '0xa9059cbb',
          'allowance': '0xdd62ed3e',
          'approve': '0x095ea7b3'
        }

        let callData = erc20Functions[functionName] || '0x'
        
        // Encode parameters for specific functions
        if (functionName === 'balanceOf' && functionParams.length > 0) {
          callData += functionParams[0].slice(2).padStart(64, '0')
        } else if (functionName === 'allowance' && functionParams.length === 2) {
          callData += functionParams[0].slice(2).padStart(64, '0')
          callData += functionParams[1].slice(2).padStart(64, '0')
        }

        const contractResult = await makeRPCCall('eth_call', [{
          to: contractAddress,
          data: callData
        }, 'latest'])

        // Decode result based on function type
        let decodedResult = contractResult
        if (functionName === 'decimals') {
          decodedResult = parseInt(contractResult, 16)
        } else if (functionName === 'totalSupply' || functionName === 'balanceOf') {
          decodedResult = parseInt(contractResult, 16).toString()
        } else if (functionName === 'name' || functionName === 'symbol') {
          // Decode string from bytes32
          const hex = contractResult.slice(2)
          decodedResult = ''
          for (let i = 0; i < hex.length; i += 2) {
            const byte = parseInt(hex.substr(i, 2), 16)
            if (byte !== 0) decodedResult += String.fromCharCode(byte)
          }
        }

        result = decodedResult
        break

      case 'getTokenPrices':
        const [tokenAddresses] = params
        // Use CoinGecko API for prices with multi-chain support
        const platformMap: Record<number, string> = {
          1: 'ethereum',
          137: 'polygon-pos',
          42161: 'arbitrum-one',
          10: 'optimistic-ethereum',
          8453: 'base',
          43114: 'avalanche',
          56: 'binance-smart-chain'
        }
        
        const platform = platformMap[chainId] || 'polygon-pos'
        const pricesResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/token_price/${platform}?contract_addresses=${tokenAddresses.join(',')}&vs_currencies=usd&include_24hr_change=true`
        )
        const pricesData = await pricesResponse.json()
        result = pricesData
        break

      case 'getNFTsForWallet':
        const [nftWalletAddress] = params
        try {
          const nftsResponse = await fetch(`${alchemyUrl}/getNFTs/?owner=${nftWalletAddress}&withMetadata=true`)
          const nftsData = await nftsResponse.json()
          result = nftsData.ownedNfts || []
        } catch (error) {
          // Fallback for networks that don't support NFT API
          result = []
        }
        break

      case 'validateContract':
        const [contractAddr] = params
        const code = await makeRPCCall('eth_getCode', [contractAddr, 'latest'])
        const isContract = code !== '0x' && code !== '0x0'
        result = { isContract, address: contractAddr, chainId }
        break

      case 'getNetworkHealth':
        try {
          const [blockNum, gasPrice, peerCount] = await Promise.all([
            makeRPCCall('eth_blockNumber'),
            makeRPCCall('eth_gasPrice'),
            makeRPCCall('net_peerCount').catch(() => '0x0') // Some networks don't support this
          ])
          
          result = {
            chainId,
            isHealthy: true,
            blockNumber: parseInt(blockNum, 16),
            gasPrice: parseInt(gasPrice, 16) / Math.pow(10, 9),
            peerCount: parseInt(peerCount, 16),
            timestamp: new Date().toISOString()
          }
        } catch (error) {
          result = {
            chainId,
            isHealthy: false,
            error: error.message,
            timestamp: new Date().toISOString()
          }
        }
        break

      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return new Response(
      JSON.stringify({ result }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Blockchain integration error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
