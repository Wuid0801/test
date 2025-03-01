import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider, createConfig } from 'wagmi'
import { http } from 'wagmi'
import { defineChain } from 'viem'
import './index.css'
import App from './App.tsx'

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

const config = createConfig({
  chains: [solana],
  transports: {
    [solana.id]: http(),
  },
})

createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet'],
        supportedChains: [solana],
        embeddedWallets: {
          createOnLogin: 'all-users', // Embedded Wallet 생성
        },
      }}
    >
      <App />
    </PrivyProvider>
  </WagmiProvider>
)