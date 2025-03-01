import { useSendTransaction } from '@privy-io/react-auth'

export function TestTransaction() {
  const { sendTransaction } = useSendTransaction()

  const handleSend = async () => {
    const tx = {
      chain: 'solana',
      to: 'recipient-address',
      value: '1000000', // 0.001 SOL
    }
    const txHash = await sendTransaction(tx)
    console.log('Tx Hash:', txHash)
  }

  return <button onClick={handleSend}>Send Transaction</button>
}