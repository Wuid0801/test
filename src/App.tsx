import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./config";
import { Profile } from "./components/profile";
import { Account } from "./components/account";
import { WalletOptions } from "./wallet-options";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { TestTransaction } from "./components/delegate";
import { RevokeDelegation } from "./components/revoke";
import SignTest from "./components/signtest";

const queryClient = new QueryClient();

// 지갑 연결 컴포넌트
function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

function App() {
  const { login, user, authenticated } = usePrivy();
  const { wallets } = useWallets();
  
  // 체인별 지갑
  const solanaWallet = wallets.find((w) => w.chainId === "solana:mainnet");
  const bitcoinWallet = wallets.find((w) => w.chainId === "bitcoin:mainnet");
  const baseWallet = wallets.find((w) => w.chainId === "base:mainnet");
  const etherWallet = wallets.find((w) => w.chainId === "eip155:1"); 
  const polygonWallet = wallets.find((w) => w.chainId === "eip155:137");

  console.log("사용자:", user);
  console.log("지갑들:", wallets);

  // 입금 처리 함수
  const handleDeposit = (wallet: ConnectedWallet | undefined, chainName: string) => {
    if (!wallet) {
      alert(`${chainName} 지갑을 찾을 수 없습니다. 먼저 ${chainName} 지갑을 연결해주세요.`);
      return;
    }
    const depositAddress = wallet.address;
    console.log(`${chainName} 입금 주소:`, depositAddress);
    alert(
      `${chainName} 입금 주소: ${depositAddress}\n.`
    );
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center justify-center h-screen">
          <Profile />
          <ConnectWallet />
          <div className="text-center space-y-4">
            {!authenticated ? (
              <button
                onClick={login}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                지갑 연결하기
              </button>
            ) : (
              <div className="space-y-4">
                <p>로그인 주소: {user?.wallet?.address}</p>

                <div>
                  <p>솔라나: {solanaWallet ? solanaWallet.address : "연결되지 않음"}</p>
                  <button
                    onClick={() => handleDeposit(solanaWallet, "솔라나")}
                    className="px-4 py-2 bg-green-500 text-white rounded mt-2"
                  >
                    SOL 입금
                  </button>
                </div>

                <div>
                  <p>비트코인: {bitcoinWallet ? bitcoinWallet.address : "연결되지 않음"}</p>
                  <button
                    onClick={() => handleDeposit(bitcoinWallet, "비트코인")}
                    className="px-4 py-2 bg-green-500 text-white rounded mt-2"
                  >
                    BTC 입금
                  </button>
                </div>

                <div>
                  <p>베이스: {baseWallet ? baseWallet.address : "연결되지 않음"}</p>
                  <button
                    onClick={() => handleDeposit(baseWallet, "베이스")}
                    className="px-4 py-2 bg-green-500 text-white rounded mt-2"
                  >
                    입금
                  </button>
                </div>

                <div>
                  <p>이더리움: {etherWallet ? etherWallet.address : "연결되지 않음"}</p>
                  <button
                    onClick={() => handleDeposit(etherWallet, "이더리움")}
                    className="px-4 py-2 bg-green-500 text-white rounded mt-2"
                  >
                    ETH 입금
                  </button>
                </div>

                <div>
                  <p>폴리곤: {polygonWallet ? polygonWallet.address : "연결되지 않음"}</p>
                  <button
                    onClick={() => handleDeposit(polygonWallet, "폴리곤")}
                    className="px-4 py-2 bg-green-500 text-white rounded mt-2"
                  >
                    POLY 입금
                  </button>
                </div>

                <TestTransaction />
                <RevokeDelegation />
              </div>
            )}
            <SignTest />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;