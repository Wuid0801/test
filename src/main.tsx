// import { createRoot } from 'react-dom/client'
// import { PrivyProvider } from '@privy-io/react-auth'
// import { WagmiProvider, createConfig } from 'wagmi'
// import { http } from 'wagmi'
// import { defineChain } from 'viem'
// import './index.css'
// import App from './App.tsx'
// import { base, mainnet, polygon } from 'wagmi/chains';
// const solana = defineChain({
//   id: 101,
//   name: 'Solana',
//   network: 'solana',
//   nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
//   rpcUrls: {
//     default: { http: ['https://api.mainnet-beta.solana.com'] },
//     public: { http: ['https://api.mainnet-beta.solana.com'] },
//   },
// })

// const config = createConfig({
//   chains: [solana],
//   transports: {
//     [solana.id]: http(),
//   },
// })

// createRoot(document.getElementById('root')!).render(
//   <WagmiProvider config={config}>
//     <PrivyProvider
//       appId={import.meta.env.VITE_PRIVY_APP_ID}
//       config={{
//         loginMethods: ['wallet'],
//         supportedChains: [solana, base, mainnet, polygon],
//         embeddedWallets: {
//           createOnLogin: 'all-users', // Embedded Wallet 생성

//         },
//       }}
//     >
//       <App />
//     </PrivyProvider>
//   </WagmiProvider>
// )

import { createRoot } from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import {toSolanaWalletConnectors} from '@privy-io/react-auth/solana';
import './index.css';
import App from './App.tsx';

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

createRoot(document.getElementById('root')!).render(
  <PrivyProvider
    appId={import.meta.env.VITE_PRIVY_APP_ID}
    config={{
      appearance: {
        theme: 'light',
        accentColor: '#676FFF',
        logo: 'https://your-logo-url',
        walletChainType: 'solana-only',
      },
      externalWallets: {
        solana: {
          connectors: solanaConnectors ,
        },
      },
      loginMethods: [ 'email', 'wallet','google', 'twitter'],
      embeddedWallets: {
        createOnLogin: 'off',//'users-without-wallets', //'all-users'?
        
      },
    }}
  >
    <App />
  </PrivyProvider>
);