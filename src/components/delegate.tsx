import { usePrivy, useSolanaWallets, useDelegatedActions, WalletWithMetadata } from "@privy-io/react-auth";

export function DelegateActionButton() {
  const { user } = usePrivy();
  const { ready, wallets } = useSolanaWallets(); // Solana 지갑
  const { delegateWallet } = useDelegatedActions();

  // Privy Embedded Wallet 찾기 (Solana 또는 EVM)
  const walletToDelegate = wallets.find((wallet) => wallet.walletClientType === "privy");

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAlreadyDelegated = !!user.linkedAccounts.find(
    (account): account is WalletWithMetadata => account.type === "wallet" && account.delegated
  );

  const onDelegate = async () => {
    if (!walletToDelegate || !ready) return;
    console.log("??",walletToDelegate)

    const isSolana = walletToDelegate.address === "solana";

    const chainType = isSolana ? "solana" : "ethereum";

    await delegateWallet({
      address: walletToDelegate.address,
      chainType, 
    });
  };

  return (
    <button
      disabled={!ready || !walletToDelegate || isAlreadyDelegated}
      onClick={onDelegate}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Delegate access
    </button>
  );
}
