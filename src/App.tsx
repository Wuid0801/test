import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./config";
import { Profile } from "./components/profile";
import { Account } from "./components/account";
import { WalletOptions } from "./wallet-options";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { TestTransaction } from "./components/delegate"; // Delegate 테스트 컴포넌트
import { RevokeDelegation } from "./components/revoke";
import SignTest from "./components/signtest";

const queryClient = new QueryClient();
function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
function App() {
  const { login, user, authenticated } = usePrivy();
  const { wallets } = useWallets();

  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");

  console.log("User:", user);
  console.log("Wallets:", wallets);
  console.log("Embedded Wallet:", embeddedWallet);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center justify-center h-screen">
          <Profile />
          <ConnectWallet />
          <div>
            {!authenticated ? (
              <button onClick={login}>지갑 연결하기</button>
            ) : (
              <div>
                <p>Logged id: {user?.wallet?.address}</p>
                {embeddedWallet ? (
                  <p>Embedded Wallet: {embeddedWallet.address}</p>
                ) : (
                  <p>지갑 못찾음</p>
                )}
                <TestTransaction />
                <RevokeDelegation />
              </div>
            )}
            <SignTest/>
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
