import { useAccount, useEnsName } from 'wagmi'

export function Profile() {
  const { address, isConnected } = useAccount()
  const { data, error, status } = useEnsName({ address })
  if (!isConnected) return <div>Please connect your wallet</div>;
  console.log('Address:', address); // 디버깅용
  console.log('Status:', status);

  if (status === 'pending') return <div>Loading ENS name</div>
  if (status === 'error')
    return <div>Error fetching ENS name: {error.message}</div>
  return <div>ENS name: {data}</div>
}