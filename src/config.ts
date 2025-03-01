import { http, createConfig } from 'wagmi'
import { base, mainnet, polygon } from 'wagmi/chains'
import { defineChain } from 'viem'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'


const projectId = '<WALLETCONNECT_PROJECT_ID>'

// Solana 커스텀 체인 정의
const solana = defineChain({
  id: 101,
  name: 'Solana',
  network: 'solana',
  nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
  rpcUrls: {
    default: { http: ['https://api.mainnet-beta.solana.com'] },
    public: { http: ['https://api.mainnet-beta.solana.com'] },
  },
})


export const config = createConfig({
  chains: [mainnet, base, polygon, solana], // 다중 체인 추가
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),

  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygon.id]: http('https://rpc-mainnet.matic.network'),
    [solana.id]: http(),
  },
})