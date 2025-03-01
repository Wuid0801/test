import { usePrivy } from "@privy-io/react-auth";
import { 
  useSolanaWallets, 

} from "@privy-io/react-auth/solana";

export default function WalletButton() {


  const { connectWallet, connectOrCreateWallet, login, user } = usePrivy();
  const { wallets } = useSolanaWallets();
  console.log(wallets);
  console.log(user?.wallet);
  const externalWallets = wallets.filter(
    (wallet) => wallet.walletClientType !== "privy"
  );


  return (
    <>
      <div>
        {/* 외부 지갑 연결 버튼 */}
        <button onClick={connectWallet}>
          Phantom과 같은 외부 Solana 지갑 연결
        </button>

        {/* 연결된 외부 지갑 표시 */}
        {externalWallets.length > 0 ? (
          <div>
            <p>연결된 외부 Solana 지갑: {externalWallets[0].address}</p>
          </div>
        ) : (
          <p>Phantom과 같은 외부 Solana 지갑이 연결되지 않았습니다.</p>
        )}

        {wallets.length > 0 && wallets[0].walletClientType === "privy" && (
          <div>
            <p>Privy Embedded Wallet: {wallets[0].address}</p>
          </div>
        )}
      </div>

      <div>
        {!wallets.length ? (
          <button onClick={login}>Solana 지갑 연결</button>
        ) : (
          <div>
            <p>연결된 Solana 지갑: {wallets[0].address}</p>
          </div>
        )}
      </div>

      <button onClick={connectWallet}>Connect wallet2</button>
      <button onClick={connectOrCreateWallet}>Connect wallet3</button>

      {/* <button
        onClick={() => {
          if (wallets[0]) {
            fundWallet(wallets[0].address);
          }
        }}
      >
        Fund Wallet
      </button> */}
    </>
  );
}
