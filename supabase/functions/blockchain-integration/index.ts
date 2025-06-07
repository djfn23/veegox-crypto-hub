
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
      switch (chainId) {
        case 1: return `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        case 137: return `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        case 42161: return `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        default: return `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
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
        
        // Contrat ERC20 ABI pour les fonctions de base
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
        
        // Encoder les paramètres pour certaines fonctions
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

        // Décoder le résultat selon le type de fonction
        let decodedResult = contractResult
        if (functionName === 'decimals') {
          decodedResult = parseInt(contractResult, 16)
        } else if (functionName === 'totalSupply' || functionName === 'balanceOf') {
          decodedResult = parseInt(contractResult, 16).toString()
        } else if (functionName === 'name' || functionName === 'symbol') {
          // Décoder string depuis bytes32
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
        // Utiliser CoinGecko API pour les prix
        const pricesResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${tokenAddresses.join(',')}&vs_currencies=usd`
        )
        const pricesData = await pricesResponse.json()
        result = pricesData
        break

      case 'getNFTsForWallet':
        const [nftWalletAddress] = params
        const nftsResponse = await fetch(`${alchemyUrl}/getNFTs/?owner=${nftWalletAddress}`)
        const nftsData = await nftsResponse.json()
        result = nftsData.ownedNfts || []
        break

      case 'validateContract':
        const [contractAddr] = params
        const code = await makeRPCCall('eth_getCode', [contractAddr, 'latest'])
        const isContract = code !== '0x' && code !== '0x0'
        result = { isContract, address: contractAddr }
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
