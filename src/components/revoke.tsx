import { usePrivy } from '@privy-io/react-auth'

export function RevokeDelegation() {
  const { user, logout } = usePrivy()

  const revoke = async () => {
    if (!user) {
      console.log('로그인된 사용자가 없습니다')
      return
    }

    if (!user.linkedAccounts || !user.linkedAccounts.length) {
      console.log('취소할 연결된 계정이 없습니다')
      return
    }
    await logout()
  }

  return (
    <div>
      {user ? (
        <button onClick={revoke}>위임 취소</button>
      ) : (
        <p>위임을 취소하려면 로그인하세요</p>
      )}
    </div>
  )
}