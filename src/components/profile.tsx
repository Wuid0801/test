import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
  const { address, isConnected } = useAccount()
  const { data, error, status } = useEnsName({ address })
  if (!isConnected) return <div>Please connect your wallet</div>;


  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
}